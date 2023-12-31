import type { Listing } from "@prisma/client";
import { api } from "~/utils/api";
import ListingGallery from "./listingGallery";

interface DisplayListingPhotosProps {
    keeb: Listing;
}

export default function DisplayListingPhotos({
    keeb,
}: DisplayListingPhotosProps) {
    const { data: allKeebImages, isLoading } =
        api.image.getCombinedListingImages.useQuery({
            resourceId: keeb.id,
        });

    return (
        <>
            {allKeebImages ? (
                <>
                    <ListingGallery allKeebImages={allKeebImages} />
                </>
            ) : (
                <>
                    <div>Loading previewwww</div>
                </>
            )}
        </>
    );
}
