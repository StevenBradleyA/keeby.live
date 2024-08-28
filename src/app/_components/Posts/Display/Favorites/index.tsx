"use client";
import { api } from "~/trpc/react";
import EachPostPreview from "../Previews/eachPostPreview";
import { useSession } from "next-auth/react";
import LoadingSpinner from "~/app/_components/Loading";

interface DisplayFavoritePostProps {
    userId: string;
}

export default function DisplayFavoritePosts({
    userId,
}: DisplayFavoritePostProps) {
    // server interactions
    const { data: favoritePosts, isLoading } =
        api.post.getAllFavoritePreviewPosts.useQuery({
            userId,
        });

    const { data: session } = useSession();

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
            <h1>
                Favorites ( {favoritePosts ? favoritePosts.posts.length : 0} )
            </h1>
            <div className="mt-5 flex w-full flex-wrap gap-10 ">
                {favoritePosts &&
                    favoritePosts.posts.length > 0 &&
                    favoritePosts.posts.map((post) => (
                        <div key={post.id}>
                            <EachPostPreview post={post} session={session} />
                        </div>
                    ))}
            </div>
        </div>
    );
}
