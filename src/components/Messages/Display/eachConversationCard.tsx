import type { Message } from "@prisma/client";

interface EachConversationCardProps {
    message: MessageCard;
    setActiveTransactionId: (activeTransactionId: string) => void;
}

interface MessageCard extends Message {
    sender: {
        username: string | null;
        profile: string | null;
    };
    listingTransaction: {
        listing: { title: string };
    };
}

export default function EachConversationCard({
    message,
    setActiveTransactionId,
}: EachConversationCardProps) {
    return (
        <>
            <div>{message.sender.username}</div>
        </>
    );
}
