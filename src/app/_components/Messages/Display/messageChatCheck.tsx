"use client";
import LoadingSpinner from "~/app/_components/Loading";
import { api } from "~/trpc/react";
import CreateMessage from "../Create/createMessage";
import EachMessageCard from "./eachMessageCard";
import Link from "next/link";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";

interface MessageChatCheckProps {
    userId: string;
    recipientId: string;
    selectedTransactionId: string;
    listingTitle: string;
    listingPrice: number;
}

export default function MessageChatCheck({
    selectedTransactionId,
    recipientId,
    userId,
    listingTitle,
    listingPrice,
}: MessageChatCheckProps) {
    const { data: allMessagesByTransactionId, isLoading } =
        api.message.getAllByTransactionId.useQuery(selectedTransactionId);

    if (isLoading)
        return (
            <div className="mt-20 ml-20 text-messageBlue">
                <LoadingSpinner size="20px" />
            </div>
        );

    return allMessagesByTransactionId ? (
        <div className="h-full w-full">
            <div className="h-[90%] overflow-y-auto text-mediumGray">
                <div className="w-full px-10">
                    <div className="flex justify-center items-end gap-1 text-messageBlue text-xl">
                        <h1>{`Keeby's Private Messenger`} </h1>
                        <Image
                            src={keebo}
                            alt="keeby mascot"
                            className="w-8 h-8 object-contain"
                        />
                    </div>
                    <h2 className="text-messageBlue">{listingTitle}</h2>
                    <h3 className=" flex gap-1">
                        Agreed price:
                        <span className="text-messageBlue">
                            ${listingPrice}
                        </span>
                    </h3>
                    <h3>
                        Quick Reminder:{" "}
                        <span className="text-messageBlue">
                            Keeby recommends only using PayPal for transactions
                            becuase they have a strong dispute system for
                            preventing scams. Confirm details with seller before
                            sending any money. When sending the seller money via
                            PayPal please include your full name, address, phone
                            number, and the keyboard you are buying in the
                            payment notes. Please read{" "}
                            <Link
                                aria-label="scam prevention"
                                href={`/scam-prevention`}
                                className="text-white hover:text-messageBlue hover:opacity-50 ease-in"
                            >
                                Scam Prevention
                            </Link>{" "}
                            for more details!
                        </span>
                    </h3>
                </div>

                <div className="mt-10 flex w-full flex-col text-white ">
                    {allMessagesByTransactionId.map((message) => (
                        <div key={message.id} className=" mb-2 w-full">
                            <EachMessageCard
                                message={message}
                                userId={userId}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className=" flex h-[10%] flex-col justify-end  ">
                <CreateMessage
                    selectedTransactionId={selectedTransactionId}
                    recipientId={recipientId}
                    userId={userId}
                />
            </div>
        </div>
    ) : null;
}
