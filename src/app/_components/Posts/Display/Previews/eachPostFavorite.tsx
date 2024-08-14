"use client";
import type { Session } from "next-auth";
import type { Images } from "@prisma/client";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

interface EachPostProps {
    post: EachPost;
    session: Session | null;
}

interface EachPost {
    id: string;
    tag: string;
    title: string;
    link: string | null;
    text: string | null;
    isLiked?: boolean;
    likeId?: string;
    isFavorited?: boolean;
    favoriteId?: string;
    _count: Count;
    images: Images[];
    user: {
        id: string;
        profile: string | null;
        username: string | null;
    };
}
interface Count {
    comments: number;
    postLikes: number;
    favorites: number;
}

export default function EachPostFavorite({
    post,
    session,
}: EachPostProps) {
    // We are using optimistic UI updates here as a balance to keep SEO optimization for posts

    const [isFakeFavorited, setIsFakeFavorited] = useState<boolean>(false);
    const [favoriteCount, setFavoriteCount] = useState<number>(0);

    const utils = api.useUtils();

    const { mutate: favorite } = api.favorite.createPostFavorite.useMutation({
        onSuccess: () => {
            void utils.post.getAllPreviewPosts.invalidate();
            void utils.post.getOneById.invalidate();
        },
    });

    const { mutate: unfavorite } = api.favorite.deletePostFavorite.useMutation({
        onSuccess: () => {
            void utils.post.getAllPreviewPosts.invalidate();
            void utils.post.getOneById.invalidate();
        },
    });

    const handleUnfavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (session && session.user.id && post.id) {
            // Optimistic UI update
            setIsFakeFavorited(false);
            setFavoriteCount((count) => count - 1);

            const data = {
                userId: session.user.id,
                postId: post.id,
            };

            return unfavorite(data);
        }
    };

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (session && session.user.id && post.id) {
            // Optimistic UI update
            setIsFakeFavorited(true);
            setFavoriteCount((count) => count + 1);

            const data = {
                userId: session.user.id,
                postId: post.id,
            };

            return favorite(data);
        }
    };

    useEffect(() => {
        setIsFakeFavorited(post.isFavorited ?? false);
        setFavoriteCount(post._count.favorites ?? 0);
    }, [post.isFavorited, post._count.favorites]);

    return (
        <>
            {session === null && (
                <div className="flex gap-1 items-center">
                    <button onClick={() => void signIn()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 ease-in hover:text-mediumGray text-white "
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    {post._count.favorites}
                </div>
            )}
            {session && session.user && isFakeFavorited === false && (
                <div className="flex gap-1 items-center">
                    <button onClick={handleFavoriteClick}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 ease-in hover:text-mediumGray text-white "
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    {favoriteCount}
                </div>
            )}

            {session && session.user && isFakeFavorited === true && (
                <div className="flex gap-1 items-center">
                    <button onClick={handleUnfavoriteClick}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 ease-in hover:text-mediumGray text-green-500"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    {favoriteCount}
                </div>
            )}
            {session === null && <button></button>}
        </>
    );
}
