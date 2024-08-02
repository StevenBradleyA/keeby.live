import type { Images, Listing } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { api } from "~/trpc/react";
import Image from "next/image";
import LoadingSpinner from "~/app/_components/Loading";
import SellerListingCard from "./SellerCard";
import ListingSoundTest from "./SoundTest";
import ChevronRound from "~/app/_components/Svgs/chevron";
import ListingPageFavorite from "./Favorite";
import CreateComment from "~/app/_components/Comments/Create";
import EachCommentCard from "~/app/_components/Comments/Display/eachCommentCard";
import ListingPagePreviews from "./DisplayListingsPreview/listingPagePreviews";

interface DisplayListingPageProps {
    listing: ListingWithImagesAndCount;
}

interface ListingWithImagesAndCount extends Listing {
    images: Images[];
    _count: {
        comments: number;
    };
    seller: {
        id: string;
        username: string | null;
        selectedTag: string | null;
        profile: string | null;
        avgRating?: number | null;
    };
}

export default function DisplayListingPage({
    listing,
}: DisplayListingPageProps) {
    const { data: session } = useSession();
    const scrollFlagRef = useRef<HTMLDivElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const {
        data: comments,
        hasNextPage,
        fetchNextPage,
        isLoading,
        isFetchingNextPage,
    } = api.comment.getAllByTypeId.useInfiniteQuery(
        {
            type: "listing",
            typeId: listing.id,
            userId: session?.user.id,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        },
    );

    const [displayImage, setDisplayImage] = useState(listing.images[0]);

    const currentListingNameArr = listing.title.split(" ");
    const smallTitle = currentListingNameArr.pop();
    const bigTitle = currentListingNameArr.join(" ");

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const maxIndex = Math.max(0, listing.images.length - 4);

    const nextImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex < maxIndex ? prevIndex + 1 : prevIndex,
        );
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
    };

    useEffect(() => {
        if (isLoading || isFetchingNextPage || !hasNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0] && entries[0].isIntersecting) {
                    void fetchNextPage();
                }
            },
            { threshold: 1.0 },
        );

        const currentFlag = scrollFlagRef.current;
        if (currentFlag) {
            observer.observe(currentFlag);
        }

        return () => {
            if (observer && currentFlag) {
                observer.unobserve(currentFlag);
            }
        };
    }, [hasNextPage, isLoading, isFetchingNextPage, fetchNextPage]);

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
                                        : "text-white hover:text-green-500"
                                }`}
                                onClick={prevImage}
                            >
                                <ChevronRound />
                            </button>
                            <button
                                className={`absolute bottom-2 left-1/2 w-7 -translate-x-1/2 rotate-180 transform ${
                                    currentIndex === maxIndex
                                        ? "text-darkGray"
                                        : "text-white hover:text-green-500"
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
                                {listing.images.map((e, i) => {
                                    return (
                                        <button
                                            className="h-1/4 w-full listing-page-image"
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
                                                className="h-full w-full rounded-xl object-cover "
                                                priority
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

                    <div className="relative flex h-[60%] w-full justify-center rounded-xl ">
                        {displayImage && (
                            <Image
                                src={displayImage.link}
                                alt="listing preview"
                                width={1000}
                                height={1000}
                                className="h-full w-full rounded-xl object-cover"
                                priority
                            />
                        )}
                        {session && session.user && (
                            <ListingPageFavorite
                                userId={session.user.id}
                                listingId={listing.id}
                            />
                        )}
                    </div>
                    <div className="h-[30%] w-full overflow-hidden rounded-xl bg-keebyGray">
                        <SellerListingCard listing={listing} />
                    </div>
                </div>
                <div className="flex h-full w-1/4 flex-col items-center gap-10 px-5">
                    <div className=" h-1/3 w-full overflow-hidden rounded-xl bg-keebyGray tablet:p-4 desktop:p-10  ">
                        <h2 className=" text-xl desktop:text-2xl ">
                            Keeb Specs
                        </h2>
                        <div className="h-full overflow-auto pb-5 desktop:mt-2 desktop:pb-0 ">
                            <h3 className=" text-darkGray">{listing.title}</h3>
                            <h3 className="flex w-full gap-2 ">
                                <span className=" text-darkGray">{`Keycaps `}</span>
                                <span className="break-all">
                                    {listing.keycaps}
                                </span>
                            </h3>
                            <h3 className="flex gap-2">
                                <span className="text-darkGray">{`Switches `}</span>
                                <span className="break-all">
                                    {listing.switches}
                                </span>
                            </h3>
                            <h3 className="flex gap-2">
                                <span className="text-darkGray">{`Switch type `}</span>
                                <span className="break-all">
                                    {listing.switchType}
                                </span>
                            </h3>
                            <h3 className="flex gap-2">
                                <span className="text-darkGray">{`Sound type `}</span>
                                <span className="break-all">
                                    {listing.soundType}
                                </span>
                            </h3>
                            <h3 className="flex gap-2">
                                <span className="text-darkGray">{`PCB `}</span>
                                <span className="break-all">
                                    {listing.pcbType}
                                </span>
                            </h3>
                        </div>
                    </div>
                    <div className="h-2/3 w-full overflow-hidden rounded-xl bg-keebyGray tablet:p-4 desktop:p-10 ">
                        <h2 className="mb-2 text-3xl text-purple">
                            Description
                        </h2>
                        <div className="h-full overflow-auto pb-20">
                            <p className=" break-words">{listing.text}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-full ">
                <div className="flex w-3/4 flex-col px-5 ">
                    {listing.soundTest && (
                        <div className="mt-10 flex h-[35rem] w-full  ">
                            <ListingSoundTest soundTest={listing.soundTest} />
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
                        {comments && comments.pages.length > 0 && (
                            <>
                                {comments.pages.map((page) =>
                                    page.comments.map((comment, i) => (
                                        <EachCommentCard
                                            key={i}
                                            comment={comment}
                                            type="listing"
                                            typeId={listing.id}
                                        />
                                    )),
                                )}
                                <div
                                    ref={scrollFlagRef}
                                    className="h-10 w-full"
                                ></div>
                            </>
                        )}
                    </div>
                </div>
                <div className="mt-10 w-1/4 px-5 ">
                    <div className="flex flex-col items-center overflow-hidden rounded-xl bg-keebyGray p-5">
                        <ListingPagePreviews />
                    </div>
                </div>
            </div>
        </div>
    );
}
