"use client";
import type { Listing, ListingOffer } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/trpc/react";
import keebo from "@public/Profile/keebo.png";
import Image from "next/image";

interface AcceptDeclineOfferProps {
    closeModal: () => void;
    listing: Listing & {
        listingOffer: ListingOfferWithBuyer[];
    };
    offer: ListingOfferWithBuyer;
    modalToggle: string;
}

interface ListingOfferWithBuyer extends ListingOffer {
    buyer: {
        username: string | null;
    };
}

export default function AcceptDeclineOffer({
    closeModal,
    listing,
    offer,
    modalToggle,
}: AcceptDeclineOfferProps) {
    const utils = api.useUtils();
    const [page, setPage] = useState<number>(0);

    const { mutate: deleteOffer } = api.offer.delete.useMutation({
        onSuccess: (data) => {
            void utils.offer.getAllByUserId.invalidate();
            if (data === "Successfully Deleted") {
                toast.success("Offer Declined!", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
            }

            closeModal();
        },
    });

    const { mutate: createTransaction } =
        api.transaction.createSellerAccept.useMutation({
            onSuccess: () => {
                void utils.offer.getAllByUserId.invalidate();
                toast.success("Listing Sold, Congrats!", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
                closeModal();
            },
        });

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            id: offer.id,
            buyerId: offer.buyerId,
            sellerId: listing.sellerId,
            listingStatus: listing.status,
            listingId: listing.id,
        };

        deleteOffer(data);
    };

    const handleAccept = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            offerId: offer.id,
            listingId: listing.id,
            buyerId: offer.buyerId,
            sellerId: listing.sellerId,
            agreedPrice: offer.price,
        };
        createTransaction(data);
    };

    return (
        <>
            {modalToggle === "ACCEPT" && (
                <div className="w-[800px]">
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
                                <h2>Agreement</h2>
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
                                <h3>Offer</h3>
                            </button>
                        </div>
                    </div>
                    {page === 0 && (
                        <>
                            <div className="mt-10 flex w-full justify-center gap-10 text-white">
                                <div className="w-2/3 p-5">
                                    <div className="flex items-end gap-1 text-xl">
                                        <h1>Accepting an Offer</h1>
                                        <Image
                                            alt="keebo mascot"
                                            src={keebo}
                                            className="w-8 h-8 object-contain"
                                        />
                                    </div>
                                    <p className="mt-2">
                                        Keeby does not handle transactions. When
                                        you accept an offer, you will be put in
                                        a private message with the buyer. All
                                        purchases and shipping are directly
                                        between buyer and seller. Keeby
                                        recommends only using paypal for
                                        transactions because they have a strong
                                        dispute resolution. Please read{" "}
                                        <Link
                                            href={"/how-keeby-works"}
                                            aria-label="Learn how keeby works"
                                            className="hover:text-green-500 ease-in "
                                        >
                                            keeby rules
                                        </Link>{" "}
                                        and{" "}
                                        <Link
                                            href={"/scam-prevention"}
                                            aria-label="Learn how to prevent scams"
                                            className="hover:text-green-500 ease-in"
                                        >
                                            scam prevention
                                        </Link>{" "}
                                        to keep yourself safe!
                                    </p>
                                    <div className="w-full flex justify-center mt-10">
                                        <button
                                            className=" text-md keeb-shop-offer-button z-10 flex cursor-pointer items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
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
                                                    Sounds Good
                                                </span>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    className="keeb-shop-offer-button-circle w-5"
                                                    viewBox="0 0 256 256"
                                                >
                                                    <path d="M128,20A108,108,0,1,0,236,128,108.12217,108.12217,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.0953,84.0953,0,0,1,128,212ZM76,108a16,16,0,1,1,16,16A16.00016,16.00016,0,0,1,76,108Zm72,0a16,16,0,1,1,16,16A16.00016,16.00016,0,0,1,148,108Zm31.96777,50.00537a60.016,60.016,0,0,1-103.93506.00049,12,12,0,0,1,20.7754-12.01611,36.01587,36.01587,0,0,0,62.38427-.00049,12,12,0,0,1,20.77539,12.01611Z" />
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
                                    className="ease-in hover:text-green-500"
                                >
                                    KeebyRules
                                </Link>{" "}
                                and{" "}
                                <Link
                                    href={`/scam-prevention`}
                                    aria-label="scam prevention"
                                    className="ease-in hover:text-green-500"
                                >
                                    ScamPrevention
                                </Link>{" "}
                                before accepting
                            </div>
                        </>
                    )}

                    {page === 1 && (
                        <>
                            <div className="flex w-full justify-center mt-10 ">
                                <h1 className="text-xl">
                                    Accept{" "}
                                    <span className="text-green-500">
                                        ${offer.price}
                                    </span>{" "}
                                    for {listing.title}?
                                </h1>
                            </div>
                            <div className="w-full justify-center mt-10 flex">
                                <button
                                    className=" text-md keeb-shop-offer-button flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                                    onClick={handleAccept}
                                >
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
                                        {`Accept`}
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#000000"
                                        className="keeb-shop-offer-button-circle w-5"
                                        viewBox="0 0 256 256"
                                    >
                                        <path d="M252,128c0,68.4-55.6,124-124,124S4,196.4,4,128S59.6,4,128,4S252,59.6,252,128z M174.3,155.6c0-26-27.8-33.4-39.8-36.8  c-22.7-6.3-24.6-14.5-24.3-18.7c0.8-10.2,12-12.7,22.4-10.5c8.2,1.8,16.6,6.6,21.3,10.3l14.9-17.4c-7.3-5-16.7-11.5-30.4-14.1V51.5  h-21.7v16.3c-21,1.6-35,14.8-35,32.9c0,17.7,12.8,26,25.6,32.2c10.7,5.1,40.5,10.4,38.8,23.9c-0.9,7.3-8.7,12.7-21.6,11.1  c-11.2-1.4-23.2-10.8-23.2-10.8l-16.4,16.3c9.9,8,20.4,13,31.8,15.3v15.9h21.7v-15.1C159.1,187.2,174.3,173.1,174.3,155.6z" />
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}

            {modalToggle === "DECLINE" && (
                <div>
                    <h1>
                        Are you sure you want to{" "}
                        <span className="text-red-500">Decline</span> this
                        offer?{" "}
                    </h1>

                    <div className="flex justify-center gap-10 ">
                        <button
                            className=" text-md keeb-shop-offer-button mt-5 flex items-center gap-2 rounded-md bg-mediumGray py-2 pr-4 text-black "
                            onClick={handleDelete}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="keeb-shop-offer-button-arrow w-3"
                                viewBox="0 0 25 25"
                                version="1.1"
                            >
                                <g
                                    stroke="none"
                                    strokeWidth="1"
                                    fill="none"
                                    fillRule="evenodd"
                                >
                                    <g
                                        transform="translate(-469.000000, -1041.000000)"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M487.148,1053.48 L492.813,1047.82 C494.376,1046.26 494.376,1043.72 492.813,1042.16 C491.248,1040.59 488.712,1040.59 487.148,1042.16 L481.484,1047.82 L475.82,1042.16 C474.257,1040.59 471.721,1040.59 470.156,1042.16 C468.593,1043.72 468.593,1046.26 470.156,1047.82 L475.82,1053.48 L470.156,1059.15 C468.593,1060.71 468.593,1063.25 470.156,1064.81 C471.721,1066.38 474.257,1066.38 475.82,1064.81 L481.484,1059.15 L487.148,1064.81 C488.712,1066.38 491.248,1066.38 492.813,1064.81 C494.376,1063.25 494.376,1060.71 492.813,1059.15 L487.148,1053.48"
                                            id="cross"
                                        ></path>
                                    </g>
                                </g>
                            </svg>
                            <span className="keeb-shop-offer-button-text">
                                {`Yes I'm Sure `}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="keeb-shop-offer-button-circle w-5"
                                fill="currentColor"
                                viewBox="0 0 32 32"
                            >
                                <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048zM9.76 20.256q0 0.832 0.576 1.408t1.44 0.608 1.408-0.608l2.816-2.816 2.816 2.816q0.576 0.608 1.408 0.608t1.44-0.608 0.576-1.408-0.576-1.408l-2.848-2.848 2.848-2.816q0.576-0.576 0.576-1.408t-0.576-1.408-1.44-0.608-1.408 0.608l-2.816 2.816-2.816-2.816q-0.576-0.608-1.408-0.608t-1.44 0.608-0.576 1.408 0.576 1.408l2.848 2.816-2.848 2.848q-0.576 0.576-0.576 1.408z" />
                            </svg>
                        </button>
                        <button
                            className=" text-md keeb-shop-offer-button mt-5 flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                            onClick={closeModal}
                        >
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
                                {`No `}
                            </span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="keeb-shop-offer-button-circle w-2"
                                viewBox="0 0 32 32"
                            >
                                <circle cx="16" cy="16" r="16" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
