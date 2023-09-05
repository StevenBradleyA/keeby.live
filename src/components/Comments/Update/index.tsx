import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";
import type { Comment } from "@prisma/client";

export default function UpdateComment({
    postId,
    comment,
}: {
    postId: string;
    comment: Comment;
}) {
    const [text, setText] = useState(comment.text);
    const { data: session } = useSession();

    const ctx = api.useContext();
    const { mutate } = api.comment.update.useMutation({
        onSuccess: () => {
            void ctx.comment.getByPostId.invalidate();
        },
    });

    const handleformSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (session && session.user && session.user.id) {
            const data = {
                postId: postId,
                id: comment.id,
                userId: session.user.id,
                text: text,
            };
            return mutate(data);
        } else {
            throw new Error("Hot Toast Incoming!!!");
        }
    };

    return (
        <div>
            <form onSubmit={handleformSubmit}>
                <textarea
                    className="m-2 rounded border bg-transparent p-1"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Update your comment ..."
                />
                <button
                    className="rounded-md border text-slate-200"
                    type="submit"
                >
                    Update Comment
                </button>
            </form>
        </div>
    );
}
