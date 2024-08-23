"use client";
import type { ListingTransaction } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import ModalDialog from "~/app/_components/Context/Modal";
import RelistListingModal from "../../Listings/Manage/Update/relistListingModal";

interface EachOfferViewCardProps {
    transaction: ListingTransaction & {
        buyer: Buyer;
        listing: { title: string } | null;
    };
}

interface Buyer {
    username: string | null;
}

export default function EachSoldTransactionCard({
    transaction,
}: EachOfferViewCardProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className="flex w-96 flex-col  rounded-2xl bg-darkGray shadow-lg  p-5 text-xs font-poppins  text-green-500  ">
                <div className=" w-full">
                    <h2 className="text-base">Order Summary</h2>
                    <div className="flex w-full justify-between mt-2">
                        <div className=" flex flex-col">
                            <h3 className="text-white/50">Keyboard</h3>
                            <p>
                                {transaction.listing
                                    ? transaction.listing.title
                                    : "deleted listing"}
                            </p>
                        </div>
                        <div className=" flex flex-col">
                            <h3 className="text-white/50">Buyer</h3>
                            <p>{transaction.buyer.username}</p>
                        </div>
                    </div>
                    <div className="mt-1 h-[2px] w-full bg-white/50"></div>

                    <div className="mt-1 flex justify-between">
                        <h3 className="text-white/50">Agreed Sale Price </h3>
                        <div>${transaction.agreedPrice}</div>
                    </div>
                </div>
                {transaction.status === "ACCEPTED" ? (
                    <div className="flex justify-between items-center mt-5">
                        <button
                            className=" bg-mediumGray px-4 py-2 rounded-md text-black hover:opacity-80 ease-in "
                            onClick={() => setIsOpen(true)}
                        >
                            {`Buyer Won't Pay`}
                        </button>

                        <Link
                            href="/profile/messages"
                            aria-label="messages"
                            className=" z-10 flex cursor-pointer items-center gap-2 rounded-md bg-green-500 py-1 px-4 text-black hover:opacity-80 ease-in "
                        >
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"></path>
                            </svg>
                        </Link>
                    </div>
                ) : (
                    <div className=" bg-mediumGray px-4 py-2 rounded-md text-black mt-5 ">
                        This tranaction was revoked
                    </div>
                )}
            </div>
            <ModalDialog isOpen={isOpen} onClose={closeModal}>
                <RelistListingModal
                    transaction={transaction}
                    closeModal={closeModal}
                />
            </ModalDialog>
        </>
    );
}
