import {
    format,
    formatDistanceToNow,
    isToday,
    isYesterday,
    isThisYear,
} from "date-fns";

interface EachEligibleReviewCardProps {
    listing: {
        id: string;
        title: string;
        seller: { id: string; username: string | null; profile: string | null };
        updatedAt: Date;
    };
    setSellerId: (sellerId: string) => void;
    setListingId: (listingId: string) => void;
    setSellerUsername: (sellerUsername: string) => void;
    setSellerProfile: (sellerProfile: string) => void;
}

export default function EachEligibleReviewCard({
    listing,
    setSellerId,
    setListingId,
    setSellerUsername,
    setSellerProfile,
}: EachEligibleReviewCardProps) {
    const formatDate = (date: Date) => {
        if (isToday(date)) {
            return formatDistanceToNow(date, { addSuffix: true });
        } else if (isYesterday(date)) {
            return "Yesterday";
        } else if (
            new Date().getDay() - date.getDay() < 7 &&
            new Date().getDay() - date.getDay() > 0
        ) {
            return format(date, "EEEE");
        } else if (isThisYear(date)) {
            return format(date, "M/d");
        } else {
            return format(date, "M/d/yyyy");
        }
    };

    return (
        <button
            className=" mb-2 w-full gap-2 rounded-md bg-white/5 p-2 text-xs text-mediumGray transition-background duration-400 ease-custom-cubic hover:bg-white/10 "
            onClick={() => {
                setSellerId(listing.seller.id);
                setSellerUsername(listing.seller.username || "");
                setListingId(listing.id);
                setSellerProfile(listing.seller.profile || "");
            }}
        >
            <div className="flex w-full justify-between">
                {listing.title}
                <div className=" flex-shrink-0">
                    {formatDate(listing.updatedAt)}
                </div>
            </div>
            <h1 className="mt-2 text-base text-green-500">
                {listing.seller.username}
            </h1>
        </button>
    );
}
