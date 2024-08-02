import LoadingSpinner from "~/app/_components/Loading";
import { api } from "~/trpc/react";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";
import { useEffect, useRef } from "react";
import ListingPagePreviewCard from "./listingPagePreviewCard";

interface Filters {
    searchQuery?: string;
    switchType?: string;
    soundType?: string;
    minPrice?: number;
    maxPrice?: number;
    layoutType?: string;
    assemblyType?: string;
    hotSwapType?: string;
    priceOrder?: string;
}

export default function ListingPagePreviews() {
    const scrollFlagRef = useRef<HTMLDivElement | null>(null);
    const queryInputs: Filters = {};

    const {
        data: keebData,
        hasNextPage,
        fetchNextPage,
        isLoading,
        isFetchingNextPage,
    } = api.listing.getAllWithFilters.useInfiniteQuery(
        {
            ...queryInputs,
            limit: 8,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        },
    );

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

    if (isLoading) {
        return (
            <div className="mt-44">
                <LoadingSpinner size="40px" />
            </div>
        );
    }

    return (
        <>
            {keebData && keebData.pages.length > 0 && (
                <div className={`flex w-full flex-wrap gap-5  `}>
                    {keebData.pages.map((page) =>
                        page.listings.map((keeb, i) => (
                            <ListingPagePreviewCard
                                key={keeb.id}
                                keeb={keeb}
                                index={i}
                            />
                        )),
                    )}

                    <div ref={scrollFlagRef} className="h-10 w-full"></div>
                </div>
            )}
            {isFetchingNextPage && (
                <div className="flex w-full justify-center">
                    <LoadingSpinner size="40px" />
                </div>
            )}

            {keebData && keebData.pages[0]?.listings.length === 0 && (
                <div className=" mt-5 flex items-end gap-2 text-mediumGray">
                    <h1>
                        {`Woah, all sold out. There are currently no listings for sale `}
                    </h1>
                    <Image src={keebo} alt="keeby mascot" className="w-10" />
                </div>
            )}
        </>
    );
}
