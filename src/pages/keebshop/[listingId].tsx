import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import DisplayComments from "~/components/Comments/Display";
import DisplayViewerCommments from "~/components/Comments/Display/displayViewerComments";
import DisplayListingPhotos from "~/components/KeebShop/DisplayListing/DisplayListingPhotos";
import SellerPublicProfileCard from "~/components/Profile/ListingPublicProfile";
import { api } from "~/utils/api";

export default function ListingPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const listingId = router.query.listingId as string;

    const { data: keeb, isLoading } = api.listing.getOne.useQuery({
        id: listingId,
    });

    const { data: commentCount, isLoading: isLoadingCommentCount } =
        api.comment.getAmountByTypeId.useQuery({
            type: "LISTING",
            typeId: listingId,
        });

    // TODO add seller rating info
    // TODO add youtube api video integration optional()
    // TODO ability to favorite / unfavorite the listing
    // todo add comment svg to comments number
    // todo Yellowtail font instead of mr dafoe?

    const currentListingNameArr = keeb?.title.split(" ");
    const smallTitle = currentListingNameArr?.pop();
    const bigTitle = currentListingNameArr?.join(" ");

    if (isLoading) return <div>Loading listing</div>;

    return (
        <div className=" mx-16 w-2/3">
            {keeb ? (
                <div>
                    <div className=" mb-14 flex justify-center ">
                        <h1 className=" listing-page-title-big  px-5 font-titillium text-7xl ">
                            {bigTitle}
                        </h1>
                        <h1 className="listing-page-title-small relative top-10 right-6 font-yellowTail text-6xl">
                            {smallTitle}
                        </h1>
                    </div>
                    {/* <div className="pog-title">{keeb.title}</div> */}

                    <div className="flex justify-between">
                        <h3 className="text-darkGray">{`Listing Price $${
                            keeb.price / 100
                        }`}</h3>
                        <div className="flex gap-1 ">
                            {commentCount && (
                                <h3 className="listing-gradient">
                                    {" "}
                                    {`${commentCount} Comments`}
                                </h3>
                            )}
                            <svg
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                fill="#f008e4"
                            >
                                <path d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"></path>
                            </svg>
                        </div>
                    </div>
                    <DisplayListingPhotos keeb={keeb} />

                    <div> title, switches, keycaps here</div>
                    <p className="mt-5 text-2xl">{keeb.text}</p>

                    <div className="mt-20 flex w-full justify-center ">
                        <div className="flex w-1/2 flex-col rounded-xl bg-black px-10">
                            <div className="flex justify-between">
                                <div className="text-4xl">{`Price: $${
                                    keeb.price / 100
                                }`}</div>
                                <div className="flex flex-col">
                                    <button className=" bg-green-500">
                                        buy now
                                    </button>
                                    <button className=" bg-green-500">
                                        make offer{" "}
                                    </button>
                                </div>
                            </div>
                            <SellerPublicProfileCard userId={keeb.sellerId} />
                            {/* <div> seller clickable profile here</div>
                                <div> seller rating</div> */}
                        </div>
                    </div>
                    {keeb.soundTest && keeb.soundTest.length > 0 && (
                        <>
                            <div className="sound-test-title mt-10 flex justify-center text-5xl">
                                SOUND TEST
                            </div>

                            <div>{keeb.soundTest}</div>
                        </>
                    )}

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
