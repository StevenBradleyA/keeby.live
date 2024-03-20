import Image from "next/image";
import defaultProfile from "@public/Profile/profile-default.png";
import Link from "next/link";
import CreateReplyComment from "../Create/CreateReplyComment";
import ModifyCommentModal from "../Modal";
import { useState } from "react";
import { useSession } from "next-auth/react";
import ToggleCommentLike from "~/components/KeebShop/Likes/CommentLikes/ToggleLike";
import DisplayReplyComments from "./displayReplyComments";
import ModalDialog from "~/components/Modal";
import UpdateComment from "../Update";
import SignInModal from "../Modal/signInModal";

interface EachCommentCardProps {
    type: string;
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
    listingId: string | null;
    postId: string | null;
    parentId: string | null;
    referencedUser: string | null;
    user: CommentUser;
    _count: CommentLike;
    isLiked?: boolean;
}

export default function EachCommentCard({
    comment,
    typeId,
    type,
}: EachCommentCardProps) {
    const [showTopLevelCommentReply, setShowTopLevelCommentReply] =
        useState<boolean>(false);
    const [openReplies, setOpenReplies] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const { data: session } = useSession();

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
    const lines = comment.text.split("\n");

    const isTooLong = lines.length > maxLines;

    return (
        <div className="mb-5 flex flex-col">
            <div className="flex gap-3">
                <div className="mt-1 h-12 w-12">
                    <Image
                        src={
                            comment.user.profile
                                ? comment.user.profile
                                : defaultProfile
                        }
                        alt="profile"
                        height={600}
                        width={600}
                        className="h-full w-full object-cover"
                        priority
                    />
                </div>
                <div className=" relative w-full flex-wrap text-sm ">
                    <div className="flex w-full justify-between">
                        {comment.user.username && (
                            <Link
                                href={`/profile/public/${comment.user.username}`}
                                className="text-darkGray"
                            >
                                {comment.user.username}
                            </Link>
                        )}
                        {session &&
                            (session.user.id === comment.userId ||
                                session.user.isAdmin) && (
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
                            <UpdateComment
                                comment={comment}
                                closeModal={closeModal}
                                startingRows={lines.length}
                            />
                        </ModifyCommentModal>
                    </div>

                    <div>
                        <div className="text-md whitespace-pre-wrap text-white">
                            {isTooLong && !isExpanded
                                ? lines.slice(0, maxLines).join("\n")
                                : comment.text}
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

                    <div className="mt-1 flex gap-5">
                        <div className="flex gap-2 text-darkGray">
                            {session &&
                            session.user &&
                            comment.isLiked !== undefined ? (
                                <ToggleCommentLike
                                    commentId={comment.id}
                                    userId={session.user.id}
                                    isLiked={comment.isLiked}
                                    topLevel={true}
                                    ownerId={comment.user.id}
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
                            <div className="text-xs">
                                {comment._count.commentLike}
                            </div>
                        </div>
                        <ModalDialog
                            isOpen={isSignInModalOpen}
                            onClose={closeSignInModal}
                        >
                            <SignInModal closeModal={closeSignInModal} />
                        </ModalDialog>
                        {session && session.user ? (
                            <button
                                onClick={() =>
                                    setShowTopLevelCommentReply(
                                        !showTopLevelCommentReply
                                    )
                                }
                                className="text-xs text-darkGray"
                            >
                                Reply
                            </button>
                        ) : (
                            <button
                                onClick={openSignInModal}
                                className="text-xs text-darkGray"
                            >
                                Reply
                            </button>
                        )}
                    </div>
                    {showTopLevelCommentReply && (
                        <CreateReplyComment
                            type={type}
                            typeId={typeId}
                            parentId={comment.id}
                            setShowTopLevelCommentReply={
                                setShowTopLevelCommentReply
                            }
                            setOpenReplies={setOpenReplies}
                        />
                    )}
                </div>
            </div>
            {comment._count.replies > 0 && (
                <button
                    onClick={() => setOpenReplies(!openReplies)}
                    className="ml-14 mt-2 flex justify-start text-sm text-green-500"
                >
                    <div className="flex items-center gap-2 ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="rgb(34 197 94)"
                            width="12px"
                            height="12px"
                            viewBox="0 0 24 24"
                            className={`${openReplies ? "rotate-180 " : ""}`}
                        >
                            <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z" />
                        </svg>

                        {openReplies
                            ? "hide replies"
                            : `${comment._count.replies} ${
                                  comment._count.replies === 1
                                      ? "reply"
                                      : "replies"
                              }`}
                    </div>
                </button>
            )}
            {openReplies && (
                <DisplayReplyComments
                    parentId={comment.id}
                    type={type}
                    typeId={typeId}
                />
            )}
        </div>
    );
}
