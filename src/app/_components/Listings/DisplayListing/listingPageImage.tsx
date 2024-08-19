"use client";

import Image from "next/image";
import { useGlobalState } from "../../Context/GlobalState/globalState";
import type { Images } from "@prisma/client";

interface ListingPageImageProps {
    images: Images[];
}

export default function ListingPageImage({ images }: ListingPageImageProps) {
    const { listingPageImageIndex, setListingPageImageIndex } =
        useGlobalState();

    // modal carosal and svgs to change image directly...

    

    return (
        images &&
        images[listingPageImageIndex] && (
            <>
                <Image
                    src={images[listingPageImageIndex].link}
                    alt="listing preview"
                    width={1000}
                    height={1000}
                    className="h-full w-full rounded-xl object-cover"
                    priority
                />
            </>
        )
    );
}
