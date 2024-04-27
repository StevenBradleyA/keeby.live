import LoadingSpinner from "~/components/Loading";
import { api } from "~/utils/api";
import CreateMessage from "../Create/createMessage";
import EachMessageCard from "./eachMessageCard";

export default function MessageChatCheck({
    activeTransactionId,
    userId,
}: {
    userId: string;
    activeTransactionId: string;
}) {
    const { data: messages, isLoading } =
        api.message.getAllByTransactionId.useQuery(activeTransactionId);

    if (isLoading)
        return (
            <div className="p-5">
                <LoadingSpinner size="20px" />
            </div>
        );

    // todo message time stamps

    // todo notificationss for unread messages...

    return messages ? (
        <div className="h-full w-full">
            <div className="h-[90%] overflow-y-auto text-darkGray">
                <div className="flex justify-center">
                    <h1>{`Welcome to Keeby's Private Messager`}</h1>
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
                        Seller Paypal Email: {messages[0]?.sender.paypalEmail}
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
                        senderId={userId}
                        receiverId={messages[0]?.receiverId}
                    />
                </div>
            )}
        </div>
    ) : null;
}
