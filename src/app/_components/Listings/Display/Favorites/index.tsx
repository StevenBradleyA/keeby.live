"use client";
import { api } from "~/trpc/react";
import EachFavoriteListingCard from "./eachFavoriteListing";
import LoadingSpinner from "~/app/_components/Loading";

interface DisplayFavoriteListings {
    userId: string;
}

export default function DisplayFavoriteListings({
    userId,
}: DisplayFavoriteListings) {
    // server
    const { data: favoriteListings, isLoading } =
        api.listing.getAllFavoritesByUserId.useQuery({
            userId,
        });

    // condition checks
    if (isLoading) {
        return (
            <div className="mt-10 ml-10 text-green-500">
                <LoadingSpinner size="20px" />
            </div>
        );
    }

    return (
        <div className="mt-5 w-full font-poppins">
            <h2>
                Favorites ( {favoriteListings ? favoriteListings.length : 0} )
            </h2>
            <div className="flex w-full flex-wrap gap-10 ">
                {favoriteListings &&
                    favoriteListings.length > 0 &&
                    favoriteListings.map((listing) => (
                        <div key={listing.id} className="mt-5 w-96">
                            <EachFavoriteListingCard listing={listing} />
                        </div>
                    ))}
            </div>
        </div>
    );
}
