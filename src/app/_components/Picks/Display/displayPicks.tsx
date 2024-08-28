import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import keebo from "@public/Profile/keebo.png";
import EachPickDisplay from "./eachPickDisplay";

interface GetAllPicksProps {
    searchParams?: SearchParams;
}

interface SearchParams {
    category?: string;
    color?: string;
    priceOrder?: string;
    layoutType?: string;
    caseMaterial?: string;
    assemblyType?: string;
    pcbType?: string;
    switchType?: string;
    keycapMaterial?: string;
    profileType?: string;
    soundType?: string;
    preLubed?: string;
    search?: string;
    page?: string;
}

interface Filters {
    userId?: string;
    category?: string;
    color?: string;
    priceOrder?: string;
    layoutType?: string;
    caseMaterial?: string;
    assemblyType?: string;
    pcbType?: string;
    switchType?: string;
    keycapMaterial?: string;
    profileType?: string;
    soundType?: string;
    preLubed?: string;
    page?: string;
    search?: string;
}

export default async function DisplayPicks({ searchParams }: GetAllPicksProps) {
    const session = await getServerAuthSession();

    const filterParams: Filters = {};

    if (searchParams && searchParams.category) {
        filterParams.category = searchParams.category;
    }
    if (searchParams && searchParams.color) {
        filterParams.color = searchParams.color;
    }
    if (searchParams && searchParams.priceOrder) {
        filterParams.priceOrder = searchParams.priceOrder;
    }
    if (searchParams && searchParams.page) {
        filterParams.page = searchParams.page;
    }
    if (searchParams && searchParams.search) {
        filterParams.search = searchParams.search;
    }

    //keeb
    if (searchParams && searchParams.layoutType) {
        filterParams.layoutType = searchParams.layoutType;
    }
    if (searchParams && searchParams.caseMaterial) {
        filterParams.caseMaterial = searchParams.caseMaterial;
    }
    if (searchParams && searchParams.pcbType) {
        filterParams.pcbType = searchParams.pcbType;
    }
    if (searchParams && searchParams.soundType) {
        filterParams.soundType = searchParams.soundType;
    }
    // keycaps
    if (searchParams && searchParams.keycapMaterial) {
        filterParams.keycapMaterial = searchParams.keycapMaterial;
    }
    if (searchParams && searchParams.profileType) {
        filterParams.profileType = searchParams.profileType;
    }
    // switch
    if (searchParams && searchParams.switchType) {
        filterParams.switchType = searchParams.switchType;
    }
    if (searchParams && searchParams.preLubed) {
        filterParams.preLubed = searchParams.preLubed;
    }

    // optional for otimistic UI updating
    if (session && session.user) {
        filterParams.userId = session.user.id;
    }

    const picks = await api.pick.getAllPicksWithParams({
        ...filterParams,
    });

    return (
        <>
            <div className="flex w-full flex-wrap gap-3">

            {picks && picks.length > 0 ? (
                picks.map((e) => <EachPickDisplay key={e.id} pick={e} />)
            ) : (
                <div className="flex gap-2 text-mediumGray">
                    <div className="flex items-end h-12 w-full">
                        <h1>{`Oops, no products match your search`}</h1>
                        <Image
                            src={keebo}
                            alt="keeby mascot"
                            className="w-10 h-10 object-contain"
                            />
                    </div>
                </div>
            )}
            </div>
        </>
    );
}
