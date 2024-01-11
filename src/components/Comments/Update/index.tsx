import type { Comment } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";

interface UpdateCommentProps {
    typeId: string;
    type: string;
    comment: Comment;
    parentId?: string;
    closeModal: () => void;
}

interface DeleteData {
    id: string;
    userId: string;
    parentId?: string;
}

export default function UpdateComment({
    typeId,
    type,
    comment,
    parentId,
    closeModal,
}: UpdateCommentProps) {
    const [showDeleteConfirmation, setShowDeleteConfirmation] =
        useState<boolean>(false);

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

    const handleShowDeleteConfirmation = () => {
        setShowDeleteConfirmation(true);
    };

    const hideDeleteConfirmation = () => {
        setShowDeleteConfirmation(false);
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

    return (
        <div className="flex flex-col">
            {showDeleteConfirmation ? (
                <div className="flex flex-col gap-2">
                    <h1>Are you Sure?</h1>
                    <div className="flex gap-5">
                        <button onClick={deleteComment}>Yes</button>
                        <button onClick={hideDeleteConfirmation}>No</button>
                    </div>
                </div>
            ) : (
                <>
                    <button>Edit</button>
                    <button onClick={handleShowDeleteConfirmation}>
                        Delete
                    </button>
                </>
            )}
        </div>
    );
}
