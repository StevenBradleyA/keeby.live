import LoadingSpinner from "~/components/Loading";
import { api } from "~/utils/api";

interface DisplayPostPageProps {
    postId: string;
}

export default function DisplayPostPage({ postId }: DisplayPostPageProps) {
    const { data: post, isLoading } = api.post.getOne.useQuery({
        id: postId,
    });

    if (isLoading)
        return (
            <div className="mt-44">
                <LoadingSpinner size="40px" />
            </div>
        );

    return (
        <>
            {post && (
                <div className="w-full px-16 ">
                    <h1>{post.title}</h1>
                </div>
            )}
        </>
    );
}
