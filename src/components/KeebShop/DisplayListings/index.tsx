import { api } from "~/utils/api";
import type { Listing } from "@prisma/client";
import Image from "next/image";
import matrix from "@public/Gifs/matrix.gif";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface EachListingCardProps {
    keeb: Listing;
    index: number;
}

export default function EachListingCard({ keeb }: EachListingCardProps) {
    const { data: previewImage, isLoading } =
        api.image.getAllByResourceId.useQuery({
            resourceType: "LISTINGPREVIEW",
            resourceId: keeb.id,
        });

    return (
        <div className="flex flex-col w-full">
            {previewImage && previewImage[0] && previewImage[0].link ? (
                <div className=" cursor-pointer">
                    <Image
                        alt="preview"
                        src={previewImage[0].link}
                        width={600}
                        height={600}
                        className={`rounded-3xl object-cover`}
                    />
                </div>
            ) : (
                <Image alt="preview" src={matrix} width={200} height={200} />
            )}
            <div className="">
                <div>{keeb.title}</div>
                <div>{keeb.price}</div>
            </div>
        </div>
    );
}
