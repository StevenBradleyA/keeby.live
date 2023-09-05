import { useState } from "react";
import { api } from "~/utils/api";
import type { Review } from "@prisma/client";
import type { Session } from "next-auth";

//? --------------------------------------------------------------------
//? --------------------------------- Update Component ---------------------------------
//? --------------------------------------------------------------------

interface UpdateProps {
    postId: string;
    review: Review;
    session: Session;
    showUpdate: boolean;
    setShowUpdate: (show: boolean) => void;
}

export default function UpdateReview({
    postId,
    review,
    session,
    showUpdate,
    setShowUpdate,
}: UpdateProps) {
    const [text, setText] = useState(review.text);
    const [starRating, setStarRating] = useState(review.starRating);
    const [hover, setHover] = useState(0);

    const ctx = api.useContext();

    const { mutate } = api.review.update.useMutation({
        onSuccess: () => {
            void ctx.review.getByPostId.invalidate();
            setShowUpdate(false);
        },
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (session.user) {
            const data = {
                text,
                starRating,
                postId,
                userId: session.user.id,
                id: review.id,
            };

            return mutate(data);
        } else {
            throw new Error("Hot Toast Incoming!!!");
        }
    };

    return (
        <>
            {!showUpdate && (
                <button onClick={() => setShowUpdate(true)}>✏️</button>
            )}
            {showUpdate && (
                <form
                    className="flex flex-col justify-between gap-5"
                    onSubmit={submit}
                >
                    <label className="text-slate-200">
                        Review
                        <textarea
                            className="m-2 rounded border bg-transparent p-1"
                            value={text}
                            placeholder="Update your review"
                            onChange={(e) => setText(e.target.value)}
                        />
                    </label>
                    <label className="text-slate-200">
                        Star Rating
                        <div className="m-2 flex items-center">
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <Star
                                    key={rating}
                                    rating={rating}
                                    starRating={starRating}
                                    hover={hover}
                                    setHover={setHover}
                                    setStarRating={setStarRating}
                                />
                            ))}
                        </div>
                    </label>
                    <div className="">
                        <button
                            disabled={starRating && text ? false : true}
                            className={`rounded-md border px-2 py-1 text-slate-200 ${
                                starRating && text ? "" : "opacity-50"
                            }`}
                        >
                            Update
                        </button>
                        <button
                            className={`rounded-md border px-2 py-1 text-slate-200`}
                            onClick={() => {
                                setShowUpdate(false);
                                setText(review.text);
                                setStarRating(review.starRating);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </>
    );
}

//? --------------------------------------------------------------------
//? --------------------------------- Stars Component ---------------------------------
//? --------------------------------------------------------------------

interface StarProps {
    rating: number;
    starRating: number;
    hover: number;
    setHover: (rating: number) => void;
    setStarRating: (rating: number) => void;
}

const Star = ({
    rating,
    starRating,
    hover,
    setHover,
    setStarRating,
}: StarProps) => {
    const filled = "cursor-pointer";
    const empty = "cursor-pointer text-transparent";

    const starClasses = rating <= starRating ? filled : empty;
    const hoverClasses = hover ? (rating <= hover ? filled : empty) : false;

    return (
        <div
            className={`h-6 w-6 ${hoverClasses || starClasses}`}
            onMouseEnter={() => setHover(rating)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setStarRating(rating)}
        >
            ⭐️
        </div>
    );
};
