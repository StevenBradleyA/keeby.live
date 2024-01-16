import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import React from "react";
import ModalDialog from "~/components/Modal";
import CommentSignInModal from "../Modal/signInModal";

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

    const ctx = api.useContext();

    const { mutate } = api.comment.create.useMutation({
        onSuccess: () => {
            void ctx.comment.getAllByTypeId.invalidate();
            void ctx.comment.getAmountByTypeId.invalidate();
        },
    });

    const handleRowIncrease = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            setRow((prevRow) => prevRow + 1); // Increase the row count
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
                type: type,
                typeId: typeId,
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
        <form className="mb-5 flex flex-col justify-between gap-5">
            <textarea
                className="comment-input-box w-full rounded-lg border-none bg-pogGray p-2 outline-none"
                value={text}
                placeholder="Write a comment..."
                onChange={(e) => setText(e.target.value)}
                onFocus={() => setCreateSelected(true)}
                onKeyDown={handleRowIncrease}
                rows={row}
            />
            {createSelected && (
                <div className="flex justify-end gap-5">
                    <button
                        className="rounded-md border text-slate-200"
                        onClick={cancelComment}
                    >
                        Cancel
                    </button>
                    <button
                        className="rounded-md border text-slate-200"
                        onClick={handleSubmitClick}
                    >
                        Submit Comment
                    </button>
                </div>
            )}
            <ModalDialog isOpen={isSignInModalOpen} onClose={closeSignInModal}>
                <CommentSignInModal closeModal={closeSignInModal} />
            </ModalDialog>
        </form>
    );
}
