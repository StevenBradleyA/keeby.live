import { api } from "~/utils/api";
import CreateComment from "../Create";
import EachCommentCard from "./eachCommentCard";
import LoadingSpinner from "~/components/Loading";

interface DisplayCommentsProps {
    listingId: string;
    userId: string;
    commentCount: number;
}

export default function DisplayComments({
    listingId,
    userId,
    commentCount,
}: DisplayCommentsProps) {
    // TODO filter comments by likes  and new
    // TODO add Emoji button for comments
    // TODO add edit and delete comments
    // todo deleting a parent should also delete all reply comments and all likes
    // TODO create a loading animation component and call it if isLoading
    // TODO going to have to implement Lazy loading and pagination

    // lets add infiinite query now load first 20 comments or something big

    const { data: comments, isLoading: isLoadingComments } =
        api.comment.getAllByTypeId.useQuery({
            type: "LISTING",
            listingId: listingId,
            userId: userId,
        });

    if (isLoadingComments)
        return (
            <div className="mt-44">
                <LoadingSpinner size="40px" />
            </div>
        );

    return (
        <>
            <div className=" mb-1 flex gap-1">
                <h1 className="text-lg text-green-500">
                    {`${commentCount ? commentCount : 0} ${
                        commentCount === 1 ? "COMMENT" : "COMMENTS"
                    }`}
                </h1>
                <svg className="w-5" viewBox="0 0 24 24" fill="rgb(34 197 94)">
                    <path d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"></path>
                </svg>
            </div>
            <CreateComment listingId={listingId} />
            {comments &&
                comments.map((comment, i) => (
                    <EachCommentCard
                        key={i}
                        comment={comment}
                        listingId={listingId}
                    />
                ))}
        </>
    );
}
