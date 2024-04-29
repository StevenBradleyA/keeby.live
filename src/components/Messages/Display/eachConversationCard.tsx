import type { Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import defaultProfile from "@public/Profile/profile-default.png";
import {
    format,
    formatDistanceToNow,
    isToday,
    isYesterday,
    isThisYear,
} from "date-fns";

interface EachConversationCardProps {
    message: MessageCard;
    setActiveTransactionId: (activeTransactionId: string) => void;
    userId: string;
}

interface MessageCard extends Message {
    seller: {
        username: string | null;
        profile: string | null;
    };
    buyer: {
        username: string | null;
        profile: string | null;
    };
    listingTransaction: {
        listing: { title: string };
    };
}

export default function EachConversationCard({
    userId,
    message,
    setActiveTransactionId,
}: EachConversationCardProps) {
    const isBuyer = message.buyerId === userId;
    const otherParty = isBuyer ? message.seller : message.buyer;
    const otherPartyProfile = otherParty.profile
        ? otherParty.profile
        : defaultProfile;
    const otherPartyUsername = otherParty.username
        ? otherParty.username
        : "Unknown User";

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
            className="mb-2 flex w-full gap-2 rounded-md bg-white/5 p-2 text-xs   transition-background duration-400 ease-custom-cubic hover:bg-white/10 "
            onClick={() => setActiveTransactionId(message.listingTransactionId)}
        >
            <Image
                src={otherPartyProfile}
                alt="profile"
                height={600}
                width={600}
                className="mt-1 h-12 w-12 rounded-md object-cover"
                priority
            />
            <div className="flex w-full flex-col items-start">
                <div className="flex w-full justify-between  ">
                    <div className="flex w-full justify-start text-white">
                        {otherPartyUsername}
                    </div>
                    <div className=" flex-shrink-0 text-darkGray">
                        {formatDate(message.createdAt)}
                    </div>
                </div>
                <h1 className="mt-1 tablet:text-xs desktop:text-base">
                    {message.listingTransaction.listing.title}
                </h1>
            </div>
        </button>
    );
}
