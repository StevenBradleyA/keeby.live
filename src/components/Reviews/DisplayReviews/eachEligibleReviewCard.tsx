import keebo from "@public/Profile/keebo.png";
import Image from "next/image";

interface EachEligibleReviewCardProps {
    listing: {
        id: string;
        title: string;
        seller: { id: string; username: string | null };
    };
    setSellerId: (sellerId: string) => void;
    setListingId: (listingId: string) => void;
}

export default function EachEligibleReviewCard({
    listing,
    setSellerId,
    setListingId,
}: EachEligibleReviewCardProps) {
    return (
        <>
            <div>{listing.title}</div>
        </>
    );
}
