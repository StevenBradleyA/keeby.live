import { api } from "~/utils/api";
import CreateComment from "../Create";
import MainFooter from "~/components/Footer";
import EachCommentCard from "./eachCommentCard";
import { useSession } from "next-auth/react";

interface DisplayCommentsProps {
    typeId: string;
}

export default function DisplayViewerCommments({ typeId }: DisplayCommentsProps) {
    // TODO filter comments by likes  and new
    // TODO add Emoji button for comments
    // TODO add edit and delete comments
    // todo deleting a parent should also delete all reply comments and all likes

    // TODO going to have to implement Lazy loading and pagination
    // maybe instead of fetching all the comments and replies
    // we just fetch the top-level comments and number of replies
    // specific replies are fetched when show replies is enabled

    const { data: viewerComments, isLoading: isLoadingViewerComments } =
        api.comment.getAllByTypeIdForViewers.useQuery({
            type: "LISTING",
            typeId: typeId,
        });

    const { data: commentCount, isLoading: isLoadingCommentCount } =
        api.comment.getAmountByTypeId.useQuery({
            type: "LISTING",
            typeId: typeId,
        });

    // maybe run like query here to check all comments that have been liked
    // then pass down a marker or something idk ask chatgpt about efficiency here
    // if we have a separate route for signed in vs signed out we can handle likes differently. otherwise we jsut need count poggers
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
