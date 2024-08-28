"use client";
import { useEffect, useRef } from "react";
import LoadingSpinner from "../../Loading";
import EachCommentCard from "./eachCommentCard";
import { api } from "~/trpc/react";

interface DisplayCommentsProps {
    type: string;
    typeId: string;
    userId: string | undefined;
}

export default function DisplayComments({
    type,
    typeId,
    userId,
}: DisplayCommentsProps) {
    const scrollFlagRef = useRef<HTMLDivElement | null>(null);

    const {
        data: comments,
        hasNextPage,
        fetchNextPage,
        isLoading,
        isFetchingNextPage,
    } = api.comment.getAllByTypeId.useInfiniteQuery(
        {
            type,
            typeId,
            userId,
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

    if (isLoading)
        return (
            <div className="mt-5 pl-5">
                <LoadingSpinner size="20px" />
            </div>
        );

    return (
        <>
            {comments && comments.pages.length > 0 && (
                <>
                    {comments.pages.map((page) =>
                        page.comments.map((comment, i) => (
                            <EachCommentCard
                                key={i}
                                comment={comment}
                                type={type}
                                typeId={typeId}
                            />
                        )),
                    )}
                    <div ref={scrollFlagRef} className="h-10 w-full"></div>
                </>
            )}
        </>
    );
}
