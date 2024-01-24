import type { Images } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ListingGalleryPreviewProps {
    displayImage: Images;
}

export default function ListingGalleryPreview({
    displayImage,
}: ListingGalleryPreviewProps) {

    console.log('IM NOT SURE WHT IS HAPPENING', displayImage)
    const [forceUpdate, setForceUpdate] = useState(0);

    useEffect(() => {
        setForceUpdate(prev => prev + 1); // Increment forceUpdate to trigger a re-render
    }, [displayImage]);
    
    return (
        <Image
        key={forceUpdate} // Use forceUpdate as the key
        src={displayImage.link}
            // src={`${displayImage.link}?v=${displayImage.id}`}
            alt="keeb"
            width={1000}
            height={1000}
            className="h-full w-full rounded-xl object-cover"
        />
    );
}
