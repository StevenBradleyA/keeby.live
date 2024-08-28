import { api } from "~/trpc/server";
import keebo from "@public/Profile/keebo.png";
import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";
import EachListingCardPreview from "../Previews/eachListingCardPreview";

export default async function ListingPagePreviews({
    listingId,
}: {
    listingId: string;
}) {
    const session = await getServerAuthSession();

    const listingData = await api.listing.getAllNewPreviewListings({
        userId: session && session.user.id ? session.user.id : undefined,
        listingId: listingId,
    });

    return (
        <>
            {listingData && listingData.listings.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                    {listingData.listings.map((listing) => (
                        <EachListingCardPreview
                            key={listing.id}
                            listing={listing}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex items-end gap-2 text-mediumGray">
                    <h1>{`Woah, there are currently no posts `}</h1>
                    <Image
                        src={keebo}
                        alt="keeby mascot"
                        className="w-10 h-10 object-contain"
                    />
                </div>
            )}
        </>
    );
}
