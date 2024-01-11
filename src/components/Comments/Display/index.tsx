import { api } from "~/utils/api";
import CreateComment from "../Create";
import MainFooter from "~/components/Footer";
import EachCommentCard from "./eachCommentCard";
import { useSession } from "next-auth/react";

interface DisplayCommentsProps {
    typeId: string;
    userId: string;
}

export default function DisplayComments({
    typeId,
    userId,
}: DisplayCommentsProps) {

    
    // TODO filter comments by likes  and new
    // TODO add Emoji button for comments
    // TODO add edit and delete comments
    // todo deleting a parent should also delete all reply comments and all likes
    // TODO create a loading animation component and call it if isLoading
    // TODO going to have to implement Lazy loading and pagination

    const { data: comments, isLoading: isLoadingComments } =
        api.comment.getAllByTypeId.useQuery({
            type: "LISTING",
            typeId: typeId,
            userId: userId,
        });

    const { data: commentCount, isLoading: isLoadingCommentCount } =
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
