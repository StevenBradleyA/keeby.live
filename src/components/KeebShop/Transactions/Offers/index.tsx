import type { Images, Listing } from "@prisma/client";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { debounce } from "lodash";
import Link from "next/link";

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

export default function CreateOffer({ closeModal, listing }: CreateOfferProps) {
    // going to need paypal integration
    // going to need resend email to seller when an offer is submitted
    // finally we need to create an actual offer
    // todo a user should only get one offer till the seller says yes or no...
    // so when creating an offer we need to check if there is an existing one already to the seller from the sender
    // going to show up on both sender and receiver profile
    // going to have to setup notifications as well old boi
    //  we will do paypal integration last
    // todo make sure that the seller knows before accepting an offer they have 10 days to ship out the keeb and supply the tracking number otherwise. The buyer won't be charged.
    // make it clear they have to supply a tracking number to get payed.

    const [price, setPrice] = useState<number>(0);

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

    return (
        <div className="flex flex-col items-center text-white">
            <h1 className="flex justify-center text-xl">Make an Offer</h1>
            <div className="flex w-full justify-between">
                <h2 className="text-darkGray">{listing.title}</h2>
                <h2 className="text-purple">${listing.price / 100}</h2>
            </div>
            <p className="mt-10 flex justify-center text-5xl text-green-500">
                ${price}
            </p>

            <div className="relative mt-10 w-1/3">
                <input
                    type="number"
                    list="defaultNumbers"
                    className="mb-10 w-full rounded-md bg-dark px-5 py-3 text-green-500"
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
            <button
                className="text-md keeb-shop-offer-button flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                style={{
                    boxShadow: "0 0 20px #22C55E",
                }}
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
            </button>

            <div className="mt-10 text-darkGray">
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
