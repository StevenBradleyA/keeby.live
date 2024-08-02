import { api } from "~/trpc/react";
import EachManageListingCard from "./Delete/eachListingCard";

interface ManageListingsProps {
    userId: string;
}

export default function ManageListings({ userId }: ManageListingsProps) {
    const { data: allUserListings } = api.listing.getAllByUserId.useQuery({
        userId,
    });
    return (
        <div className="mt-5 w-full font-poppins">
            <h1>Listings ( {allUserListings ? allUserListings.length : 0} )</h1>
            <div className="mt-5 flex w-full flex-wrap gap-10">
                {allUserListings &&
                    allUserListings.length > 0 &&
                    allUserListings.map((listing) => (
                        <div key={listing.id} className=" flex w-96">
                            <EachManageListingCard listing={listing} />
                        </div>
                    ))}
            </div>
        </div>
    );
}
