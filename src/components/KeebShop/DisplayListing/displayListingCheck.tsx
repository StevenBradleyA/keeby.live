import MainFooter from "~/components/Footer";
import DisplayListingPage from "~/components/KeebShop/DisplayListing";
import LoadingSpinner from "~/components/Loading";
import { api } from "~/utils/api";

interface DisplayListingCheckProps {
    listingId: string;
}

export default function DisplayListingCheck({
    listingId,
}: DisplayListingCheckProps) {
    // todo add seller info here make custom ts

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
            <div className="w-full desktop:px-16 text-black mb-96">
                {listing && <DisplayListingPage listing={listing} />}
            </div>
            <MainFooter />
        </>
    );
}
