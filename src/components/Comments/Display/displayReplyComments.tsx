import { api } from "~/utils/api";
import EachReplyCommentCard from "./eachReplayCommentCard";
import LoadingSpinner from "~/components/Loading";

interface DisplayReplyCommentsProps {
    parentId: string;
    typeId: string;
    userId: string;
}

export default function DisplayReplyComments({
    parentId,
    typeId,
    userId,
}: DisplayReplyCommentsProps) {
    const { data: replies, isLoading: isLoadingComments } =
        api.comment.getAllReplysByTypeId.useQuery({
            type: "LISTING",
            typeId: typeId,
            userId: userId,
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
                        reply={e}
                        typeId={typeId}
                        parentId={parentId}
                    />
                ))}
        </div>
    );
}
