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
                <div className=" flex justify-end rounded-md pr-3 ">
                    <div
                        className="rounded-md bg-green-500  px-4 py-2  whitespace-pre-wrap"
                        style={{ maxWidth: "66.666%" }}
                    >
                        {message.text}
                    </div>
                </div>
            ) : (
                <div
                    className=" flex justify-start rounded-md "
                >
                    <div
                        className="rounded-md bg-keebyGray px-4 py-2"
                        style={{ maxWidth: "66.666%" }}
                    >
                        {message.text}
                    </div>
                </div>
            )}
        </div>
    );
}
