import { useRouter } from "next/router";
import DisplayListingPage from "~/components/KeebShop/DisplayListing";
import LoadingSpinner from "~/components/Loading";
import { api } from "~/utils/api";

export default function ListingPage() {
    const router = useRouter();
    const listingId = router.query.listingId as string;

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
        <div className="w-full  px-16 text-black">
            {listing && <DisplayListingPage listing={listing} />}
        </div>
    );
}
