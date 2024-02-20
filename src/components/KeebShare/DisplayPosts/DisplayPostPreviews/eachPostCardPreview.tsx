import type { Images } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";
import { useState } from "react";

interface EachPostCardPreviewProps {
    post: EachPost;
}

interface EachPost {
    id: string;
    tag: string;
    title: string;
    link: string | null;
    text: string | null;
    _count: CommentCount;
    images: Images[];
}
interface CommentCount {
    comments: number;
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

    // idk about layout design yet i just don't like reddits at all
    // maybe theres a menu on the right side of the container that has all the options
    //  idk about the sizing either tbh

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

    console.log(imageIndex, 'index here');
    return (
        <div className="flex h-[30vh] w-[47%] flex-col overflow-hidden rounded-xl bg-keebyGray">
            {/* <Link
                href={{
                    pathname: "/keebshare/[postId]",
                    query: { postId: post.id },
                }}
            > */}
                {post.images.length > 0 && post.images[0] && (
                    <div className="h-full w-full p-5 ">
                        <div className=" relative h-2/3 w-full cursor-pointer">
                            <Image
                                alt="preview"
                                src={post.images[imageIndex]?.link || keebo}
                                width={600}
                                height={600}
                                className={`h-full w-full rounded-xl object-cover`}
                            />
                            <button
                                className="absolute right-0 top-10 z-10"
                                onClick={goToNextImage}
                            >
                                next
                            </button>
                            <button
                                className="absolute left-0 top-10 z-10"
                                onClick={goToPrevImage}
                            >
                                prev
                            </button>
                        </div>
                        <h1 className=" text-lg text-white">{post.title}</h1>
                        {/* <div className=" flex h-1/6 justify-evenly">
                            <div className="text-red-500 ">
                                {`${post._count.comments} ${
                                    post._count.comments === 1
                                        ? "Comment"
                                        : "Comments"
                                }`}
                            </div>
                            <div>like </div>

                            <div>favorite </div>
                        </div> */}
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
                        <h1 className="p-2 text-2xl text-white">
                            {post.title}
                        </h1>
                    </div>
                )}
            {/* </Link> */}
        </div>
    );
}
