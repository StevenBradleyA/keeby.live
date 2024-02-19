import Image from "next/image";
import keebo from "@public/Profile/keebo.png";
import { useEffect } from "react";
import { throttle } from "lodash";
import LoadingSpinner from "~/components/Loading";
import { api } from "~/utils/api";
import EachPostCardPreview from "./eachPostCardPreview";
import type { Images } from "@prisma/client";

interface DisplayNewPostPreviewsProps {
    searchInput: string;
    tag: string;
}

interface Filters {
    searchQuery?: string;
    tag?: string;
}

interface EachPost {
    id: string;
    tag: string;
    title: string;
    link: string | null;
    text: string | null;
    _count: CommentCount;
    images: Images[];
}
interface CommentCount {
    comments: number;
}

export default function DispayNewPostPreviews({
    searchInput,
    tag,
}: DisplayNewPostPreviewsProps) {
    const queryInputs: Filters = {};

    if (searchInput.length > 0) {
        queryInputs.searchQuery = searchInput;
    }
    if (tag.length > 0) {
        queryInputs.tag = tag;
    }

    const {
        data: postData,
        hasNextPage,
        fetchNextPage,
        isLoading,
        isFetchingNextPage,
    } = api.post.getAllNewPreviewPosts.useInfiniteQuery(
        {
            ...queryInputs,
            limit: 10,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );

    //     useEffect(() => {
    //         const handleScroll = throttle(() => {
    //             const nearBottom =
    //                 window.innerHeight + window.scrollY >=
    //                 document.documentElement.offsetHeight - 300; // pagination fetch distance from bottom px
    //             if (
    //                 nearBottom &&
    //                 hasNextPage &&
    //                 !isLoading &&
    //                 !isFetchingNextPage
    //             ) {
    //                 void fetchNextPage();
    //             }
    //         }, 100);

    //         window.addEventListener("scroll", handleScroll);
    //         return () => {
    //             window.removeEventListener("scroll", handleScroll);
    //             handleScroll.cancel();
    //         };
    //     }, [hasNextPage, isLoading, isFetchingNextPage, fetchNextPage]);

    if (isLoading) {
        return (
            <div className="mt-44">
                <LoadingSpinner size="40px" />
            </div>
        );
    }

    console.log(postData);

    return (
        <>
            {postData && postData.pages.length > 0 && (
                <div>
                    {postData.pages.map((page) =>
                        page.posts.map((post, i) => (
                            <EachPostCardPreview
                                key={post.id}
                                post={post as unknown as EachPost}
                            />
                        ))
                    )}
                </div>
            )}
        </>
    );
}

//     return (
//         <>
//             {keebData && keebData.pages.length > 0 && (
//                 <div className={`flex w-full flex-wrap gap-5  `}>
//                     {keebData.pages.map((page) =>
//                         page.listings.map((keeb, i) => (
//                             <EachListingCardPreview
//                                 key={keeb.id}
//                                 keeb={keeb as unknown as EachKeeb}
//                                 index={i}
//                             />
//                         ))
//                     )}
//                 </div>
//             )}
//             {isFetchingNextPage && (
//                 <div className="flex w-full justify-center">
//                     <LoadingSpinner size="40px" />
//                 </div>
//             )}

//             {keebData && keebData.pages[0]?.listings.length === 0 && (
//                 <div className=" mt-5 flex items-end gap-2 text-darkGray">
//                     <h1>
//                         {`Woah, all sold out. There are currently no listings for sale `}
//                     </h1>
//                     <Image src={keebo} alt="keeby mascot" className="w-10" />
//                 </div>
//             )}
//         </>
//     );
// }
