import type { Images } from "@prisma/client";
import Image from "next/image";

interface ListingGalleryPreviewProps {
    displayImage: Images;
    setDisplayImage: (displayImage: Images) => void;
    allKeebImages: Images[];
}

export default function ListingGalleryExtras({
    allKeebImages,
    setDisplayImage,
}: ListingGalleryPreviewProps) {
    return (
        <div className=" flex w-full flex-col gap-5 ">
            {allKeebImages.map((e, i) => {
                //   if (e.id === displayImage.id) return null;
                //   lets do a color border instead
                //   if more than 5 images lets make an expand or something
                return (
                    <Image
                        key={i}
                        src={e.link}
                        alt="keeb"
                        width={1000}
                        height={1000}
                        onClick={() => setDisplayImage(e)}
                        className="w-40 cursor-pointer"
                    />
                );
            })}
        </div>
    );
}
