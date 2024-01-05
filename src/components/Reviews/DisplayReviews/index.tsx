import { api } from "~/utils/api";
import EachReviewCard from "./EachReviewCard";

interface DisplayReviewsProps {
    userId: string;
}

export default function DisplayReviews({ userId }: DisplayReviewsProps) {
    const { data: reviewData } = api.review.getByUserId.useQuery(userId);

    return (
        <>
            <div>Reviews</div>
            {reviewData && reviewData.length < 0 ? (
                reviewData.map((review, i) => (
                    <EachReviewCard key={i} review={review} />
                ))
            ) : (
                <div>no reviews</div>
            )}
        </>
    );
}
