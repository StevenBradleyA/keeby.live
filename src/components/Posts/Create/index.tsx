import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";
import React from "react";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const { data: session } = useSession();

    const ctx = api.useContext();

    const { mutate } = api.post.create.useMutation({
        onSuccess: () => {
            void ctx.post.getAll.invalidate();
        },
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (session && session.user && session.user.id) {
            const data = {
                title,
                text,
                price,
                stock,
                userId: session.user.id,
            };

            setTitle("");
            setText("");
            setPrice(0);
            setStock(0);

            return mutate(data);
        } else {
            throw new Error("Hot Toast Incoming!!!");
        }
    };

    return (
        <form className="flex flex-col justify-between gap-5" onSubmit={submit}>
            <label className="text-slate-200">
                Title
                <input
                    className="m-2 rounded border bg-transparent p-1"
                    value={title}
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label className="text-slate-200">
                Text
                <input
                    className="m-2 rounded border bg-transparent p-1"
                    value={text}
                    placeholder="Text"
                    onChange={(e) => setText(e.target.value)}
                />
            </label>
            <label className="text-slate-200">
                Price
                <input
                    className="m-2 rounded border bg-transparent p-1"
                    value={price}
                    type="number"
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
            </label>
            <label className="text-slate-200">
                Stock
                <input
                    className="m-2 rounded border bg-transparent p-1"
                    value={stock}
                    type="number"
                    onChange={(e) => setStock(Number(e.target.value))}
                />
            </label>
            <button className="rounded-md border text-slate-200">
                Submit post
            </button>
        </form>
    );
}
