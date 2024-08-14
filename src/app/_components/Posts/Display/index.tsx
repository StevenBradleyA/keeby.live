import Image from "next/image";
import defaultProfile from "@public/Images/defaultProfile.png";
import type { Images } from "@prisma/client";
import DisplayYouTubePostPreview from "./DisplayPosts/DisplayPostPreviews/displayYouTubePreview";
import { formatDistance } from "date-fns";
import Link from "next/link";
import UserPostPreviews from "./userPostPreviews";
import CreateComment from "~/app/_components/Comments/Create";
import PostPagePreviews from "./additionalPostPreviews";
import Footer from "../../Footer/footer";
import EachPostLike from "./Previews/eachPostLike";
import EachPostFavorite from "./Previews/eachPostFavorite";
import EachPostImage from "./Previews/eachPostImage";
import { getServerAuthSession } from "~/server/auth";
import DisplayComments from "../../Comments/Display/displayComments";

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

export default async function DisplayPostPage({ post }: DisplayPostPageProps) {
    const session = await getServerAuthSession();

    const postDate = new Date(post.createdAt);
    const now = new Date();
    const timeAgo = formatDistance(postDate, now, { addSuffix: true });

    // we want SEO on this page so we are going to have a UI optimizations for liking, and favorites
    return (
        <>
            <div className="w-full text-mediumGray tablet:px-5 desktop:px-16 mt-40 flex gap-10">
                <div className="flex w-full tablet:w-3/4 flex-col">
                    <div className="flex w-full gap-10">
                        <div className=" post-page-user-container  relative h-[65vh] hidden tablet:block tablet:w-1/3 rounded-xl bg-darkGray  px-10 py-8 tablet:overflow-auto desktop:overflow-hidden">
                            <div className="h-full w-full ">
                                {post.user.selectedTag && (
                                    <div className="w-full justify-center flex">
                                        <h3 className="mb-2 flex justify-start text-sm bg-white/10 px-4 py-1 rounded-lg text-mediumGray ">
                                            {post.user.selectedTag}
                                        </h3>
                                    </div>
                                )}
                                <div className="absolute right-3 top-3 flex items-center justify-center rounded-md bg-white/10 px-4 py-2 text-green-500 text-xs">
                                    {post.user.internetPoints}
                                </div>
                                <div className="flex justify-center w-full">
                                    <Image
                                        alt="preview"
                                        src={
                                            post.user.profile
                                                ? post.user.profile
                                                : defaultProfile
                                        }
                                        width={1000}
                                        height={1000}
                                        className={`h-56 w-56 rounded-md object-contain bg-black/50`}
                                        priority
                                    />
                                </div>

                                <div className="post-page-user-overlay absolute bottom-0 left-0 top-1/4 -z-10 h-full w-full  bg-mediumGray"></div>
                                {post.user && post.user.username && (
                                    <div className=" text-green-500 flex justify-start items-center  ">
                                        <div className="mb-5 mt-2 bg-black/10 px-2 rounded-md flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-8 h-8"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M5.99988 16.938V19.059L5.05851 20H2.93851L5.99988 16.938ZM22.0015 14.435V16.557L18.5595 20H17.9935L17.9939 18.443L22.0015 14.435ZM8.74988 14H15.2446C16.1628 14 16.9158 14.7071 16.9888 15.6065L16.9946 15.75V20H15.4946V15.75C15.4946 15.6317 15.4124 15.5325 15.3019 15.5066L15.2446 15.5H8.74988C8.63154 15.5 8.5324 15.5822 8.50648 15.6927L8.49988 15.75V20H6.99988V15.75C6.99988 14.8318 7.70699 14.0788 8.60636 14.0058L8.74988 14ZM8.02118 10.4158C8.08088 10.9945 8.26398 11.5367 8.54372 12.0154L1.99951 18.56V16.438L8.02118 10.4158ZM22.0015 9.932V12.055L17.9939 16.065L17.9946 15.75L17.9896 15.5825C17.9623 15.128 17.8246 14.7033 17.6029 14.3348L22.0015 9.932ZM12.0565 4L1.99951 14.06V11.939L9.93551 4H12.0565ZM22.0015 5.432V7.555L16.3346 13.2245C16.0672 13.1089 15.7779 13.0346 15.4746 13.0095L15.2446 13L14.6456 13.0005C14.9874 12.6989 15.2772 12.3398 15.4999 11.9384L22.0015 5.432ZM11.9999 7.00046C13.6567 7.00046 14.9999 8.34361 14.9999 10.0005C14.9999 11.6573 13.6567 13.0005 11.9999 13.0005C10.343 13.0005 8.99988 11.6573 8.99988 10.0005C8.99988 8.34361 10.343 7.00046 11.9999 7.00046ZM11.9999 8.50046C11.1715 8.50046 10.4999 9.17203 10.4999 10.0005C10.4999 10.8289 11.1715 11.5005 11.9999 11.5005C12.8283 11.5005 13.4999 10.8289 13.4999 10.0005C13.4999 9.17203 12.8283 8.50046 11.9999 8.50046ZM7.55851 4L1.99951 9.56V7.438L5.43751 4H7.55851ZM21.0565 4L15.9091 9.14895C15.7923 8.61022 15.5669 8.11194 15.2571 7.67816L18.9345 4H21.0565ZM16.5585 4L14.0148 6.54427C13.5362 6.26463 12.9942 6.08157 12.4157 6.02181L14.4365 4H16.5585Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            <Link
                                                href={`/profile/public/${post.user.username}`}
                                                className="ease-in hover:opacity-70"
                                            >
                                                {post.user.username}
                                            </Link>
                                        </div>
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
                                {(post.images.length > 0 || post.link) && (
                                    <div className="w-full h-[400px] ">
                                        <EachPostImage post={post} />
                                    </div>
                                )}

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
                        <DisplayComments
                            typeId={post.id}
                            type="post"
                            userId={
                                session && session.user.id
                                    ? session.user.id
                                    : undefined
                            }
                        />
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
