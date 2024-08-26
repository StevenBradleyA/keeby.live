import {
    format,
    formatDistanceToNow,
    isToday,
    isYesterday,
    isThisYear,
} from "date-fns";

interface EachReviewForBuyerProps {
    review: EachReview;
    setType: (type: string) => void;
    setRecipientId: (recipientId: string) => void;
    setRecipientUsername: (recipientUsername: string) => void;
    setRecipientProfile: (recipientProfile: string) => void;
    setTransactionId: (id: string) => void;
}

interface EachReview {
    id: string;
    listing: { title: string } | null;
    updatedAt: Date;
    seller: {
        id: string;
        username: string | null;
        profile: string | null;
    };
}

export default function EachReviewForBuyer({
    review,
    setType,
    setRecipientId,
    setRecipientProfile,
    setRecipientUsername,
    setTransactionId,
}: EachReviewForBuyerProps) {
    const formatDate = (date: Date) => {
        if (isToday(date)) {
            return formatDistanceToNow(date, { addSuffix: true });
        } else if (isYesterday(date)) {
            return "Yesterday";
        } else if (
            new Date().getDay() - date.getDay() < 7 &&
            new Date().getDay() - date.getDay() > 0
        ) {
            return format(date, "EEEE");
        } else if (isThisYear(date)) {
            return format(date, "M/d");
        } else {
            return format(date, "M/d/yyyy");
        }
    };

    return (
        <button
            className=" w-full gap-2 rounded-md bg-white/5 p-2 text-xs text-mediumGray ease-in hover:bg-white/10 "
            onClick={() => {
                setTransactionId(review.id);
                setType("SELLER");
                setRecipientId(review.seller.id);
                setRecipientUsername(
                    review.seller.username ? review.seller.username : "",
                );
                setRecipientProfile(
                    review.seller.profile ? review.seller.profile : "",
                );
            }}
        >
            <div className="flex w-full justify-between">
                <h2>
                    Review seller{" "}
                    <span>
                        {review.listing ? `of ${review.listing.title}` : ""}
                    </span>
                </h2>
                <p className=" flex-shrink-0">{formatDate(review.updatedAt)}</p>
            </div>
            <h3 className="mt-2 text-sm text-green-500">
                {review.seller.username ? review.seller.username : "user"}
            </h3>
        </button>
    );
}
