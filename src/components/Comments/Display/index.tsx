import { api } from "~/utils/api";
import type { Comment } from "@prisma/client";
import CommentCard from "./commentCard";

export type CommentWithUser = Comment & { user: { name: string | null } };

export default function DisplayComments({ postId }: { postId: string }) {
    const { data: comments, isLoading } =
        api.comment.getByPostId.useQuery(postId);

    if (isLoading) return <div>Loading All Posts...</div>;

    if (!comments) return <div>Oops</div>;

    return (
        <>
            {comments.map((comment: CommentWithUser, i: number) => {
                return (
                    <CommentCard key={i} comment={comment} postId={postId} />
                );
            })}
        </>
    );
}
