import { api } from "~/utils/api";
import EachReplyCommentCard from "./eachReplayCommentCard";
import LoadingSpinner from "~/components/Loading";

interface DisplayReplyCommentsProps {
    parentId: string;
    typeId: string;
}

export default function DisplayReplyViewerComments({
    parentId,
    typeId,
}: DisplayReplyCommentsProps) {
    const { data: replies, isLoading: isLoadingComments } =
        api.comment.getAllViewerReplysByTypeId.useQuery({
            type: "LISTING",
            typeId: typeId,
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
