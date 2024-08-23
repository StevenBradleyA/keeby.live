'use client'
import type { Message } from "@prisma/client";
import Image from "next/image";
import defaultProfile from "@public/Images/defaultProfile.png";
import {
    format,
    formatDistanceToNow,
    isToday,
    isYesterday,
    isThisYear,
} from "date-fns";

interface EachConversationCardProps {
    message: MessageCard;
    setRecipientId: (recipientId: string) => void;
    userId: string;
    selectedTransactionId: string;
    setSelectedTransactionId: (selectedTransactionId: string) => void;
    setListingPrice: (listingPrice: number) => void;
    setListingTitle: (listingTitle: string) => void;
}

interface MessageCard extends Message {
    user: {
        username: string | null;
        profile: string | null;
    };
    recipient: {
        username: string | null;
        profile: string | null;
    };
    listingTransaction: {
        agreedPrice: number;
        listing: { title: string } | null;
    };
}

export default function EachConversationCard({
    message,
    setRecipientId,
    selectedTransactionId,
    setSelectedTransactionId,
    userId,
    setListingTitle,
    setListingPrice,
}: EachConversationCardProps) {
    const isSender = message.userId === userId;
    const otherParty = isSender === true ? message.recipient : message.user;

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
            className={` flex w-full gap-2 rounded-md  p-2 text-xs ease-in hover:bg-white/10 ${selectedTransactionId === message.listingTransactionId ? "bg-white/10" : "bg-white/5"}`}
            onClick={() => {
                setRecipientId(isSender ? message.recipientId : message.userId);
                setSelectedTransactionId(message.listingTransactionId);
                setListingPrice(message.listingTransaction.agreedPrice);
                setListingTitle(
                    message.listingTransaction.listing
                        ? message.listingTransaction.listing.title
                        : "Transaction canceled",
                );
            }}
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
                    <div className=" flex-shrink-0 text-mediumGray">
                        {formatDate(message.createdAt)}
                    </div>
                </div>
                <h1
                    className={`mt-1 tablet:text-xs desktop:text-base ${message.listingTransaction.listing ? "text-messageBlue" : "text-mediumGray"}`}
                >
                    {message.listingTransaction.listing
                        ? message.listingTransaction.listing.title
                        : "Transaction canceled"}
                </h1>
            </div>
        </button>
    );
}
