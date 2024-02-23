import type { Images } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";
import { useContext, useState } from "react";
import ChevronRound from "~/components/Svgs/chevron";
import { useSession } from "next-auth/react";
import PostPreviewFavorite from "../Favorite";

interface EachPostCardPreviewProps {
    post: EachPost;
}

interface EachPost {
    id: string;
    tag: string;
    title: string;
    link: string | null;
    text: string | null;
    _count: Count;
    images: Images[];
}
interface Count {
    comments: number;
    postLikes: number;
}

export default function EachPostCardPreview({
    post,
}: EachPostCardPreviewProps) {
    // we need to decide if we want posts to all be the same size container or if we don't care. i think a big post will look bad next to a short boi

    // if images... title,  image
    // if no images, but link title, render,
    // if no images, no link but description
    // if no images, no link, no description , just big title

    // going to have to organize images via resource type prob
    // then addd a simple carosal

    const { data: session } = useSession();
    const [imageIndex, setImageIndex] = useState<number>(0);

    const goToNextImage = () => {
        setImageIndex((prevIndex) => (prevIndex + 1) % post.images.length);
    };

    const goToPrevImage = () => {
        setImageIndex(
            (prevIndex) =>
                (prevIndex - 1 + post.images.length) % post.images.length
        );
    };

    return (
        <div className="flex h-[30vh] w-[47%] flex-col overflow-hidden rounded-md border-2 border-green-500 p-2 text-sm">
            {post.images.length > 0 && post.images[0] && (
                <div className="flex h-full w-full ">
                    <div className=" relative h-full w-3/4">
                        <Image
                            alt="preview"
                            src={post.images[imageIndex]?.link || keebo}
                            width={600}
                            height={600}
                            className={`h-full w-full rounded-l-md object-cover`}
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
                        <h1 className="absolute bottom-2 left-2 z-10 rounded-3xl bg-white bg-opacity-20 px-4 py-2 text-green-500">
                            {post.tag}
                        </h1>
                    </div>
                    <div className=" flex w-1/4 flex-col justify-between rounded-r-md bg-black bg-opacity-30 p-2 ">
                        <h1 className=" text-lg text-white">{post.title}</h1>
                        <div>
                            <div className="mb-3 flex justify-center">
                                <Link
                                    href={{
                                        pathname: "/keebshare/[postId]",
                                        query: { postId: post.id },
                                    }}
                                >
                                    <button
                                        className="text-md rounded-md bg-green-500 p-2  "
                                        style={{
                                            boxShadow: "0 0 20px #22C55E",
                                        }}
                                    >{`Let's Go `}</button>
                                </Link>
                            </div>

                            <div className="relative flex justify-between">
                                <h1>{post._count.postLikes}</h1>

                                {session && session.user && (
                                    <div className="w-6">
                                        <PostPreviewFavorite
                                            userId={session.user.id}
                                            postId={post.id}
                                        />
                                    </div>
                                )}
                                {session === null && (
                                    // add sign in modal for fav and likes
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                                            stroke="#616161"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </div>
                            <div className="flex gap-1 text-green-500 ">
                                <svg
                                    className="w-5"
                                    viewBox="0 0 24 24"
                                    fill="rgb(34 197 94)"
                                >
                                    <path d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"></path>
                                </svg>
                                <h1>
                                    {`${post._count.comments} ${
                                        post._count.comments === 1
                                            ? "Comment"
                                            : "Comments"
                                    }`}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {post.images.length === 0 && post.link && (
                <div className="h-full w-full ">
                    <h1 className="p-2 text-lg text-white">{post.title}</h1>
                    <div className=" relative h-full w-full cursor-pointer">
                        link display here same image sizing
                    </div>
                </div>
            )}
            {post.images.length === 0 && !post.link && post.text && (
                <div className="h-full w-full ">
                    <h1 className="p-2 text-lg text-white">{post.title}</h1>
                    <p>{post.text}</p>
                </div>
            )}
            {post.images.length === 0 && !post.link && !post.text && (
                <div className="h-full w-full ">
                    <h1 className="p-2 text-2xl text-white">{post.title}</h1>
                </div>
            )}
        </div>
    );
}
