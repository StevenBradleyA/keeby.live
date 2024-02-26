import Image from "next/image";
import keebo from "@public/Profile/keebo.png";
import { useEffect } from "react";
import { throttle } from "lodash";
import LoadingSpinner from "~/components/Loading";
import { api } from "~/utils/api";
import EachPostCardPreview from "./eachPostCardPreview";
import type { Images } from "@prisma/client";
import { useSession } from "next-auth/react";

interface DisplayNewPostPreviewsProps {
    searchInput: string;
    tag: string;
}

interface Filters {
    searchQuery?: string;
    tag?: string;
    userId?: string;
}

interface EachPost {
    id: string;
    tag: string;
    title: string;
    link: string | null;
    text: string | null;
    isFavorited?: boolean;
    favoriteId?: string;
    isLiked?: boolean;
    likedId?: string;
    _count: CommentCount;
    images: Images[];
}
interface CommentCount {
    comments: number;
    postLikes: number;
}

export default function DispayPopularPostPreviews({
    searchInput,
    tag,
}: DisplayNewPostPreviewsProps) {
    const queryInputs: Filters = {};

    const { data: session } = useSession();

    if (searchInput.length > 0) {
        queryInputs.searchQuery = searchInput;
    }
    if (tag.length > 0) {
        queryInputs.tag = tag;
    }
    if (session && session.user) {
        queryInputs.userId = session.user.id;
    }

    const {
        data: postData,
        hasNextPage,
        fetchNextPage,
        isLoading,
        isFetchingNextPage,
    } = api.post.getAllPopularPreviewPosts.useInfiniteQuery(
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

    // todo test pagination for popular posts

    console.log('hi big boy', postData)

    return (
        <>
            {postData && postData.pages.length > 0 && (
                <div className="flex flex-wrap gap-10">
                    {postData.pages.map((page) =>
                        page.posts.map((post) => (
                            <EachPostCardPreview
                                key={post.id}
                                post={post as EachPost}
                            />
                        ))
                    )}
                </div>
            )}
            {isFetchingNextPage && (
                <div className="flex w-full justify-center">
                    <LoadingSpinner size="40px" />
                </div>
            )}

            {postData && postData.pages[0]?.posts.length === 0 && (
                <div className=" mt-5 flex items-end gap-2 text-darkGray">
                    <h1>{`Woah, there are currently no posts `}</h1>
                    <Image src={keebo} alt="keeby mascot" className="w-10" />
                </div>
            )}
        </>
    );
}
