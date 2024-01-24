import { api } from "~/utils/api";
import type { Listing } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "~/components/Loading";
import { useState } from "react";
import { motion } from "framer-motion";

interface EachListingCardProps {
    keeb: Listing;
    index: number;
}

export default function EachListingCardPreview({ keeb }: EachListingCardProps) {
    const [isPhotoHover, setIsPhotoHover] = useState<boolean>(false);

    const { data: previewImage, isLoading } =
        api.image.getAllByResourceId.useQuery({
            resourceType: "LISTINGPREVIEW",
            resourceId: keeb.id,
        });

    if (isLoading) {
        return <LoadingSpinner size="40px" />;
    }

    return (
        <div className="flex w-96 flex-col">
            <Link
                href={{
                    pathname: "/keebshop/[listingId]",
                    query: { listingId: keeb.id },
                }}
            >
                {previewImage && previewImage[0] && previewImage[0].link && (
                    <div
                        className="listing-preview-hover-effect relative h-72 w-96  cursor-pointer overflow-hidden rounded-2xl "
                        onMouseEnter={() => setIsPhotoHover(true)}
                        onMouseLeave={() => setIsPhotoHover(false)}
                    >
                        <Image
                            alt="preview"
                            src={previewImage[0].link}
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
                            }   absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                        >
                            <div className="text-green-500  ">{`Check it out`}</div>
                        </div>
                    </div>
                )}
                <div className="text-darkGray">{keeb.title}</div>
                <div className="text-green-500">{`$${keeb.price / 100}`}</div>
            </Link>
        </div>
    );
}
