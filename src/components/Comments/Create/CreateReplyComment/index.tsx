import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import Image from "next/image";
import keebo from "@public/Profile/profile-keebo.jpg";

interface CreateReplyCommentProps {
    type: string;
    typeId: string;
    parentId: string;
    referencedUser?: string;
    showCreateReply: string[];
    setShowCreateReply: (newShowCreateReply: string[]) => void;
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
    showCreateReply,
    setShowCreateReply,
}: CreateReplyCommentProps) {
    const [text, setText] = useState<string>("");
    const [row, setRow] = useState<number>(1);

    const [errors, setErrors] = useState<ErrorsObj>({});
    const [createSelected, setCreateSelected] = useState<boolean>(false);
    const { data: session } = useSession();

    // send to log in page if not logged in
    // TODO make it so that submitting a comment opens the hide and removes from show create reply

    const ctx = api.useContext();

    const { mutate } = api.comment.createReply.useMutation({
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

    const cancelComment = (e: React.FormEvent, parentId: string) => {
        e.preventDefault();
        setText("");
        setRow(1);
        const newReplies = showCreateReply.filter((id) => id !== parentId);
        setShowCreateReply(newReplies);
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
            const newReplies = showCreateReply.filter((id) => id !== parentId);
            setShowCreateReply(newReplies);
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
            {showCreateReply && (
                <form className="mt-2 flex flex-col justify-between gap-5">
                    <div className="flex">
                        {session && session.user.profile ? (
                            <Image
                                src={session.user.profile}
                                alt="profile"
                                height={600}
                                width={600}
                                className="h-7 w-7 object-cover"
                            />
                        ) : (
                            <Image
                                src={keebo}
                                alt="profile"
                                height={600}
                                width={600}
                                className="h-7 w-7 object-cover"
                            />
                        )}

                        <textarea
                            className="reply-input w-full  border-none bg-transparent p-2 outline-none"
                            value={text}
                            placeholder="Add a reply..."
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={handleRowIncrease}
                            rows={row}
                        />
                    </div>
                    <div className="flex justify-end gap-5">
                        <button
                            className="rounded-md border text-slate-200"
                            onClick={(e) => cancelComment(e, parentId)}
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
                </form>
            )}
        </div>
    );
}
