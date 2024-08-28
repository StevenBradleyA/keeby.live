import DisplayListingPage from "~/app/_components/Listings/Display/ListingPage";
import LoadingSpinner from "~/app/_components/Loading";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function ListingPage({
    params,
}: {
    params: { listingId: string };
}) {
    const { listingId } = params;
    const session = await getServerAuthSession();

    const listing = await api.listing.getOneById({
        id: listingId,
        userId: session && session.user.id ? session.user.id : undefined,
    });

    return (
        <>
            {listing ? (
                <DisplayListingPage listing={listing} />
            ) : (
                <div>
                    <LoadingSpinner size="20px" />
                </div>
            )}
        </>
    );
}
