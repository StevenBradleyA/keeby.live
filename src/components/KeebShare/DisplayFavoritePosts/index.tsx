import { api } from "~/utils/api";
import EachFavoritePostCard from "./eachFavoritePost";

interface DisplayFavoritePostProps {
    userId: string;
}

export default function DisplayFavoritePosts({
    userId,
}: DisplayFavoritePostProps) {
    const { data: favoritePosts } = api.favorite.getAllFavoritePosts.useQuery({
        userId,
    });

    return (
        <div className="flex w-full flex-wrap gap-10">
            {favoritePosts &&
                favoritePosts.length > 0 &&
                favoritePosts.map((post) => (
                    <div key={post.id} className="mt-10 w-96">
                        <EachFavoritePostCard post={post} />
                    </div>
                ))}
        </div>
    );
}
