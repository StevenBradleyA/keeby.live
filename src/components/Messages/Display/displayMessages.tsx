import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import EachConversationCard from "./eachConversationCard";
import keebo from "@public/Profile/keebo.png";
import Image from "next/image";
import MessageChatCheck from "./messageChatCheck";

export default function DisplayMessages({ userId }: { userId: string }) {
    const { data: messages, isLoading } =
        api.message.getAllByUserId.useQuery(userId);

    console.log(messages);

    // these are all the messages
    // filter all the messages by listing transaction Id

    // i need to check what i am

    // am i a buyer or am i a seller? how do I know I check the userId... to see if it matches on or the other

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

    console.log("hello there", activeTransactionId);

    console.log("messages", messages);

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
                                    activeTransactionId={activeTransactionId}
                                    setActiveTransactionId={
                                        setActiveTransactionId
                                    }
                                />
                            </div>
                        ))}
                </div>
                <div className="h-full w-3/4 ">
                    {activeTransactionId === null && (
                        <div className=" mt-5 flex items-end gap-2 text-darkGray">
                            <h1>
                                {`Woah, all sold out. There are currently no listings for sale `}
                            </h1>
                            <Image
                                src={keebo}
                                alt="keeby mascot"
                                className="w-10"
                            />
                        </div>
                    )}

                    {typeof activeTransactionId === "string" &&
                        activeTransactionId.length > 0 && (
                            <MessageChatCheck
                                activeTransactionId={activeTransactionId}
                                userId={userId}
                            />
                        )}
                </div>
            </div>
        </>
    );
}
