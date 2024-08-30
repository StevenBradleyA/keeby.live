"use client";
import type { Images } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import DisplayYouTubePostPreview from "./Previews/displayYouTubePreview";
import ModalDialogueNoStyling from "../../Context/Modal/noStylingModal";

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

export default function PostPageImageDisplay({ post }: EachPostProps) {
    const [imageIndex, setImageIndex] = useState<number>(0);

    const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

    const closeModal = () => {
        setIsImageModalOpen(false);
    };

    return (
        <>
            {post.images.length > 0 &&
            post.images[0] &&
            post.images[imageIndex] ? (
                <>
                    <div className=" relative h-full w-full  overflow-hidden rounded-lg text-white ">
                        <div onClick={() => setIsImageModalOpen(true)}>
                            <Image
                                alt="preview"
                                src={post.images[imageIndex].link}
                                width={1000}
                                height={1000}
                                className="h-full w-full object-contain scale-125"
                                priority
                            />
                        </div>
                        {post.images.length > 1 && (
                            <>
                                <button
                                    className={`absolute right-2 top-1/2 z-10  -translate-y-1/2 rotate-90 rounded-full p-2  ${imageIndex === post.images.length - 1 ? "ease-in hover:text-keebyPurple" : "ease-in hover:text-green-500"} hover:opacity-80 bg-darkGray/80`}
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
                                    className={`absolute left-2 top-1/2 z-10  -translate-y-1/2 -rotate-90 rounded-full p-2  ${imageIndex === 0 ? "ease-in hover:text-keebyPurple" : "ease-in hover:text-green-500"} hover:opacity-80 bg-darkGray/80`}
                                    onClick={() => {
                                        if (imageIndex === 0) {
                                            setImageIndex(
                                                post.images.length - 1,
                                            );
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

                    <ModalDialogueNoStyling
                        isOpen={isImageModalOpen}
                        onClose={closeModal}
                    >
                        <div className=" w-[95vh] h-[90wh] laptop:w-[85vw] laptop:h-[80vh] flex items-center justify-center relative rounded-2xl overflow-hidden rotate-90 laptop:rotate-0 text-white">
                            <Image
                                src={post.images[imageIndex].link}
                                alt="listing preview"
                                width={1000}
                                height={1000}
                                className="h-full w-full object-cover"
                                priority
                                onClick={() => {
                                    setIsImageModalOpen(true);
                                }}
                            />

                            <button
                                className={`absolute left-3 top-1/2 -translate-y-1/2 bg-darkGray/80 rounded-full p-3 hover:opacity-80 ${imageIndex === 0 ? "ease-in hover:text-keebyPurple" : "ease-in hover:text-green-500"}`}
                                onClick={() => {
                                    if (imageIndex >= 1) {
                                        setImageIndex(
                                            (prev) =>
                                                (prev - 1) %
                                                (post.images.length - 1),
                                        );
                                    }
                                    if (imageIndex === 0) {
                                        setImageIndex(post.images.length - 1);
                                    }
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    className="w-5 h-5 -rotate-90"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
                                    />
                                </svg>
                            </button>

                            <button
                                className={`absolute right-3 top-1/2 -translate-y-1/2 bg-darkGray/80 rounded-full p-3 hover:opacity-80 ${imageIndex === post.images.length - 1 ? "ease-in hover:text-keebyPurple" : "hover:text-green-500 ease-in"}`}
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
                                    className="w-5 h-5 rotate-90"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
                                    />
                                </svg>
                            </button>
                            <button
                                className="absolute top-3 right-3 bg-darkGray/80 p-1 rounded-full hover:rotate-90 hover:opacity-80 hover:scale-105 duration-300 ease-custom-cubic "
                                onClick={closeModal}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M16 8L8 16M8.00001 8L16 16"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            <div className="absolute left-1/2 -translate-x-1/2 bottom-3 px-4 py-2 bg-darkGray/80 rounded-3xl flex items-center gap-2">
                                {post.images.map((image, i) => (
                                    <button
                                        key={i}
                                        className={`hover:opacity-70 ease-in ${i === imageIndex ? "" : "opacity-50"}`}
                                        onClick={() => setImageIndex(i)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-3 h-3"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </ModalDialogueNoStyling>
                </>
            ) : post.link ? (
                <DisplayYouTubePostPreview link={post.link} />
            ) : null}
        </>
    );
}
