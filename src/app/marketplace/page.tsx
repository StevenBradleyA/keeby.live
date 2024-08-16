import Footer from "../_components/Footer/footer";
import GetAllPreviewListings from "../_components/Listings/Display/Previews/getAllPreviewListings";
import MarketplacePreviewFilters from "../_components/Listings/Display/Previews/marketplacePreviewFilters";

export default function KeebShopHome({
    searchParams,
}: {
    searchParams?: {
        filter: string;
        layoutType: string;
        soundType: string;
        switchType: string;
        pcbType:string; 
        minPrice: string; 
        maxPrice: string;
        search: string;
    };
}) {
    return (
        <>
            <div className="h-44 w-full fixed top-0 left-0 right-0 z-20 bg-dark"></div>
            <MarketplacePreviewFilters />
            <GetAllPreviewListings searchParams={searchParams} />
            <div className="mt-96 w-full">
                <Footer />
            </div>
        </>
    );
}
