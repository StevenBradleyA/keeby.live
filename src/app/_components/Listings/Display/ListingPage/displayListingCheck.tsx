import Footer from "../_components/Footer/footer";

import DisplayListingPage from "~/app/_components/Listings/Display/ListingPage";
import LoadingSpinner from "~/app/_components/Loading";
import { api } from "~/trpc/react";

interface DisplayListingCheckProps {
    listingId: string;
}

export default function DisplayListingCheck({
    listingId,
}: DisplayListingCheckProps) {
    const { data: listing, isLoading } = api.listing.getOne.useQuery({
        id: listingId,
    });

    if (isLoading)
        return (
            <div className="mt-44">
                <LoadingSpinner size="40px" />
            </div>
        );

    return (
        <>
            <div className="mb-96 w-full text-black desktop:px-16">
                {listing && <DisplayListingPage listing={listing} />}
            </div>
            <Footer />
        </>
    );
}
