import type { Listing } from "@prisma/client";
import { api } from "~/utils/api";
import Image from "next/image";

interface DisplayListingPhotosProps {
    keeb: Listing;
    // index: number;
}

export default function DisplayListingPhotos({
    keeb,
}: DisplayListingPhotosProps) {
    const { data: keebImages, isLoading } =
        api.image.getAllByResourceId.useQuery({
            resourceType: "LISTING",
            resourceId: keeb.id,
        });

    return (
        <>
            <div></div>
            {keebImages ? (
                <>
                    {keebImages.map((e, i) => (
                        <Image
                            key={i}
                            src={e.link}
                            alt="keeb"
                            width={1000}
                            height={1000}
                        />
                    ))}
                </>
            ) : (
                <>
                    <div>Loading imagessss</div>
                </>
            )}
        </>
    );
}
