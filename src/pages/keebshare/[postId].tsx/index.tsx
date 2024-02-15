import { useRouter } from "next/router";
import LoadingSpinner from "~/components/Loading";
import { api } from "~/utils/api";

export default function PostPage() {
    const router = useRouter();
    const postId = router.query.postId as string;

    const { data: post, isLoading } = api.post.getOne.useQuery({
        id: postId,
    });

    console.log(post);

    if (isLoading)
        return (
            <div className="mt-44">
                <LoadingSpinner size="40px" />
            </div>
        );

    return (
        <>
            <div></div>
        </>
    );
}
