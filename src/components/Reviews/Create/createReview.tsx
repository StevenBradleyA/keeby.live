import { api } from "~/utils/api";
import EachEligibleReviewCard from "../DisplayReviews/eachEligibleReviewCard";
import { useState } from "react";

export default function CreateReview({ userId }: { userId: string }) {
    const { data: eligibleReviews } =
        api.review.getAllEligibleByUserId.useQuery(userId);

    const [sellerId, setSellerId] = useState<string>("");
    const [listingId, setListingId] = useState<string>("");
    const [starRating, setStarRating] = useState<number>(0);
    const [text, setText] = useState<string>("");

    // create review here

    return (
        <div>
            {eligibleReviews && eligibleReviews.length > 0 ? (
                eligibleReviews.map((listing) => (
                    <div key={listing.id}>
                        <EachEligibleReviewCard
                            listing={listing}
                            setSellerId={setSellerId}
                            setListingId={setListingId}
                        />
                    </div>
                ))
            ) : (
                <div>Buy a keyboard to be able to review </div>
            )}

            {sellerId.length > 0 && listingId.length > 0 && (
                <div>hey create stuff here</div>
            )}
        </div>
    );
}
