"use client";
import type { Session } from "next-auth";
import type { Images } from "@prisma/client";
import { signIn } from "next-auth/react";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";

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

export default function EachPostLike({ post, session }: EachPostProps) {
    // We are using optimistic UI updates here as a balance to keep SEO optimization for posts

    const [isFakeLiked, setIsFakeLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(0);

    const utils = api.useUtils();

    const { mutate: like } = api.like.createPostLike.useMutation({
        onSuccess: () => {
            void utils.post.getAllPreviewPosts.invalidate();
            void utils.post.getOneById.invalidate();
        },
    });

    const { mutate: deleteLike } = api.like.deletePostLike.useMutation({
        onSuccess: () => {
            void utils.post.getAllPreviewPosts.invalidate();
            void utils.post.getOneById.invalidate();
        },
    });

    const handleDeleteLike = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (post.id && session && session.user.id && post.user.id) {
            // Optimistic UI update
            setIsFakeLiked(false);
            setLikeCount((count) => count - 1);

            const data = {
                postId: post.id,
                userId: session.user.id,
                ownerId: post.user.id,
            };

            return deleteLike(data);
        }
    };

    const handleLikePost = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (session && session.user.id && post.id && post.user.id) {
            // Optimistic UI update
            setIsFakeLiked(true);
            setLikeCount((count) => count + 1);

            const data = {
                userId: session.user.id,
                postId: post.id,
                ownerId: post.user.id,
            };

            return like(data);
        }
    };

    useEffect(() => {
        setIsFakeLiked(post.isLiked ?? false);
        setLikeCount(post._count.postLikes ?? 0);
    }, []);

    return (
        <>
            {session === null && (
                <div className="flex gap-1 items-center ">
                    <button onClick={() => void signIn()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 ease-in hover:text-mediumGray text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <span>{post._count.postLikes}</span>
                </div>
            )}
            {session && session.user && isFakeLiked === true && (
                <div className="flex gap-1 items-center">
                    <button onClick={handleDeleteLike}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 ease-in hover:text-mediumGray text-green-500 "
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <span>{likeCount}</span>
                </div>
            )}
            {session && session.user && isFakeLiked === false && (
                <div className="flex gap-1 items-center">
                    <button onClick={handleLikePost}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 ease-in hover:text-mediumGray text-white "
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <span>{likeCount}</span>
                </div>
            )}
        </>
    );
}
