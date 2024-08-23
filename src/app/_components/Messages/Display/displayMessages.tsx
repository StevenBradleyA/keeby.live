'use client'
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import EachConversationCard from "./eachConversationCard";
import keebo from "@public/Profile/keebo.png";
import Image from "next/image";
import MessageChatCheck from "./messageChatCheck";

export default function DisplayMessages({ userId }: { userId: string }) {
    const { data: messages, isLoading } =
        api.message.getAllByUserId.useQuery(userId);

    const [activeTransactionId, setActiveTransactionId] = useState<
        string | null
    >(null);
    const [recipientId, setRecipientId] = useState<string>("");
    const [sellerEmail, setSellerEmail] = useState<string>("");
    const [listingTitle, setListingTitle] = useState<string>("");
    const [agreedPrice, setAgreedPrice] = useState<number>(0);

    useEffect(() => {
        if (
            !isLoading &&
            messages &&
            messages[0] &&
            activeTransactionId === null
        ) {
            setActiveTransactionId(messages[0].listingTransactionId);

            setRecipientId(
                messages[0].userId === userId
                    ? messages[0].recipientId
                    : messages[0].userId,
            );
            setSellerEmail(
                messages[0].recipient.paypalEmail
                    ? messages[0].recipient.paypalEmail
                    : "",
            );
            setAgreedPrice(messages[0].listingTransaction.agreedPrice);
            // setListingTitle(messages[0].listingTransaction.listing.title);
        }
    }, [isLoading]);

    return (
        <>
            <div className="flex h-[80vh] w-full gap-2 tablet:px-4 desktop:px-16 ">
                <div className="h-full w-1/4 overflow-y-auto rounded-xl bg-darkGray tablet:p-2 desktop:p-3">
                    {messages &&
                        messages.map((message) => (
                            <div
                                key={message.id}
                                className="w-full text-green-500"
                            >
                                <EachConversationCard
                                    userId={userId}
                                    message={message}
                                    setActiveTransactionId={
                                        setActiveTransactionId
                                    }
                                    setRecipientId={setRecipientId}
                                />
                            </div>
                        ))}
                </div>
                <div className="h-full w-3/4 ">
                    {activeTransactionId === null && (
                        <div className=" mx-10 mt-10 flex items-end gap-2 text-mediumGray">
                            <h1>
                                {`You have no messages. Buyers and sellers will be automatically connected here once a purchase is made.`}
                            </h1>
                            <Image
                                src={keebo}
                                alt="keeby mascot"
                                className="w-10"
                            />
                        </div>
                    )}

                    {typeof activeTransactionId === "string" &&
                        activeTransactionId.length > 0 &&
                        recipientId.length > 0 &&
                        listingTitle.length > 0 &&
                        agreedPrice > 0 && (
                            <MessageChatCheck
                                activeTransactionId={activeTransactionId}
                                recipientId={recipientId}
                                sellerEmail={sellerEmail}
                                userId={userId}
                                listingTitle={listingTitle}
                                agreedPrice={agreedPrice}
                            />
                        )}
                </div>
            </div>
        </>
    );
}
