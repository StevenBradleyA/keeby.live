import Footer from "../_components/Footer/footer";
import MarketplacePreviewFilters from "../_components/Listings/Display/Previews/marketplacePreviewFilters";

export default function KeebShopHome() {
    return (
        <>
            <div className="h-44 w-full fixed top-0 left-0 right-0 z-20 bg-dark"></div>
            <MarketplacePreviewFilters />

            <div className="mt-96 w-full">
                <Footer />
            </div>
        </>
    );
}
