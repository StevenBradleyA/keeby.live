import { api } from "~/trpc/react";

interface PostPreviewDeleteLikeProps {
    userId: string;
    likeId: string;
    ownerId: string;
}

export default function PostPreviewDeleteLike({
    userId,
    likeId,
    ownerId,
}: PostPreviewDeleteLikeProps) {
    const utils = api.useUtils();

    const { mutate: deleteLike } = api.like.deletePostLike.useMutation({
        onSuccess: () => {
            void utils.post.getAllPreviewPosts.invalidate();
            void utils.post.getOneById.invalidate();
        },
    });

    const handleDeleteLike = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (likeId && userId && ownerId) {
            const data = {
                id: likeId,
                userId: userId,
                ownerId: ownerId,
            };

            // return deleteLike(data);
        }
    };
    return (
        <button onClick={handleDeleteLike}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ease-in hover:text-mediumGray text-green-500 "
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
}
