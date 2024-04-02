import { api } from "~/utils/api";
import EachManageListingCard from "./Delete/eachListingCard";

interface ManageListingsProps {
    userId: string;
}

export default function ManageListings({ userId }: ManageListingsProps) {
    const { data: allUserListings } = api.listing.getAllByUserId.useQuery({
        userId,
    });
    return (
        <div className="flex w-full flex-wrap gap-10">
            {allUserListings &&
                allUserListings.length > 0 &&
                allUserListings.map((listing) => (
                    <div key={listing.id} className="mt-10 w-96">
                        <EachManageListingCard listing={listing} />
                    </div>
                ))}
        </div>
    );
}