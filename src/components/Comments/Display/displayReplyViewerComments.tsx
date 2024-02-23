import { api } from "~/utils/api";
import EachReplyCommentCard from "./eachReplayCommentCard";
import LoadingSpinner from "~/components/Loading";

interface DisplayReplyCommentsProps {
    parentId: string;
    listingId: string;
}

interface ReplyUser {
    id: string;
    username: string | null;
    profile: string | null;
}
interface CommentLike {
    commentLike: number;
}

interface ReplyContents {
    user: ReplyUser;
    id: string;
    text: string;
    userId: string;
    listingId: string;
    postId: null;
    parentId: string | null;
    referencedUser: string | null;
    _count: CommentLike;
    isLiked?: boolean;
}

export default function DisplayReplyViewerComments({
    parentId,
    listingId,
}: DisplayReplyCommentsProps) {
    const { data: replies, isLoading: isLoadingComments } =
        api.comment.getAllViewerReplysByTypeId.useQuery({
            listingId: listingId,
            parentId: parentId,
        });

    if (isLoadingComments)
        return (
            <div className="mt-10">
                <LoadingSpinner size="20px" />
            </div>
        );

    return (
        <div className="mt-2">
            {replies &&
                replies.map((e, i) => (
                    <EachReplyCommentCard
                        key={i}
                        reply={e as ReplyContents}
                        listingId={listingId}
                        parentId={parentId}
                    />
                ))}
        </div>
    );
}
