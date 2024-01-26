import LoadingSpinner from "~/components/Loading";
import { api } from "~/utils/api";
import EachListingCardPreview from "./eachListingCardPreview";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";

interface DisplayPopularListingPreviewsProps {
    searchInput: string;
    switchType: string;
}

interface Filters {
    searchQuery?: string;
    switchType?: string;
}

export default function DisplayPopularListingPreviews({
    searchInput,
    switchType,
}: DisplayPopularListingPreviewsProps) {
    const queryInputs: Filters = {};

    if (searchInput.length > 0) {
        queryInputs.searchQuery = searchInput;
    }
    if (switchType.length > 0) {
        queryInputs.switchType = switchType;
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
