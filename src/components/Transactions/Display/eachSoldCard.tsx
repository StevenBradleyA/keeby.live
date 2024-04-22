import type { ListingTransaction } from "@prisma/client";
import { formatDistance } from "date-fns";
import { useState } from "react";
import ModalDialog from "~/components/Modal";

interface EachOfferViewCardProps {
    transaction: ListingTransaction & {
        buyer: Buyer;
    };
}

interface Buyer {
    username: string | null;
}

export default function EachSoldTransactionCard({
    transaction,
}: EachOfferViewCardProps) {
    const now = new Date();

    // todo carrier and tracking number input

    return (
        <>
            <div className="flex w-96 flex-col items-stretch overflow-hidden rounded-2xl bg-keebyGray p-3 font-poppins text-darkGray tablet:h-[30vh] desktop:h-[25vh] ">
                <h1 className="flex h-1/6 justify-between ">
                    <span>{transaction.name}</span>
                    <span className={`text-green-500`}>Action Required</span>
                </h1>
                <div className="flex h-4/6 w-full flex-col items-center justify-center">
                    <p>${transaction.price / 100}</p>
                    <div>carrier input plus tracking number input </div>
                </div>

                <div className="flex h-1/6 w-full items-end  justify-between">
                    <p>
                        {formatDistance(new Date(transaction.createdAt), now, {
                            addSuffix: true,
                        })}
                    </p>
                    <p>{transaction.buyer.username}</p>
                </div>
            </div>
        </>
    );
}
