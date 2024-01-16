import { api } from "~/utils/api";
import EachReplyCommentCard from "./eachReplayCommentCard";

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

    return (
        <>
            {replies &&
                replies.map((e, i) => (
                    <EachReplyCommentCard
                        key={i}
                        reply={e}
                        typeId={typeId}
                        parentId={parentId}
                    />
                ))}
        </>
    );
}
