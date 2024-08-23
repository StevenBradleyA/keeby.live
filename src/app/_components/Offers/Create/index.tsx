"use client";
import type { Images, Listing } from "@prisma/client";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import Link from "next/link";
import toast from "react-hot-toast";
import keebo from "@public/Profile/keebo.png";
import LoadingSpinner from "~/app/_components/Loading";
import type { Session } from "next-auth";
import Image from "next/image";

interface CreateOfferProps {
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

interface ErrorsObj {
    price?: string;
    priceExcess?: string;
    priceSmall?: string;
    existingOffer?: string;
    listingOwner?: string;
}

export default function CreateOffer({
    closeModal,
    listing,
    session,
}: CreateOfferProps) {
    const utils = api.useUtils();

    // state
    const [price, setPrice] = useState<number>(0);
    const [offerAlreadyExists, setOfferAlreadyExists] =
        useState<boolean>(false);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);
    const [page, setPage] = useState<number>(0);

    // server
    const { mutate } = api.offer.create.useMutation({
        onSuccess: (data) => {
            if (data?.pendingOffer === false) {
                toast.success("Offer Submitted, Good Luck!", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
                closeModal();
            }
            if (data?.pendingOffer === true) {
                toast.error("Offer Denied", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
                setOfferAlreadyExists(true);
            }
            void utils.offer.getAllByUserId.invalidate();
        },
    });

    // helpers
    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        setEnableErrorDisplay(true);

        if (!Object.values(errors).length && !isSubmitting && session) {
            const roundedPrice = Math.round(price);

            try {
                const data = {
                    price: roundedPrice,
                    listingId: listing.id,
                    buyerId: session.user.id,
                    buyerUsername: session.user.username,
                    sellerId: listing.sellerId,
                };

                setIsSubmitting(true);
                mutate(data);
                setHasSubmitted(true);
                setIsSubmitting(false);
            } catch (error) {
                console.error("Submission failed:", error);
                setIsSubmitting(false);
            }
        }
    };

    // monitoring
    useEffect(() => {
        const errorsObj: ErrorsObj = {};

        if (price === 0) {
            errorsObj.price = "Please enter a price to make an offer.";
        }
        if (price <= listing.price * 0.3 && price > 0) {
            errorsObj.priceSmall =
                "Please make a more competitive offer. It should exceed 30% of the listing price.";
        }
        if (price > listing.price) {
            errorsObj.priceExcess = "Please provide a price below the asking.";
        }

        if (listing.sellerId === session?.user.id) {
            errorsObj.listingOwner =
                "Offers cannot be made on your own listings.";
        }

        if (offerAlreadyExists === true) {
            errorsObj.existingOffer =
                "Your previous offer is still under review by the seller. ";
        }

        setErrors(errorsObj);
    }, [price, offerAlreadyExists, listing.price]);

    return (
        <div className="flex flex-col items-center text-white w-[800px]">
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
                                <h1>Make an Offer</h1>
                                <Image
                                    alt="keebo mascot"
                                    src={keebo}
                                    className="w-8 h-8 object-contain"
                                />
                            </div>
                            <p className="mt-2">
                                Keeby does not handle transactions. If the
                                seller accepts your offer, you will be put in a
                                private message with the seller. All purchases
                                and shipping are directly between buyer and
                                seller. Keeby recommends only using paypal for
                                transactions because they have a strong dispute
                                resolution. Please read{" "}
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
                        before buying
                    </div>
                </>
            )}
            {page === 1 && (
                <>
                    <p className="mt-10 flex justify-center text-5xl text-green-500">
                        ${price}
                    </p>

                    <div className="relative mt-10 w-1/3">
                        <input
                            type="number"
                            list="defaultNumbers"
                            className=" w-full rounded-md bg-dark px-5 py-3 text-green-500"
                            placeholder="$ Price"
                            value={price}
                            onChange={(e) => setPrice(+e.target.value)}
                            min="0"
                            max={listing.price}
                            step="10"
                        />
                        <div className="absolute left-2 top-3 text-green-500">
                            $
                        </div>
                    </div>
                    <datalist id="defaultNumbers">
                        <option value={Math.round(listing.price * 0.9)}>
                            ${Math.round(listing.price * 0.9)}
                        </option>
                        <option value={Math.round(listing.price * 0.8)}>
                            ${Math.round(listing.price * 0.8)}
                        </option>
                        <option value={Math.round(listing.price * 0.7)}>
                            ${Math.round(listing.price * 0.7)}
                        </option>
                    </datalist>
                    {enableErrorDisplay && errors.price && (
                        <p className="mt-1 text-xs text-red-400">
                            {errors.price}
                        </p>
                    )}
                    {enableErrorDisplay && errors.existingOffer && (
                        <p className="mt-1 text-xs text-red-400">
                            {errors.existingOffer}
                        </p>
                    )}
                    {enableErrorDisplay && errors.priceExcess && (
                        <p className="mt-1 text-xs text-red-400">
                            {errors.priceExcess}
                        </p>
                    )}
                    {enableErrorDisplay && errors.listingOwner && (
                        <p className="mt-1 text-xs text-red-400">
                            {errors.listingOwner}
                        </p>
                    )}
                    {enableErrorDisplay && errors.priceSmall && (
                        <p className="mt-1 text-xs text-red-400">
                            {errors.priceSmall}
                        </p>
                    )}
                    <button
                        className=" text-md keeb-shop-offer-button mt-5 flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                        style={{
                            boxShadow: "0 0 20px #22C55E",
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            void submit(e);
                        }}
                        disabled={hasSubmitted || isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-1">
                                Uploading
                                <div className="w-6">
                                    <LoadingSpinner size="16px" />
                                </div>
                            </div>
                        ) : (
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
                                    {`Send Offer `}
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
                        )}
                    </button>
                </>
            )}
        </div>
    );
}
