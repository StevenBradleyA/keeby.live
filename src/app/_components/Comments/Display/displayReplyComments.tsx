import { api } from "~/utils/api";
import EachReplyCommentCard from "./eachReplayCommentCard";
import LoadingSpinner from "~/app/_components/Loading";
import { useSession } from "next-auth/react";

interface DisplayReplyCommentsProps {
    parentId: string;
    type: string;
    typeId: string;
}

export default function DisplayReplyComments({
    parentId,
    typeId,
    type,
}: DisplayReplyCommentsProps) {
    const { data: session } = useSession();

    const { data: replies, isLoading: isLoadingComments } =
        api.comment.getAllReplysByTypeId.useQuery({
            typeId: typeId,
            type: type,
            userId: session?.user.id,
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
                        type={type}
                        typeId={typeId}
                        parentId={parentId}
                    />
                ))}
        </div>
    );
}
