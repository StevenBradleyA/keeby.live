import Image from "next/image";
import Link from "next/link";
import defaultProfile from "@public/Profile/profile-default.png";
// import StarDisplay from "~/components/Reviews/Star";
import StarRating from "~/components/Reviews/Star/starRating";

interface Seller {
    profile: string | null;
    username: string | null;
    selectedTag: string | null;
}
interface ReviewAggregate {
    _avg: {
        starRating: number | null;
    };
}

interface SellerInfo {
    seller: Seller | null;
    allSellerStars: ReviewAggregate;
}

interface SellerListingProps {
    sellerInfo: SellerInfo;
}

export default function SellerListingCard({ sellerInfo }: SellerListingProps) {
    const { seller, allSellerStars } = sellerInfo;

    return (
        <div className="flex h-full w-full gap-5 p-5">
            {seller && seller.username && (
                <div className="h-full w-1/6">
                    <Link
                        href={`/profile/public/${seller.username}`}
                        aria-label="seller profile"
                    >
                        <Image
                            src={
                                seller.profile ? seller.profile : defaultProfile
                            }
                            alt="profile"
                            width={400}
                            height={400}
                            className="h-full w-full rounded-xl object-cover "
                        />
                    </Link>
                </div>
            )}
            <div className="flex h-full w-5/6 flex-col ">
                <div className="h-1/2 w-full"> hey buy stuff here</div>

                <div className="flex h-1/2 w-full items-center justify-between ">
                    {seller && seller.username && (
                        <div className="flex flex-col">
                            <div className="text-green-500">Listed by:</div>
                            <Link
                                href={`/profile/public/${seller.username}`}
                                aria-label="seller profile"
                            >
                                {seller.username}
                            </Link>
                            <div className="text-green-500"></div>
                        </div>
                    )}

                    {allSellerStars._avg.starRating === null ? (
                        <div className="flex flex-col">
                            <div className="text-darkGray">
                                Unreviewed seller
                            </div>
                            <StarRating rating={0} />
                        </div>
                    ) : (
                        <StarRating rating={allSellerStars._avg.starRating} />
                    )}
                </div>
            </div>
        </div>
    );
}
