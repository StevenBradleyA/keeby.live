import Image from "next/image";
import Link from "next/link";
import defaultProfile from "@public/Profile/profile-default.png";
import type { Images, Listing } from "@prisma/client";
import { useState } from "react";
import ModalDialog from "~/components/Modal";
import CreateTransaction from "../../../Transactions/Create";
import CreateOffer from "../../../Offers/Create";
import SignInModal from "~/components/Comments/Modal/signInModal";
import { useSession } from "next-auth/react";
import DisplayStarRating from "~/components/Reviews/Star/displayStarRating";

interface DisplayListingPageProps {
    listing: ListingWithImagesAndCount;
}

interface ListingWithImagesAndCount extends Listing {
    images: Images[];
    _count: {
        comments: number;
    };
    seller: {
        id: string;
        username: string | null;
        selectedTag: string | null;
        profile: string | null;
        avgRating?: number | null;
    };
}

export default function SellerListingCard({
    listing,
}: DisplayListingPageProps) {
    const { data: sessionData } = useSession();
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
        <div className="flex h-full w-full gap-5 p-2 desktop:p-5">
            {listing.seller && listing.seller.username && (
                <div className="h-full w-1/6">
                    <Link
                        href={`/profile/public/${listing.seller.username}`}
                        aria-label="seller profile"
                    >
                        <Image
                            src={
                                listing.seller.profile
                                    ? listing.seller.profile
                                    : defaultProfile
                            }
                            alt="profile"
                            width={400}
                            height={400}
                            className="h-full w-full rounded-xl object-cover "
                        />
                    </Link>
                </div>
            )}
            <div className="flex h-full w-5/6 flex-col ">
                <div className="flex h-1/2 w-full items-center justify-between text-darkGray">
                    <h3 className="flex justify-end text-purple desktop:text-2xl">{`Price: $${
                        listing.price / 100
                    }`}</h3>

                    <div className="flex gap-5">
                        {listing.status === "ACTIVE" ? (
                            <>
                                <button
                                    className="rounded-md border-2 border-[#616161] bg-darkGray px-4 py-1 text-green-500  hover:border-green-500 hover:bg-keebyGray desktop:py-2"
                                    onClick={() => {
                                        if (sessionData === null)
                                            openSignInModal();
                                        else {
                                            openBuyModal();
                                        }
                                    }}
                                >
                                    Buy Now
                                </button>
                                <button
                                    className="rounded-md border-2 border-[#616161] bg-darkGray px-4 py-1 text-green-500 hover:border-green-500 hover:bg-keebyGray desktop:py-2"
                                    onClick={() => {
                                        if (sessionData === null)
                                            openSignInModal();
                                        else {
                                            openOfferModal();
                                        }
                                    }}
                                >
                                    Make Offer
                                </button>
                            </>
                        ) : (
                            <div className="rounded-md border-2 border-[#616161] bg-darkGray px-4 py-1 text-green-500 hover:border-green-500 hover:bg-keebyGray desktop:py-2">
                                {listing.status === "PENDING"
                                    ? "Listing Pending Sale"
                                    : ""}
                                {listing.status === "SOLD"
                                    ? "This Keeb is Sold"
                                    : ""}
                            </div>
                        )}
                    </div>
                </div>
                <ModalDialog isOpen={isBuyModalOpen} onClose={closeBuyModal}>
                    <CreateTransaction
                        closeModal={closeBuyModal}
                        listingId={listing.id}
                        sellerId={listing.sellerId}
                        price={listing.price}
                        title={listing.title}
                    />
                </ModalDialog>
                <ModalDialog
                    isOpen={isOfferModalOpen}
                    onClose={closeOfferModal}
                >
                    <CreateOffer
                        closeModal={closeOfferModal}
                        listing={listing}
                    />
                </ModalDialog>

                <ModalDialog
                    isOpen={isSignInModalOpen}
                    onClose={closeSignInModal}
                >
                    <SignInModal />
                </ModalDialog>

                <div className="flex h-1/2 w-full items-center justify-between ">
                    {listing.seller && listing.seller.username && (
                        <div className="flex flex-col">
                            <h3 className="text-green-500">Listed by:</h3>
                            <Link
                                href={`/profile/public/${listing.seller.username}`}
                                aria-label="seller profile"
                                className="text-darkGray hover:text-green-500 hover:underline"
                            >
                                {listing.seller.username}
                            </Link>
                        </div>
                    )}

                    {listing.seller.avgRating ? (
                        <DisplayStarRating rating={listing.seller.avgRating} />
                    ) : (
                        <div className="flex flex-col">
                            <h3 className="text-darkGray">Unreviewed seller</h3>
                            <DisplayStarRating rating={0} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
