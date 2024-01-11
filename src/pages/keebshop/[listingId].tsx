import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import DisplayComments from "~/components/Comments/Display";
import DisplayViewerCommments from "~/components/Comments/Display/displayViewerComments";
import DisplayListingPhotos from "~/components/KeebShop/DisplayListing/DisplayListingPhotos";
import SellerPublicProfile from "~/components/Profile/ListingPublicProfile";
import { api } from "~/utils/api";

export default function ListingPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const isSignedIn = session !== null;

    console.log("POGGGGGGGERSSS", isSignedIn);
    const listingId = router.query.listingId as string;

    const { data: keeb, isLoading } = api.listing.getOne.useQuery({
        id: listingId,
    });

    // TODO add seller rating info
    // TODO add comments, seller profile info, seller ratings, public profiels clickable,
    // TODO add youtube api video integration optional()
    // TODO ability to favorite / unfavorite the listing
    //
    const currentListingNameArr = keeb?.title.split(" ");
    const smallTitle = currentListingNameArr?.pop();
    const bigTitle = currentListingNameArr?.join(" ");

    if (isLoading) return <div>Loading listing</div>;

    return (
        <div className=" mx-16 w-2/3">
            {keeb ? (
                <div>
                    <div className="relative flex justify-center">
                        <h1 className=" listing-page-title-big absolute bottom-10  font-titillium text-7xl ">
                            {bigTitle}
                            <span className="listing-page-title-small absolute top-10 font-mrDafoe text-6xl">
                                {smallTitle}
                            </span>
                        </h1>
                    </div>
                    {/* <div className="pog-title">{keeb.title}</div> */}

                    <div className="flex justify-between">
                        <h3>{`listing price $${keeb.price}`}</h3>
                        <h3> 10 comments</h3>
                    </div>
                    <DisplayListingPhotos keeb={keeb} />

                    <div> title, switches, keycaps here</div>
                    <p className="mt-5 text-2xl">{keeb.text}</p>

                    <div className="mt-20 flex w-full justify-center ">
                        <div className="flex w-1/2 flex-col rounded-xl bg-black px-10">
                            <div className="flex justify-between">
                                <div className="text-4xl">{`Price: $${keeb.price}`}</div>
                                <div className="flex flex-col">
                                    <button className=" bg-green-500">
                                        buy now
                                    </button>
                                    <button className=" bg-green-500">
                                        make offer{" "}
                                    </button>
                                </div>
                            </div>
                            <SellerPublicProfile userId={keeb.userId} />
                            {/* <div> seller clickable profile here</div>
                                <div> seller rating</div> */}
                        </div>
                    </div>
                    <div className="mt-10 flex justify-center text-5xl">
                        {" "}
                        Sound Test
                    </div>
                    <div> youtube embed link here optional pog</div>

                    <div className="w-full">
                        {session && session.user.id ? (
                            <DisplayComments
                                typeId={keeb.id}
                                userId={session.user.id}
                            />
                        ) : (
                            <DisplayViewerCommments typeId={keeb.id} />
                        )}
                    </div>
                </div>
            ) : (
                <div>loading again </div>
            )}
        </div>
    );
}
