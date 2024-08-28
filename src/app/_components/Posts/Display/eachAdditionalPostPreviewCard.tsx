import type { Images } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";
import EachPostFavorite from "./eachPostFavorite";
import EachPostLike from "./eachPostLike";
import EachPostImage from "./eachPostImage";
import defaultProfile from "@public/Images/defaultProfile.png";
import { getServerAuthSession } from "~/server/auth";


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
        profile: string | null;
        username: string | null;
    };
}
interface Count {
    comments: number;
    postLikes: number;
    favorites: number;
}

export default async function PostPagePreviewCard({
    post,
}: EachPostCardPreviewProps) {
    // const { data: session } = useSession();
    const session = await getServerAuthSession();


    return (
        <div className="w-96 h-72 bg-black/30 rounded-xl flex flex-col p-2 text-sm items-start text-white">
            <div className="flex h-[60%] w-full bg-darkGray rounded-xl overflow-hidden">
                {post.images.length > 0 || post.link ? (
                    <EachPostImage post={post} />
                ) : post.text ? (
                    <div className="p-3 text-white">
                        <div>{post.text}</div>
                    </div>
                ) : (
                    <div className="p-3 text-white w-full h-full relative">
                        <Image
                            alt="keebo"
                            src={keebo}
                            className="absolute left-1/2 bottom-0 -translate-x-1/2 w-20 h-20 object-contain"
                        />
                    </div>
                )}
            </div>

            <h1 className="mt-2 w-full flex no-wrap overflow-hidden whitespace-nowrap text-base text-white">
                {post.title}
            </h1>
            <div className="flex w-full justify-between mt-1">
                <h2 className="bg-darkGray py-1 px-4 rounded-2xl text-green-500">
                    {post.tag}
                </h2>
                <div className="gap-2 flex items-center">
                    {/* <div className="flex gap-1 items-center">
                    <svg
                        className="w-5 h-5 text-white "
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"></path>
                    </svg>
                    {`${post._count.comments}`}
                </div> */}
                    <EachPostFavorite post={post} session={session} />
                    <EachPostLike post={post} session={session} />
                </div>
            </div>
            <div className="flex justify-between w-full mt-2">
                <div className="flex w-full gap-1 items-center ">
                    <div className="w-5 h-5 overflow-hidden rounded-full">
                        <Image
                            alt="profile image"
                            src={post.user.profile || defaultProfile}
                            className="w-full h-full object-contain scale-[2]"
                            width={200}
                            height={200}
                        />
                    </div>
                    {post.user.username}
                </div>

                <Link
                    // href={"/share"}
                    href={`/share/${post.id}`}
                    aria-label="Check out this post!"
                    className="bg-green-500 p-2 rounded-full text-black hover:opacity-70"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 "
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M7 17L17 7M17 7H8M17 7V16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
