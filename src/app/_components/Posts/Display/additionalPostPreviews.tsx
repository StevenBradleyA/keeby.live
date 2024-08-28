import { api } from "~/trpc/server";
import keebo from "@public/Profile/keebo.png";
import Image from "next/image";
import PostPagePreviewCard from "./eachAdditionalPostPreviewCard";
import { getServerAuthSession } from "~/server/auth";

export default async function PostPagePreviews({ postId }: { postId: string }) {
    const session = await getServerAuthSession();

    const postData = await api.post.getAllNewPreviewPosts({
        userId: session && session.user.id ? session.user.id : undefined,
        postId: postId,
    });

    return (
        <>
            {postData && postData.posts.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                    {postData.posts.map((post) => (
                        <PostPagePreviewCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="flex items-end gap-2 text-mediumGray">
                    <h1>{`Woah, there are currently no posts `}</h1>
                    <Image
                        src={keebo}
                        alt="keeby mascot"
                        className="w-10 h-10 object-contain"
                    />
                </div>
            )}
        </>
    );
}
