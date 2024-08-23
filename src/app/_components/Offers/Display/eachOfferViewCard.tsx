"use client";
import type { ListingOffer } from "@prisma/client";
import { formatDistance } from "date-fns";
import TitleScripts from "~/app/_components/TitleScripts";

interface EachOfferViewCardProps {
    offer: ListingOffer & {
        listing: Listing;
    };
}

interface Listing {
    id: string;
    title: string;
    status: string;
    sellerId: string;
    seller: {
        username: string | null;
    };
}

export default function EachOfferViewCard({ offer }: EachOfferViewCardProps) {
    const now = new Date();

    return (
        <>
            <div className="flex w-96 flex-col justify-between overflow-hidden rounded-2xl bg-darkGray p-3 font-poppins text-mediumGray tablet:h-[30vh] desktop:h-[25vh] ">
                <div className="flex justify-between ">
                    <h1 className="bg-mediumGray px-4 py-2 text-green-500 rounded-xl text-sm ">
                        {offer.listing.title}
                    </h1>
                    <p className="text-sm py-2 px-4 text-mediumGray ">
                        {offer.status}
                    </p>
                </div>
                <div className="flex w-full flex-col items-center justify-center">
                    <p className=" flex justify-center text-4xl text-green-500 ">
                        ${offer.price}
                    </p>
                    {offer.status === "PENDING" && (
                        <div>
                            <div className=" flex justify-center text-purple ">
                                <TitleScripts page={"offerBuyer"} />
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-5 self-start bg-mediumGray px-4 py-2 rounded-xl text-green-500 text-sm">
                    <p>
                        {formatDistance(new Date(offer.createdAt), now, {
                            addSuffix: true,
                        })}
                    </p>
                    <p className="flex items-center gap-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="w-4 h-4"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8Z"
                                fill="currentColor"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.43094 16.9025C7.05587 16.2213 9.2233 16 12 16C14.771 16 16.9351 16.2204 18.5586 16.8981C20.3012 17.6255 21.3708 18.8613 21.941 20.6587C22.1528 21.3267 21.6518 22 20.9592 22H3.03459C2.34482 22 1.84679 21.3297 2.0569 20.6654C2.62537 18.8681 3.69119 17.6318 5.43094 16.9025Z"
                                fill="currentColor"
                            />
                        </svg>
                        {offer.listing.seller.username}
                    </p>
                </div>
            </div>
        </>
    );
}
