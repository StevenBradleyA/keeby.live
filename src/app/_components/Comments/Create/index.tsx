import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import React from "react";
import ModalDialog from "~/app/_components/Modal";
import SignInModal from "../Modal/signInModal";

interface CreateCommentProps {
    typeId: string;
    type: string;
}

interface ErrorsObj {
    text?: string;
}

export default function CreateComment({ typeId, type }: CreateCommentProps) {
    const [text, setText] = useState<string>("");
    const [row, setRow] = useState<number>(1);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);

    const [errors, setErrors] = useState<ErrorsObj>({});
    const [createSelected, setCreateSelected] = useState<boolean>(false);
    const { data: session } = useSession();

    const utils = api.useUtils();

    const { mutate } = api.comment.createComment.useMutation({
        onSuccess: () => {
            void utils.comment.getAllByTypeId.invalidate();
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

    const closeSignInModal = (e?: React.SyntheticEvent) => {
        if (e?.preventDefault) e.preventDefault();
        setIsSignInModalOpen(false);
    };

    const cancelComment = (e: React.FormEvent) => {
        e.preventDefault();
        setText("");
        setCreateSelected(false);
        setRow(1);
    };

    const handleSubmitClick = (e: React.FormEvent) => {
        e.preventDefault();

        if (session && session.user) {
            submit(e);
        } else {
            openSignInModal();
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
            const data = {
                text,
                userId: session.user.id,
                typeId: typeId,
                type: type,
            };

            setText("");
            setCreateSelected(false);
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
        <form className="mb-5 flex flex-col justify-between gap-2">
            <textarea
                className="comment-input-box w-full rounded-lg border-none bg-pogGray p-2 text-white outline-none"
                value={text}
                placeholder="Write a comment..."
                onChange={(e) => setText(e.target.value)}
                onFocus={() => setCreateSelected(true)}
                onKeyDown={handleRowIncrease}
                rows={row}
            />
            {createSelected && (
                <div className="flex justify-end gap-5 text-sm">
                    <button
                        className="rounded-md border-2 border-green-500 border-opacity-0 px-2 py-1  text-darkGray hover:border-opacity-100 "
                        onClick={cancelComment}
                    >
                        Cancel
                    </button>
                    <button
                        className="rounded-md border-2 border-green-500 border-opacity-0 px-2 py-1  text-darkGray hover:border-opacity-100 "
                        onClick={handleSubmitClick}
                    >
                        Submit Comment
                    </button>
                </div>
            )}
            <ModalDialog isOpen={isSignInModalOpen} onClose={closeSignInModal}>
                <SignInModal />
            </ModalDialog>
        </form>
    );
}
