"use client";
import { api } from "~/trpc/react";
import EachOfferCard from "./eachOfferCard";
import EachOfferViewCard from "./eachOfferViewCard";
import LoadingSpinner from "../../Loading";

export default function DisplayOffers({ userId }: { userId: string }) {
    const { data: allOffers, isLoading } =
        api.offer.getAllByUserId.useQuery(userId);

    if (isLoading)
        return (
            <div className="mt-10 ml-10">
                <LoadingSpinner size="20px" />
            </div>
        );

    return (
        <div className="mt-5 w-full font-poppins">
            <h2 className="mb-2">
                Offers Received ({" "}
                {allOffers ? allOffers.offersReceived.length : 0} )
            </h2>
            <div className="flex gap-10">
                {allOffers?.offersReceived.map((listing) => (
                    <div key={listing.id}>
                        <EachOfferCard listing={listing} />
                    </div>
                ))}
            </div>
            <h2 className="mb-2 mt-5">
                Offers Sent ( {allOffers ? allOffers.offersSent.length : 0} )
            </h2>
            <div className="flex gap-10">
                {allOffers?.offersSent.map((offer) => (
                    <div key={offer.id}>
                        <EachOfferViewCard offer={offer} />
                    </div>
                ))}
            </div>
        </div>
    );
}
