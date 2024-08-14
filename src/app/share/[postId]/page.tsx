import LoadingSpinner from "~/app/_components/Loading";
import DisplayPostPage from "~/app/_components/Posts/Display";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function PostPage({
    params,
}: {
    params: { postId: string };
}) {
    const { postId } = params;
    const session = await getServerAuthSession();

    const post = await api.post.getOneById({
        id: postId,
        userId: session && session.user.id ? session.user.id : undefined,
    });

    return (
        <>
            {post ? (
                <DisplayPostPage post={post} />
            ) : (
                <div>
                    <LoadingSpinner size="20px" />
                </div>
            )}
        </>
    );
}
