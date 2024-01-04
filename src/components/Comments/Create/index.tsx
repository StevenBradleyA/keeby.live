import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";
import React from "react";

interface CreateCommentProps {
    typeId: string;
    type: string;
}

interface CommentData {
    text: string;
    userId: string;
    type: string;
    typeId: string;
}

export default function CreateComment({ typeId, type }: CreateCommentProps) {
    const [text, setText] = useState("");
    const { data: session } = useSession();

    // send to log in page if not logged in

    const ctx = api.useContext();

    const { mutate } = api.comment.create.useMutation({
        onSuccess: () => {
            void ctx.comment.getAllByTypeId.invalidate();
        },
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (session && session.user && session.user.id) {
            const data = {
                text,
                userId: session.user.id,
                type: type,
                typeId: typeId,
            };

            setText("");
            return mutate(data);
        }
    };

    return (
        <form className="flex flex-col justify-between gap-5" onSubmit={submit}>
            <label className="text-slate-200">
                Comment
                <input
                    className="m-2 rounded border bg-transparent p-1"
                    value={text}
                    placeholder="Comment"
                    onChange={(e) => setText(e.target.value)}
                />
            </label>
            <button className="rounded-md border text-slate-200">
                Submit Comment
            </button>
        </form>
    );
}
