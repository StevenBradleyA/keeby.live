import type { Images } from "@prisma/client";
import Link from "next/link";
import DisplayYouTubePostPreview from "./DisplayPosts/DisplayPostPreviews/displayYouTubePreview";
import ChevronRound from "~/app/_components/Svgs/chevron";
import Image from "next/image";
import { useState } from "react";
import keebo from "@public/Profile/keebo.png";

interface EachPostCardPreviewProps {
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
    };
}
interface Count {
    comments: number;
    postLikes: number;
}

export default function PostPagePreviewCard({
    post,
}: EachPostCardPreviewProps) {
    const [imageIndex, setImageIndex] = useState<number>(0);

    const goToNextImage = () => {
        setImageIndex((prevIndex) => (prevIndex + 1) % post.images.length);
    };

    const goToPrevImage = () => {
        setImageIndex(
            (prevIndex) =>
                (prevIndex - 1 + post.images.length) % post.images.length,
        );
    };

    return (
        <div className="flex h-[24vh] w-full  flex-col overflow-hidden rounded-md text-xs">
            {post.images.length > 0 && post.images[0] && (
                <div className=" h-full w-full ">
                    <div className=" post-preview-container relative h-full w-full overflow-hidden">
                        <Image
                            alt="preview"
                            src={post.images[imageIndex]?.link || keebo}
                            width={1000}
                            height={1000}
                            className={`h-full w-full rounded-md object-cover`}
                            priority
                        />
                        {post.images.length > 1 && (
                            <>
                                <button
                                    className="absolute right-2 top-1/2 z-10 w-10 -translate-y-1/2 rotate-90 rounded-full p-2 text-green-500 transition duration-100 ease-in-out hover:bg-white hover:bg-opacity-20 "
                                    onClick={goToNextImage}
                                >
                                    <ChevronRound />
                                </button>
                                <button
                                    className="absolute left-2 top-1/2 z-10 w-10 -translate-y-1/2 -rotate-90 rounded-full p-2 text-green-500 transition duration-100 ease-in-out hover:bg-white hover:bg-opacity-20 "
                                    onClick={goToPrevImage}
                                >
                                    <ChevronRound />
                                </button>
                            </>
                        )}
                        <h1 className="  absolute top-0 flex  w-full flex-col break-words bg-white bg-opacity-20 p-2 text-lg text-green-500">
                            {post.title}
                        </h1>
                        <h1 className="absolute bottom-2 left-2 z-10 rounded-3xl bg-white bg-opacity-20 px-4 py-2 text-green-500">
                            {post.tag}
                        </h1>
                        <div className=" post-preview-link absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform ">
                            <Link
                                href={{
                                    pathname: "/keebshare/[postId]",
                                    query: { postId: post.id },
                                }}
                            >
                                <button
                                    className="text-md keeb-share-preview-button flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                                    style={{
                                        boxShadow: "0 0 20px #22C55E",
                                    }}
                                >
                                    <svg
                                        className="keeb-share-preview-button-arrow w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                                        ></path>
                                    </svg>
                                    <span className="keeb-share-preview-button-text">
                                        {`Let's Go `}
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        className="keeb-share-preview-button-circle w-2"
                                        viewBox="0 0 32 32"
                                    >
                                        <circle cx="16" cy="16" r="16" />
                                    </svg>
                                </button>
                            </Link>
                        </div>
                        <div className="absolute bottom-2 right-2 z-10 flex gap-5 rounded-3xl bg-white bg-opacity-20 px-4 py-2 text-green-500">
                            <div className="flex items-center gap-1">
                                <svg
                                    className="w-4"
                                    viewBox="0 0 24 24"
                                    fill="rgb(34 197 94)"
                                >
                                    <path d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"></path>
                                </svg>
                                <h1>{post._count.comments}</h1>
                            </div>
                            <div className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-3"
                                    viewBox="0 0 512 512"
                                    fill="rgb(34 197 94)"
                                >
                                    <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                                </svg>
                                <h1>{post._count.postLikes}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {post.images.length === 0 && post.link && (
                <div className="h-full w-full ">
                    <div className=" post-preview-container relative h-full w-full overflow-hidden">
                        <DisplayYouTubePostPreview link={post.link} />

                        <h1 className=" post-preview-tag  absolute top-0 flex h-1/5 w-full flex-col justify-center break-words bg-darkGray pl-3 text-lg text-green-500">
                            {post.title}
                        </h1>
                        <h1 className=" post-preview-tag absolute bottom-2 left-2 z-10 rounded-3xl bg-white bg-opacity-20 px-4 py-2 text-green-500">
                            {post.tag}
                        </h1>
                        <div className=" post-preview-link absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform ">
                            <Link
                                href={{
                                    pathname: "/keebshare/[postId]",
                                    query: { postId: post.id },
                                }}
                            >
                                <button
                                    className="text-md keeb-share-preview-button flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                                    style={{
                                        boxShadow: "0 0 20px #22C55E",
                                    }}
                                >
                                    <svg
                                        className="keeb-share-preview-button-arrow w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                                        ></path>
                                    </svg>
                                    <span className="keeb-share-preview-button-text">
                                        {`Let's Go `}
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        className="keeb-share-preview-button-circle w-2"
                                        viewBox="0 0 32 32"
                                    >
                                        <circle cx="16" cy="16" r="16" />
                                    </svg>
                                </button>
                            </Link>
                        </div>
                        <div className="post-preview-tag absolute bottom-2 right-2 z-10 flex gap-5 rounded-3xl bg-white bg-opacity-20 px-4 py-2 text-green-500">
                            <div className="flex items-center gap-1">
                                <svg
                                    className="w-4"
                                    viewBox="0 0 24 24"
                                    fill="rgb(34 197 94)"
                                >
                                    <path d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"></path>
                                </svg>
                                <h1>{post._count.comments}</h1>
                            </div>
                            <div className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-3"
                                    viewBox="0 0 512 512"
                                    fill="rgb(34 197 94)"
                                >
                                    <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                                </svg>
                                <h1>{post._count.postLikes}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {post.images.length === 0 && !post.link && post.text && (
                <div className="flex h-full w-full flex-col  ">
                    <h1 className="h-1/5 w-full flex-col justify-center break-words bg-white bg-opacity-20 pl-3 text-lg text-green-500">
                        {post.title}
                    </h1>

                    <div className="post-preview-container relative h-4/5 w-full overflow-hidden bg-black bg-opacity-20 text-white">
                        <p className="break-words p-5 text-lg ">{post.text}</p>

                        <h1 className=" absolute bottom-2 left-2 z-10 rounded-3xl bg-white bg-opacity-20 px-4 py-2 text-green-500">
                            {post.tag}
                        </h1>

                        <div className=" post-preview-link absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform ">
                            <Link
                                href={{
                                    pathname: "/keebshare/[postId]",
                                    query: { postId: post.id },
                                }}
                            >
                                <button
                                    className="text-md keeb-share-preview-button flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                                    style={{
                                        boxShadow: "0 0 20px #22C55E",
                                    }}
                                >
                                    <svg
                                        className="keeb-share-preview-button-arrow w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                                        ></path>
                                    </svg>
                                    <span className="keeb-share-preview-button-text">
                                        {`Let's Go `}
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        className="keeb-share-preview-button-circle w-2"
                                        viewBox="0 0 32 32"
                                    >
                                        <circle cx="16" cy="16" r="16" />
                                    </svg>
                                </button>
                            </Link>
                        </div>
                        <div className="absolute bottom-2 right-2 z-10 flex gap-5 rounded-3xl bg-white bg-opacity-20 px-4 py-2 text-green-500">
                            <div className="flex items-center gap-1">
                                <svg
                                    className="w-4"
                                    viewBox="0 0 24 24"
                                    fill="rgb(34 197 94)"
                                >
                                    <path d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"></path>
                                </svg>
                                <h1>{post._count.comments}</h1>
                            </div>
                            <div className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-3"
                                    viewBox="0 0 512 512"
                                    fill="rgb(34 197 94)"
                                >
                                    <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                                </svg>
                                <h1>{post._count.postLikes}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {post.images.length === 0 && !post.link && !post.text && (
                <div className="post-preview-container relative flex h-full w-full flex-col  ">
                    <div className=" post-preview-link absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform ">
                        <Link
                            href={{
                                pathname: "/keebshare/[postId]",
                                query: { postId: post.id },
                            }}
                        >
                            <button
                                className="text-md keeb-share-preview-button flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                                style={{
                                    boxShadow: "0 0 20px #22C55E",
                                }}
                            >
                                <svg
                                    className="keeb-share-preview-button-arrow w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                        d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                                    ></path>
                                </svg>
                                <span className="keeb-share-preview-button-text">
                                    {`Let's Go `}
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="keeb-share-preview-button-circle w-2"
                                    viewBox="0 0 32 32"
                                >
                                    <circle cx="16" cy="16" r="16" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                    <h1 className="flex h-1/2 items-center justify-center break-words bg-white bg-opacity-20 pl-3 text-center text-lg text-green-500">
                        {post.title}
                    </h1>

                    <div className="post-preview-container relative h-1/2 w-full overflow-hidden bg-black bg-opacity-20 text-white">
                        <h1 className=" absolute bottom-2 left-2 z-10 rounded-3xl bg-white bg-opacity-20 px-4 py-2 text-green-500">
                            {post.tag}
                        </h1>

                        <div className="absolute bottom-2 right-2 z-10 flex gap-5 rounded-3xl bg-white bg-opacity-20 px-4 py-2 text-green-500">
                            <div className="flex items-center gap-1">
                                <svg
                                    className="w-4"
                                    viewBox="0 0 24 24"
                                    fill="rgb(34 197 94)"
                                >
                                    <path d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"></path>
                                </svg>
                                <h1>{post._count.comments}</h1>
                            </div>
                            <div className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-3"
                                    viewBox="0 0 512 512"
                                    fill="rgb(34 197 94)"
                                >
                                    <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                                </svg>
                                <h1>{post._count.postLikes}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
