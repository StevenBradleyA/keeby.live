import LoadingSpinner from "~/app/_components/Loading";
import { api } from "~/trpc/react";
import DisplayPostPage from ".";
interface PostPageCheckProps {
    postId: string;
    userId?: string;
}

export default function PostPageCheck({ postId, userId }: PostPageCheckProps) {
    const { data: post, isLoading } = api.post.getOneById.useQuery({
        id: postId,
        userId: userId,
    });

    if (isLoading)
        return (
            <div className="mt-44">
                <LoadingSpinner size="40px" />
            </div>
        );

    return post && <DisplayPostPage post={post} />;
}
