import type { Comment, User } from "@prisma/client";

// import type {getAllWithReplies} from "@prisma/client"
import Image from "next/image";
import keebo from "@public/Profile/profile-keebo.jpg";
import DisplayLikes from "~/components/KeebShop/Likes/DisplayLikes";
import Link from "next/link";
import CreateReplyComment from "../Create/CreateReplyComment";
import ModifyCommentModal from "../Modal";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

interface EachCommentCardProps {
    typeId: string;
    comment: CommentContents;
}

interface CommentUser {
    id: string;
    username: string | null;
    profile: string | null;
}

interface CommentContents {
    id: string;
    text: string;
    userId: string;
    type: string;
    typeId: string;
    parentId: string | null;
    referencedUser: string | null;
    user: CommentUser;
    replies: Comment[];
}

export default function EachCommentCard({
    comment,
    typeId,
}: EachCommentCardProps) {
    // const { data: comments, isLoading } =
    // api.comment.getAllWithReplies.useQuery({
    //     type: "LISTING",
    //     typeId: typeId,
    // });

    const [showCreateReply, setShowCreateReply] = useState<string[]>([]);
    const [openReplies, setOpenReplies] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { data: session } = useSession();

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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="mb-5 flex flex-col">
            <div className="flex gap-2">
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
                <div className=" relative w-full flex-wrap text-sm ">
                    <div className="flex w-full justify-between">
                        <Link href="/profile" className="text-darkGray">
                            {comment.user.username}
                        </Link>
                        {session && session.user.id === comment.userId && (
                            <button
                                className="absolute right-0"
                                onClick={openModal}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    fill="#616161"
                                >
                                    <circle cx="9" cy="4.5" r="1.5" />
                                    <circle cx="9" cy="9" r="1.5" />
                                    <circle cx="9" cy="13.5" r="1.5" />
                                </svg>
                            </button>
                        )}
                        <ModifyCommentModal
                            isOpen={isModalOpen}
                            onClose={closeModal}
                        >
                            <div className="flex flex-col">
                                <div>edit</div>
                                <div>delete</div>
                            </div>
                        </ModifyCommentModal>
                    </div>
                    <div className="whitespace-pre-wrap">{comment.text}</div>
                    <div className="flex gap-5">
                        <DisplayLikes typeId={comment.id} type="COMMENT" />
                        <button onClick={() => toggleCreateReply(comment.id)}>
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
                            openReplies={openReplies}
                            setOpenReplies={setOpenReplies}
                        />
                    )}
                </div>
            </div>

            {comment.replies && comment.replies.length > 0 && (
                <button
                    onClick={() => toggleReplies(comment.id)}
                    className="ml-14 flex justify-start text-sm text-green-500"
                >
                    {openReplies.includes(comment.id)
                        ? "hide replies"
                        : `${comment.replies.length} replies`}
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
                                    className="h-10 w-10 object-cover"
                                />
                            ) : (
                                <Image
                                    src={reply.user.profile}
                                    alt="profile"
                                    height={600}
                                    width={600}
                                    className="h-10 w-10 object-cover"
                                />
                            )}
                        </div>
                        <div className=" w-full flex-wrap text-sm ">
                            <div className="relative flex justify-between">
                                <Link href="/profile" className="text-darkGray">
                                    {reply.user.username}
                                </Link>

                                {session &&
                                    session.user.id === reply.userId && (
                                        <button className="absolute right-0">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                fill="#616161"
                                            >
                                                <circle
                                                    cx="9"
                                                    cy="4.5"
                                                    r="1.5"
                                                />
                                                <circle cx="9" cy="9" r="1.5" />
                                                <circle
                                                    cx="9"
                                                    cy="13.5"
                                                    r="1.5"
                                                />
                                            </svg>
                                        </button>
                                    )}
                            </div>

                            {reply.referencedUser ? (
                                <div className="flex gap-1 ">
                                    <div className="text-green-500">
                                        {`@${reply.referencedUser as string}`}
                                    </div>
                                    <div className="whitespace-pre-wrap">
                                        {reply.text}
                                    </div>
                                </div>
                            ) : (
                                <div>{reply.text}</div>
                            )}
                            <div className="flex gap-5">
                                <DisplayLikes
                                    typeId={reply.id}
                                    type="COMMENT"
                                />
                                <button
                                    onClick={() => toggleCreateReply(reply.id)}
                                >
                                    reply
                                </button>
                            </div>
                            {showCreateReply.includes(reply.id) &&
                                reply.user.username && (
                                    <CreateReplyComment
                                        typeId={typeId}
                                        type={"LISTING"}
                                        parentId={comment.id}
                                        replyId={reply.id}
                                        referencedUser={reply.user.username}
                                        showCreateReply={showCreateReply}
                                        setShowCreateReply={setShowCreateReply}
                                        openReplies={openReplies}
                                        setOpenReplies={setOpenReplies}
                                    />
                                )}
                        </div>
                    </div>
                ))}
        </div>
    );
}
