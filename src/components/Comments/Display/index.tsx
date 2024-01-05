import { api } from "~/utils/api";
import CreateComment from "../Create";
import Image from "next/image";
import keebo from "@public/Profile/profile-keebo.jpg";
import DisplayLikes from "~/components/KeebShop/Likes/DisplayLikes";
import MainFooter from "~/components/Footer";
import Link from "next/link";
import CreateReplyComment from "../Create/CreateReplyComment";
import { useState } from "react";

interface DisplayCommentsProps {
    typeId: string;
}

export default function DisplayComments({ typeId }: DisplayCommentsProps) {
    // TODO integrate likes and reply logic
    // TODO filter comments by likes  and new
    // TODO add Emoji button for comments

    const [showCreateReply, setShowCreateReply] = useState<string[]>([]);
    const [openReplies, setOpenReplies] = useState<string[]>([]);

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

    const toggleReplies = (commentId: string) => {
        setOpenReplies((prevOpenReplies) => {
            if (prevOpenReplies.includes(commentId)) {
                return prevOpenReplies.filter((id) => id !== commentId);
            } else {
                return [...prevOpenReplies, commentId];
            }
        });
    };
    const toggleCreateReply = (commentId: string) => {
        setShowCreateReply((prevOpenReplies) => {
            if (prevOpenReplies.includes(commentId)) {
                return prevOpenReplies.filter((id) => id !== commentId);
            } else {
                return [...prevOpenReplies, commentId];
            }
        });
    };

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
                    <div key={i} className="mb-5 flex flex-col">
                        <div className="mb-5 flex gap-2">
                            <div className="">
                                {comment.user.profile === null ? (
                                    <Image
                                        src={keebo}
                                        alt="profile"
                                        height={600}
                                        width={600}
                                        className="h-12 w-12 object-cover"
                                    />
                                ) : (
                                    <Image
                                        src={comment.user.profile}
                                        alt="profile"
                                        height={600}
                                        width={600}
                                        className="h-12 w-12 object-cover"
                                    />
                                )}
                            </div>
                            <div className=" w-full flex-wrap text-sm ">
                                <Link href="/profile" className="text-darkGray">
                                    {comment.user.username}
                                </Link>
                                <div className="whitespace-pre-wrap">
                                    {comment.text}
                                </div>
                                <div className="flex gap-5">
                                    <DisplayLikes
                                        typeId={comment.id}
                                        type="COMMENT"
                                    />
                                    <button
                                        onClick={() =>
                                            toggleCreateReply(comment.id)
                                        }
                                    >
                                        reply
                                    </button>
                                </div>
                                {showCreateReply.includes(comment.id) && (
                                    <CreateReplyComment
                                        typeId={typeId}
                                        type={"LISTING"}
                                        parentId={comment.id}
                                        showCreateReply={showCreateReply}
                                        setShowCreateReply={setShowCreateReply}
                                    />
                                )}
                            </div>
                        </div>

                        {comment.replies && (
                            <button onClick={() => toggleReplies(comment.id)}>
                                {openReplies.includes(comment.id)
                                    ? "hide replies"
                                    : "show replies"}
                            </button>
                        )}
                        {openReplies.includes(comment.id) &&
                            comment.replies.map((reply, i) => (
                                <div key={i} className="mb-5 flex gap-2 pl-16">
                                    <div className="">
                                        {reply.user.profile === null ? (
                                            <Image
                                                src={keebo}
                                                alt="profile"
                                                height={600}
                                                width={600}
                                                className="h-12 w-12 object-cover"
                                            />
                                        ) : (
                                            <Image
                                                src={reply.user.profile}
                                                alt="profile"
                                                height={600}
                                                width={600}
                                                className="h-12 w-12 object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className=" w-full flex-wrap text-sm ">
                                        <Link
                                            href="/profile"
                                            className="text-darkGray"
                                        >
                                            {reply.user.username}
                                        </Link>
                                        {reply.referencedUser ? (
                                            <div className="flex gap-1 ">
                                                <div className="text-green-500">
                                                    {`@${
                                                        reply.referencedUser as string
                                                    }`}
                                                </div>
                                                <div className="whitespace-pre-wrap">
                                                    {reply.text}
                                                </div>
                                            </div>
                                        ) : (
                                            <div>{reply.text}</div>
                                        )}
                                        <div className="flex gap-5 ">
                                            <DisplayLikes
                                                typeId={reply.id}
                                                type="COMMENT"
                                            />
                                            {reply.user.username && (
                                                <CreateReplyComment
                                                    typeId={typeId}
                                                    type={"LISTING"}
                                                    parentId={comment.id}
                                                    referencedUser={
                                                        reply.user.username
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                ))}
            <MainFooter />
        </>
    );
}
