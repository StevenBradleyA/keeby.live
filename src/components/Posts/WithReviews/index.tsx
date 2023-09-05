import { api } from "~/utils/api";
import type { Post } from "@prisma/client";
import { useSession } from "next-auth/react";
import CreateReview from "../../Reviews/Create";
import DisplayReviews from "../../Reviews/Display";

export default function PostCard({ post }: { post: Post }) {
    const { data: session } = useSession();
    const { data: hasReviewed } = api.review.hasReviewed.useQuery({
        postId: post.id,
        userId: session?.user.id,
    });

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
                    {session && session.user && !hasReviewed && (
                        <CreateReview postId={post.id} />
                    )}
                </div>
            </section>
            <DisplayReviews postId={post.id} />
        </>
    );
}
