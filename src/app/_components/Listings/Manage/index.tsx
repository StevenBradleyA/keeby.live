"use client";
import { api } from "~/trpc/react";
import EachManageListingCard from "./Delete/eachListingCard";
import LoadingSpinner from "../../Loading";

interface ManageListingsProps {
    userId: string;
}

export default function ManageListings({ userId }: ManageListingsProps) {
    // server
    const { data: allUserListings, isLoading } =
        api.listing.getAllByUserId.useQuery({
            userId,
        });

    // condition checks
    if (isLoading) {
        return (
            <div className="mt-10 ml-10 text-green-500">
                <LoadingSpinner size="20px" />
            </div>
        );
    }

    return (
        <div className="mt-5 w-full font-poppins">
            <h2>My Listings ( {allUserListings ? allUserListings.length : 0} )</h2>
            <div className="mt-5 flex w-full flex-wrap gap-10">
                {allUserListings &&
                    allUserListings.length > 0 &&
                    allUserListings.map((listing) => (
                        <div key={listing.id} className=" flex w-96">
                            <EachManageListingCard listing={listing} userId={userId} />
                        </div>
                    ))}
            </div>
        </div>
    );
}
