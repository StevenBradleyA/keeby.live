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
    const currentListingNameArr = keeb?.title.split(" ");
    const smallTitle = currentListingNameArr?.pop();
    const bigTitle = currentListingNameArr?.join(" ");
    return (
        <>
            {keeb ? (
                <div>
                    <div className="  mb-10 flex justify-center">
                        <h1 className=" listing-page-title-big  font-titillium text-7xl ">
                            {bigTitle}
                        </h1>
                        <h1 className=" listing-page-title-small font-mrDafoe text-5xl">
                            {smallTitle}
                        </h1>
                    </div>
                    <div className="pog-title">{keeb.title}</div>
                    <DisplayListingPhotos keeb={keeb} />
                </div>
            ) : (
                <div> hey </div>
            )}
            <div>hey there big boi</div>
        </>
    );
}
