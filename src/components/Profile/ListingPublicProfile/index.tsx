import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";
import defaultProfile from "@public/Profile/profile-default.png";
import StarDisplay from "~/components/Reviews/Star";
import StarRating from "~/components/Reviews/Star/starRating";

interface SellerPublicProfileProps {
    userId: string;
}

export default function SellerPublicProfileCard({
    userId,
}: SellerPublicProfileProps) {
    const { data: sellerInfo, isLoading } = api.user.getSeller.useQuery(userId);
    // todo include reviews in this query

    // if profile pic then we display that otherwise we grab keebo
    // display seller rating if they have that otherwise we display blank stars
    return (
        sellerInfo && (
            <div className="flex justify-between">
                {sellerInfo.seller && sellerInfo.seller.username && (
                    <Link
                        href={`/profile/public/${sellerInfo.seller.username}`}
                        aria-label="seller profile"
                    >
                        <Image
                            src={
                                sellerInfo.seller.profile
                                    ? sellerInfo.seller.profile
                                    : defaultProfile
                            }
                            alt="profile"
                            width={400}
                            height={400}
                            className="w-20"
                        />
                    </Link>
                )}
                {sellerInfo.seller && sellerInfo.seller.username && (
                    <div className="flex flex-col">
                        <div className="text-darkGray">Listed by:</div>
                        <Link
                            href={`/profile/public/${sellerInfo.seller.username}`}
                            aria-label="seller profile"
                        >
                            {sellerInfo.seller.username}
                        </Link>
                        <div className="text-green-500"></div>
                    </div>
                )}

                {sellerInfo.allSellerStars._avg.starRating === null ? (
                    <div className="flex flex-col">
                        <div className="text-red-500">Unreviewed seller </div>
                        <StarRating rating={0} />
                    </div>
                ) : (
                    <StarRating
                        rating={sellerInfo.allSellerStars._avg.starRating}
                    />
                )}
            </div>
        )
    );
}
