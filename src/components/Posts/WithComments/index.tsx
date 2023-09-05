import type { Post } from "@prisma/client";
import CreateComment from "../../Comments/Create";
import DisplayComments from "../../Comments/Display";
import { useSession } from "next-auth/react";

export default function PostCard({ post }: { post: Post }) {
    const { data: session } = useSession();

    const stock = (num: number) => {
        if (num <= 0) return "Out of stock!";

        if (num <= 10) return `Only ${num} left in stock - order soon!`;

        return `${num} in stock`;
    };

    return (
        <>
            <section className="rounded-md border-2 p-4">
                <ul className="text-slate-200">
                    <li>{post.title}</li>
                    <li>{post.text}</li>
                    <li>${post.price}</li>
                    <li>{stock(post.stock)}</li>
                </ul>
                <div>
                    {session && session.user && (
                        <CreateComment postId={post.id} />
                    )}
                </div>
            </section>
            <DisplayComments postId={post.id} />
        </>
    );
}
