"use client";
import type { Images, Listing } from "@prisma/client";
import { useSession } from "next-auth/react";
import SellerListingCard from "./SellerCard";
import ListingSoundTest from "./SoundTest";
import ListingPageFavorite from "./Favorite";
import CreateComment from "~/app/_components/Comments/Create";
import Footer from "../../Footer/footer";
import DisplayComments from "../../Comments/Display/displayComments";
import ListingPagePhotoSideBar from "./listingPagePhotoSideBar";
import ListingPageImage from "./listingPageImage";

interface DisplayListingPageProps {
    listing: ListingWithImagesAndCount;
}

interface ListingWithImagesAndCount extends Listing {
    images: Images[];
    _count: {
        comments: number;
        favorites: number;
    };
    seller: {
        id: string;
        username: string | null;
        selectedTag: string | null;
        profile: string | null;
        avgRating?: number | null;
    };
    isFavorited?: boolean;
    favoriteId?: string;
}

export default function DisplayListingPage({
    listing,
}: DisplayListingPageProps) {
    const { data: session } = useSession();

    const currentListingNameArr = listing.title.split(" ");
    const smallTitle = currentListingNameArr.pop();
    const bigTitle = currentListingNameArr.join(" ");

    // todo lets move seller card here then just component for modals...
    // also lets add comment count .. time listed... favorite count ... yeah know info that is useful. plus a redesign would look real noice...

    return (
        <>
            <div className="flex flex-col text-white mt-40 w-full">
                <div className="flex h-[80vh] w-full px-3 laptop:px-5 desktop:px-16 gap-3 desktop:gap-10  ">
                    <div className="hidden laptop:flex w-1/4 laptop:flex-shrink-0 h-full">
                        <ListingPagePhotoSideBar images={listing.images} />
                    </div>
                    <div className="flex h-full w-full flex-col items-center  gap-5 laptop:gap-10">
                        <div className="flex w-full justify-center rounded-xl bg-darkGray ">
                            <h1 className=" listing-page-title-big  px-5 font-titillium text-5xl ">
                                {bigTitle}
                            </h1>
                            {currentListingNameArr.length > 0 && (
                                <h1 className="listing-page-title-small relative right-4 top-7 font-yellowTail text-4xl">
                                    {smallTitle}
                                </h1>
                            )}
                        </div>

                        <div className="relative flex h-[58%] flex-shrink-0 w-full justify-center rounded-xl bg-black/30 ">
                            <ListingPageImage images={listing.images} />

                            {/* {session && session.user && (
                                <ListingPageFavorite
                                    userId={session.user.id}
                                    listingId={listing.id}
                                />
                            )} */}
                        </div>
                        <div className="h-full w-full overflow-hidden rounded-xl bg-darkGray ">
                            <SellerListingCard listing={listing} />
                        </div>
                    </div>
                    <div className="flex h-full w-1/4 flex-col items-center gap-5 laptop:gap-10  flex-shrink-0 ">
                        <div className=" h-1/3 w-full overflow-hidden rounded-xl bg-darkGray tablet:p-4 desktop:p-10  ">
                            <h2 className=" text-xl desktop:text-2xl ">
                                Keeb Specs
                            </h2>
                            <div className="h-full overflow-auto pb-5 mt-2 desktop:pb-0 text-sm laptop:text-base">
                                <h3 className=" text-mediumGray">
                                    {listing.title}
                                </h3>
                                <p className="flex w-full gap-2 ">
                                    <span className=" text-mediumGray">{`Keycaps `}</span>
                                    <span className="break-all">
                                        {listing.keycaps}
                                    </span>
                                </p>
                                <p className="flex gap-2">
                                    <span className="text-mediumGray">{`Switches `}</span>
                                    <span className="break-all">
                                        {listing.switches}
                                    </span>
                                </p>
                                <p className="flex gap-2">
                                    <span className="text-mediumGray">{`Switch type `}</span>
                                    <span className="break-all">
                                        {listing.switchType}
                                    </span>
                                </p>
                                <p className="flex gap-2">
                                    <span className="text-mediumGray">{`Sound type `}</span>
                                    <span className="break-all">
                                        {listing.soundType}
                                    </span>
                                </p>
                                <p className="flex gap-2">
                                    <span className="text-mediumGray">{`PCB `}</span>
                                    <span className="break-all">
                                        {listing.pcbType}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="h-2/3 w-full overflow-hidden rounded-xl bg-darkGray tablet:p-4 desktop:p-10 ">
                            <h2 className="mb-2 text-xl desktop:text-2xl text-keebyPurple">
                                Description
                            </h2>
                            <div className="h-full overflow-auto pb-20 text-sm laptop:text-base">
                                <p className=" break-words">{listing.text}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex w-full ">
                    <div className="flex w-3/4 flex-col px-5 ">
                        {listing.soundTest && (
                            <div className="mt-10 flex h-[35rem] w-full  ">
                                <ListingSoundTest
                                    soundTest={listing.soundTest}
                                />
                            </div>
                        )}

                        <div className="mt-10 w-full">
                            <div className=" mb-1 flex gap-1">
                                <h1 className="text-lg text-green-500">
                                    {`${
                                        listing._count.comments
                                            ? listing._count.comments
                                            : 0
                                    } ${
                                        listing._count.comments === 1
                                            ? "COMMENT"
                                            : "COMMENTS"
                                    }`}
                                </h1>
                                <svg
                                    className="w-5"
                                    viewBox="0 0 24 24"
                                    fill="rgb(34 197 94)"
                                >
                                    <path d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"></path>
                                </svg>
                            </div>
                            <CreateComment typeId={listing.id} type="listing" />
                            <DisplayComments
                                typeId={listing.id}
                                type="listing"
                                userId={
                                    session && session.user.id
                                        ? session.user.id
                                        : undefined
                                }
                            />
                        </div>
                    </div>
                    {/* <div className="mt-10 w-1/4 px-5 ">
                    <div className="flex flex-col items-center overflow-hidden rounded-xl bg-darkGray p-5">
                        <ListingPagePreviews />
                    </div>
                </div> */}
                </div>
            </div>

            {/* <div className="mt-60 w-full">
                <Footer />
            </div> */}
        </>
    );
}
