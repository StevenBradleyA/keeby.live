import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import React from "react";

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

    const [errors, setErrors] = useState<ErrorsObj>({});
    const [createSelected, setCreateSelected] = useState<boolean>(false);
    const { data: session } = useSession();

    // send to log in page if not logged in
    // TODO comment replys also create comment toooooo

    const ctx = api.useContext();

    const { mutate } = api.comment.create.useMutation({
        onSuccess: () => {
            void ctx.comment.getAllWithReplies.invalidate();
            void ctx.comment.getAmountByTypeId.invalidate();
        },
    });

    const handleRowIncrease = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            setRow((prevRow) => prevRow + 1); // Increase the row count
        }
    };

    const cancelComment = (e: React.FormEvent) => {
        e.preventDefault();
        setText("");
        setCreateSelected(false);
        setRow(1);
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
                        onClick={submit}
                    >
                        Submit Comment
                    </button>
                </div>
            )}
        </form>
    );
}
