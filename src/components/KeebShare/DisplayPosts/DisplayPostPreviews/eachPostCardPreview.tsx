import type { Images } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";
import { useContext, useState } from "react";
import ChevronRound from "~/components/Svgs/chevron";
import { useSession } from "next-auth/react";
import PostPreviewDeleteFavorite from "./Favorite/deleteFavorite";
import PostPreviewCreateFavorite from "./Favorite/createFavorite";
import PostPreviewDeleteLike from "./Like/deleteLike";
import PostPreviewCreateLike from "./Like/createLike";
import ModalDialog from "~/components/Modal";
import SignInModal from "~/components/Comments/Modal/signInModal";
import DisplayYouTubePostPreview from "./displayYouTubePreview";

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

    const { data: session } = useSession();
    const [imageIndex, setImageIndex] = useState<number>(0);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);

    const openSignInModal = () => {
        setIsSignInModalOpen(true);
    };

    const closeSignInModal = () => {
        setIsSignInModalOpen(false);
    };

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
        <div className="flex h-[35vh] flex-col  rounded-md border-2 border-[#2f2f2f] text-sm tablet:w-full largeLaptop:w-3/4   desktop:w-2/3">
            {post.images.length > 0 && post.images[0] && (
               
                <div className="flex h-full w-full ">
                    <div className=" relative h-full w-3/4">
                        <Image
                            alt="preview"
                            src={post.images[imageIndex]?.link || keebo}
                            width={1000}
                            height={1000}
                            className={`h-full w-full rounded-l-md object-cover`}
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
                        <h1 className="absolute bottom-2 left-2 z-10 rounded-3xl bg-white bg-opacity-20 px-4 py-2 text-green-500">
                            {post.tag}
                        </h1>
                    </div>
                    <div className=" flex w-1/4 flex-col justify-between rounded-r-md bg-black bg-opacity-30 p-2 ">
                        <h1 className=" text-2xl text-green-500">
                            {post.title}
                        </h1>
                        <div className="flex flex-col gap-2">
                            <div className="mb-2 flex justify-center">
                                <Link
                                    href={{
                                        pathname: "/keebshare/[postId]",
                                        query: { postId: post.id },
                                    }}
                                >
                                    <button
                                        className="text-md rounded-md bg-green-500 px-4 py-2 "
                                        style={{
                                            boxShadow: "0 0 20px #22C55E",
                                        }}
                                    >{`Let's Go `}</button>
                                </Link>
                            </div>

                            <div className="relative flex items-center justify-between">
                                <div className="flex gap-2">
                                    {session === null && (
                                        <button
                                            className="w-5"
                                            onClick={openSignInModal}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-full"
                                                viewBox="0 0 512 512"
                                                fill="#616161"
                                            >
                                                <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                                            </svg>
                                        </button>
                                    )}
                                    {session &&
                                        session.user &&
                                        post.isLiked === true &&
                                        post.likeId && (
                                            <div className="w-5">
                                                <PostPreviewDeleteLike
                                                    userId={session.user.id}
                                                    likeId={post.likeId}
                                                />
                                            </div>
                                        )}
                                    {session &&
                                        session.user &&
                                        post.isLiked === false && (
                                            <div className="w-5">
                                                <PostPreviewCreateLike
                                                    userId={session.user.id}
                                                    postId={post.id}
                                                />
                                            </div>
                                        )}

                                    <h1>{post._count.postLikes}</h1>
                                </div>

                                {session &&
                                    session.user &&
                                    post.isFavorited === false && (
                                        <div className="w-6">
                                            <PostPreviewCreateFavorite
                                                userId={session.user.id}
                                                postId={post.id}
                                            />
                                        </div>
                                    )}

                                {session &&
                                    session.user &&
                                    post.isFavorited === true &&
                                    post.favoriteId && (
                                        <div className="w-6">
                                            <PostPreviewDeleteFavorite
                                                userId={session.user.id}
                                                favoriteId={post.favoriteId}
                                            />
                                        </div>
                                    )}
                                {session === null && (
                                    <button onClick={openSignInModal}>
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
                                    </button>
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
            <ModalDialog isOpen={isSignInModalOpen} onClose={closeSignInModal}>
                <SignInModal closeModal={closeSignInModal} />
            </ModalDialog>



            {post.images.length === 0 && post.link && (
                <div className="flex h-full w-full ">
                    <div className=" relative h-full w-3/4 overflow-hidden">
                        <DisplayYouTubePostPreview link={post.link} />
                        <h1 className="absolute bottom-2 right-2 z-10 rounded-3xl bg-white bg-opacity-20 px-4 py-2 text-green-500">
                            {post.tag}
                        </h1>
                    </div>
                    <div className=" flex w-1/4 flex-col justify-between rounded-r-md bg-black bg-opacity-30 p-2 ">
                        <h1 className=" text-2xl text-green-500">
                            {post.title}
                        </h1>
                        <div className="flex flex-col gap-2">
                            <div className="mb-2 flex justify-center">
                                <Link
                                    href={{
                                        pathname: "/keebshare/[postId]",
                                        query: { postId: post.id },
                                    }}
                                >
                                    <button
                                        className="text-md rounded-md bg-green-500 px-4 py-2 "
                                        style={{
                                            boxShadow: "0 0 20px #22C55E",
                                        }}
                                    >{`Let's Go `}</button>
                                </Link>
                            </div>

                            <div className="relative flex items-center justify-between">
                                <div className="flex gap-2">
                                    {session === null && (
                                        <button
                                            className="w-5"
                                            onClick={openSignInModal}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-full"
                                                viewBox="0 0 512 512"
                                                fill="#616161"
                                            >
                                                <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                                            </svg>
                                        </button>
                                    )}
                                    {session &&
                                        session.user &&
                                        post.isLiked === true &&
                                        post.likeId && (
                                            <div className="w-5">
                                                <PostPreviewDeleteLike
                                                    userId={session.user.id}
                                                    likeId={post.likeId}
                                                />
                                            </div>
                                        )}
                                    {session &&
                                        session.user &&
                                        post.isLiked === false && (
                                            <div className="w-5">
                                                <PostPreviewCreateLike
                                                    userId={session.user.id}
                                                    postId={post.id}
                                                />
                                            </div>
                                        )}

                                    <h1>{post._count.postLikes}</h1>
                                </div>

                                {session &&
                                    session.user &&
                                    post.isFavorited === false && (
                                        <div className="w-6">
                                            <PostPreviewCreateFavorite
                                                userId={session.user.id}
                                                postId={post.id}
                                            />
                                        </div>
                                    )}

                                {session &&
                                    session.user &&
                                    post.isFavorited === true &&
                                    post.favoriteId && (
                                        <div className="w-6">
                                            <PostPreviewDeleteFavorite
                                                userId={session.user.id}
                                                favoriteId={post.favoriteId}
                                            />
                                        </div>
                                    )}
                                {session === null && (
                                    <button onClick={openSignInModal}>
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
                                    </button>
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
