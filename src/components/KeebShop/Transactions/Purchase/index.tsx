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

    // todo PAYPAL INTEGRATION BEFORE BUYING

    // so when creating an offer we need to check if there is an existing one already to the seller from the sender
    // going to show up on both sender and receiver profile
    // going to have to setup notifications as well old boi
    //  we will do paypal integration last
    // todo make sure that the seller knows before accepting an offer they have 10 days to ship out the keeb and supply the tracking number otherwise. The buyer won't be charged.
    // make it clear they have to supply a tracking number to get payed.
    // TODO SELLERS GET PAYED AFTER SHIPPING...

    const { data: sessionData } = useSession();

    const [price, setPrice] = useState<number>(0);
    const [offerAlreadyExists, setOfferAlreadyExists] =
        useState<boolean>(false);
    const [isShowPaypal, setIsShowPaypal] = useState<boolean>(false);
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<boolean>(false);

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
                toast.error("Purchase Failed", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
                setOfferAlreadyExists(true);
            }
            if (data?.isAvailable === true) {
                toast.success("Keyboard Purchased!", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
                setPaymentSuccess(true);
            }
            // todo void all get listings
            // void ctx.post.getAllNewPreviewPosts.invalidate();
        },
    });

    return paymentSuccess ? (
        <div className="flex flex-col items-center text-white">
            <h1 className="text-xl text-purple">Congratulations!</h1>
            {sessionData && (
                <p>
                    A confirmation email has been sent to{" "}
                    {sessionData.user.email}
                </p>
            )}
            <p className="mt-5">
                You can check the transactions tab under KeebShop at the bottom
                of the profile page to check your order number and status!
            </p>
            <p className="text-darkGray mt-5">
                *If the seller does not provide tracking numbers within ten days
                you will be refunded.
            </p>
        </div>
    ) : (
        <div className="flex flex-col items-center text-white">
            {isShowPaypal === false && (
                <>
                    <h1 className="flex justify-center gap-1 text-xl">
                        Purchase
                        <span className="text-green-500"> {listing.title}</span>
                        ?
                    </h1>
                    <p className="mt-10 flex justify-center text-5xl text-purple">
                        ${listing.price / 100}
                    </p>
                </>
            )}

            {isShowPaypal === false ? (
                <button
                    className=" text-md keeb-shop-offer-button mt-10 flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                    style={{
                        boxShadow: "0 0 20px #22C55E",
                    }}
                    // onClick={(e) => {
                    //     e.preventDefault();
                    //     void submit(e);
                    // }}
                    onClick={() => setIsShowPaypal(true)}
                    disabled={hasSubmitted || isSubmitting}
                >
                    {/* {isSubmitting ? (
                    <div className="flex items-center gap-1">
                        Uploading
                        <div className="w-6">
                            <LoadingSpinner size="16px" />
                        </div>
                    </div>
                ) : ( */}
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
            ) : (
                <div className="h-[500px] w-[500px] overflow-auto p-20 ">
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

            {isShowPaypal === false && (
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
            )}
        </div>
    );
}
