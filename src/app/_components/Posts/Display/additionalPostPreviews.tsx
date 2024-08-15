"use client";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
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
    const queryInputs: Filters = {};

    const { data: session } = useSession();

    if (session && session.user) {
        queryInputs.userId = session.user.id;
    }

    const { data: postData, isLoading } =
        api.post.getAllNewPreviewPosts.useQuery({
            userId: session && session.user.id ? session.user.id : undefined,
        });

    if (isLoading) {
        return (
            <div className="mt-5 pl-5">
                <LoadingSpinner size="20px" />
            </div>
        );
    }

    return (
        <>
            {postData && postData.posts.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                    {postData.posts.map((post) => (
                        <PostPagePreviewCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="flex items-end gap-2 text-mediumGray">
                    <h1>{`Woah, there are currently no posts `}</h1>
                    <Image
                        src={keebo}
                        alt="keeby mascot"
                        className="w-10 h-10 object-contain"
                    />
                </div>
            )}
        </>
    );
}
