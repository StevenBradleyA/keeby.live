import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";
import React from "react";

export default function CreateComment({ postId }: { postId: string }) {
    const [text, setText] = useState("");
    const { data: session } = useSession();

    const ctx = api.useContext();

    const { mutate } = api.comment.create.useMutation({
        onSuccess: () => {
            void ctx.comment.getByPostId.invalidate();
        },
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (session && session.user && session.user.id) {
            const data = {
                text,
                userId: session.user.id,
                postId: postId,
            };

            setText("");
            return mutate(data);
        } else {
            throw new Error("Hot Toast Incoming!!!");
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
