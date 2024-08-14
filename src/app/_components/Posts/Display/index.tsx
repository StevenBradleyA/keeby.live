"use client";
import Image from "next/image";
import ChevronRound from "~/app/_components/Svgs/chevron";
import keebo from "@public/Profile/keebo.png";
import defaultProfile from "@public/Images/defaultProfile.png";
import { useEffect, useRef, useState } from "react";
import type { Images } from "@prisma/client";
import { useSession } from "next-auth/react";
import ModalDialog from "~/app/_components/Modal";
import SignInModal from "~/app/_components/Comments/Modal/signInModal";
import DisplayYouTubePostPreview from "./DisplayPosts/DisplayPostPreviews/displayYouTubePreview";
import { formatDistance } from "date-fns";
import Link from "next/link";
import UserPostPreviews from "./userPostPreviews";
import CreateComment from "~/app/_components/Comments/Create";
import { api } from "~/trpc/react";
import LoadingSpinner from "~/app/_components/Loading";
import EachCommentCard from "~/app/_components/Comments/Display/eachCommentCard";
import PostPagePreviews from "./additionalPostPreviews";
import Footer from "../../Footer/footer";

import EachPostLike from "./Previews/eachPostLike";
import EachPostFavorite from "./Previews/eachPostFavorite";
import EachPostImage from "./Previews/eachPostImage";

interface DisplayPostPageProps {
    post: PostPage;
}

interface UserPostPreview {
    id: string;
    title: string;
    _count: {
        comments: number;
        postLikes: number;
    };
    images: Images[];
}

interface UserWithPosts {
    id: string;
    username: string | null;
    profile: string | null;
    selectedTag: string | null;
    internetPoints: number;
    posts: UserPostPreview[];
}

interface PostPage {
    id: string;
    title: string;
    text: string | null;
    tag: string;
    link: string | null;
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
        favorites: number;
    };
    images: Images[];
    user: UserWithPosts;
}

