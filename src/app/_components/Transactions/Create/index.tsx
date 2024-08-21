"use client";
import { useState } from "react";
import { api } from "~/trpc/react";
import Link from "next/link";
import toast from "react-hot-toast";
import type { Images, Listing } from "@prisma/client";
import type { Session } from "next-auth";

// import { PayPalButtons } from "@paypal/react-paypal-js";

// todo UNINSTLL SALES_TAX

interface CreateTransactionProps {
    closeModal: () => void;
    listing: EachListing;
    session: Session | null;
}

interface EachListing extends Listing {
    images: Images[];
    _count: {
        comments: number;
        favorites: number;
    };
    seller: {
        id: string;
        username: string | null;
        selectedTag: string | null;
        profile: string | null;
        avgRating?: number | null;
    };
    isFavorited?: boolean;
    favoriteId?: string;
}

export default function CreateTransaction({
    closeModal,
    listing,
    session,
}: CreateTransactionProps) {
    const [page, setPage] = useState<number>(0);

    const utils = api.useUtils();

    // server






    // const { mutate } = api.transaction.create.useMutation({
    //     onSuccess: (data) => {
    //         if (data?.isAvailable === false) {
    //             toast.error("Purchase Failed, try again later", {
    //                 style: {
    //                     borderRadius: "10px",
    //                     background: "#333",
    //                     color: "#fff",
    //                 },
    //             });
    //         }
    //         if (data?.isAvailable === true && data.createTransaction) {
    //             toast.success("Payment Successful!", {
    //                 style: {
    //                     borderRadius: "10px",
    //                     background: "#333",
    //                     color: "#fff",
    //                 },
    //             });
    //             setPaymentSuccess(true);
    //             setOrderId(data.createTransaction.paypalOrderId);
    //         }
    //         // void utils.listing.getOne.invalidate();
    //         // void utils.listing.getAllWithFilters.invalidate();
    //         // void utils.listing.getAllSortedByPopularityWithFilters.invalidate();
    //         void utils.offer.getAllByUserId.invalidate();
    //     },
    // });



    // helpers


    // just do a quick submit that does some error handling and calls mutate
    // todo check make sure sellerID cannot match the session.userId... can't buy your own listing...
    // can throw a cheeky toast

    return (
        <div className="flex flex-col items-center text-white w-[1000px]">
            <div className="flex justify-center w-full">
                <div className="flex w-1/3  gap-2 text-xs ">
                    <button
                        className={`${page === 0 ? "text-white" : "text-white/40"} flex flex-col items-center gap-1 hover:opacity-70 ease-in`}
                        onClick={() => setPage(0)}
                    >
                        <div
                            className={`flex h-7 w-7 items-center justify-center rounded-full ${page === 0 ? "bg-green-500" : "bg-mediumGray"} p-2 `}
                        >
                            1
                        </div>
                        <h1>Agreement</h1>
                    </button>
                    <div className="mt-3 h-[2px] w-full rounded-md bg-mediumGray"></div>
                    <button
                        className={`${page === 1 ? "text-white" : "text-white/40"} flex flex-col items-center gap-1 hover:opacity-70 ease-in`}
                        onClick={() => setPage(1)}
                    >
                        <div
                            className={`flex h-7 w-7 items-center justify-center rounded-full ${page === 1 ? "bg-green-500" : "bg-mediumGray"} p-2`}
                        >
                            2
                        </div>
                        <h1>Confirmation</h1>
                    </button>
                </div>
            </div>

            {page === 0 && (
                <>
                    <div className="mt-10 flex w-full gap-10 text-white">
                        <div className="w-2/3 p-5">
                            <h2>Hey there,</h2>
                            <p className="mt-2">
                                Keeby does not handle transactions. When you
                                agree to buy a keyboard you will be put in a
                                private message with the seller. All purchases
                                are directly between buyer and seller. Keeby
                                recommends only using paypal for transactions
                                and read keeby rules and scam prevention to keep
                                yourself safe.
                            </p>
                        </div>
                        <div className="w-1/3 rounded-md bg-mediumGray p-5">
                            <h2>Summary </h2>
                            <div className="mt-1 h-[2px] w-full bg-white/30"></div>
                            <div className="mt-2 flex justify-between">
                                <h3 className="text-white/30">Keyboard</h3>
                                <div> {listing.title}</div>
                            </div>
                            <div className="mt-5 h-[2px] w-full bg-white/30"></div>
                            <div className="mt-2 flex justify-between">
                                <h3 className="text-white/30">Total</h3>
                                <div>${listing.price}</div>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    className=" text-md keeb-shop-offer-button z-10 mt-10 flex cursor-pointer items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                                    style={{
                                        boxShadow: "0 0 20px #22C55E",
                                    }}
                                    onClick={() => setPage(1)}
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
                                            I agree to the sale
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

                    <div className="mt-10 text-mediumGray w-full">
                        * Please read{" "}
                        <Link
                            href={`/rules`}
                            aria-label="keeby rules"
                            className="transition-colors duration-400 ease-custom-cubic hover:text-green-500"
                        >
                            KeebyRules
                        </Link>{" "}
                        and{" "}
                        <Link
                            href={`/scam-prevention`}
                            aria-label="scam prevention"
                            className="transition-colors duration-400 ease-custom-cubic hover:text-green-500"
                        >
                            ScamPrevention
                        </Link>{" "}
                        before buying
                    </div>
                </>
            )}
            {page === 1 && (
                <>
                    <div className="mt-10 flex w-full gap-10 text-white justify-center">
                        <div className="w-2/3 rounded-md bg-mediumGray p-5">
                            <div className="flex w-full gap-10">
                                <div className="w-1/2 flex-col flex">
                                    <p>
                                        * Yes, I've read scam prevention and
                                        keebyrules. By agreeing to buy this
                                        listing it will lock the listing.
                                        Seller's have the ability to relist if
                                        you do not purchase the keyboard. It is
                                        recommended that Seller's pay shipping
                                        if in US, if overseas buyer's may need
                                        to discuss with seller.
                                    </p>
                                </div>

                                <div className="w-1/2 flex-col flex">
                                    <h3>Summary </h3>
                                    <div className="mt-1 h-[2px] w-full bg-white/30"></div>
                                    <div className="mt-2 flex justify-between">
                                        <h3 className="text-white/30">
                                            Keyboard
                                        </h3>
                                        <div> {listing.title}</div>
                                    </div>
                                    <div className="mt-5 h-[2px] w-full bg-white/30"></div>
                                    <div className="mt-2 flex justify-between">
                                        <h3 className="text-white/30">Total</h3>
                                        <div>${listing.price}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    className=" text-md keeb-shop-offer-button z-10 mt-10 flex cursor-pointer items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                                    style={{
                                        boxShadow: "0 0 20px #22C55E",
                                    }}
                                    onClick={() => setPage(1)}
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
                                            Yes, I'm sure
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

                    <div className="mt-10 text-mediumGray w-full">
                        * Please read{" "}
                        <Link
                            href={`/rules`}
                            aria-label="keeby rules"
                            className="transition-colors duration-400 ease-custom-cubic hover:text-green-500"
                        >
                            KeebyRules
                        </Link>{" "}
                        and{" "}
                        <Link
                            href={`/scam-prevention`}
                            aria-label="scam prevention"
                            className="transition-colors duration-400 ease-custom-cubic hover:text-green-500"
                        >
                            ScamPrevention
                        </Link>{" "}
                        before buying
                    </div>
                </>
            )}
        </div>
    );
}
