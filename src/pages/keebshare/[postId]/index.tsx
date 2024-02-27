import { useRouter } from "next/router";
import DisplayPostPage from "~/components/KeebShare/DisplayPost";

export default function PostPage() {
    const router = useRouter();
    const postId = router.query.postId as string;

    return postId && <DisplayPostPage postId={postId} />;
}
