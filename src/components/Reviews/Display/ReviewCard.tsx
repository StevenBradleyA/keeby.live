import { useSession } from "next-auth/react";
import { useState } from "react";
import UpdateReview from "../Update";
import DeleteReview from "../Delete";
import type { ReviewWithUser } from ".";

export default function ReviewCard({
    review,
    postId,
}: {
    review: ReviewWithUser;
    postId: string;
}) {
    const { data: session } = useSession();
    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    return (
        <div className="text-slate-200">
            {!showUpdate && (
                <>
                    <div>@{review.user.name}</div>
                    <div>{review.text}</div>
                    <div className="flex gap-1">
                        {Array(review.starRating).fill(" ⭐️ ")}
                    </div>
                </>
            )}

            {session && session.user.id === review.userId && (
                <>
                    {!showDelete && (
                        <UpdateReview
                            review={review}
                            postId={postId}
                            session={session}
                            showUpdate={showUpdate}
                            setShowUpdate={setShowUpdate}
                        />
                    )}

                    {!showUpdate && (
                        <DeleteReview
                            id={review.id}
                            postId={postId}
                            session={session}
                            showDelete={showDelete}
                            setShowDelete={setShowDelete}
                        />
                    )}
                </>
            )}
        </div>
    );
}
