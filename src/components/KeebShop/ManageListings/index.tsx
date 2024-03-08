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
        <div className="flex w-full flex-wrap gap-10">
            {allUserListings &&
                allUserListings.length > 0 &&
                allUserListings.map((listing) => (
                    <div key={listing.id} className="w-96 mt-10">
                        <EachManageListingCard
                            listing={listing}
                            userId={userId}
                        />
                    </div>
                ))}
        </div>
    );
}
