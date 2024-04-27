import LoadingSpinner from "~/components/Loading";
import { api } from "~/utils/api";
import CreateMessage from "../Create/createMessage";
import EachMessageCard from "./eachMessageCard";
import { useEffect, useRef } from "react";
import type { RefObject } from "react";
export default function MessageChatCheck({
    activeTransactionId,
    userId,
}: {
    userId: string;
    activeTransactionId: string;
}) {
    const messageScrollRef = useRef<HTMLDivElement | null>(null);

    const {
        data: messages,
        isLoading,
        isFetching,
    } = api.message.getAllByTransactionId.useQuery(activeTransactionId);

    useEffect(() => {
        if (!isFetching) {
            if (messageScrollRef && messageScrollRef.current) {
                messageScrollRef.current.scrollTop =
                    messageScrollRef.current.scrollHeight;
            }
        }
    }, [isFetching]);

    if (isLoading)
        return (
            <div className="p-5">
                <LoadingSpinner size="20px" />
            </div>
        );

    // todo message time stamps

    // todo notificationss for unread messages...

    // Please include your:
    // Name
    // Address
    // Phone #
    // And full order in the payment notes,

    // again have to determine if buyer or seller right...

    return messages ? (
        <div className="h-full w-full">
            <div
                className="h-[90%] overflow-y-auto text-darkGray"
                ref={messageScrollRef}
            >
                <div className="flex justify-center">
                    <h1 className="text-white">{`Welcome to Keeby's Private Messager`}</h1>
                </div>
                <h2>{messages[0]?.listingTransaction.listing.title}</h2>
                <div>
                    Agreed Price:{" "}
                    {messages[0]?.listingTransaction.agreedPrice
                        ? `$${(
                              messages[0].listingTransaction.agreedPrice / 100
                          ).toFixed(2)}`
                        : "$ 0"}
                </div>
                <h2>
                    Quick Reminder: Only use PayPal for transactions as they
                    have a strong dispute system for preventing scams. Confirm
                    details with seller before sending any money.
                </h2>

                <div>
                    <div>
                        Seller Paypal Email: {messages[0]?.seller.paypalEmail}
                    </div>
                </div>
                <div className="mt-5 flex w-full flex-col text-white">
                    {messages.map((message) => (
                        <div key={message.id} className=" mb-2 w-full">
                            <EachMessageCard
                                message={message}
                                userId={userId}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {messages[0] && (
                <div className=" flex h-[10%] flex-col justify-end  ">
                    <CreateMessage
                        listingTransactionId={activeTransactionId}
                        buyerId={
                            messages[0].buyerId === userId
                                ? userId
                                : messages[0].sellerId
                        }
                        sellerId={
                            messages[0].sellerId === userId
                                ? userId
                                : messages[0].buyerId
                        }
                    />
                </div>
            )}
        </div>
    ) : null;
}
