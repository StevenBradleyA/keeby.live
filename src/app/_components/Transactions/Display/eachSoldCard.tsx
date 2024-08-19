import type { ListingTransaction } from "@prisma/client";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import ModalDialog from "~/app/_components/Context/Modal";

interface EachOfferViewCardProps {
    transaction: ListingTransaction & {
        buyer: Buyer;
        listing: { title: string };
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
            <div className="flex w-96 flex-col items-stretch overflow-hidden rounded-2xl bg-black/30 hover:bg-black/20 transition-background duration-300 ease-custom-cubic p-3 font-poppins text-sm text-green-500  ">
                <div className=" w-full">
                    <h2>Order Summary</h2>
                    <div className="flex w-full justify-between">
                        <div className="mt-2 flex flex-col text-xs">
                            <h3 className="text-white/50">Keyboard</h3>
                            <p>{transaction.listing.title}</p>
                        </div>
                        <div className="mt-2 flex flex-col text-xs">
                            <h3 className="text-white/50">Buyer</h3>
                            <p>{transaction.buyer.username}</p>
                        </div>
                    </div>
                    <div className="mt-1 h-[2px] w-full bg-white/50"></div>

                    <div className="mt-1 flex justify-between">
                        <h3 className="text-white/30">Agreed Sale Price </h3>
                        <div>${(transaction.agreedPrice / 100).toFixed(2)}</div>
                    </div>
                    <div className="mt-1 flex justify-between">
                        <h3 className="text-white/30">Buyer Verified</h3>
                        <div>Confirmed</div>
                    </div>
                </div>
                <div className="flex items-center justify-center tablet:my-5 desktop:my-3">
                    <Link
                        href="/profile/messages"
                        aria-label="messages"
                        className=" keeb-shop-offer-button z-10 flex cursor-pointer items-center gap-2 rounded-md bg-green-500 py-3 pl-1 pr-5 text-black "
                        style={{
                            boxShadow: "0 0 20px #22C55E",
                        }}
                    >
                        <>
                            <svg
                                className="keeb-shop-offer-button-arrow w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                                ></path>
                            </svg>
                            <span className="keeb-shop-offer-button-text">
                                {`Messages `}
                            </span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="keeb-shop-offer-button-circle w-2"
                                viewBox="0 0 32 32"
                            >
                                <circle cx="16" cy="16" r="16" />
                            </svg>
                        </>
                    </Link>
                </div>
            </div>
        </>
    );
}
