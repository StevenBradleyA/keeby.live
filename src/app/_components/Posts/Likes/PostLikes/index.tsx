import LoadingSpinner from "~/app/_components/Loading";
import { api } from "~/trpc/react";

interface ListingPageFavoriteProps {
    userId: string;
    postId: string;
}
export default function PostPreviewLike({
    userId,
    postId,
}: ListingPageFavoriteProps) {
    const utils = api.useUtils();

    const { data: favoriteId, isLoading } =
        api.favorite.checkIfPostIsFavorited.useQuery({ userId, postId });

    const { mutate: favorite } = api.favorite.createPostFavorite.useMutation({
        onSuccess: () => {
            void utils.favorite.checkIfPostIsFavorited.invalidate();
        },
    });

    const { mutate: unfavorite } = api.favorite.deletePostFavorite.useMutation({
        onSuccess: () => {
            void utils.favorite.checkIfPostIsFavorited.invalidate();
        },
    });

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (userId && postId) {
            const data = {
                userId: userId,
                postId: postId,
            };

            return favorite(data);
        }
    };

    const handleUnfavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (favoriteId && userId) {
            const data = {
                userId: userId,
                id: favoriteId.id,
                postId: postId,
            };

            return unfavorite(data);
        }
    };

    if (isLoading)
        return (
            <div className="mt-44">
                <LoadingSpinner size="40px" />
            </div>
        );

    return favoriteId !== null ? (
        <button onClick={handleUnfavoriteClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-full"
                viewBox="0 0 24 24"
                fill={`${favoriteId ? "rgb(0, 0, 0, 0.4)" : "none"}`}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                    stroke={`${favoriteId ? "rgb(34 197 94)" : "#616161"}`}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    ) : (
        <button onClick={handleFavoriteClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-full"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                    stroke="#616161"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
}
