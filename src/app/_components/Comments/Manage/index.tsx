import type { Comment } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import keebo from "@public/Profile/keebo.png";
import toast from "react-hot-toast";

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

    const utils = api.useUtils();
    const { data: session } = useSession();

    const { mutate } = api.comment.delete.useMutation({
        onSuccess: () => {
            if (parentId) {
                void utils.comment.getAllByTypeId.invalidate();
                void utils.comment.getAllReplysByTypeId.invalidate();
            } else {
                void utils.comment.getAllByTypeId.invalidate();
            }
            toast.success("Comment Deleted!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            closeModal();
        },
    });

    const { mutate: updateComment } = api.comment.update.useMutation({
        onSuccess: () => {
            if (parentId) {
                void utils.comment.getAllReplysByTypeId.invalidate();
            } else {
                void utils.comment.getAllByTypeId.invalidate();
            }
            toast.success("Comment Updated!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
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
                <div className="flex flex-col items-center gap-2 py-2 px-6 ">
                    <h1 className="text-green-500">Proceed with deletion?</h1>
                    <div className="flex gap-5">
                        <button
                            onClick={deleteComment}
                            className="rounded-md  px-2 py-1  text-mediumGray hover:bg-red-500/10 hover:text-red-500 ease-in "
                        >
                            Confirm
                        </button>
                        <button
                            onClick={hideDeleteConfirmation}
                            className="rounded-md  px-2 py-1  text-mediumGray hover:bg-green-500/10 hover:text-green-500 ease-in"
                        >
                            Deny
                        </button>
                    </div>
                </div>
            )}
            {!showDeleteConfirmation && !showEdit && (
                <div className="px-1 py-2 h-full m-0 flex flex-col items-center w-full ">
                    <button
                        onClick={handleShowEdit}
                        className="hover:text-green-500 hover:bg-white/10 px-10 py-1 rounded-lg w-full ease-in"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleShowDeleteConfirmation}
                        className="hover:text-green-500 hover:bg-white/10 px-10 py-1 rounded-lg w-full ease-in"
                    >
                        Delete
                    </button>
                </div>
            )}
            {showEdit && (
                <form className="flex w-[800px] h-[400px] flex-col gap-2 p-5 text-white">
                    <div className="flex justify-center items-end text-green-500 text-base">
                        <h1>Edit your comment</h1>
                        <Image
                            alt="keebo"
                            src={keebo}
                            className="w-7 h-7 object-contain"
                        />
                    </div>
                    <textarea
                        className="comment-input-box w-full rounded-lg border-none bg-mediumGray p-2 outline-none h-full"
                        value={text}
                        placeholder="Write a comment..."
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleRowIncrease}
                        rows={row}
                    />
                    <div className=" flex w-full justify-end gap-5 ">
                        <button
                            onClick={handleHideEdit}
                            className="rounded-md border-2 border-green-500 border-opacity-0 px-2 py-1  text-mediumGray hover:border-opacity-100 "
                        >
                            cancel
                        </button>
                        <button
                            onClick={handleUpdateComment}
                            className="rounded-md border-2 border-green-500 border-opacity-0 px-2 py-1  text-mediumGray hover:border-opacity-100 "
                        >
                            submit
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
