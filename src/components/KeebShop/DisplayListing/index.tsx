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
import ChevronRound from "~/components/Svgs/chevron";

interface DisplayListingPageProps {
    listing: Listing;
    allListingImages: Images[];
}

export default function DisplayListingPage({
    listing,
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

    // TODO ability to favorite / unfavorite the listing
    // todo I want to have comments next to other listings and banner ads like the nicely styled ones on youtube
    // may want to add a placeholder in the mean time
    // todo favorite, new listings on bottom,

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
                                className={`absolute left-1/2 top-2 w-7 -translate-x-1/2 transform ${
                                    currentIndex === 0
                                        ? "text-darkGray"
                                        : "text-white"
                                }`}
                                onClick={prevImage}
                            >
                                <ChevronRound />
                            </button>
                            <button
                                className={`absolute bottom-2 left-1/2 w-7 -translate-x-1/2 rotate-180 transform ${
                                    currentIndex === maxIndex
                                        ? "text-darkGray"
                                        : "text-white"
                                }`}
                                onClick={nextImage}
                            >
                                <ChevronRound />
                            </button>

                            <div
                                className={` flex h-full w-full flex-col items-center gap-5 `}
                                style={{
                                    transform: `translateY(-${
                                        currentIndex * 40
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
                <div className="flex h-full w-1/2 flex-col items-center  gap-10 px-5">
                    <div className="flex h-[10%] w-full justify-center rounded-xl bg-keebyGray ">
                        <h1 className=" listing-page-title-big  px-5 font-titillium text-5xl ">
                            {bigTitle}
                        </h1>
                        {currentListingNameArr.length > 0 && (
                            <h1 className="listing-page-title-small relative right-4 top-7 font-yellowTail text-4xl">
                                {smallTitle}
                            </h1>
                        )}
                    </div>

                    <div className="flex h-[60%] w-full justify-center rounded-xl ">
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
                    <div className="h-[30%] w-full overflow-hidden rounded-xl bg-keebyGray">
                        {sellerInfo && (
                            <SellerListingCard sellerInfo={sellerInfo} />
                        )}
                    </div>
                </div>
                <div className="flex h-full w-1/4 flex-col items-center gap-10  px-5">
                    <div className=" h-1/3 w-full overflow-hidden rounded-xl  bg-keebyGray px-10 py-5 ">
                        <h1 className="mb-2 text-2xl ">Keeb Specs</h1>
                        <div className="h-full overflow-auto">
                            <h3 className=" text-darkGray">{listing.title}</h3>
                            <h3 className="flex gap-2">
                                <span className="text-darkGray">{`Keycaps `}</span>
                                {listing.keycaps}
                            </h3>
                            <h3 className="flex gap-2">
                                <span className="text-darkGray">{`Switches `}</span>
                                {listing.switches}
                            </h3>
                            <h3 className="flex gap-2">
                                <span className="text-darkGray">{`Switch type `}</span>
                                {listing.switchType}
                            </h3>
                            <h3 className="flex gap-2">
                                <span className="text-darkGray">{`Sound type `}</span>
                                {listing.soundType}
                            </h3>
                            <h3 className="flex gap-2">
                                <span className="text-darkGray">{`PCB `}</span>
                                {listing.pcbType}
                            </h3>
                        </div>
                    </div>
                    <div className="h-2/3 w-full overflow-hidden rounded-xl bg-keebyGray p-10 ">
                        <h1 className="mb-2 text-3xl text-purple">
                            Description
                        </h1>
                        <div className="h-full overflow-auto">
                            <p className=" break-words">{listing.text}</p>
                        </div>
                    </div>
                </div>
            </div>

            {listing.soundTest && (
                <div className="mt-10 flex px-5 ">
                    <ListingSoundTest soundTest={listing.soundTest} />
                </div>
            )}

            <div className="mt-10 w-3/4 px-5">
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
        </div>
    );
}
