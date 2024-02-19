import type { Images } from "@prisma/client";
import Link from "next/link";

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
    return (
        <div className="flex w-96 flex-col">
            <Link
                href={{
                    pathname: "/keebshop/[postId]",
                    query: { postId: post.id },
                }}
            >
                {/* {keeb.images && keeb.images[0] && (
                <div
                    className="listing-preview-hover-effect relative h-72 w-96  cursor-pointer overflow-hidden rounded-2xl "
                    onMouseEnter={() => setIsPhotoHover(true)}
                    onMouseLeave={() => setIsPhotoHover(false)}
                >
                    <Image
                        alt="preview"
                        src={
                            keeb.images[0].link
                                ? keeb.images[0].link
                                : keebo
                        }
                        width={600}
                        height={600}
                        className={`h-full w-full object-cover`}
                    />
                    <div></div>

                    <div
                        className={`${
                            isPhotoHover
                                ? "show-listing-hover-content"
                                : "hide-listing-hover-content"
                        }   absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform`}
                    >
                        <div className="text-green-500  ">{`Check it out`}</div>
                    </div>
                </div>
            )} */}
                <div className="text-darkGray">{post.title}</div>
                {/* <div>{post._count}</div> */}
                <div>{post._count.comments}</div>
            </Link>
        </div>
    );
}
