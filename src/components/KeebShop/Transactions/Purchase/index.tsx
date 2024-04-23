import type { Images, Listing } from "@prisma/client";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { debounce } from "lodash";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import LoadingSpinner from "~/components/Loading";
import { PayPalButtons } from "@paypal/react-paypal-js";

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

interface ErrorsObj {
    price?: string;
    priceExcess?: string;
    priceSmall?: string;
    existingOffer?: string;
}

export default function CreateTransaction({
    closeModal,
    listing,
}: CreateTransactionProps) {
    // npm install @paypal/react-paypal-js

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
    // npm install react-places-autocomplete
    // todo we gotta calculate sales tax
    // we need to collect shipping address too.

    const { data: sessionData } = useSession();

    // shipping
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [secondaryAddress, setSecondaryAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [Country, setCountry] = useState<string>("");
    const [zipCode, setZipCode] = useState<string>("");

    // todo taxes
    const [price, setPrice] = useState<number>(0);
    const [offerAlreadyExists, setOfferAlreadyExists] =
        useState<boolean>(false);

    const [purchaseStage, setPurchaseStage] = useState<string>("");
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<string>("");

    const [errors, setErrors] = useState<ErrorsObj>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);

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
        <div className="flex w-[800px] gap-10 text-white">
            <div className="w-1/2 ">
                <h1 className="text-3xl text-purple">
                    Thank you for your Order!
                </h1>
                {sessionData && (
                    <p>
                        A confirmation email has been sent to{" "}
                        {sessionData.user.email}
                    </p>
                )}
                <h2>Shipping Address</h2>
                <div className="flex w-full gap-5">
                    <h3>Name</h3>
                    <p>name here</p>
                </div>
                <div className="flex w-full gap-5">
                    <h3>Address</h3>
                    <p>name here</p>
                </div>
                <div className="flex w-full gap-5">
                    <h3>Phone</h3>
                    <p>name here</p>
                </div>
                <div className="flex w-full gap-5">
                    <h3>Email</h3>
                    <p>name here</p>
                </div>
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

                <p className="mt-5">
                    You can check the transactions tab under KeebShop at the
                    bottom of the profile page to check your order number and
                    status!
                </p>
                <p className="mt-5 text-darkGray">
                    *If the seller does not provide tracking numbers within ten
                    days you will be refunded.
                </p>
            </div>
        </div>
    ) : (
        <div className="flex flex-col items-center text-white">
            {purchaseStage === "" && (
                <>
                    <h1 className="flex justify-center gap-1 text-xl">
                        Purchase
                        <span className="text-green-500"> {listing.title}</span>
                        ?
                    </h1>
                    <p className="mt-10 flex justify-center text-5xl text-purple">
                        ${listing.price / 100}
                    </p>

                    <button
                        className=" text-md keeb-shop-offer-button mt-10 flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                        style={{
                            boxShadow: "0 0 20px #22C55E",
                        }}
                        onClick={() => {
                            if (sessionData?.user.id !== listing.sellerId)
                                setPurchaseStage("SHIPPING");
                        }}
                        disabled={hasSubmitted || isSubmitting}
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
                                {`Buy Now `}
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

                    <div className="mt-10 text-darkGray">
                        * All Purchases are final. Please read{" "}
                        <Link
                            href={`/keebdex/rules`}
                            aria-label="keeby rules"
                            className="transition-colors duration-400 ease-custom-cubic hover:text-green-500"
                        >
                            KeebyRules
                        </Link>{" "}
                        before buying
                    </div>
                </>
            )}

            {purchaseStage === "SHIPPING" && (
                <div className=" w-[1000px]">
                    <div className="flex justify-center">
                        <div className="flex w-1/3  gap-2 text-xs ">
                            <div className="flex flex-col items-center gap-1">
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 p-2 ">
                                    1
                                </div>
                                <h1>Shipping</h1>
                            </div>
                            <div className="mt-3 h-[2px] w-full rounded-md bg-darkGray"></div>
                            <div className="flex flex-col items-center gap-1 ">
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-darkGray p-2 text-white/40">
                                    2
                                </div>
                                <div className="text-white/40">Payment</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex w-full gap-10 text-white">
                        <div className="w-2/3">
                            <h2>Shipping details</h2>
                            <form className="mt-2">
                                <div className="flex gap-5">
                                    <input
                                        id="name"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        className="h-10 w-1/2 rounded-md bg-darkGray p-1"
                                        placeholder="First name"
                                    />
                                    <input
                                        id="name"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        className="h-10 w-1/2 rounded-md bg-darkGray p-1"
                                        placeholder="Last name"
                                    />
                                </div>
                                <input
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="mt-3 h-10 w-full rounded-md bg-darkGray p-1"
                                    placeholder="Address line 1"
                                />
                                <input
                                    id="address"
                                    value={secondaryAddress}
                                    onChange={(e) =>
                                        setSecondaryAddress(e.target.value)
                                    }
                                    className="mt-3 h-10 w-full rounded-md bg-darkGray p-1"
                                    placeholder="Address line 2"
                                />
                                <div className="mt-3 flex gap-5">
                                    <input
                                        id="city"
                                        value={city}
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                        className="h-10 w-1/2 rounded-md bg-darkGray p-1"
                                        placeholder="City"
                                    />
                                    <input
                                        id="state"
                                        value={state}
                                        onChange={(e) =>
                                            setState(e.target.value)
                                        }
                                        className="h-10 w-1/2 rounded-md bg-darkGray p-1"
                                        placeholder="State"
                                    />
                                </div>
                                <div className="mt-3 flex gap-5">
                                    <input
                                        id="Country"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        className="h-10 w-1/2 rounded-md bg-darkGray p-1"
                                        placeholder="Country"
                                    />
                                    <input
                                        id="zip code"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        className="h-10 w-1/2 rounded-md bg-darkGray p-1"
                                        placeholder="Zip/Postal code"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="w-1/3 rounded-md bg-darkGray p-5">
                            <h2>Summary </h2>
                        </div>
                    </div>
                    <p className="mt-10 flex justify-center text-5xl text-purple">
                        ${listing.price / 100}
                    </p>

                    <button
                        className=" text-md keeb-shop-offer-button mt-10 flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                        style={{
                            boxShadow: "0 0 20px #22C55E",
                        }}
                        onClick={() => {
                            if (sessionData?.user.id !== listing.sellerId)
                                setPurchaseStage("PAYPAL");
                        }}
                        disabled={hasSubmitted || isSubmitting}
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
                                {`Buy Now `}
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

                    <div className="mt-10 text-darkGray">
                        * All Purchases are final. Please read{" "}
                        <Link
                            href={`/keebdex/rules`}
                            aria-label="keeby rules"
                            className="transition-colors duration-400 ease-custom-cubic hover:text-green-500"
                        >
                            KeebyRules
                        </Link>{" "}
                        before buying
                    </div>
                </div>
            )}

            {purchaseStage === "PAYPAL" && (
                <div className="h-[500px] w-[600px] overflow-auto p-20 ">
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                intent: "CAPTURE",
                                purchase_units: [
                                    {
                                        amount: {
                                            value: (
                                                listing.price / 100
                                            ).toFixed(2),
                                            currency_code: "USD",
                                        },
                                    },
                                ],
                            });
                        }}
                        onApprove={async (data, actions) => {
                            if (actions && actions.order) {
                                const details = await actions.order.capture();
                                // todo need buyer shipping details... so we can send to shipper...
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
                                        price: details.purchase_units[0].amount
                                            .value,
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
