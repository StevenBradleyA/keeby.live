import { api } from "~/trpc/react";
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
        <div className="mt-5 w-full font-poppins">
            <h1>Favorites ( {favoritePosts ? favoritePosts.length : 0} )</h1>
            <div className="mt-5 flex w-full flex-wrap gap-10 ">
                {favoritePosts &&
                    favoritePosts.length > 0 &&
                    favoritePosts.map((post) => (
                        <div key={post.id} className=" w-96">
                            <EachFavoritePostCard post={post} />
                        </div>
                    ))}
            </div>
        </div>
    );
}
