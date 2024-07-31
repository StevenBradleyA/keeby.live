import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { api } from "~/utils/api";
import LoadingSpinner from "~/app/_components/Loading";
import keebo from "@public/Profile/keebo.png";
import Image from "next/image";
import PostPagePreviewCard from "./eachAdditionalPostPreviewCard";

interface Filters {
    searchQuery?: string;
    tag?: string;
    userId?: string;
}

export default function PostPagePreviews() {
    const scrollFlagRef = useRef<HTMLDivElement | null>(null);

    const queryInputs: Filters = {};

    const { data: session } = useSession();

    if (session && session.user) {
        queryInputs.userId = session.user.id;
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
            limit: 5,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );

    useEffect(() => {
        if (isLoading || isFetchingNextPage || !hasNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0] && entries[0].isIntersecting) {
                    console.log('hey pagination here')
                    void fetchNextPage();
                }
            },
            { threshold: 1.0 }
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
                            <PostPagePreviewCard key={post.id} post={post} />
                        ))
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
                <div className=" mt-5 flex items-end gap-2 text-darkGray">
                    <h1>{`Woah, there are currently no posts `}</h1>
                    <Image src={keebo} alt="keeby mascot" className="w-10" />
                </div>
            )}
        </>
    );
}
