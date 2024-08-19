import { api } from "~/trpc/react";
import EachFavoriteListingCard from "./eachFavoriteListing";

interface DisplayFavoriteListings {
    userId: string;
}

export default function DisplayFavoriteListings({
    userId,
}: DisplayFavoriteListings) {
    const { data: favoriteListings } =
        api.favorite.getAllFavoriteListings.useQuery({
            userId,
        });

    return (
        <div className="mt-5 w-full font-poppins">
            <h1>
                Favorites ( {favoriteListings ? favoriteListings.length : 0} )
            </h1>
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
