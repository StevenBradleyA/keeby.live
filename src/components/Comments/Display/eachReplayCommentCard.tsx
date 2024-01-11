import Image from "next/image";
import Link from "next/link";
import keebo from "@public/Profile/profile-keebo.jpg";
import { useSession } from "next-auth/react";
import CreateReplyComment from "../Create/CreateReplyComment";
import { useState } from "react";
import ToggleCommentLike from "~/components/KeebShop/Likes/CommentLikes/ToggleLike";
import ModalDialog from "~/components/Modal";
import CommentSignInModal from "../Modal/signInModal";

interface EachReplyCardProps {
    typeId: string;
    reply: ReplyContents;
    parentId: string;
}

interface ReplyUser {
    id: string;
    username: string | null;
    profile: string | null;
}
interface CommentLike {
    commentLike: number;
}

interface ReplyContents {
    user: ReplyUser;
    id: string;
    text: string;
    userId: string;
    type: string;
    typeId: string;
    parentId: string | null;
    referencedUser: string | null;
    _count: CommentLike;
    isLiked?: boolean;
}

export default function EachReplyCommentCard({
    reply,
    typeId,
    parentId,
}: EachReplyCardProps) {
    const { data: session } = useSession();
    const [showNestedReply, setShowNestedReply] = useState<boolean>(false);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);

    const openSignInModal = () => {
        setIsSignInModalOpen(true);
    };

    const closeSignInModal = () => {
        setIsSignInModalOpen(false);
    };

    return (
        <div className="mb-5 flex gap-2 pl-16">
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

                    {session && session.user.id === reply.userId && (
                        <button className="absolute right-0">
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
                </div>

                {reply.referencedUser ? (
                    <div className="flex gap-1 ">
                        <div className="text-green-500">
                            {`@${reply.referencedUser}`}
                        </div>
                        <div className="whitespace-pre-wrap">{reply.text}</div>
                    </div>
                ) : (
                    <div>{reply.text}</div>
                )}
                <div className="flex gap-5">
                    {session && session.user && reply.isLiked !== undefined ? (
                        <ToggleCommentLike
                            commentId={reply.id}
                            userId={session.user.id}
                            isLiked={reply.isLiked}
                            topLevel={false}
                        />
                    ) : (
                        <button onClick={openSignInModal}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="16"
                                width="16"
                                viewBox="0 0 512 512"
                                fill="#616161"
                            >
                                <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                            </svg>
                        </button>
                    )}
                    <div>{reply._count.commentLike}</div>
                    <ModalDialog
                        isOpen={isSignInModalOpen}
                        onClose={closeSignInModal}
                    >
                        <CommentSignInModal closeModal={closeSignInModal} />
                    </ModalDialog>

                    {session && session.user ? (
                        <button
                            onClick={() => setShowNestedReply(!showNestedReply)}
                        >
                            reply
                        </button>
                    ) : (
                        <button onClick={openSignInModal}>reply</button>
                    )}
                </div>
                {showNestedReply && reply.user.username && (
                    <CreateReplyComment
                        typeId={typeId}
                        type={"LISTING"}
                        parentId={parentId}
                        replyId={reply.id}
                        referencedUser={reply.user.username}
                        setShowNestedReply={setShowNestedReply}
                    />
                )}
            </div>
        </div>
    );
}
