'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import Image from "next/image";
import defaultProfile from "@public/Images/defaultProfile.png";
import ModalDialog from "~/app/_components/Modal";
import SignInModal from "../../Modal/signInModal";

interface CreateReplyCommentProps {
    type: string;
    typeId: string;
    parentId: string;
    referencedUser?: string;
    replyId?: string;
    setShowTopLevelCommentReply?: (showTopLevelCommentReply: boolean) => void;
    setOpenReplies?: (openReplies: boolean) => void;
    setShowNestedReply?: (showNestedReply: boolean) => void;
}

interface ErrorsObj {
    text?: string;
}

interface ReplyData {
    text: string;
    userId: string;
    type: string;
    typeId: string;
    parentId: string;
    referencedUser?: string;
}

export default function CreateReplyComment({
    type,
    typeId,
    parentId,
    referencedUser,
    setShowTopLevelCommentReply,
    setOpenReplies,
    setShowNestedReply,
}: CreateReplyCommentProps) {
    const [text, setText] = useState<string>("");
    const [row, setRow] = useState<number>(1);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);
    const { data: session } = useSession();

    const utils = api.useUtils();

    const { mutate } = api.comment.createReply.useMutation({
        onSuccess: () => {
            void utils.comment.getAllByTypeId.invalidate();
            void utils.comment.getAllReplysByTypeId.invalidate();
            if (type === "listing") void utils.listing.getOne.invalidate();
            if (type === "post") void utils.post.getOneById.invalidate();
        },
    });

    const handleRowIncrease = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const textarea = e.target as HTMLTextAreaElement;
        const { value, selectionStart, selectionEnd } = textarea;

        if (e.key === "Enter" && !e.shiftKey) {
            setRow((prevRow) => prevRow + 1);
        } else if (e.key === "Backspace") {
            const beforeCursor = value.substring(0, selectionStart);
            const afterCursor = value.substring(selectionEnd);

            const isCursorAtLineStart =
                beforeCursor.endsWith("\n") || beforeCursor === "";
            const isCursorAtLineEnd =
                afterCursor.startsWith("\n") || afterCursor === "";

            if (isCursorAtLineStart && isCursorAtLineEnd) {
                setRow((prevRow) => (prevRow > 1 ? prevRow - 1 : 1));
            }
        }
    };

    const openSignInModal = () => {
        setIsSignInModalOpen(true);
    };

    const closeSignInModal = () => {
        setIsSignInModalOpen(false);
    };

    const cancelComment = (e: React.FormEvent) => {
        e.preventDefault();
        setText("");
        setRow(1);
        if (setShowTopLevelCommentReply) {
            setShowTopLevelCommentReply(false);
        }
        if (setShowNestedReply) {
            setShowNestedReply(false);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (
            session &&
            session.user &&
            session.user.id &&
            !Object.values(errors).length
        ) {
            const data: ReplyData = {
                text,
                userId: session.user.id,
                type: type,
                typeId: typeId,
                parentId: parentId,
            };

            if (referencedUser && setShowNestedReply) {
                data.referencedUser = referencedUser;
                setShowNestedReply(false);
            } else if (setOpenReplies && setShowTopLevelCommentReply) {
                setOpenReplies(true);
                setShowTopLevelCommentReply(false);
            }
            setText("");
            setRow(1);
            return mutate(data);
        }
    };

    useEffect(() => {
        const errorsObj: ErrorsObj = {};

        if (text.length < 1) {
            errorsObj.text = "Please provide text for your comment";
        }

        setErrors(errorsObj);
    }, [text]);

    return (
        <div className="flex flex-col">
            <form className="mt-2 flex flex-col justify-between gap-2">
                <div className="flex items-end gap-2">
                    <Image
                        src={
                            session && session.user.profile
                                ? session.user.profile
                                : defaultProfile
                        }
                        alt="profile"
                        height={600}
                        width={600}
                        className="h-7 w-7 rounded-md object-cover"
                    />

                    <textarea
                        className="reply-input w-full  border-none bg-transparent p-2 text-white outline-none"
                        value={text}
                        placeholder="Add a reply..."
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleRowIncrease}
                        rows={row}
                    />
                </div>
                <div className="flex justify-end gap-5 text-sm">
                    <button
                        className="rounded-md border-2 border-green-500 border-opacity-0 px-2 py-1  text-mediumGray hover:border-opacity-100 "
                        onClick={cancelComment}
                    >
                        Cancel
                    </button>

                    <button
                        className="rounded-md border-2 border-green-500 border-opacity-0 px-2 py-1  text-mediumGray hover:border-opacity-100 "
                        onClick={
                            session && session.user ? submit : openSignInModal
                        }
                    >
                        Submit Comment
                    </button>
                </div>
                <ModalDialog
                    isOpen={isSignInModalOpen}
                    onClose={closeSignInModal}
                >
                    <SignInModal />
                </ModalDialog>
            </form>
        </div>
    );
}
