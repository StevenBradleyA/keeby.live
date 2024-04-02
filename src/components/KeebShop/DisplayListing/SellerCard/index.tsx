import Image from "next/image";
import Link from "next/link";
import defaultProfile from "@public/Profile/profile-default.png";
import StarRating from "~/components/Reviews/Star/starRating";

interface SellerListingProps {
    seller: {
        id: string;
        username: string | null;
        selectedTag: string | null;
        profile: string | null;
        avgRating?: number | null;
    };
}

export default function SellerListingCard({ seller }: SellerListingProps) {
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
                                className="text-white hover:text-green-500 hover:underline"
                            >
                                {seller.username}
                            </Link>
                            <div className="text-green-500"></div>
                        </div>
                    )}

                    {seller.avgRating ? (
                        <StarRating rating={seller.avgRating} />
                    ) : (
                        <div className="flex flex-col">
                            <div className="text-darkGray">
                                Unreviewed seller
                            </div>
                            <StarRating rating={0} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
