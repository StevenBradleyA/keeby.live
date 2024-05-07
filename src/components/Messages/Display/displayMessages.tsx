import { useEffect, useState } from "react";
import { api } from "~/utils/api";
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
            setRecipientId(messages[0].recipientId);
            setSellerEmail(
                messages[0].recipient.paypalEmail
                    ? messages[0].recipient.paypalEmail
                    : ""
            );
            setAgreedPrice(messages[0].listingTransaction.agreedPrice);
            setListingTitle(messages[0].listingTransaction.listing.title);
        }
    }, [isLoading]);

    console.log("ME", userId);
    console.log("YOU", recipientId);

    // what's weird is this works for me but not for other chrome tab
    // todo debug this again again again again again again again again again again again

    // problem again is it is working for one person but not the other 

    //  we have to determine who they are based on thier id when we create but the recipientId is fuked 

    return (
        <>
            <div className="flex h-[80vh] w-full gap-2 tablet:px-4 desktop:px-16 ">
                <div className="h-full w-1/4 overflow-y-auto rounded-xl bg-keebyGray tablet:p-2 desktop:p-3">
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
                        <div className=" mx-10 mt-10 flex items-end gap-2 text-darkGray">
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
