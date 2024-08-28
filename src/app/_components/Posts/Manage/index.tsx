"use client";
import { api } from "~/trpc/react";
import LoadingSpinner from "../../Loading";
import { useSession } from "next-auth/react";
import ManageEachPost from "./manageEachPost";

interface ManagePostsProps {
    userId: string;
}

export default function ManagePosts({ userId }: ManagePostsProps) {
    const { data: session } = useSession();

    // server interactions
    const { data: allUserPosts, isLoading } = api.post.getAllByUserId.useQuery({
        userId,
    });

    // condition checks
    if (isLoading) {
        return (
            <div className="mt-10 ml-10 text-green-500">
                <LoadingSpinner size="20px" />
            </div>
        );
    }

    return (
        <div className="mt-5 w-full font-poppins">
            <h1>Posts ( {allUserPosts ? allUserPosts.posts.length : 0} )</h1>
            <div className="mt-5 flex w-full flex-wrap gap-10 ">
                {allUserPosts &&
                    allUserPosts.posts.length > 0 &&
                    allUserPosts.posts.map((post) => (
                        <div key={post.id} className="relative">
                            <ManageEachPost post={post} session={session} />
                        </div>
                    ))}
            </div>
        </div>
    );
}
