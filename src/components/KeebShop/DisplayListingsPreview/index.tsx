import { api } from "~/utils/api";
import type { Listing } from "@prisma/client";
import Image from "next/image";
import matrix from "@public/Gifs/matrix.gif";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

interface EachListingCardProps {
    keeb: Listing;
    index: number;
}

export default function EachListingCardPreview({ keeb }: EachListingCardProps) {
    // would we want seller stars on listing display?

    const { data: previewImage, isLoading } =
        api.image.getAllByResourceId.useQuery({
            resourceType: "LISTINGPREVIEW",
            resourceId: keeb.id,
        });

    return (
        <div className="flex w-[30%] flex-col">
            <Link
                href={{
                    pathname: "/keebshop/[listingId]",
                    query: { listingId: keeb.id },
                }}
            >
                {previewImage && previewImage[0] && previewImage[0].link ? (
                    <div className="cursor-pointer">
                        <Image
                            alt="preview"
                            src={previewImage[0].link}
                            width={600}
                            height={600}
                            className={`h-[250px] w-full rounded-3xl object-cover`}
                        />
                    </div>
                ) : (
                    <Image
                        alt="preview"
                        src={matrix}
                        width={200}
                        height={200}
                    />
                )}
                <div>{keeb.title}</div>
                <div className="text-green-500">{`$${keeb.price}`}</div>
            </Link>
        </div>
    );
}
