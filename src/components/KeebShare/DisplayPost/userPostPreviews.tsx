import type { Images } from "@prisma/client";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";
import Link from "next/link";

interface UserPostPreviewProps {
    user: UserWithPosts;
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

export default function UserPostPreviews({ user }: UserPostPreviewProps) {
    const blankLength = Math.max(0, 4 - user.posts.length);

    return (
        <>
            {user &&
                user.posts.length > 0 &&
                user.posts.map((e) => (
                    <div
                        key={e.id}
                        className=" mb-5 flex w-full items-center gap-5 text-sm text-lightGray"
                    >
                        <div className=" h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-lightGray ">
                            <Image
                                alt="post preview"
                                src={e.images[0] ? e.images[0].link : keebo}
                                width={300}
                                height={300}
                                className={`h-full w-full object-cover`}
                                priority
                            />
                        </div>
                        <Link
                            href={`/keebshare/${e.id}`}
                            className="transition-colors hover:text-green-500 "
                        >
                            <div className="flex w-full flex-col ">
                                <h1>{e.title}</h1>
                                <div className="flex w-full items-center gap-5 text-xs ">
                                    <h3 className="flex items-center gap-2">
                                        <svg
                                            className="w-4"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"></path>
                                        </svg>
                                        {`${e._count.comments} ${
                                            e._count.comments === 1
                                                ? "Comment"
                                                : "Comments"
                                        }`}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-3"
                                            viewBox="0 0 512 512"
                                            fill="currentColor"
                                        >
                                            <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                                        </svg>

                                        {e._count.postLikes}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}

            {Array.from({ length: blankLength }, (_, index) => (
                <div
                    key={index}
                    className="mb-5 flex h-full w-full items-center gap-5 text-sm "
                >
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-lightGray"></div>
                    <div className="flex h-full w-full flex-col  gap-2">
                        <div className="mb-2 h-[.2rem] w-3/4 bg-lightGray"></div>
                        <div className="h-[.2rem] w-1/4 bg-lightGray"></div>
                    </div>
                </div>
            ))}
        </>
    );
}
