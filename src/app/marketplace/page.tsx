import Footer from "../_components/Footer/footer";
import GetAllPreviewListings from "../_components/Listings/Display/Previews/getAllPreviewListings";
import MarketplacePreviewFilters from "../_components/Listings/Display/Previews/marketplacePreviewFilters";
import { Suspense } from "react";

export default function KeebShopHome({
    searchParams,
}: {
    searchParams?: {
        filter: string;
        layoutType: string;
        soundType: string;
        switchType: string;
        pcbType: string;
        minPrice: string;
        maxPrice: string;
        search: string;
    };
}) {
    return (
        <>
            <Suspense
                fallback={
                    <div className="mt-48 flex w-full gap-10 px-2 tablet:px-5 desktop:px-16 ">
                        <div className="w-1/4 tablet:h-[68vh] desktop:h-[72vh] rounded-3xl skeleton-dark-glow overflow-hidden "></div>
                        <div className="w-3/4 flex gap-5 h-[60vh] flex-wrap">
                            <div className="skeleton-dark-glow h-48 w-72 desktop:h-64 desktop:w-96 rounded-2xl "></div>
                            <div className="skeleton-dark-glow h-48 w-72 desktop:h-64 desktop:w-96 rounded-2xl "></div>
                            <div className="skeleton-dark-glow h-48 w-72 desktop:h-64 desktop:w-96 rounded-2xl "></div>
                            <div className="skeleton-dark-glow h-48 w-72 desktop:h-64 desktop:w-96 rounded-2xl "></div>
                        </div>
                    </div>
                }
            >
                <div className="h-44 w-full fixed top-0 left-0 right-0 z-20 bg-dark"></div>
                <MarketplacePreviewFilters />
                <GetAllPreviewListings searchParams={searchParams} />
                <div className="mt-96 w-full relative z-30">
                    <Footer />
                </div>
            </Suspense>
        </>
    );
}
