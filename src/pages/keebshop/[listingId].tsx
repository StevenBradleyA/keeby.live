import { useRouter } from "next/router";
import DisplayListingPhotos from "~/components/KeebShop/DisplayListing/DisplayListingPhotos";
import { api } from "~/utils/api";

export default function ListingPage() {
    const router = useRouter();

    const listingId = router.query.listingId as string;

    const { data: keeb } = api.listing.getOne.useQuery({
        id: listingId,
    });


// TODO add seller rating info 
// TODO add comments, seller profile info, seller ratings, public profiels clickable, 
// TODO add youtube api video integration optional()




    return (




        <>
            {keeb ? (
                <div>
                    <div className=" flex justify-center mb-10 text-4xl text-green-500">{keeb.title}</div>
                    <DisplayListingPhotos keeb={keeb} />
                </div>
            ) : (
                <div> hey </div>
            )}
            <div>hey there big boi</div>
        </>
    );
}
