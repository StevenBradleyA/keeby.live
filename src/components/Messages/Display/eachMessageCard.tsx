import type { Message } from "@prisma/client";

interface EachMessageCardProps {
    userId: string;
    message: MessageCard;
}

interface MessageCard extends Message {
    seller: {
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
    const isBuyer = message.buyerId === userId;
    const myMessage = isBuyer;

    return (
        <div className="w-full overflow-x-hidden">
            {myMessage ? (
                <div className=" flex justify-end rounded-md pr-3 ">
                    <div
                        className="whitespace-pre-wrap rounded-md  bg-green-500 px-4  py-2"
                        style={{ maxWidth: "66.666%" }}
                    >
                        {message.text}
                    </div>
                </div>
            ) : (
                <div className=" flex justify-start rounded-md ">
                    <div
                        className="whitespace-pre-wrap rounded-md bg-keebyGray px-4 py-2"
                        style={{ maxWidth: "66.666%" }}
                    >
                        {message.text}
                    </div>
                </div>
            )}
        </div>
    );
}
