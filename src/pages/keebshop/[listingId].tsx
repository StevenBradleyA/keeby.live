import { useRouter } from "next/router";
import DisplayListingPhotos from "~/components/KeebShop/DisplayListing";
import { api } from "~/utils/api";

export default function ListingPage() {
    const router = useRouter();

    const listingId = router.query.listingId as string;

    const { data: keeb } = api.listing.getOne.useQuery({
        id: listingId,
    });

    return (
        <>
            {keeb ? (
                <div>
                    <div>{keeb.title}</div>
                    <DisplayListingPhotos keeb={keeb} />
                </div>
            ) : (
                <div> hey </div>
            )}
            <div>hey there big boi</div>
        </>
    );
}
