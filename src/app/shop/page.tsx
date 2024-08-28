import Footer from "../_components/Footer/footer";
import LoadingSpinner from "../_components/Loading";
import DisplayPicks from "../_components/Picks/Display/displayPicks";
import PickParams from "../_components/Picks/Display/pickParams";
import SubPickParams from "../_components/Picks/Display/subPickParams";
import { Suspense } from "react";

export default function Shop({
    searchParams,
}: {
    searchParams?: {
        category: string;
        color: string;
        priceOrder: string;
        layoutType: string;
        caseMaterial: string;
        assemblyType: string;
        pcbType: string;
        soundType: string;
        switchType: string;
        preLubed: string;
        keycapMaterial: string;
        profileType: string;
        page: string;
        search: string;
    };
}) {
    return (
        <>
            <Suspense
                fallback={
                    <div className="mt-48 flex w-full justify-center">
                        <LoadingSpinner size="20px" />
                    </div>
                }
            >
                <div className="px-16 mt-40 flex flex-col w-full items-center z-30 relative">
                    <div className="flex desktop:w-3/4 gap-3 h-72">
                        <div className="w-[35rem] bg-mediumGray rounded-3xl shadow-lg h-full"></div>
                        <div className="flex w-96 h-full flex-col gap-3">
                            <div className="w-full h-3/4 bg-darkGray rounded-3xl shadow-lg"></div>
                            <div className="w-full h-1/4 bg-darkGray rounded-3xl shadow-lg"></div>
                        </div>
                        <div className="h-full w-full flex flex-col ">
                            <h1 className="text-6xl w-full flex justify-end">
                                Explore Keyboard Parts
                            </h1>
                            <div className="flex w-full  h-full gap-3">
                                <div className="w-full h-full bg-darkGray rounded-3xl shadow-lg"></div>
                                <div className="w-20 h-full bg-mediumGray rounded-3xl shadow-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixed top-0 bg-dark z-20 left-0 right-0 w-full h-40"></div>
                <PickParams />

                <div className="w-full flex px-16 gap-10 mt-2">
                    <SubPickParams />
                    <div className="w-full min-h-[100rem] overflow-y-auto">
                        <DisplayPicks searchParams={searchParams} />
                    </div>
                </div>

                <div className="mt-10 z-40 relative">
                    <Footer />
                </div>
            </Suspense>
        </>
    );
}
