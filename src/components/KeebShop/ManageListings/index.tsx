import { api } from "~/utils/api";
import EachManageListingCard from "./Delete/eachListingCard";

interface ManageListingsProps {
    userId: string;
}

export default function ManageListings({ userId }: ManageListingsProps) {
    const { data: allUserListings } = api.listing.getAllByUserId.useQuery({
        userId,
    });
    console.log(allUserListings);
    return (
        <div className="mt-10 flex w-full flex-wrap gap-10">
            {allUserListings &&
                allUserListings.length > 0 &&
                allUserListings.map((listing) => (
                    <EachManageListingCard
                        listing={listing}
                        key={listing.id}
                        userId={userId}
                    />
                ))}
        </div>
    );
}
