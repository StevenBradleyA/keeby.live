import Footer from "../_components/Footer/footer";
import LoadingSpinner from "../_components/Loading";
import GetAllPreviewPosts from "../_components/Posts/Display/Previews/getAllPreviews";
import SharePreviewFilters from "../_components/Posts/Display/Previews/previewFilters";
import { Suspense } from "react";

export default function KeebShare({
    searchParams,
}: {
    searchParams?: { filter: string; tag: string; search: string };
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
                <div className="h-44 w-full fixed top-0 left-0 right-0 z-20 bg-dark"></div>
                <SharePreviewFilters />
                <GetAllPreviewPosts searchParams={searchParams} />
                <div className="mt-96 w-full relative z-30">
                    <Footer />
                </div>
            </Suspense>
        </>
    );
}
