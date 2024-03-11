import { api } from "~/utils/api";
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
        <div className="flex w-full flex-wrap gap-10">
            {favoriteListings &&
                favoriteListings.length > 0 &&
                favoriteListings.map((listing) => (
                    <div key={listing.id} className="mt-10 w-96">
                        <EachFavoriteListingCard listing={listing} />
                    </div>
                ))}
        </div>
    );
}
