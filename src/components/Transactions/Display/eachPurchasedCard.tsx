import type { ListingTransaction } from "@prisma/client";
import { formatDistance } from "date-fns";
import { useState } from "react";
import ModalDialog from "~/components/Modal";

interface EachOfferViewCardProps {
    transaction: ListingTransaction & {
        listing: Listing;
    };
}

interface Listing {
    seller: { username: string | null };
}

export default function EachPurchasedTransactionCard({
    transaction,
}: EachOfferViewCardProps) {
    const now = new Date();

    // todo carrier and tracking number input

    return (
        <>
            <div className="flex w-96 flex-col items-stretch overflow-hidden rounded-2xl bg-keebyGray p-3 font-poppins text-darkGray tablet:h-[30vh] desktop:h-[25vh] ">
                <h1 className="flex h-1/6 justify-between ">
                    <span>{transaction.name}</span>
                    <span className={`text-purple`}>{transaction.status}</span>
                </h1>
                <div className="flex h-4/6 w-full flex-col items-center justify-center">
                    <p className="text-xl text-purple">
                        {transaction.trackingNumber
                            ? "Shipped"
                            : "Awaiting Seller Shipment"}
                    </p>
                    {transaction.trackingNumber && (
                        <div>
                            <p>Carrier: </p>
                            <p>Tracking # {transaction.trackingNumber} </p>
                        </div>
                    )}
                    <p>PayPal Order ID: {transaction.paypalOrderId}</p>
                    <p className="text-green-500">
                        Order Total: ${transaction.price / 100}
                    </p>
                </div>

                <div className="flex h-1/6 w-full items-end  justify-between">
                    <p>
                        {formatDistance(new Date(transaction.createdAt), now, {
                            addSuffix: true,
                        })}
                    </p>
                    <p>sold by {transaction.listing.seller.username}</p>
                </div>
            </div>
        </>
    );
}
