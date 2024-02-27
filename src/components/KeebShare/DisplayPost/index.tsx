import Image from "next/image";
import LoadingSpinner from "~/components/Loading";
import ChevronRound from "~/components/Svgs/chevron";
import keebo from "@public/Profile/keebo.png";
import defaultProfile from "@public/Profile/profile-default.png";
import { useState } from "react";
import type { Images } from "@prisma/client";
import { useSession } from "next-auth/react";
import PostPreviewDeleteLike from "../DisplayPosts/DisplayPostPreviews/Like/deleteLike";
import PostPreviewCreateLike from "../DisplayPosts/DisplayPostPreviews/Like/createLike";
import PostPreviewCreateFavorite from "../DisplayPosts/DisplayPostPreviews/Favorite/createFavorite";
import PostPreviewDeleteFavorite from "../DisplayPosts/DisplayPostPreviews/Favorite/deleteFavorite";
import ModalDialog from "~/components/Modal";
import SignInModal from "~/components/Comments/Modal/signInModal";

interface DisplayPostPageProps {
    post: PostPage;
}

interface PostPage {
    id: string;
    title: string;
    text?: string | null;
    tag: string;
    link?: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    isLiked?: boolean;
    likeId?: string;
    isFavorited?: boolean;
    favoriteId?: string;
    _count: {
        comments: number;
        postLikes: number;
    };
    images: Images[];
    user: {
        username: string | null;
        profile: string | null;
        selectedTag: string | null;
    };
}

export default function DisplayPostPage({ post }: DisplayPostPageProps) {
    const { data: session } = useSession();

    const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);
    const [imageIndex, setImageIndex] = useState<number>(0);

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
        <div className="w-full px-16 text-darkGray ">
            <div className="flex h-[60vh] w-full gap-10">
                <div className="h-full w-1/4  rounded-xl bg-keebyGray p-10">
                    <div className="w-full">
                        <Image
                            alt="preview"
                            src={
                                post.user.profile
                                    ? post.user.profile
                                    : defaultProfile
                            }
                            width={1000}
                            height={1000}
                            className={`h-full w-full rounded-md object-cover`}
                            priority
                        />

                        {post.user.username}
                        {post.user.selectedTag}
                    </div>
                </div>

                <div className="flex w-1/2 flex-col gap-5 ">
                    <div className=" w-full rounded-xl bg-keebyGray ">
                        <div className="flex justify-between p-5 ">
                            <h1>{post.tag}</h1>

                            <div className="relative flex items-center  gap-5 ">
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
                            <ModalDialog
                                isOpen={isSignInModalOpen}
                                onClose={closeSignInModal}
                            >
                                <SignInModal closeModal={closeSignInModal} />
                            </ModalDialog>
                        </div>
                        {post.images.length > 0 && post.images[0] && (
                            <div className="flex h-full w-full ">
                                <div className=" relative h-full w-full overflow-hidden">
                                    <Image
                                        alt="preview"
                                        src={
                                            post.images[imageIndex]?.link ||
                                            keebo
                                        }
                                        width={1000}
                                        height={1000}
                                        className={`h-full w-full object-cover`}
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
                                </div>
                            </div>
                        )}
                    </div>
                    <div className=" rounded-xl bg-darkGray ">
                        <p>{post.text}</p>
                    </div>
                </div>

                <h1 className="text-3xl text-green-500 ">{post.title}</h1>
            </div>
        </div>
    );
}
