import type { Images, Listing } from "@prisma/client";
import { useState } from "react";
import { api } from "~/utils/api";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { PayPalButtons } from "@paypal/react-paypal-js";

// todo UNINSTLL SALES_TAX

interface CreateTransactionProps {
    closeModal: () => void;
    listing: ListingWithImagesAndCount;
}

interface ListingWithImagesAndCount extends Listing {
    images: Images[];
    _count: {
        comments: number;
    };
    seller: {
        id: string;
        username: string | null;
        selectedTag: string | null;
        profile: string | null;
        avgRating?: number | null;
    };
}

export default function CreateTransaction({
    closeModal,
    listing,
}: CreateTransactionProps) {
    // npm install @paypal/react-paypal-js

    // Unlike Amazon or eBay, Shopify is not a “marketplace facilitator”. Therefore, Shopify doesn't fall under marketplace facilitator laws that require stores like Amazon or eBay to collect and remit taxes for its sellers.

    // I have to collect and remit taxes for my sellers...

    // this setup works great for everything until im held responsible for disputes and what do I say about that???
    // todo look into paypal marketplace. I think it requires approval... buuuuut that way i can send money directly to the buyer they have the dispute together... and I can send myself a payout...

    // the problem is if im touching all the money then i'd have to dispute the buyer and it'd just be annoying and a lot of work...

    // todo PAYPAL INTEGRATION BEFORE BUYING

    // so when creating an offer we need to check if there is an existing one already to the seller from the sender
    // going to show up on both sender and receiver profile
    // going to have to setup notifications as well old boi
    //  we will do paypal integration last
    // todo make sure that the seller knows before accepting an offer they have 10 days to ship out the keeb and supply the tracking number otherwise. The buyer won't be charged.
    // make it clear they have to supply a tracking number to get payed.

    // TODO SELLERS GET PAYED AFTER SHIPPING...
    // !
    // npm i sales-tax
    // todo we gotta calculate sales tax
    // we need to collect shipping address too.

    // Goal going to send address to Avalara to determine the correct tax rate...
    // then going to need to file that

    const { data: sessionData } = useSession();

    // todo tax calculation
    const [subTotal, setSubTotal] = useState<number>(0);
    const [total, setTotal] = useState<string>("");
    const [tax, setTax] = useState<string>("");

    const [offerAlreadyExists, setOfferAlreadyExists] =
        useState<boolean>(false);

    const [purchaseStage, setPurchaseStage] = useState<string>("");
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<string>("");

    //   need to add all new shipping info with mutate

    const ctx = api.useContext();

    // create
    const { mutate } = api.transaction.create.useMutation({
        onSuccess: (data) => {
            if (data?.isAvailable === false) {
                toast.error("Purchase Failed, try again later", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
                setOfferAlreadyExists(true);
            }
            if (data?.isAvailable === true && data.createTransaction) {
                toast.success("Payment Successful!", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
                setPaymentSuccess(true);
                setOrderId(data.createTransaction.paypalOrderId as string);
            }
            // todo void all get listings
            // void ctx.post.getAllNewPreviewPosts.invalidate();
        },
    });

    return paymentSuccess ? (
        <div className="flex w-[1000px] gap-10 text-white">
            <div className="w-1/2 p-5">
                <h1 className="text-2xl text-green-500">
                    Thank you for your Order!
                </h1>

                <p className="mt-5">
                    You now have access to a private message with the seller!
                    The seller has been notified of your purchase.
                </p>
                <Link
                    href={`/profile/messages`}
                    aria-label="messages"
                    className="mt-10"
                >
                    <button
                        className=" text-md keeb-share-preview-button flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                        style={{
                            boxShadow: "0 0 20px #22C55E",
                        }}
                    >
                        <svg
                            className="keeb-share-preview-button-arrow w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                            ></path>
                        </svg>
                        <span className="keeb-share-preview-button-text">
                            {`Messages `}
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="keeb-share-preview-button-circle w-2"
                            viewBox="0 0 32 32"
                        >
                            <circle cx="16" cy="16" r="16" />
                        </svg>
                    </button>
                </Link>
            </div>
            <div className="w-1/2 rounded-md bg-darkGray p-5 ">
                <h2>Order Summary</h2>
                <div className="flex w-full justify-between">
                    <div className="mt-2 flex flex-col text-xs">
                        <h3 className="text-white/50">Order Number</h3>
                        <p>#{orderId}</p>
                    </div>
                    <div className="mt-2 flex flex-col text-xs">
                        <h3 className="text-white/50">Keyboard</h3>
                        <p>{listing.title}</p>
                    </div>
                </div>
                <div className="mt-1 h-[2px] w-full bg-white/30"></div>

                <div className="mt-2 flex justify-between">
                    <h3 className="text-white/30">Total Payed </h3>
                    <div>${((listing.price / 100) * 0.05).toFixed(2)}</div>
                </div>
                <p className="mt-10 text-xs">
                    You can view your transactions at the bottom of the profile
                    page.
                </p>
            </div>
        </div>
    ) : (
        <div className="flex flex-col items-center text-white">
            {purchaseStage === "" && (
                <div className=" w-[1000px]">
                    <div className="flex justify-center">
                        <div className="flex w-1/3  gap-2 text-xs ">
                            <div className="flex flex-col items-center gap-1">
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 p-2 ">
                                    1
                                </div>
                                <h1>Checkout</h1>
                            </div>
                            <div className="mt-3 h-[2px] w-full rounded-md bg-darkGray"></div>
                            <button
                                className="flex flex-col items-center gap-1 text-white/40 transition-colors  duration-400 ease-custom-cubic hover:text-white"
                                onClick={() => {
                                    if (
                                        sessionData?.user.id !==
                                        listing.sellerId
                                    )
                                        setPurchaseStage("PAYPAL");
                                }}
                            >
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-darkGray p-2  transition-background  duration-400 ease-custom-cubic hover:bg-green-500   ">
                                    2
                                </div>
                                <div className="">Payment</div>
                            </button>
                        </div>
                    </div>

                    <div className="mt-10 flex w-full gap-10 text-white">
                        <div className="w-2/3 p-5">
                            <h2>Checkout</h2>
                            <p className="mt-2">
                                When purchased, Keeby provides the buyer and
                                seller with each others’ verified contact
                                information via private message. The buyer and
                                seller then work together to complete the
                                transaction via paypal and arrange shipping. The
                                seller pays for shipping and is required to sell
                                at the agreed upon price.
                            </p>
                        </div>
                        <div className="w-1/3 rounded-md bg-darkGray p-5">
                            <h2>Summary </h2>
                            <div className="mt-1 h-[2px] w-full bg-white/30"></div>
                            <div className="mt-2 flex justify-between">
                                <h3 className="text-white/30">Subtotal</h3>
                                <div> ${(listing.price / 100).toFixed(2)}</div>
                            </div>
                            <div className="mt-2 flex justify-between">
                                <h3 className="text-white/30">Keeby Fee</h3>
                                <div>0.05%</div>
                            </div>
                            <div className="mt-5 h-[2px] w-full bg-white/30"></div>
                            <div className="mt-2 flex justify-between">
                                <h3 className="text-white/30">Total</h3>
                                <div>
                                    ${((listing.price / 100) * 0.05).toFixed(2)}
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    className=" text-md keeb-shop-offer-button z-10 mt-10 flex cursor-pointer items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                                    style={{
                                        boxShadow: "0 0 20px #22C55E",
                                    }}
                                    onClick={() => {
                                        if (
                                            sessionData?.user.id !==
                                            listing.sellerId
                                        )
                                            setPurchaseStage("PAYPAL");
                                    }}
                                >
                                    <>
                                        <svg
                                            className="keeb-shop-offer-button-arrow w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="3"
                                                d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                                            ></path>
                                        </svg>
                                        <span className="keeb-shop-offer-button-text">
                                            {`Pay `}
                                        </span>

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="#000000"
                                            className="keeb-shop-offer-button-circle w-5"
                                            viewBox="0 0 256 256"
                                        >
                                            <path d="M252,128c0,68.4-55.6,124-124,124S4,196.4,4,128S59.6,4,128,4S252,59.6,252,128z M174.3,155.6c0-26-27.8-33.4-39.8-36.8  c-22.7-6.3-24.6-14.5-24.3-18.7c0.8-10.2,12-12.7,22.4-10.5c8.2,1.8,16.6,6.6,21.3,10.3l14.9-17.4c-7.3-5-16.7-11.5-30.4-14.1V51.5  h-21.7v16.3c-21,1.6-35,14.8-35,32.9c0,17.7,12.8,26,25.6,32.2c10.7,5.1,40.5,10.4,38.8,23.9c-0.9,7.3-8.7,12.7-21.6,11.1  c-11.2-1.4-23.2-10.8-23.2-10.8l-16.4,16.3c9.9,8,20.4,13,31.8,15.3v15.9h21.7v-15.1C159.1,187.2,174.3,173.1,174.3,155.6z" />
                                        </svg>
                                    </>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 text-darkGray">
                        * Please read{" "}
                        <Link
                            href={`/keebdex/rules`}
                            aria-label="keeby rules"
                            className="transition-colors duration-400 ease-custom-cubic hover:text-green-500"
                        >
                            KeebyRules
                        </Link>{" "}
                        and{" "}
                        <Link
                            href={`/keebdex/scam-prevention`}
                            aria-label="scam prevention"
                            className="transition-colors duration-400 ease-custom-cubic hover:text-green-500"
                        >
                            ScamPrevention
                        </Link>{" "}
                        before buying
                    </div>
                </div>
            )}
            {purchaseStage === "PAYPAL" &&
                sessionData?.user.id !== listing.sellerId && (
                    <div className="h-[500px] w-[1000px] overflow-auto px-40 ">
                        <div className="mb-20 flex justify-center">
                            <div className="flex w-1/2  gap-2 text-xs ">
                                <button
                                    className="flex flex-col items-center gap-1 text-white/40 transition-colors  duration-400 ease-custom-cubic hover:text-white"
                                    onClick={() => setPurchaseStage("")}
                                >
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-darkGray p-2  transition-background  duration-400 ease-custom-cubic hover:bg-green-500 ">
                                        1
                                    </div>
                                    <h1>Checkout</h1>
                                </button>
                                <div className="mt-3 h-[2px] w-full rounded-md bg-darkGray"></div>
                                <button className="flex flex-col items-center gap-1">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 p-2 ">
                                        2
                                    </div>
                                    <div className="">Payment</div>
                                </button>
                            </div>
                        </div>
                        <PayPalButtons
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    intent: "CAPTURE",
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: (
                                                    (listing.price / 100) *
                                                    0.05
                                                ).toFixed(2),
                                                currency_code: "USD",
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={async (data, actions) => {
                                if (actions && actions.order) {
                                    const details =
                                        await actions.order.capture();
                                    console.log("DATA BB", data);

                                    console.log("DETAILS BB", details);
                                    console.log(
                                        "STATUS TESTING BB",
                                        details.status
                                    );

                                    console.log(
                                        "depreciated",
                                        details.payer?.email_address
                                    );

                                    if (
                                        details &&
                                        details.purchase_units &&
                                        details.purchase_units[0] &&
                                        details.purchase_units[0].amount &&
                                        sessionData &&
                                        sessionData.user.id &&
                                        details.id
                                    ) {
                                        const transactionData = {
                                            name: listing.title,
                                            buyerId: sessionData.user.id,
                                            paypalOrderId: data.orderID,
                                            transactionId: details.id,
                                            listingId: listing.id,
                                            price: details.purchase_units[0]
                                                .amount.value,
                                            sellerId: listing.sellerId,
                                        };
                                        mutate(transactionData);
                                    }
                                }
                            }}
                        />
                    </div>
                )}
        </div>
    );
}

// createOrder: (data, actions) => {
//     return actions.order.create({
//         intent: "CAPTURE",
//         purchase_units: [{
//             amount: {
//                 currency_code: "USD",
//                 value: (listing.price / 100).toFixed(2), // Total amount including item price and tax
//                 breakdown: {
//                     item_total: {  // Total price of the items
//                         currency_code: "USD",
//                         value: (listing.itemPrice / 100).toFixed(2)
//                     },
//                     tax_total: {  // Total tax amount
//                         currency_code: "USD",
//                         value: (listing.taxAmount / 100).toFixed(2)
//                     }
//                 }
//             },
//             items: [{
//                 name: listing.title,
//                 unit_amount: {
//                     currency_code: "USD",
//                     value: (listing.itemPrice / 100).toFixed(2)
//                 },
//                 quantity: "1"
//             }]
//         }],
//         application_context: {
//             shipping_preference: 'GET_FROM_FILE'  // Adjust based on your requirements
//         }
//     });
// },
