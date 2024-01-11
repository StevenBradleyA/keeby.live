import type { Comment } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

interface UpdateCommentProps {
    comment: Comment;
    parentId?: string;
    closeModal: () => void;
    startingRows: number;
}

interface DeleteData {
    id: string;
    userId: string;
    parentId?: string;
}

interface ErrorsObj {
    text?: string;
}

export default function UpdateComment({
    comment,
    parentId,
    closeModal,
    startingRows,
}: UpdateCommentProps) {
    const [showDeleteConfirmation, setShowDeleteConfirmation] =
        useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [text, setText] = useState<string>(comment.text);
    const [row, setRow] = useState<number>(startingRows);
    const [errors, setErrors] = useState<ErrorsObj>({});

    console.log("hallo", startingRows);
    const ctx = api.useContext();
    const { data: session } = useSession();

    const { mutate } = api.comment.delete.useMutation({
        onSuccess: () => {
            if (parentId) {
                void ctx.comment.getAllReplysByTypeId.invalidate();
            } else {
                void ctx.comment.getAllByTypeId.invalidate();
            }
            void ctx.comment.getAmountByTypeId.invalidate();
            closeModal();
        },
    });

    const { mutate: updateComment } = api.comment.update.useMutation({
        onSuccess: () => {
            if (parentId) {
                void ctx.comment.getAllReplysByTypeId.invalidate();
            } else {
                void ctx.comment.getAllByTypeId.invalidate();
            }
            closeModal();
        },
    });

    const handleShowDeleteConfirmation = () => {
        setShowDeleteConfirmation(true);
    };

    const hideDeleteConfirmation = () => {
        setShowDeleteConfirmation(false);
    };

    const handleHideEdit = (e: React.FormEvent) => {
        e.preventDefault();
        closeModal();
    };
    const handleShowEdit = () => {
        setShowEdit(true);
    };

    const deleteComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (session && session.user) {
            const data: DeleteData = {
                id: comment.id,
                userId: session.user.id,
            };
            if (parentId) {
                data.parentId = parentId;
            }
            mutate(data);
        }
    };

    const handleUpdateComment = (e: React.FormEvent) => {
        e.preventDefault();

        if (
            session &&
            session.user &&
            session.user.id &&
            !Object.values(errors).length
        ) {
            const data = {
                id: comment.id,
                text,
                userId: session.user.id,
            };
            return updateComment(data);
        }
    };
    const handleRowIncrease = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            setRow((prevRow) => prevRow + 1);
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
            {showDeleteConfirmation && !showEdit && (
                <div className="flex flex-col gap-2">
                    <h1>Proceed with operation?</h1>
                    <div className="flex gap-5">
                        <button onClick={deleteComment}>Confirm</button>
                        <button onClick={hideDeleteConfirmation}>Deny</button>
                    </div>
                </div>
            )}
            {!showDeleteConfirmation && !showEdit && (
                <>
                    <button onClick={handleShowEdit}>Edit</button>
                    <button onClick={handleShowDeleteConfirmation}>
                        Delete
                    </button>
                </>
            )}
            {showEdit && (
                <form className="flex flex-col">
                    <textarea
                        className="comment-input-box w-[600px] rounded-lg border-none bg-pogGray p-2 outline-none"
                        value={text}
                        placeholder="Write a comment..."
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleRowIncrease}
                        rows={row}
                    />
                    <div className="mt-3 flex gap-5">
                        <button onClick={handleHideEdit}>cancel</button>
                        <button onClick={handleUpdateComment}>submit</button>
                    </div>
                </form>
            )}
        </div>
    );
}
