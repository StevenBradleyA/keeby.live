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
        <>
            {myMessage ? (
                <div
                    className=" flex justify-end rounded-md "
                    style={{ maxWidth: "66.666%" }}
                >
                    <div className="rounded-md bg-green-500 p-2">
                        {message.text}
                    </div>
                </div>
            ) : (
                <div
                    className=" flex justify-start rounded-md "
                    style={{ maxWidth: "66.666%" }}
                >
                    <div className="rounded-md bg-keebyGray p-2">
                        {message.text}
                    </div>
                </div>
            )}
        </>
    );
}
