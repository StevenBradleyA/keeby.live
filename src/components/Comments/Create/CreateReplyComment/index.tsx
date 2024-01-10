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
    // TODO if not signed in clicking reply needs to take to sign in page

    const [text, setText] = useState<string>("");
    const [row, setRow] = useState<number>(1);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const { data: session } = useSession();

    const ctx = api.useContext();

    const { mutate } = api.comment.createReply.useMutation({
        onSuccess: () => {
            void ctx.comment.getAllWithReplies.invalidate();
            void ctx.comment.getAmountByTypeId.invalidate();
        },
    });

    const handleRowIncrease = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            setRow((prevRow) => prevRow + 1);
        }
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
            </form>
        </div>
    );
}
