import { api } from "~/utils/api";
import EachReplyCommentCard from "./eachReplayCommentCard";

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
