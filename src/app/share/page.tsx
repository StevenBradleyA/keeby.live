import Footer from "../_components/Footer/footer";
import GetAllPreviewPosts from "../_components/Posts/Display/Previews/getAllPreviews";
import SharePreviewFilters from "../_components/Posts/Display/Previews/previewFilters";

export default function KeebShare({
    searchParams,
}: {
    searchParams?: { filter: string; tag: string; search: string };
}) {


// update pages for pagination as well 


    return (
        <>
            <div className="h-44 w-full fixed top-0 left-0 right-0 z-20 bg-dark"></div>
            <SharePreviewFilters />
            <div className="mt-56  text-mediumGray tablet:px-5 desktop:px-16 flex flex-col relative items-end w-full min-h-[60rem]">
                <GetAllPreviewPosts searchParams={searchParams} />
            </div>

            {/* <div className="mt-56  text-mediumGray tablet:px-5 desktop:px-16 flex flex-col relative items-end w-full min-h-[60rem] ">
                <div className=" flex w-3/4 flex-col h-full pl-10">
                    <div className=" flex w-full justify-between">
                        <div>
                            {filter === "New" && (
                                <div>
                                    <DisplayNewPostPreviews
                                        searchInput={debouncedSearchQuery}
                                        tag={tag}
                                    />
                                </div>
                            )}
                            {filter === "Hot" && (
                                <div>
                                    <DisplayPopularPostPreviews
                                        searchInput={debouncedSearchQuery}
                                        tag={tag}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="mt-96 w-full relative z-30">
                <Footer />
            </div>
        </>
    );
}
