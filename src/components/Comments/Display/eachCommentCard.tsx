// import type { Comment, User } from "@prisma/client";

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
import EachReplyCommentCard from "./eachReplayCommentCard";
import CreateCommentLike from "~/components/KeebShop/Likes/CommentLikes/Create";

interface EachCommentCardProps {
    typeId: string;
    comment: CommentContents;
}

interface CommentUser {
    id: string;
    username: string | null;
    profile: string | null;
}

interface CommentLike {
    commentLike: number;
    replies: number;
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
    _count: CommentLike;
}

export default function EachCommentCard({
    comment,
    typeId,
}: EachCommentCardProps) {
    const [showTopLevelCommentReply, setShowTopLevelCommentReply] =
        useState<boolean>(false);
    const [openReplies, setOpenReplies] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { data: session } = useSession();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    // TODO implement signed in vs signout logic

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
                                <div>Edit</div>
                                <div>Delete</div>
                            </div>
                        </ModifyCommentModal>
                    </div>
                    <div className="whitespace-pre-wrap">{comment.text}</div>
                    <div className="flex gap-5">
                        <div className="flex">
                            {session && session.user ? (
                                <CreateCommentLike
                                    commentId={comment.id}
                                    userId={session.user.id}
                                />
                            ) : (
                                <div>like svg - signin</div>
                            )}
                            <div>{comment._count.commentLike}</div>
                        </div>
                        <button
                            onClick={() =>
                                setShowTopLevelCommentReply(
                                    !showTopLevelCommentReply
                                )
                            }
                        >
                            reply
                        </button>
                    </div>
                    {showTopLevelCommentReply && (
                        <CreateReplyComment
                            typeId={typeId}
                            type={"LISTING"}
                            parentId={comment.id}
                            setShowTopLevelCommentReply={
                                setShowTopLevelCommentReply
                            }
                            setOpenReplies={setOpenReplies}
                        />
                    )}
                </div>
            </div>

            {comment._count.commentLike > 0 && (
                <button
                    onClick={() => setOpenReplies(!openReplies)}
                    className="ml-14 flex justify-start text-sm text-green-500"
                >
                    {openReplies
                        ? "hide replies"
                        : `${comment._count.commentLike} replies`}
                </button>
            )}
            {/* {openReplies &&
                comment.replies.map((reply, i) => (
                    <EachReplyCommentCard
                        key={i}
                        reply={reply}
                        typeId={typeId}
                        parentId={comment.id}
                    />
                ))} */}
        </div>
    );
}
