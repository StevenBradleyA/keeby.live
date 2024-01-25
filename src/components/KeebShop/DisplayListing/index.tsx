import type { Listing } from "@prisma/client";
import type { Images } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";
import Image from "next/image";
import DisplayComments from "~/components/Comments/Display";
import DisplayViewerCommments from "~/components/Comments/Display/displayViewerComments";
import LoadingSpinner from "~/components/Loading";
import SellerListingCard from "./SellerCard";
import ListingSoundTest from "./SoundTest";
import MainFooter from "~/components/Footer";

interface DisplayListingPageProps {
    listing: Listing;
    commentCount: number;
    allListingImages: Images[];
}

export default function DisplayListingPage({
    listing,
    commentCount,
    allListingImages,
}: DisplayListingPageProps) {
    const { data: sellerInfo, isLoading: isLoading } =
        api.user.getSeller.useQuery(listing.sellerId);

    const { data: session } = useSession();

    const [displayImage, setDisplayImage] = useState(allListingImages[0]);

    const currentListingNameArr = listing.title.split(" ");
    const smallTitle = currentListingNameArr.pop();
    const bigTitle = currentListingNameArr.join(" ");

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const maxIndex = Math.max(0, allListingImages.length - 4);

    const nextImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex < maxIndex ? prevIndex + 1 : prevIndex
        );
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
    };

    // move seller query up here wiht loading
    // just pass props to seller card comp so its all guarenteed

    // TODO add seller rating info
    // TODO add youtube api video integration optional()
    // TODO ability to favorite / unfavorite the listing
    // todo Yellowtail font instead of mr dafoe?

    if (isLoading)
        return (
            <div className="mt-44">
                <LoadingSpinner size="40px" />
            </div>
        );

    return (
        <div className="flex flex-col text-white">
            <div className="flex h-[80vh] w-full ">
                <div className="flex w-1/4 flex-col items-center px-5 ">
                    <div className=" relative h-full w-full overflow-hidden rounded-xl bg-keebyGray p-10 ">
                        <div className=" h-full w-full overflow-hidden ">
                            <button
                                className={`absolute left-1/2 top-2 -translate-x-1/2 transform ${
                                    currentIndex === 0
                                        ? "text-darkGray"
                                        : "text-white"
                                }`}
                                onClick={prevImage}
                            >
                                Prev
                            </button>
                            <button
                                className={`absolute bottom-2 left-1/2 -translate-x-1/2 transform ${
                                    currentIndex === maxIndex
                                        ? "text-darkGray"
                                        : "text-white"
                                }`}
                                onClick={nextImage}
                            >
                                Next
                            </button>

                            <div
                                className={` flex h-full w-full flex-col items-center gap-5 `}
                                style={{
                                    transform: `translateY(-${
                                        currentIndex * 50
                                    }%)`,
                                    transition: "transform 0.3s ease-in-out",
                                }}
                            >
                                {allListingImages.map((e, i) => {
                                    return (
                                        <button
                                            className="h-1/4 w-full"
                                            key={i}
                                        >
                                            <Image
                                                src={e.link}
                                                alt="keeb"
                                                width={1000}
                                                height={1000}
                                                onClick={() =>
                                                    setDisplayImage(e)
                                                }
                                                className="h-full w-full rounded-xl object-cover"
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-1/2 flex-col items-center gap-10 px-5">
                    <div className="flex w-full justify-center rounded-xl bg-keebyGray ">
                        <h1 className=" listing-page-title-big  px-5 font-titillium text-5xl ">
                            {bigTitle}
                        </h1>
                        <h1 className="listing-page-title-small relative right-6 top-5 font-yellowTail text-4xl">
                            {smallTitle}
                        </h1>
                    </div>
                    <div className="flex h-3/5 w-full justify-center rounded-xl ">
                        {displayImage && (
                            <Image
                                src={displayImage.link}
                                alt="listing preview"
                                width={1000}
                                height={1000}
                                className="h-full w-full rounded-xl object-cover"
                            />
                        )}
                    </div>
                    <div className="h-full w-full overflow-hidden rounded-xl bg-keebyGray">
                        {sellerInfo && (
                            <SellerListingCard sellerInfo={sellerInfo} />
                        )}
                    </div>
                </div>
                <div className="flex w-1/4 flex-col items-center gap-10 px-5">
                    <div className=" h-1/3 w-full rounded-xl bg-keebyGray  p-10 ">
                        <h1>keeb Stats</h1>
                        <h3>{listing.title}</h3>
                        <h3>{listing.keycaps}</h3>
                        <h3>{listing.switches}</h3>
                        <h3>{listing.switchType}</h3>
                    </div>
                    <div className="h-2/3 w-full rounded-xl bg-keebyGray p-10 ">
                        <h1 className="text-3xl">Description</h1>
                        <p className=" mt-10 break-words">{listing.text}</p>
                    </div>
                </div>
            </div>

            {listing.soundTest && (
                <div className="mt-10 flex w-1/2 justify-center px-5 ">
                    <ListingSoundTest soundTest={listing.soundTest} />
                </div>
            )}

            <div className="mt-10 w-full px-5">
                {session && session.user.id ? (
                    <DisplayComments
                        typeId={listing.id}
                        userId={session.user.id}
                    />
                ) : (
                    <DisplayViewerCommments typeId={listing.id} />
                )}
            </div>
            <MainFooter />

            <div className="mb-20 mt-96 text-9xl text-green-500">hello</div>
        </div>
    );
}
