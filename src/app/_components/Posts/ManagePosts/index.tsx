import { api } from "~/trpc/react";
import ManageEachPostCard from "./eachManagePostCard";

interface ManagePostsProps {
    userId: string;
}

export default function ManagePosts({ userId }: ManagePostsProps) {
    const { data: allUserPosts } = api.post.getAllByUserId.useQuery({
        userId,
    });
    return (
        <div className="mt-5 w-full font-poppins">
            <h1>Posts ( {allUserPosts ? allUserPosts.length : 0} )</h1>
            <div className="mt-5 flex w-full flex-wrap gap-10 ">
                {allUserPosts &&
                    allUserPosts.length > 0 &&
                    allUserPosts.map((post) => (
                        <div key={post.id} className=" w-96">
                            <ManageEachPostCard post={post} />
                        </div>
                    ))}
            </div>
        </div>
    );
}
