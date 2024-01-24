import type { Images } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import ListingGalleryPreview from "./previewImage";
import ListingGalleryExtras from "./extraImages";

interface ListingExtraGalleryProps {
    allKeebImages: Images[];
    isPreview: boolean;
}

export default function ListingGallery({
    allKeebImages,
    isPreview,
}: ListingExtraGalleryProps) {
    const [displayImage, setDisplayImage] = useState(allKeebImages[0]);

    // instead of selectively rendering we need to selectively show using css
    console.log('hello', displayImage)

    
    return (
        <>
            {displayImage && (
                <>
                    <div
                        className={`${
                            isPreview ? "opacity-100" : "absolute opacity-0"
                        }`}
                    >
                        <ListingGalleryPreview displayImage={displayImage} />
                    </div>
                    <div
                        className={`${
                            !isPreview ? "opacity-100 relative" : "absolute opacity-0"
                        }`}
                    >
                        <ListingGalleryExtras
                            allKeebImages={allKeebImages}
                            displayImage={displayImage}
                            setDisplayImage={setDisplayImage}
                        />
                    </div>
                </>
            )}
        </>
    );
}
