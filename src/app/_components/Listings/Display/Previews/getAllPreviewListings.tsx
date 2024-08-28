import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import keebo from "@public/Profile/keebo.png";
import EachListingCardPreview from "./eachListingCardPreview";

interface GetAllPreviewPostsProps {
    searchParams?: SearchParams;
}

interface SearchParams {
    filter?: string;
    soundType?: string;
    switchType?: string;
    layoutType?: string;
    pcbType?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
    page?: string;
}

interface Filters {
    search?: string;
    soundType?: string;
    switchType?: string;
    layoutType?: string;
    pcbType?: string;
    minPrice?: string;
    maxPrice?: string;
    filter?: string;
    userId?: string;
    page?: string;
}

export default async function GetAllPreviewListings({
    searchParams,
}: GetAllPreviewPostsProps) {
    const session = await getServerAuthSession();

    const filterParams: Filters = {};

    if (searchParams && searchParams.search) {
        filterParams.search = searchParams.search;
    }
    if (searchParams && searchParams.switchType) {
        filterParams.switchType = searchParams.switchType;
    }
    if (searchParams && searchParams.soundType) {
        filterParams.soundType = searchParams.soundType;
    }
    if (searchParams && searchParams.layoutType) {
        filterParams.layoutType = searchParams.layoutType;
    }
    if (searchParams && searchParams.minPrice) {
        filterParams.minPrice = searchParams.minPrice;
    }
    if (searchParams && searchParams.maxPrice) {
        filterParams.maxPrice = searchParams.maxPrice;
    }
    if (searchParams && searchParams.filter) {
        filterParams.filter = searchParams.filter;
    }
    if (searchParams && searchParams.page) {
        filterParams.page = searchParams.page;
    }
    if (session && session.user) {
        filterParams.userId = session.user.id;
    }

    const listingPreviews = await api.listing.getAllPreviewListings({
        ...filterParams,
    });

    return (
        <div className="mt-56 tablet:px-5 desktop:px-16 flex  w-full min-h-[60rem] ">
            <div className="w-1/4"></div>
            <div className=" h-full z-10 w-3/4 pl-10 flex gap-5 flex-wrap">
                {listingPreviews &&
                listingPreviews.listings &&
                listingPreviews.listings.length > 0 ? (
                    listingPreviews.listings.map((e) => (
                        <EachListingCardPreview key={e.id} listing={e} />
                    ))
                ) : (
                    <div className="flex gap-2 text-mediumGray">
                        <div className="flex items-end h-12 w-full">
                            <h1>{`Oops, no listings match your search`}</h1>
                            <Image
                                src={keebo}
                                alt="keeby mascot"
                                className="w-10 h-10 object-contain"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
