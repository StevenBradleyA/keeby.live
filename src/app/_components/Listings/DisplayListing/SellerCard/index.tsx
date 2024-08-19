import Image from "next/image";
import Link from "next/link";
import defaultProfile from "@public/Images/defaultProfile.png";
import type { Images, Listing } from "@prisma/client";
import { useState } from "react";
import ModalDialog from "~/app/_components/Modal";
import CreateTransaction from "../../../Transactions/Create";
import CreateOffer from "../../../Offers/Create";
import SignInModal from "~/app/_components/Comments/Modal/signInModal";
import { useSession } from "next-auth/react";
import DisplayStarRating from "~/app/_components/Reviews/Star/displayStarRating";

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
        totalRatings?: number | null;
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

    // todo MAKE STARS ACTUALLY REFLECTIVE TO ONE DECIMAL POINT ------- rounding is lame

    // todo figure out server side rendering

    // context for the state change? would be easy that way you can have separate components
    // also don't forget we need to have different layouts
    // add a pop out modal when you click the central image maybe? or a full screen button on the picture...

    return (
        <div className="flex h-full w-full gap-5 p-2 desktop:p-5">
            {listing.seller && listing.seller.username && (
                <div className="w-32 h-32">
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
                </div>
            )}
            <div className="flex h-full w-5/6 flex-col ">
                <div className="flex h-1/2 w-full items-center justify-between text-mediumGray">
                    <h3 className="flex justify-end text-purple desktop:text-2xl">{`Price: $${
                        listing.price / 100
                    }`}</h3>

                    <div className="flex gap-5">
                        {listing.status === "ACTIVE" ? (
                            <>
                                <button
                                    className="rounded-md border-2 border-mediumGray bg-mediumGray px-4 py-1 text-green-500  hover:border-green-500 hover:bg-darkGray desktop:py-2"
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
                                    className="rounded-md border-2 border-mediumGray bg-mediumGray px-4 py-1 text-green-500 hover:border-green-500 hover:bg-darkGray desktop:py-2"
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
                            <div className="rounded-md border-2 border-mediumGray bg-mediumGray px-4 py-1 text-green-500 hover:border-green-500 hover:bg-darkGray desktop:py-2">
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
                                className="text-mediumGray transition-colors duration-300 ease-custom-cubic hover:text-green-500"
                            >
                                {listing.seller.username}
                            </Link>
                        </div>
                    )}

                    {listing.seller.avgRating ? (
                        <div className="flex flex-col justify-end">
                            <h3 className="flex items-center gap-1 text-mediumGray">
                                Seller Rating{" "}
                                <span className="flex items-center gap-[2px] text-xs">
                                    ( {listing.seller.avgRating.toFixed(1)}{" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className=" h-2 w-2 "
                                        viewBox="0 0 576 512"
                                        fill="currentColor"
                                    >
                                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                    </svg>{" "}
                                    · {listing.seller.totalRatings} )
                                </span>
                            </h3>
                            <DisplayStarRating
                                rating={parseFloat(
                                    listing.seller.avgRating.toFixed(0),
                                )}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <h3 className="text-mediumGray">
                                Unreviewed seller
                            </h3>
                            <DisplayStarRating rating={0} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
