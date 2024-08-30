"use client";
import type { Images } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import LoadingSpinner from "../../Loading";
import dynamic from "next/dynamic";

const DisplayYouTubePostPreview = dynamic(
    () => import("./Previews/displayYouTubePreview"),
    {
        loading: () => (
            <div className="mt-60 flex w-full justify-center text-green-500">
                <LoadingSpinner size="20px" />
            </div>
        ),
        ssr: false,
    },
);

interface EachPostProps {
    post: EachPost;
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

export default function EachPostImage({ post }: EachPostProps) {
    const [imageIndex, setImageIndex] = useState<number>(0);
    return (
        <>
            {post.images.length > 0 &&
            post.images[0] &&
            post.images[imageIndex] ? (
                <div className=" relative h-full w-full  overflow-hidden rounded-lg ">
                    <Image
                        alt="preview"
                        src={post.images[imageIndex].link}
                        width={1000}
                        height={1000}
                        className="h-full w-full object-contain scale-125"
                        priority
                    />
                    {post.images.length > 1 && (
                        <>
                            <button
                                className="absolute right-2 top-1/2 z-10  -translate-y-1/2 rotate-90 rounded-full p-2 text-green-500 transition ease-in hover:opacity-70 bg-darkGray/80"
                                onClick={() => {
                                    setImageIndex(
                                        (prev) =>
                                            (prev + 1) % post.images.length,
                                    );
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    className="w-4 h-4"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
                                    />
                                </svg>
                            </button>
                            <button
                                className="absolute left-2 top-1/2 z-10  -translate-y-1/2 -rotate-90 rounded-full p-2 text-green-500 transition ease-in hover:opacity-70 bg-darkGray/80"
                                onClick={() => {
                                    if (imageIndex === 0) {
                                        setImageIndex(post.images.length - 1);
                                    } else {
                                        setImageIndex((prev) => prev - 1);
                                    }
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    className="w-4 h-4"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
                                    />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            ) : post.link ? (
                <DisplayYouTubePostPreview link={post.link} />
            ) : null}
        </>
    );
}
