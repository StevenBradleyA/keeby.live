import { api } from "~/utils/api";
import ManageEachPostCard from "./eachManagePostCard";

interface ManagePostsProps {
    userId: string;
}

export default function ManagePosts({ userId }: ManagePostsProps) {
    const { data: allUserPosts } = api.post.getAllByUserId.useQuery({
        userId,
    });
    return (
        <div className="flex w-full flex-wrap gap-10">
            {allUserPosts &&
                allUserPosts.length > 0 &&
                allUserPosts.map((post) => (
                    <div key={post.id} className="mt-10 w-96">
                        <ManageEachPostCard post={post} />
                    </div>
                ))}
        </div>
    );
}
