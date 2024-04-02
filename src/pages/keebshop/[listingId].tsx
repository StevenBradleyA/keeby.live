import { useRouter } from "next/router";
import DisplayListingCheck from "~/components/KeebShop/DisplayListing/displayListingCheck";

export default function ListingPage() {
    const router = useRouter();
    const listingId = router.query.listingId as string;

    return listingId && <DisplayListingCheck listingId={listingId} />;
}
