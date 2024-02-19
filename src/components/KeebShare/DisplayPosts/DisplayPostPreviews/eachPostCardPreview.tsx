import type { Images } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
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
 console.log(post)
    return (
        <div
         className="flex h-[30vh] w-[47%] flex-col rounded-xl bg-green-200">
            <Link
                href={{
                    pathname: "/keebshop/[postId]",
                    query: { postId: post.id },
                }}
            >
                {post.images && post.images[0] && (
                    <div className="listing-preview-hover-effect relative h-72 w-96  cursor-pointer overflow-hidden rounded-2xl ">
                        <Image
                            alt="preview"
                            src={
                                post.images[0].link
                                    ? post.images[0].link
                                    : keebo
                            }
                            width={600}
                            height={600}
                            className={`h-full w-full object-cover`}
                        />
                    </div>
                )}

                <div className="text-darkGray">{post.title}</div>
                {/* <div>{post._count}</div> */}
                <div>{post._count.comments}</div>
            </Link>
        </div>
    );
}
