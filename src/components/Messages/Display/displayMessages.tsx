import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import EachConversationCard from "./eachConversationCard";

export default function DisplayMessages({ userId }: { userId: string }) {
    const { data: messages, isLoading } =
        api.message.getAllByUserId.useQuery(userId);

    console.log(messages);

    // these are all the messages
    // filter all the messages by listing transaction Id

    const [activeTransactionId, setActiveTransactionId] = useState<
        string | null
    >(null);

    useEffect(() => {
        if (
            !isLoading &&
            messages &&
            messages[0] &&
            activeTransactionId === null
        ) {
            setActiveTransactionId(messages[0].listingTransactionId);
        }
    }, [isLoading]);

    console.log('hello there', activeTransactionId)

    return (
        <>
            <div className="flex h-[80vh] w-full px-16">
                <div className="h-full w-1/4 overflow-y-auto rounded-xl bg-keebyGray">
                    {messages &&
                        messages.map((message) => (
                            <div key={message.id} className="text-green-500">
                                <EachConversationCard message={message} setActiveTransactionId={setActiveTransactionId}/>
                            </div>
                        ))}
                </div>
                <div className="h-full w-3/4 overflow-y-auto">
                    show all messages dependant on the transactionId.
                </div>
            </div>
        </>
    );
}
