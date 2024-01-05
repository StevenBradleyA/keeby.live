import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

interface CreateReplyCommentProps {
    type: string;
    typeId: string;
    parentId: string;
    referencedUser?: string;
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
}: CreateReplyCommentProps) {
    const [text, setText] = useState<string>("");
    const [row, setRow] = useState<number>(1);

    const [errors, setErrors] = useState<ErrorsObj>({});
    const [createSelected, setCreateSelected] = useState<boolean>(false);
    const { data: session } = useSession();

    // send to log in page if not logged in

    const ctx = api.useContext();

    const { mutate } = api.comment.createReply.useMutation({
        onSuccess: () => {
            void ctx.comment.getAllWithReplies.invalidate();
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
            const data: ReplyData = {
                text,
                userId: session.user.id,
                type: type,
                typeId: typeId,
                parentId: parentId,
            };

            if (referencedUser) {
                data.referencedUser = referencedUser;
            }
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
                placeholder="Add a reply..."
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
