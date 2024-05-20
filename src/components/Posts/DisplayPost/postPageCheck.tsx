import LoadingSpinner from "~/components/Loading";
import { api } from "~/utils/api";
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
