import Image from "next/image";
import Link from "next/link";
import defaultProfile from "@public/Profile/profile-default.png";
import { useSession } from "next-auth/react";
import CreateReplyComment from "../Create/CreateReplyComment";
import { useState } from "react";
import ToggleCommentLike from "~/components/KeebShop/Likes/CommentLikes/ToggleLike";
import ModalDialog from "~/components/Modal";
import ModifyCommentModal from "../Modal";
import UpdateComment from "../Update";
import SignInModal from "../Modal/signInModal";

interface EachReplyCardProps {
    typeId: string;
    type: string;
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
    listingId: string | null;
    postId: string | null;
    parentId: string | null;
    referencedUser: string | null;
    _count: CommentLike;
    isLiked?: boolean;
}

export default function EachReplyCommentCard({
    reply,
    typeId,
    type,
    parentId,
}: EachReplyCardProps) {
    const { data: session } = useSession();
    const [showNestedReply, setShowNestedReply] = useState<boolean>(false);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openSignInModal = () => {
        setIsSignInModalOpen(true);
    };

    const closeSignInModal = () => {
        setIsSignInModalOpen(false);
    };

    const maxLines = 5;

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };
    const lines = reply.text.split("\n");

    const isTooLong = lines.length > maxLines;

    return (
        <div className="mb-5 flex gap-2 pl-16">
            <div className="mt-1">
                <Image
                    src={
                        reply.user.profile ? reply.user.profile : defaultProfile
                    }
                    alt="profile"
                    height={600}
                    width={600}
                    className="h-10 w-10 rounded-md object-cover"
                    priority
                />
            </div>
            <div className=" w-full flex-wrap text-sm ">
                <div className="relative flex justify-between">
                    {reply.user.username && (
                        <Link
                            href={`/profile/public/${reply.user.username}`}
                            className="text-darkGray"
                        >
                            {reply.user.username}
                        </Link>
                    )}

                    {session &&
                        (session.user.id === reply.userId ||
                            session.user.isAdmin) && (
                            <button
                                className="absolute right-0"
                                onClick={openModal}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    className="text-darkGray transition-colors duration-400 ease-custom-cubic hover:text-white "
                                    fill="currentColor"
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
                        <UpdateComment
                            comment={reply}
                            closeModal={closeModal}
                            startingRows={lines.length}
                            parentId={parentId}
                        />
                    </ModifyCommentModal>
                </div>

                {reply.referencedUser ? (
                    <div>
                        <div className="flex whitespace-pre-wrap text-white">
                            <span>
                                <span className="text-green-500">{`@${reply.referencedUser} `}</span>
                                {isTooLong && !isExpanded
                                    ? lines.slice(0, maxLines).join("\n")
                                    : `${reply.text}`}
                            </span>
                        </div>
                        {isTooLong && (
                            <button
                                onClick={toggleReadMore}
                                className="text-darkGray"
                            >
                                {isExpanded ? "Read Less" : "Read More"}
                            </button>
                        )}
                    </div>
                ) : (
                    <div>
                        <div className="whitespace-pre-wrap text-white ">
                            {isTooLong && !isExpanded
                                ? lines.slice(0, maxLines).join("\n")
                                : reply.text}
                        </div>
                        {isTooLong && (
                            <button
                                onClick={toggleReadMore}
                                className="text-darkGray"
                            >
                                {isExpanded ? "Read Less" : "Read More"}
                            </button>
                        )}
                    </div>
                )}
                <div className="flex gap-5">
                    <div className="flex gap-2 text-darkGray">
                        {session &&
                        session.user &&
                        reply.isLiked !== undefined ? (
                            <ToggleCommentLike
                                commentId={reply.id}
                                userId={session.user.id}
                                isLiked={reply.isLiked}
                                topLevel={false}
                                ownerId={reply.user.id}
                            />
                        ) : (
                            <button onClick={openSignInModal}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="16"
                                    width="16"
                                    className="text-darkGray transition-colors duration-400 ease-custom-cubic hover:text-white "
                                    viewBox="0 0 512 512"
                                    fill="currentColor"
                                >
                                    <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                                </svg>
                            </button>
                        )}
                        <div>{reply._count.commentLike}</div>
                    </div>

                    <ModalDialog
                        isOpen={isSignInModalOpen}
                        onClose={closeSignInModal}
                    >
                        <SignInModal closeModal={closeSignInModal} />
                    </ModalDialog>

                    {session && session.user ? (
                        <button
                            onClick={() => setShowNestedReply(!showNestedReply)}
                            className="text-xs text-darkGray hover:text-green-500"
                        >
                            Reply
                        </button>
                    ) : (
                        <button
                            onClick={openSignInModal}
                            className="text-xs text-darkGray hover:text-green-500"
                        >
                            Reply
                        </button>
                    )}
                </div>
                {showNestedReply && reply.user.username && (
                    <CreateReplyComment
                        typeId={typeId}
                        type={type}
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
