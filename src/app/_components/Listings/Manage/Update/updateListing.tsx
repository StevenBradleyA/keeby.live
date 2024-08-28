"use client";
import { api } from "~/trpc/react";
import LoadingSpinner from "~/app/_components/Loading";
import UpdateListingForm from "./updateListingForm";

interface UpdateListingProps {
    listingId: string;
    userId: string;
    closeModal: () => void;
}

export default function UpdateListing({
    listingId,
    userId,
    closeModal,
}: UpdateListingProps) {
    const { data: listing, isLoading } = api.listing.getOneById.useQuery({
        id: listingId,
        userId: userId,
    });

    if (isLoading) {
        <div className="mt-10 ml-10">
            <LoadingSpinner size="20px" />
        </div>;
    }

    return listing ? (
        <UpdateListingForm listing={listing} closeModal={closeModal} />
    ) : null;
}
