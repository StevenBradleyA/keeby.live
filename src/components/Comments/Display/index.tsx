import { api } from "~/utils/api";
import CreateComment from "../Create";
import MainFooter from "~/components/Footer";
import EachCommentCard from "./eachCommentCard";
import { useSession } from "next-auth/react";

interface DisplayCommentsProps {
    typeId: string;
}

export default function DisplayComments({ typeId }: DisplayCommentsProps) {
    // TODO filter comments by likes  and new
    // TODO add Emoji button for comments
    // TODO add edit and delete comments
    // todo deleting a parent should also delete all reply comments and all likes

    const { data: comments, isLoading } =
        api.comment.getAllWithReplies.useQuery({
            type: "LISTING",
            typeId: typeId,
        });
    const { data: commentCount, isLoading: countIsLoading } =
        api.comment.getAmountByTypeId.useQuery({
            type: "LISTING",
            typeId: typeId,
        });


    return (
        <>
            <div>
                {`${commentCount ? commentCount : 0} ${
                    commentCount === 1 ? "COMMENT" : "COMMENTS"
                }`}
            </div>
            <CreateComment typeId={typeId} type={"LISTING"} />
            {comments &&
                comments.map((comment, i) => (
                    <EachCommentCard
                        key={i}
                        comment={comment}
                        typeId={typeId}
                    />
                ))}
            <MainFooter />
        </>
    );
}
