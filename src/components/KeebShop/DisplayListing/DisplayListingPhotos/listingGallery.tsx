import type { Images } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

interface ListingGalleryProps {
    allKeebImages: Images[];
}

export default function ListingGallery({ allKeebImages }: ListingGalleryProps) {
    const [displayImage, setDisplayImage] = useState(allKeebImages[0]);

    return (
        <>
            {displayImage && (
                <>
                    <Image
                        src={displayImage.link}
                        alt="keeb"
                        width={1000}
                        height={1000}
                        className="bject-cover"
                    />

                    <div className="flex w-40">

                    {allKeebImages.map((e, i) => {
                        // if (e.id === displayImage.id) return null;
                        // lets do a color border instead 
                        // if more than 5 images lets make an expand or something
                        return (
                            
                            <Image
                                key={i}
                                src={e.link}
                                alt="keeb"
                                width={1000}
                                height={1000}
                                onClick={() => setDisplayImage(e)}
                                className="cursor-pointer "
                            />
                        );
                    })}

                    </div>
                </>
            )}
        </>
    );
}
