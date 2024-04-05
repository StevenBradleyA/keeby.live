import Image from "next/image";
import Link from "next/link";
import defaultProfile from "@public/Profile/profile-default.png";
import StarRating from "~/components/Reviews/Star/starRating";
import type { Images, Listing } from "@prisma/client";
import { useState } from "react";
import ModalDialog from "~/components/Modal";
import CreateTransaction from "../../Transactions/Purchase";
import CreateOffer from "../../Transactions/Offers";

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
    const [isBuyModalOpen, setIsBuyModalOpen] = useState<boolean>(false);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState<boolean>(false);

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

    return (
        <div className="flex h-full w-full gap-5 p-5">
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
                    <h3 className="flex justify-end text-2xl text-purple">{`Price: $${
                        listing.price / 100
                    }`}</h3>

                    <div className="flex flex-col ">
                        <div className="flex gap-5">
                            <button
                                className="rounded-md border-2 border-[#616161] bg-darkGray px-4 py-2 text-green-500 hover:border-green-500 hover:bg-keebyGray"
                                onClick={openBuyModal}
                            >
                                Buy Now
                            </button>
                            <button
                                className="rounded-md border-2 border-[#616161] bg-darkGray px-4 py-2 text-green-500 hover:border-green-500 hover:bg-keebyGray"
                                onClick={openOfferModal}
                            >
                                Make Offer
                            </button>
                        </div>
                    </div>
                </div>
                <ModalDialog isOpen={isBuyModalOpen} onClose={closeBuyModal}>
                    <CreateTransaction closeModal={closeBuyModal} />
                </ModalDialog>
                <ModalDialog
                    isOpen={isOfferModalOpen}
                    onClose={closeOfferModal}
                >
                    <CreateOffer closeModal={closeOfferModal} />
                </ModalDialog>

                <div className="flex h-1/2 w-full items-center justify-between ">
                    {listing.seller && listing.seller.username && (
                        <div className="flex flex-col">
                            <div className="text-green-500">Listed by:</div>
                            <Link
                                href={`/profile/public/${listing.seller.username}`}
                                aria-label="seller profile"
                                className="text-darkGray hover:text-green-500 hover:underline"
                            >
                                {listing.seller.username}
                            </Link>
                            <div className="text-green-500"></div>
                        </div>
                    )}

                    {listing.seller.avgRating ? (
                        <StarRating rating={listing.seller.avgRating} />
                    ) : (
                        <div className="flex flex-col">
                            <div className="text-darkGray">
                                Unreviewed seller
                            </div>
                            <StarRating rating={0} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
