import type { Review } from "@prisma/client";

interface EachReviewCardProps {
    review: Review;
}

export default function EachReviewCard({ review }: EachReviewCardProps) {
    return (
        <>
            <div>{review.starRating}</div>
            <div>{review.text}</div>
        </>
    );
}
