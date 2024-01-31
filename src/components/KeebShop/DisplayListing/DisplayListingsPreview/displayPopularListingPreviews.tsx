import LoadingSpinner from "~/components/Loading";
import { api } from "~/utils/api";
import EachListingCardPreview from "./eachListingCardPreview";
import Image from "next/image";
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

    const { data: keebData, isLoading } =
        api.listing.getAllSortedByPopularityWithFilters.useQuery(queryInputs);

    if (isLoading) {
        return (
            <div className="mt-44">
                <LoadingSpinner size="40px" />
            </div>
        );
    }

    return (
        <>
            {keebData && keebData.length > 0 ? (
                <div className={`flex w-full flex-wrap gap-5  `}>
                    {keebData.map((keeb, i) => (
                        <EachListingCardPreview key={i} keeb={keeb} index={i} />
                    ))}
                </div>
            ) : (
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
