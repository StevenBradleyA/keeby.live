import type { Message } from "@prisma/client";
import {
    format,
    formatDistanceToNow,
    isThisWeek,
    isThisYear,
    isToday,
    isYesterday,
} from "date-fns";

interface EachMessageCardProps {
    userId: string;
    message: MessageCard;
}

interface MessageCard extends Message {
    seller: {
        username: string | null;
        paypalEmail: string | null;
    };
    listingTransaction: {
        agreedPrice: number;
        listing: {
            title: string;
        };
    };
}

export default function EachMessageCard({
    message,
    userId,
}: EachMessageCardProps) {
    const isBuyer = message.buyerId === userId;
    const myMessage = isBuyer;

    const formatDate = (date: Date) => {
        const now = new Date();
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
        <div className="w-full overflow-x-hidden">
            <div className="my-2 text-center text-xs text-darkGray opacity-50">
                {formatDate(message.createdAt)}
            </div>
            {myMessage ? (
                <div className=" flex justify-end rounded-md pr-3 ">
                    <div
                        className="whitespace-pre-wrap break-words  rounded-md bg-green-500  px-4 py-2"
                        style={{ maxWidth: "66.666%" }}
                    >
                        {message.text}
                    </div>
                </div>
            ) : (
                <div className=" flex justify-start rounded-md ">
                    <div
                        className="whitespace-pre-wrap break-words rounded-md bg-keebyGray px-4 py-2"
                        style={{ maxWidth: "66.666%" }}
                    >
                        {message.text}
                    </div>
                </div>
            )}
        </div>
    );
}
