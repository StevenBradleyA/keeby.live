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
                <div className="flex h-full w-1/2 flex-col items-center  gap-10 px-5">
                    <div className="flex h-[10%] w-full justify-center rounded-xl bg-keebyGray ">
                        <h1 className=" listing-page-title-big  px-5 font-titillium text-5xl ">
                            {bigTitle}
                        </h1>
                        <h1 className="listing-page-title-small relative right-6 top-5 font-yellowTail text-4xl">
                            {smallTitle}
                        </h1>
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

            <div className="mb-20 mt-96 text-9xl text-green-500">hello</div>
        </div>
    );
}

{
    /* <div className="flex gap-1 ">
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
</div> */
}
