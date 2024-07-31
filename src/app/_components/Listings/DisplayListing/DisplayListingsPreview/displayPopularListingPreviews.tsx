import LoadingSpinner from "~/app/_components/Loading";
import { api } from "~/utils/api";
import { useEffect, useRef } from "react";
import Image from "next/image";
import EachListingCardPreview from "./eachListingCardPreview";
import keebo from "@public/Profile/keebo.png";

interface DisplayPopularListingPreviewsProps {
    searchInput: string;
    switchType: string;
    soundType: string;
    isBudget: boolean;
    isBallin: boolean;
    minPrice: number | null;
    maxPrice: number | null;
    layoutType: string;
    assemblyType: string;
    hotSwapType: string;
    priceOrder: string;
}

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

// interface EachKeeb {
//     id: string;
//     title: string;
//     price: number;
//     switchType: string;
//     images: EachPreviewImage[];
//     commentCount: number;
// }

// interface EachPreviewImage {
//     id: string;
//     link: string;
// }

export default function DisplayPopularListingPreviews({
    searchInput,
    switchType,
    soundType,
    minPrice,
    maxPrice,
    isBudget,
    isBallin,
    layoutType,
    assemblyType,
    hotSwapType,
    priceOrder,
}: DisplayPopularListingPreviewsProps) {
    const scrollFlagRef = useRef<HTMLDivElement | null>(null);
    const queryInputs: Filters = {};

    if (searchInput.length > 0) {
        queryInputs.searchQuery = searchInput;
    }
    if (switchType.length > 0) {
        queryInputs.switchType = switchType;
    }
    if (soundType.length > 0) {
        queryInputs.soundType = soundType;
    }
    if (isBallin) {
        queryInputs.minPrice = 20000;
    }
    if (isBudget) {
        queryInputs.maxPrice = 20000;
    }
    if (!isBallin && !isBudget && minPrice !== null && maxPrice === null) {
        queryInputs.minPrice = minPrice * 100;
    }
    if (!isBallin && !isBudget && maxPrice !== null && minPrice === null) {
        queryInputs.maxPrice = maxPrice * 100;
    }
    if (!isBallin && !isBudget && minPrice !== null && maxPrice !== null) {
        if (maxPrice < minPrice) {
            queryInputs.minPrice = minPrice * 100;
        } else {
            queryInputs.minPrice = minPrice * 100;
            queryInputs.maxPrice = maxPrice * 100;
        }
    }

    if (priceOrder.length > 0) {
        queryInputs.priceOrder = priceOrder;
    }

    if (layoutType.length > 0) {
        queryInputs.layoutType = layoutType;
    }
    if (assemblyType.length > 0) {
        queryInputs.assemblyType = assemblyType;
    }
    if (hotSwapType.length > 0) {
        queryInputs.hotSwapType = hotSwapType;
    }

    const {
        data: keebData,
        hasNextPage,
        fetchNextPage,
        isLoading,
        isFetchingNextPage,
    } = api.listing.getAllSortedByPopularityWithFilters.useInfiniteQuery(
        {
            ...queryInputs,
            limit: 12,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );

    useEffect(() => {
        if (isLoading || isFetchingNextPage || !hasNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0] && entries[0].isIntersecting) {
                    void fetchNextPage();
                }
            },
            { threshold: 1.0 }
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
            <div className="ml-5 mt-20">
                <LoadingSpinner size="40px" />
            </div>
        );
    }

    return (
        <>
            {keebData && keebData.pages.length > 0 && (
                <div className={`flex w-full flex-wrap gap-5  `}>
                    {keebData.pages.map((page) =>
                        page.popularListings.map((keeb, i) => (
                            <EachListingCardPreview
                                key={keeb.id}
                                keeb={keeb}
                                index={i}
                            />
                        ))
                    )}
                    <div ref={scrollFlagRef} className="h-10 w-full"></div>
                </div>
            )}
            {isFetchingNextPage && (
                <div className="flex w-full justify-center">
                    <LoadingSpinner size="40px" />
                </div>
            )}

            {keebData && keebData.pages[0]?.popularListings.length === 0 && (
                <div className=" mt-5 flex items-end gap-2 text-darkGray">
                    <h1>
                        {`Woah, all sold out. There are currently no listings for sale `}
                    </h1>
                    <Image src={keebo} alt="keeby mascot" className="w-10" />
                </div>
            )}
        </>
    );
}
