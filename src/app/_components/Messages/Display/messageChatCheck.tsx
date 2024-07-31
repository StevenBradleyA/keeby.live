import LoadingSpinner from "~/app/_components/Loading";
import { api } from "~/utils/api";
import CreateMessage from "../Create/createMessage";
import EachMessageCard from "./eachMessageCard";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function MessageChatCheck({
    activeTransactionId,
    recipientId,
    userId,
    sellerEmail,
    listingTitle,
    agreedPrice,
}: {
    userId: string;
    activeTransactionId: string;
    recipientId: string;
    sellerEmail: string;
    listingTitle: string;
    agreedPrice: number;
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

    return messages ? (
        <div className="h-full w-full">
            <div
                className="h-[90%] overflow-y-auto text-darkGray"
                ref={messageScrollRef}
            >
                <div className="flex justify-center">
                    <h1 className="text-[#0ad5c1] text-xl mb-2">{`Keeby's Private Messenger`}</h1>
                </div>
                <h2>
                    {listingTitle} - Agreed Total Price:{" "}
                    <span className="text-[#0ec879]">
                        {agreedPrice
                            ? `$${(agreedPrice / 100).toFixed(2)}`
                            : "$ 0"}{" "}
                    </span>
                </h2>
                <div>
                    Seller Paypal Email:{" "}
                    <span className="text-[#0ec879]">{sellerEmail}</span>
                </div>
                <div></div>
                <h2>
                    Quick Reminder:{" "}
                    <span className="text-[#0ec879]">
                        Only use PayPal for transactions as they have a strong
                        dispute system for preventing scams. Confirm details
                        with seller before sending any money. When sending the
                        seller money via PayPal please include your full name,
                        address, phone number, and the keyboard you are buying
                        in the payment notes. Please read{" "}
                        <Link
                            aria-label="scam prevention"
                            href={`/keebdex/scam-prevention`}
                            className="transition-colors duration-300 ease-custom-cubic hover:text-white"
                        >
                            Scam Prevention
                        </Link>{" "}
                        for more details!
                    </span>
                </h2>

                <div></div>
                <div className="mt-5 flex w-full flex-col text-white ">
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
            {activeTransactionId.length > 0 && (
                <div className=" flex h-[10%] flex-col justify-end  ">
                    <CreateMessage
                        activeTransactionId={activeTransactionId}
                        recipientId={recipientId}
                        userId={userId}
                    />
                </div>
            )}
        </div>
    ) : null;
}
