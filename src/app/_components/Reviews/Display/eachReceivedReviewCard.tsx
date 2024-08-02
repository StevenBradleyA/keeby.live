import type { Review } from "@prisma/client";
import Image from "next/image";
import defaultProfile from "@public/Images/defaultProfile.png";
import {
    format,
    formatDistanceToNow,
    isThisWeek,
    isThisYear,
    isToday,
    isYesterday,
} from "date-fns";
import DisplayStarRating from "../Star/displayStarRating";

interface EachReceivedReviewCardProps {
    review: EachReview;
}

interface EachReview extends Review {
    user: { username: string | null; profile: string | null };
}

export default function EachReceivedReviewCard({
    review,
}: EachReceivedReviewCardProps) {
    const formatDate = (date: Date) => {
        const messageDate = new Date(date);

        if (isToday(messageDate)) {
            return formatDistanceToNow(messageDate, { addSuffix: true });
        } else if (isYesterday(messageDate)) {
            return "Yesterday";
        } else if (isThisWeek(messageDate)) {
            return format(messageDate, "EEEE");
        } else if (isThisYear(messageDate)) {
            return format(messageDate, "MMM d");
        } else {
            return format(messageDate, "MMM d, yyyy");
        }
    };

    return (
        <div className="flex w-96 flex-col rounded-xl bg-black/30 p-3  text-sm transition-background duration-300 ease-custom-cubic hover:bg-black/20 ">
            <div className="flex w-full items-center gap-3 ">
                <Image
                    alt="profile"
                    src={
                        review.user.profile
                            ? review.user.profile
                            : defaultProfile
                    }
                    className="h-12 w-12 rounded-md object-cover"
                    width={300}
                    height={300}
                />
                <div className="flex flex-col">
                    <h2>{review.user.username}</h2>
                    <p className="text-xs text-mediumGray">
                        {formatDate(review.updatedAt)}
                    </p>
                </div>
            </div>
            <div className="mt-1 flex justify-center">
                {" "}
                <DisplayStarRating
                    rating={parseFloat(review.starRating.toFixed(0))}
                />
            </div>
            <div className="mt-2 h-16 overflow-y-auto break-words text-mediumGray">
                {review.text}
            </div>
        </div>
    );
}
