"use client";
import type { Images, Listing } from "@prisma/client";
import type { Session } from "next-auth";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import ModalDialog from "~/app/_components/Context/Modal";
import SignInModal from "~/app/_components/Modal/signInModal";

interface ListingPageFavoriteProps {
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

export default function ListingPageFavorite({
    listing,
    session,
}: ListingPageFavoriteProps) {
    const utils = api.useUtils();
    // state optimistic UI
    const [isFakeFavorited, setIsFakeFavorited] = useState<boolean>(false);
    const [favoriteCount, setFavoriteCount] = useState<number>(0);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);

    // server interactions
    const { mutate: favorite } = api.favorite.createListingFavorite.useMutation(
        {
            onSuccess: () => {
                void utils.listing.getOneById.invalidate();
                void utils.listing.getAllPreviewListings.invalidate();
            },
        },
    );

    const { mutate: unfavorite } =
        api.favorite.deleteListingFavorite.useMutation({
            onSuccess: () => {
                void utils.listing.getOneById.invalidate();
                void utils.listing.getAllPreviewListings.invalidate();
            },
        });

    // helpers
    const handleUnfavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (session && session.user.id && listing.id) {
            // Optimistic UI update
            setIsFakeFavorited(false);
            setFavoriteCount((count) => count - 1);

            const data = {
                userId: session.user.id,
                listingId: listing.id,
            };

            return unfavorite(data);
        }
    };

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (session && session.user.id && listing.id) {
            // Optimistic UI update
            setIsFakeFavorited(true);
            setFavoriteCount((count) => count + 1);

            const data = {
                userId: session.user.id,
                listingId: listing.id,
            };

            return favorite(data);
        }
    };
    const openSignInModal = () => {
        setIsSignInModalOpen(true);
    };
    const closeSignInModal = () => {
        setIsSignInModalOpen(false);
    };

    useEffect(() => {
        setIsFakeFavorited(listing.isFavorited ?? false);
        setFavoriteCount(listing._count.favorites ?? 0);
    }, [listing.isFavorited, listing._count.favorites, favoriteCount]);

    return (
        <>
            {session === null && (
                <button
                    onClick={openSignInModal}
                    className="flex gap-1 items-center absolute right-3 bottom-3"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 ease-in hover:text-mediumGray text-darkGray "
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            )}
            {session && session.user && isFakeFavorited === false && (
                <button
                    onClick={handleFavoriteClick}
                    className="flex gap-1 items-center absolute right-3 bottom-3"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 ease-in hover:text-white text-darkGray "
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            )}

            {session && session.user && isFakeFavorited === true && (
                <button
                    onClick={handleUnfavoriteClick}
                    className="flex gap-1 items-center absolute right-3 bottom-3"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 ease-in hover:text-mediumGray text-green-500"
                        viewBox="0 0 24 24"
                        fill="rgba(0, 0, 0, 0.3)"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            )}
            {session === null && <button></button>}
            <ModalDialog isOpen={isSignInModalOpen} onClose={closeSignInModal}>
                <SignInModal />
            </ModalDialog>
        </>
    );
}
