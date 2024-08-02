import type { Images, Listing } from "@prisma/client";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { debounce } from "lodash";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import LoadingSpinner from "~/app/_components/Loading";

interface CreateOfferProps {
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
    listingOwner?: string;
}

export default function CreateOffer({ closeModal, listing }: CreateOfferProps) {
    // todo CHANGE LISTINGS WHERE YOU CAN ONLY SEE LISTINGS THAT ARE "ACTIVE"
    // todo change buttons to only show up when listing is active other wise put sale pending or sold.

    // todo counter offers?????? or nah... ????? im not a big fan of that they can just change the price.

    // todo CANNOT SEND OFFERS TO YOURSELF OBV

    // todo make sure that the seller knows before accepting an offer they have 10 days to ship out the keeb and supply the tracking number otherwise. The buyer won't be charged.
    // make it clear they have to supply a tracking number to get payed.

    const { data: sessionData } = useSession();

    const [price, setPrice] = useState<number>(0);
    const [offerAlreadyExists, setOfferAlreadyExists] =
        useState<boolean>(false);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);

    const utils = api.useUtils();

    // create
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

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        setEnableErrorDisplay(true);

        if (!Object.values(errors).length && !isSubmitting && sessionData) {
            try {
                const data = {
                    price: Math.round(price * 100),
                    listingId: listing.id,
                    buyerId: sessionData.user.id,
                    buyerUsername: sessionData.user.username,
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

    // auto rounding
    const roundToTwo = (num: number): number => {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    };

    const debouncePriceUpdate = debounce((newPrice: number) => {
        if (parseFloat(newPrice.toFixed(2)) !== newPrice) {
            setPrice(roundToTwo(newPrice));
        }
    }, 500);

    useEffect(() => {
        const priceParts = price.toString().split(".");
        if (
            priceParts.length > 1 &&
            priceParts[1] &&
            priceParts[1].length > 2
        ) {
            debouncePriceUpdate(price);
        }
    }, [price, debouncePriceUpdate]);

    // errors
    useEffect(() => {
        const errorsObj: ErrorsObj = {};

        if (price === 0) {
            errorsObj.price = "Please enter a price to make an offer.";
        }
        if (price <= (listing.price / 100) * 0.5 && price > 0) {
            errorsObj.priceSmall =
                "Please make a more competitive offer. It should exceed 50% of the listing price.";
        }
        if (price > listing.price / 100) {
            errorsObj.priceExcess = "Please provide a price below the asking.";
        }
        if (listing.sellerId === sessionData?.user.id) {
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
        <div className="flex flex-col items-center text-white">
            <h1 className="flex justify-center text-xl">Make an Offer</h1>

            <p className="mt-10 flex justify-center text-5xl text-green-500">
                ${price}
            </p>

            <div className="relative mt-10 w-1/3">
                <input
                    type="number"
                    list="defaultNumbers"
                    className=" w-full rounded-md bg-dark px-5 py-3 text-green-500"
                    placeholder="$ Price"
                    value={price.toString()}
                    onChange={(e) => setPrice(+e.target.value)}
                    min="0"
                    max={listing.price}
                    step="0.01"
                />
                <p className="absolute left-2 top-3 text-green-500">$</p>
            </div>
            <datalist id="defaultNumbers">
                <option value={((listing.price / 100) * 0.9).toFixed(0)}>
                    ${((listing.price / 100) * 0.9).toFixed(2)}
                </option>
                <option value={((listing.price / 100) * 0.8).toFixed(0)}>
                    ${((listing.price / 100) * 0.8).toFixed(2)}
                </option>
                <option value={((listing.price / 100) * 0.7).toFixed(0)}>
                    ${((listing.price / 100) * 0.7).toFixed(2)}
                </option>
            </datalist>
            {enableErrorDisplay && errors.price && (
                <p className="mt-1 text-sm text-red-400">{errors.price}</p>
            )}
            {enableErrorDisplay && errors.existingOffer && (
                <p className="mt-1 text-sm text-red-400">
                    {errors.existingOffer}
                </p>
            )}
            {enableErrorDisplay && errors.priceExcess && (
                <p className="mt-1 text-sm text-red-400">
                    {errors.priceExcess}
                </p>
            )}
            {enableErrorDisplay && errors.listingOwner && (
                <p className="mt-1 text-sm text-red-400">
                    {errors.listingOwner}
                </p>
            )}
            {enableErrorDisplay && errors.priceSmall && (
                <p className="mt-1 text-sm text-red-400">{errors.priceSmall}</p>
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

            <div className=" mt-5 text-mediumGray">
                * All Offers are final. Please read{" "}
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
    );
}
