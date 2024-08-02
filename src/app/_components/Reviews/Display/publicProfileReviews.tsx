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

interface EachPublicProfileReviewProps {
    review: EachReview;
}

interface EachReview {
    id: string;
    text: string;
    starRating: number;
    userId: string;
    updatedAt: Date;
    user: { username: string | null; profile: string | null };
}

export default function EachPublicProfileReview({
    review,
}: EachPublicProfileReviewProps) {
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
        <div className="flex w-full flex-col rounded-xl bg-black/30 p-2 text-xs transition-background duration-300 ease-custom-cubic hover:bg-black/20 ">
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
                <div className="flex flex-col text-green-500">
                    <h2>{review.user.username}</h2>
                    <p className=" text-mediumGray">
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
            <div className="mt-2 h-10 overflow-y-auto break-words">
                {" "}
                {review.text}
            </div>
        </div>
    );
}
