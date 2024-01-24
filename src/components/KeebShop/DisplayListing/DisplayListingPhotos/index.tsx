import type { Listing } from "@prisma/client";
import { api } from "~/utils/api";
import LoadingSpinner from "~/components/Loading";
import ListingGallery from "./listingGallery";

interface DisplayListingPhotosProps {
    keeb: Listing;
    isPreview: boolean;
}

export default function DisplayListingPhotos({
    keeb,
    isPreview,
}: DisplayListingPhotosProps) {
    const { data: allKeebImages, isLoading } =
        api.image.getCombinedListingImages.useQuery({
            resourceId: keeb.id,
        });

    if (isLoading)
        return (
            <div className="mt-44">
                <LoadingSpinner size="40px" />
            </div>
        );

    return (
        <>
            {allKeebImages && (
                <ListingGallery
                    isPreview={isPreview}
                    allKeebImages={allKeebImages}
                />
            )}
        </>
    );
}