export default function DisplayPostPage({ post }: DisplayPostPageProps) {
    const { data: session } = useSession();
    const scrollFlagRef = useRef<HTMLDivElement | null>(null);

    const [imageIndex, setImageIndex] = useState<number>(0);

    const postDate = new Date(post.createdAt);
    const now = new Date();
    const timeAgo = formatDistance(postDate, now, { addSuffix: true });

    const {
        data: comments,
        hasNextPage,
        fetchNextPage,
        isLoading,
        isFetchingNextPage,
    } = api.comment.getAllByTypeId.useInfiniteQuery(
        {
            type: "post",
            typeId: post.id,
            userId: session?.user.id,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        },
    );

    const goToNextImage = () => {
        setImageIndex((prevIndex) => (prevIndex + 1) % post.images.length);
    };

    const goToPrevImage = () => {
        setImageIndex(
            (prevIndex) =>
                (prevIndex - 1 + post.images.length) % post.images.length,
        );
    };

    useEffect(() => {
        if (isLoading || isFetchingNextPage || !hasNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0] && entries[0].isIntersecting) {
                    void fetchNextPage();
                }
            },
            { threshold: 1.0 },
        );

        const currentFlag = scrollFlagRef.current;
        if (currentFlag) {
            observer.observe(currentFlag);
        }

        return () => {
            if (observer && currentFlag) {
                observer.unobserve(currentFlag);
            }
        };
    }, [hasNextPage, isLoading, isFetchingNextPage, fetchNextPage]);

    if (isLoading)
        return (
            <div className="mt-44">
                <LoadingSpinner size="40px" />
            </div>
        );

    // we want SEO on this page so we are going to have a UI optimizations for liking, and favorites

    return (
        <>
            <div className="w-full text-mediumGray tablet:px-5 desktop:px-16 mt-40 flex gap-10">
                <div className="flex w-full tablet:w-3/4 flex-col">
                    <div className="flex w-full gap-10">
                        <div className=" post-page-user-container  relative h-[65vh] hidden tablet:block tablet:w-1/3 rounded-xl bg-darkGray  px-10 py-8 tablet:overflow-auto desktop:overflow-hidden">
                            <div className="h-full w-full ">
                                {post.user.selectedTag && (
                                    <h3 className="mb-2 flex justify-center text-sm">
                                        {post.user.selectedTag}
                                    </h3>
                                )}
                                <div className="text-green absolute right-3 top-3 flex items-center justify-center rounded-md bg-white bg-opacity-20 px-4 py-2 text-green-500">
                                    {post.user.internetPoints}
                                </div>

                                <Image
                                    alt="preview"
                                    src={
                                        post.user.profile
                                            ? post.user.profile
                                            : defaultProfile
                                    }
                                    width={1000}
                                    height={1000}
                                    className={`h-[45%] w-full rounded-md object-cover`}
                                    priority
                                />

                                <div className="post-page-user-overlay absolute bottom-0 left-0 top-1/4 -z-10 h-full w-full  bg-mediumGray"></div>
                                {post.user && post.user.username && (
                                    <div className="post-page-user-contents text-green-500">
                                        <Link
                                            href={`/profile/public/${post.user.username}`}
                                        >
                                            <h1 className=" mb-5 mt-2 text-2xl">
                                                {post.user.username}
                                            </h1>
                                        </Link>
                                    </div>
                                )}
                                <div className="w-full">
                                    <UserPostPreviews user={post.user} />
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full tablet:w-2/3 flex-col gap-5 ">
                            <div className=" w-full rounded-xl bg-darkGray ">
                                <div className="flex items-center justify-between p-3 w-full ">
                                    <h2 className=" rounded-3xl bg-white/10 px-4 py-2 text-green-500">
                                        {post.tag}
                                    </h2>

                                    <div className="relative mt-1 flex items-center  gap-5 rounded-3xl bg-white/10 px-4 py-2">
                                        <EachPostFavorite
                                            post={post}
                                            session={session}
                                        />
                                        <EachPostLike
                                            post={post}
                                            session={session}
                                        />
                                    </div>
                                </div>
                                <div>
                                    {(post.images.length > 0 || post.link) && (
                                        <EachPostImage post={post} />
                                    )}
                                </div>

                                <h1 className=" px-3 py-5 text-xl text-green-500 ">
                                    {post.title}
                                </h1>
                            </div>
                            <div className=" w-full rounded-xl bg-mediumGray p-3 text-green-500  ">
                                <div className="mb-2 flex gap-5 text-sm">
                                    <h3 className="flex gap-2">
                                        <svg
                                            className="w-5"
                                            viewBox="0 0 24 24"
                                            fill="rgb(34 197 94)"
                                        >
                                            <path d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"></path>
                                        </svg>
                                        {`${post._count.comments} ${
                                            post._count.comments === 1
                                                ? "Comment"
                                                : "Comments"
                                        }`}
                                    </h3>
                                    <h3>{timeAgo}</h3>
                                </div>
                                <p className="text-white">{post.text}</p>
                            </div>

                            {post.images.length > 0 && post.link && (
                                <div className=" h-[48vh] w-full overflow-hidden rounded-xl ">
                                    <DisplayYouTubePostPreview
                                        link={post.link}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-5 w-full">
                        <div className=" mb-1 flex gap-1">
                            <h1 className="text-lg text-green-500">
                                {`${
                                    post._count.comments
                                        ? post._count.comments
                                        : 0
                                } ${
                                    post._count.comments === 1
                                        ? "COMMENT"
                                        : "COMMENTS"
                                }`}
                            </h1>
                            <svg
                                className="w-5"
                                viewBox="0 0 24 24"
                                fill="rgb(34 197 94)"
                            >
                                <path d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"></path>
                            </svg>
                        </div>
                        <CreateComment typeId={post.id} type="post" />
                        {comments && comments.pages.length > 0 && (
                            <>
                                {comments.pages.map((page) =>
                                    page.comments.map((comment, i) => (
                                        <EachCommentCard
                                            key={i}
                                            comment={comment}
                                            type="post"
                                            typeId={post.id}
                                        />
                                    )),
                                )}
                                <div
                                    ref={scrollFlagRef}
                                    className="h-10 w-full"
                                ></div>
                            </>
                        )}
                    </div>
                </div>

                <div className="w-1/4 rounded-xl bg-mediumGray p-3 text-black ">
                    <PostPagePreviews />
                </div>
            </div>
            <div className="mt-96 w-full">
                <Footer />
            </div>
        </>
    );
}
