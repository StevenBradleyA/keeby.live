"use client";
import type { ListingTransaction } from "@prisma/client";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";
import { useState } from "react";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";

interface RelistListingProps {
    transaction: ListingTransaction & {
        buyer: Buyer;
        listing: { title: string } | null;
    };
    closeModal: () => void;
}

interface Buyer {
    username: string | null;
}

export default function RelistListingModal({
    transaction,
    closeModal,
}: RelistListingProps) {
    const utils = api.useUtils();

    // state
    const [isLastChance, setIsLastChance] = useState<boolean>(false);

    // server interactions
    const { mutate } = api.listing.relist.useMutation({
        onSuccess: () => {
            toast.success("Transaction canceled, keeb relisted!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            void utils.transaction.getAllByUserId.invalidate();
            closeModal();
        },
    });

    // helpers
    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (
            transaction &&
            transaction.status === "ACCEPTED" &&
            transaction.listingId
        ) {
            const data = {
                listingId: transaction.listingId,
                transactionId: transaction.id,
                buyerId: transaction.buyerId,
                sellerId: transaction.sellerId,
            };

            mutate(data);
        }
    };

    return (
        <div className="w-[350px] flex flex-col items-center text-white text-sm">
            {!isLastChance ? (
                <>
                    <div className="flex gap-1 items-end text-lg">
                        <h1>Problems with the Buyer?</h1>
                        <Image
                            alt="keebo mascot"
                            src={keebo}
                            className="w-10 h-10 object-contain"
                        />
                    </div>
                    <p className="mt-2">
                        If you are having issues with the buyer you can cancel
                        this transaction and relist your keyboard for sale.
                        Buyer and Seller reviews will persist!{" "}
                    </p>
                    <div className="mt-5 flex gap-10">
                        <button
                            className="rounded-md  px-4 py-1   bg-mediumGray/30 hover:bg-red-500/10 hover:text-red-500 ease-in flex items-center "
                            onClick={() => setIsLastChance(true)}
                        >
                            Yes, relist my board
                        </button>
                        <button
                            className="rounded-md  px-4 py-1   bg-mediumGray/30 hover:bg-green-500/10 hover:text-green-500 ease-in flex items-center "
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-lg">Are you sure?</h1>
                    <form>
                        <div className="mt-5 flex gap-10">
                            <button
                                className="rounded-md  px-4 py-1   bg-mediumGray/30 hover:bg-red-500/10 hover:text-red-500 ease-in flex items-center "
                                onClick={(e) => {
                                    e.preventDefault();
                                    submit(e);
                                }}
                            >
                                End Transaction and Relist
                            </button>
                            <button
                                className="rounded-md  px-4 py-1   bg-mediumGray/30 hover:bg-green-500/10 hover:text-green-500 ease-in flex items-center "
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}
