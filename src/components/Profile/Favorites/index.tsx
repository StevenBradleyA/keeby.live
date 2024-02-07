import { api } from "~/utils/api";
import Link from "next/link";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";
import { useState } from "react";
import LoadingSpinner from "~/components/Loading";

interface DisplayFavoriteListingsProps {
    userId: string;
}

export default function DisplayFavoriteListings({
    userId,
}: DisplayFavoriteListingsProps) {
    const { data: favoriteListings, isLoading } =
        api.favorite.getAllFavoriteListings.useQuery({
            userId,
        });
    const [isPhotoHover, setIsPhotoHover] = useState<boolean>(false);



    if (isLoading) {
        return (
            <div className="mt-10 flex justify-center ">
                <LoadingSpinner size="20px" />
            </div>
        );
    }

    return (
        <div className="mt-5 w-full flex flex-col items-center gap-5">
            {favoriteListings &&
                favoriteListings.map((e, i) => (
                    <Link
                        key={i}
                        href={{
                            pathname: "/keebshop/[listingId]",
                            query: { listingId: e.listing.id },
                        }}
                    >
                        {e.listing.images && e.listing.images[0] && (
                            <div
                                className="listing-preview-hover-effect relative w-72 h-40  cursor-pointer overflow-hidden rounded-xl"
                                onMouseEnter={() => setIsPhotoHover(true)}
                                onMouseLeave={() => setIsPhotoHover(false)}
                            >
                                <Image
                                    alt="preview"
                                    src={
                                        e.listing.images[0].link
                                            ? e.listing.images[0].link
                                            : keebo
                                    }
                                    width={600}
                                    height={600}
                                    className={`h-full w-full object-cover`}
                                />
                                <div></div>

                                <div
                                    className={`${
                                        isPhotoHover
                                            ? "show-listing-hover-content"
                                            : "hide-listing-hover-content"
                                    }   absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform`}
                                >
                                    <div className="text-green-500  ">
                                        {e.listing.title}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Link>
                ))}
        </div>
    );
}


