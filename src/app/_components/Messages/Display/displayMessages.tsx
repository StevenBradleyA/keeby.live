"use client";
import { useState } from "react";
import EachConversationCard from "./eachConversationCard";
import keebo from "@public/Profile/keebo.png";
import Image from "next/image";
import MessageChatCheck from "./messageChatCheck";
import type { Message } from "@prisma/client";

interface DisplayMessagesProps {
    userId: string;
    messages: EachMessage[];
}

interface EachMessage extends Message {
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
        listing: {
            title: string;
        } | null;
    };
}

export default function DisplayMessages({
    userId,
    messages,
}: DisplayMessagesProps) {
    const [selectedTransactionId, setSelectedTransactionId] = useState<string>(
        messages[0] ? messages[0].listingTransactionId : "",
    );
    const [recipientId, setRecipientId] = useState<string>(
        messages[0]
            ? messages[0].userId === userId
                ? messages[0].recipientId
                : messages[0].userId
            : "",
    );
    const [listingTitle, setListingTitle] = useState<string>(
        messages[0] && messages[0].listingTransaction.listing
            ? messages[0].listingTransaction.listing.title
            : "Transaction canceled",
    );
    const [listingPrice, setListingPrice] = useState<number>(
        messages[0] ? messages[0].listingTransaction.agreedPrice : 0,
    );

    return (
        <>
            <div className="flex h-[80vh] w-full gap-2 tablet:px-4 desktop:px-16 px-3 mt-40 ">
                <div className="h-full w-1/4 overflow-y-auto rounded-xl bg-darkGray tablet:p-2 desktop:p-3 flex flex-col gap-2">
                    {messages &&
                        messages.map((message) => (
                            <div
                                key={message.id}
                                className="w-full text-green-500"
                            >
                                <EachConversationCard
                                    userId={userId}
                                    message={message}
                                    selectedTransactionId={
                                        selectedTransactionId
                                    }
                                    setSelectedTransactionId={
                                        setSelectedTransactionId
                                    }
                                    setRecipientId={setRecipientId}
                                    setListingTitle={setListingTitle}
                                    setListingPrice={setListingPrice}
                                />
                            </div>
                        ))}
                </div>
                <div className="h-full w-3/4 ">
                    {selectedTransactionId === "" && (
                        <div className=" mx-10 mt-10 flex items-end gap-2 text-mediumGray">
                            <h1>
                                {`Select a conversation to see your messages!`}
                            </h1>
                            <Image
                                src={keebo}
                                alt="keeby mascot"
                                className="w-10 h-10 object-contain"
                            />
                        </div>
                    )}

                    {selectedTransactionId.length > 0 &&
                        recipientId.length > 0 &&
                        messages && (
                            <MessageChatCheck
                                selectedTransactionId={selectedTransactionId}
                                recipientId={recipientId}
                                userId={userId}
                                listingPrice={listingPrice}
                                listingTitle={listingTitle}
                            />
                        )}
                </div>
            </div>
        </>
    );
}
