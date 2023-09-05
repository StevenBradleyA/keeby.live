import { useSession } from "next-auth/react";
import UpdateComment from "../Update";
import { api } from "~/utils/api";
import type { CommentWithUser } from ".";
import { useState } from "react";

export default function CommentCard({
    comment,
    postId,
}: {
    comment: CommentWithUser;
    postId: string;
}) {
    const { data: session } = useSession();
    const [deleteClick, setDeleteClick] = useState(false);

    const ctx = api.useContext();
    const { mutate } = api.comment.delete.useMutation({
        onSuccess: () => {
            void ctx.comment.getByPostId.invalidate();
        },
    });

    const handleDeleteComment = (e: React.FormEvent) => {
        e.preventDefault();
        setDeleteClick(false);
        if (session && session.user && session.user.id) {
            const data = {
                id: comment.id,
                userId: session.user.id,
                postId: postId,
            };
            return mutate(data);
        } else {
            throw new Error("Hot Toast Incoming!!!");
        }
    };

    return (
        <>
            <div className="text-slate-200">
                {session && session.user.id === comment.userId && (
                    <div>
                        <UpdateComment comment={comment} postId={postId} />
                        {!deleteClick && (
                            <button onClick={() => setDeleteClick(true)}>
                                🗑️
                            </button>
                        )}
                        {deleteClick && (
                            <div>
                                <button onClick={handleDeleteComment}>
                                    🔥
                                </button>
                                <button onClick={() => setDeleteClick(false)}>
                                    ❎
                                </button>
                            </div>
                        )}
                    </div>
                )}
                <div>@{comment.user.name}</div>
                <div>{comment.text}</div>
            </div>
        </>
    );
}
