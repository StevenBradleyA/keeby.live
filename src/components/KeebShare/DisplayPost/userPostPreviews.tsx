import type { Images } from "@prisma/client";

interface UserPostPreviewProps {
    user: UserWithPosts;
}
interface UserPostPreview {
    id: string;
    title: string;
    _count: {
        comments: number;
        postLikes: number;
    };
    images: Images[];
}

interface UserWithPosts {
    username: string | null;
    profile: string | null;
    selectedTag: string | null;
    internetPoints: number;
    posts: UserPostPreview[];
}

export default function UserPostPreviews({ user }: UserPostPreviewProps) {
    console.log("uhhhhhhhh", user);
    return (
        <>
            {user &&
                user.posts.length > 0 &&
                user.posts.map((e) => (
                    <div
                        key={e.id}
                        className="post-page-user-contents text-sm text-green-500"
                    >
                        {e.title}
                    </div>
                ))}
        </>
    );
}
