import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PostPageCheck from "~/components/KeebShare/DisplayPost/postPageCheck";

export default function PostPage() {
    const router = useRouter();
    const postId = router.query.postId as string;

    const { data: session } = useSession();

    return (
        <>
            {postId && session && session.user && (
                <PostPageCheck postId={postId} userId={session.user.id} />
            )}
            {postId && session === null && <PostPageCheck postId={postId} />}
        </>
    );
}
