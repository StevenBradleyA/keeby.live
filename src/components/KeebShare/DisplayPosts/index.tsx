import type { Post } from "@prisma/client";
import Image from "next/image";

interface EachPostCardProps {
    post: Post;
}

export default function EachPostCard({ post }: EachPostCardProps) {

    // todo click routes to post page 

    
    return (
        <div className="bg-black p-10">
            <div> {post.title}</div>
            <div> {post.text}</div>
            <button className="bg-red-400 px-6 py-2">{`let's go`}</button>
        </div>
    );
}
