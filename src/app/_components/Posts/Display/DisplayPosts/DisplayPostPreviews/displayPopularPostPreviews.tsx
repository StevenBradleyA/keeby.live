import Image from "next/image";
import keebo from "@public/Profile/keebo.png";
import { useEffect, useRef } from "react";
import LoadingSpinner from "~/app/_components/Loading";
import { api } from "~/trpc/react";
import EachPostCardPreview from "./eachPostCardPreview";
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

export default function DispayPopularPostPreviews({
    searchInput,
    tag,
}: DisplayNewPostPreviewsProps) {
    const scrollFlagRef = useRef<HTMLDivElement | null>(null);

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
            limit: 8,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        },
    );

    useEffect(() => {
        if (isLoading || isFetchingNextPage || !hasNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0] && entries[0].isIntersecting) {
                    void fetchNextPage();
                }
            },
            { threshold: 1.0 },
        );

        const currentFlag = scrollFlagRef.current;
        if (currentFlag) {
            observer.observe(currentFlag);
        }

        return () => {
            if (observer && currentFlag) {
                observer.unobserve(currentFlag);
            }
        };
    }, [hasNextPage, isLoading, isFetchingNextPage, fetchNextPage]);

    if (isLoading) {
        return (
            <div className="mt-44">
                <LoadingSpinner size="40px" />
            </div>
        );
    }

    return (
        <>
            {postData && postData.pages.length > 0 && (
                <div className="flex flex-wrap gap-10">
                    {postData.pages.map((page) =>
                        page.posts.map((post) => (
                            <EachPostCardPreview key={post.id} post={post} />
                        )),
                    )}
                    <div ref={scrollFlagRef} className="h-10 w-full"></div>
                </div>
            )}
            {isFetchingNextPage && (
                <div className="flex w-full justify-center">
                    <LoadingSpinner size="40px" />
                </div>
            )}

            {postData && postData.pages[0]?.posts.length === 0 && (
                <div className=" mt-5 flex items-end gap-2 text-mediumGray">
                    <h1>{`Woah, there are currently no posts `}</h1>
                    <Image src={keebo} alt="keeby mascot" className="w-10" />
                </div>
            )}
        </>
    );
}
