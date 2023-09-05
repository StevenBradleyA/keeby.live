import { api } from "~/utils/api";
import type { Session } from "next-auth";

interface DeleteProps {
    id: string;
    postId: string;
    session: Session;
    showDelete: boolean;
    setShowDelete: (show: boolean) => void;
}

export default function DeleteReview({
    id,
    postId,
    session,
    showDelete,
    setShowDelete,
}: DeleteProps) {
    const ctx = api.useContext();

    const { mutate } = api.review.delete.useMutation({
        onSuccess: () => {
            void ctx.review.getByPostId.invalidate();
            void ctx.review.hasReviewed.invalidate();
        },
    });

    const deleteReview = () => {
        setShowDelete(false);
        if (session.user) {
            const data = {
                id,
                postId,
                userId: session.user.id,
            };
            return mutate(data);
        } else {
            throw new Error("Hot Toast Incoming!!!");
        }
    };

    return (
        <>
            {!showDelete && (
                <button onClick={() => setShowDelete(true)}>🗑️</button>
            )}
            {showDelete && (
                <div>
                    <button onClick={deleteReview}>🔥</button>
                    <button onClick={() => setShowDelete(false)}>❎</button>
                </div>
            )}
        </>
    );
}
