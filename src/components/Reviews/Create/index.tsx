import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";
import React from "react";

interface StarProps {
    rating: number;
    starRating: number;
    hover: number;
    starHover: (rating: number) => void;
    onClick: (rating: number) => void;
}

const Star = ({ rating, starRating, hover, starHover, onClick }: StarProps) => {
    const filled = "cursor-pointer";
    const empty = "cursor-pointer text-transparent";

    const starClasses = rating <= starRating ? filled : empty;
    const hoverClasses = hover ? (rating <= hover ? filled : empty) : false;

    return (
        <div
            className={`h-6 w-6 ${hoverClasses || starClasses}`}
            onMouseEnter={() => starHover(rating)}
            onMouseLeave={() => starHover(0)}
            onClick={() => onClick(rating)}
        >
            ⭐️
        </div>
    );
};

export default function CreateReview({ postId }: { postId: string }) {
    const [text, setText] = useState("");
    const [starRating, setStarRating] = useState(0);
    const [hover, setHover] = useState(0);
    const { data: session } = useSession();

    const ctx = api.useContext();

    const { mutate } = api.review.create.useMutation({
        onSuccess: () => {
            void ctx.review.getByPostId.invalidate();
            void ctx.review.hasReviewed.invalidate();
        },
    });

    const starHover = (rating: number) => {
        setHover(rating);
    };

    const starClick = (rating: number) => {
        setStarRating(rating);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (session && session.user && session.user.id) {
            const data = {
                text,
                starRating,
                postId,
                userId: session.user.id,
            };

            setText("");
            setStarRating(0);
            setHover(0);

            return mutate(data);
        } else {
            throw new Error("Session expired");
        }
    };

    return (
        <form className="flex flex-col items-center gap-5" onSubmit={submit}>
            <label className="text-slate-200">
                Review
                <textarea
                    className="m-2 rounded border bg-transparent p-1"
                    value={text}
                    placeholder="What did you think of this post?"
                    onChange={(e) => setText(e.target.value)}
                />
            </label>
            <div className="flex items-center text-slate-200">
                <span>Star Rating</span>
                <div className="m-2 flex items-center">
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <Star
                            key={rating}
                            rating={rating}
                            starRating={starRating}
                            hover={hover}
                            starHover={starHover}
                            onClick={starClick}
                        />
                    ))}
                </div>
            </div>

            <button
                disabled={starRating && text ? false : true}
                className={`rounded-md border px-2 py-1 text-slate-200 ${
                    starRating && text ? "" : "opacity-50"
                }`}
            >
                Submit Review
            </button>
        </form>
    );
}
