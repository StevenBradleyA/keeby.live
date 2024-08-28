"use client";
import { useState } from "react";
import ModalDialog from "~/app/_components/Context/Modal";
import CreateTransaction from "../../../Transactions/Create";
import CreateOffer from "../../../Offers/Create";
import SignInModal from "~/app/_components/Modal/signInModal";
import type { Images, Listing } from "@prisma/client";
import type { Session } from "next-auth";

interface BuyListingButtonProps {
    listing: EachListing;
    session: Session | null;
}

interface EachListing extends Listing {
    images: Images[];
    _count: {
        comments: number;
        favorites: number;
    };
    seller: {
        id: string;
        username: string | null;
        selectedTag: string | null;
        profile: string | null;
        avgRating?: number | null;
    };
    isFavorited?: boolean;
    favoriteId?: string;
}

export default function BuyListingButtons({
    listing,
    session,
}: BuyListingButtonProps) {
    const [isBuyModalOpen, setIsBuyModalOpen] = useState<boolean>(false);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState<boolean>(false);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);

    const openBuyModal = () => {
        setIsBuyModalOpen(true);
    };
    const closeBuyModal = () => {
        setIsBuyModalOpen(false);
    };
    const openOfferModal = () => {
        setIsOfferModalOpen(true);
    };

    const closeOfferModal = () => {
        setIsOfferModalOpen(false);
    };
    const openSignInModal = () => {
        setIsSignInModalOpen(true);
    };
    const closeSignInModal = () => {
        setIsSignInModalOpen(false);
    };

    return (
        <>
            <div className="flex w-full gap-5 justify-end text-xs laptop:text-sm largeLaptop:text-base">
                {listing.status === "ACTIVE" ? (
                    <>
                        <button
                            className="rounded-md border-2 border-mediumGray bg-mediumGray px-4 py-1 text-green-500  hover:border-green-500 hover:bg-darkGray desktop:py-2"
                            onClick={() => {
                                if (session === null) openSignInModal();
                                else {
                                    openBuyModal();
                                }
                            }}
                        >
                            Buy Now
                        </button>
                        <button
                            className="rounded-md border-2 border-mediumGray bg-mediumGray px-4 py-1 text-green-500 hover:border-green-500 hover:bg-darkGray desktop:py-2"
                            onClick={() => {
                                if (session === null) openSignInModal();
                                else {
                                    openOfferModal();
                                }
                            }}
                        >
                            Make Offer
                        </button>
                    </>
                ) : (
                    <div className="rounded-md border-2 border-mediumGray bg-mediumGray px-4 py-1 text-green-500 hover:border-green-500 hover:bg-darkGray desktop:py-2">
                        {listing.status === "PENDING"
                            ? "Listing Pending Sale"
                            : ""}
                        {listing.status === "SOLD" ? "This Keeb is Sold" : ""}
                    </div>
                )}
            </div>

            <ModalDialog isOpen={isBuyModalOpen} onClose={closeBuyModal}>
                <CreateTransaction
                    closeModal={closeBuyModal}
                    listing={listing}
                    session={session}
                />
            </ModalDialog>
            <ModalDialog isOpen={isOfferModalOpen} onClose={closeOfferModal}>
                <CreateOffer
                    closeModal={closeOfferModal}
                    listing={listing}
                    session={session}
                />
            </ModalDialog>

            <ModalDialog isOpen={isSignInModalOpen} onClose={closeSignInModal}>
                <SignInModal />
            </ModalDialog>
        </>
    );
}
