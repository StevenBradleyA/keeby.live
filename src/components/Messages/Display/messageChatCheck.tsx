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
    // todo add menu with seller paypal and agreed price above map
    return messages ? (
        <div className="h-full w-full">
            <div className="h-[90%] text-darkGray overflow-y-auto">
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
                <div className="flex w-full flex-col text-white ">
                    {messages.map((message) => (
                        <div key={message.id} className="mt-5 w-full">
                            <EachMessageCard
                                message={message}
                                userId={userId}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {messages[0] && (
                <div className=" h-[10%] ">
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
