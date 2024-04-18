import { api } from "~/utils/api";
import EachOfferCard from "./eachOfferCard";

export default function DisplayOffers({ userId }: { userId: string }) {
    const { data: allOffers } = api.offer.getAllByUserId.useQuery(userId);

    console.log(allOffers);

    return (
        <div className="mt-5 w-full font-poppins">
            <h2 className="mb-2">
                Offers Received ({" "}
                {allOffers ? allOffers.offersReceived.length : 0} )
            </h2>
            {allOffers?.offersReceived.map((listing) => (
                <div key={listing.id}>
                    <EachOfferCard listing={listing} />
                </div>
            ))}
            <h2 className="mb-2 mt-5">
                Offers Sent ( {allOffers ? allOffers.offersSent.length : 0} )
            </h2>

            {allOffers?.offersSent.map((listing) => (
                <div key={listing.id}>
                    {/* <EachOfferCard listing={listing}/> */}
                </div>
            ))}
        </div>
    );
}
