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
import { useState } from "react";
import ModalDialog from "~/app/_components/Context/Modal";
import UpdateReview from "../Update/updateReview";
import DisplayStarRating from "./displayStarRating";

interface EachSentReviewCardProps {
    review: EachReview;
}

interface EachReview extends Review {
    recipient: { username: string | null; profile: string | null };
}

export default function EachSentReviewCard({
    review,
}: EachSentReviewCardProps) {
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
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    return (
        <>
            <div className=" w-96 h-48 relative flex flex-col rounded-xl bg-darkGray p-5 text-sm">
                <div className="flex w-full items-center gap-3 ">
                    <Image
                        alt="profile"
                        src={
                            review.recipient.profile
                                ? review.recipient.profile
                                : defaultProfile
                        }
                        className="h-12 w-12 rounded-md"
                        width={300}
                        height={300}
                    />
                    <div className="flex flex-col">
                        <h2>{review.recipient.username}</h2>
                        <p className="text-xs text-mediumGray">
                            {formatDate(review.updatedAt)}
                        </p>
                    </div>
                </div>
                <div className="mt-1 flex justify-center w-full">
                    <DisplayStarRating rating={review.starRating} />
                </div>
                <div className="mt-2 h-full overflow-y-auto break-words text-mediumGray">
                    {review.text}
                </div>
                <button
                    className="flex w-full items-start  justify-end text-sm absolute -bottom-7 right-0 "
                    onClick={openModal}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className=" w-8 text-mediumGray hover:text-white ease-in "
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z" />
                        <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" />
                        <path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" />
                    </svg>
                </button>
            </div>
            {/* <ModalDialog isOpen={isOpen} onClose={closeModal}>
                <UpdateReview review={review} closeModal={closeModal} />
            </ModalDialog> */}
        </>
    );
}
