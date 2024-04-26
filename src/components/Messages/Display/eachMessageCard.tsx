import type { Message } from "@prisma/client";

interface EachMessageCardProps {
    userId: string;
    message: MessageCard;
}

interface MessageCard extends Message {
    sender: {
        username: string | null;
        paypalEmail: string | null;
    };
    listingTransaction: {
        agreedPrice: number;
        listing: {
            title: string;
        };
    };
}

export default function EachMessageCard({
    message,
    userId,
}: EachMessageCardProps) {
    const myMessage = message.senderId === userId;

    return (
        <div className="w-full overflow-x-hidden">
            {myMessage ? (
                <div className=" flex justify-end rounded-md ">
                    <div
                        // className="rounded-md bg-[#007AFF] p-2"
                        className="message-bubble sent-message mr-5 rounded-md px-4 py-2"
                        style={{ maxWidth: "66.666%" }}
                    >
                        {message.text}
                    </div>
                </div>
            ) : (
                <div
                    // className=" flex justify-start rounded-md "
                    className="ml-5 flex justify-start rounded-md "
                    // style={{ maxWidth: "66.666%" }}
                >
                    <div
                        className="message-bubble received-message rounded-md bg-keebyGray p-2 px-4 py-2"
                        style={{ maxWidth: "66.666%" }}
                    >
                        {message.text}
                    </div>
                </div>
            )}
        </div>
    );
}
