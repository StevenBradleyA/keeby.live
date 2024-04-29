import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { RefObject } from "react";
import { api } from "~/utils/api";
import React from "react";

interface CreateMessageProps {
    listingTransactionId: string;
    sellerId: string;
    buyerId: string;
}

interface ErrorsObj {
    text?: string;
}

export default function CreateMessage({
    listingTransactionId,
    sellerId,
    buyerId,
}: CreateMessageProps) {
    const [text, setText] = useState<string>("");
    const [row, setRow] = useState<number>(1);

    const [errors, setErrors] = useState<ErrorsObj>({});
    const [createSelected, setCreateSelected] = useState<boolean>(false);
    const { data: session } = useSession();

    const ctx = api.useContext();

    const { mutate } = api.message.create.useMutation({
        onSuccess: () => {
            void ctx.message.getAllByTransactionId.invalidate();
        },
    });

    const handleRowIncrease = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const textarea = e.target as HTMLTextAreaElement;
        const { value, selectionStart, selectionEnd } = textarea;

        if (e.key === "Enter" && !e.shiftKey) {
            setRow((prevRow) => prevRow + 1);
        } else if (e.key === "Backspace") {
            const beforeCursor = value.substring(0, selectionStart);
            const afterCursor = value.substring(selectionEnd);

            const isCursorAtLineStart =
                beforeCursor.endsWith("\n") || beforeCursor === "";
            const isCursorAtLineEnd =
                afterCursor.startsWith("\n") || afterCursor === "";

            if (isCursorAtLineStart && isCursorAtLineEnd) {
                setRow((prevRow) => (prevRow > 1 ? prevRow - 1 : 1));
            }
        }
    };

    // const cancelComment = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setText("");
    //     setCreateSelected(false);
    //     setRow(1);
    // };

    const handleSubmitClick = (e: React.FormEvent) => {
        e.preventDefault();

        submit(e);
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
                sellerId: sellerId,
                buyerId: buyerId,
                listingTransactionId: listingTransactionId,
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
        <form className=" flex flex-col justify-between">
            {/* {createSelected && (
                <div className="z-10 mt-1 flex justify-end gap-5 text-sm">
                    <button
                        className="rounded-md border-2 border-green-500 border-opacity-0 px-2 py-1  text-darkGray hover:border-opacity-100 "
                        onClick={cancelComment}
                    >
                        Cancel
                    </button>
                    <button
                        className="rounded-md border-2 border-green-500 border-opacity-0 px-2 py-1  text-darkGray hover:border-opacity-100 "
                        onClick={handleSubmitClick}
                    >
                        Send
                    </button>
                </div>
            )} */}
            <div className="relative">
                <textarea
                    className="comment-input-box w-full rounded-lg border-none bg-pogGray py-2 pl-2 pr-10 text-white outline-none"
                    value={text}
                    placeholder="Send a message..."
                    onChange={(e) => setText(e.target.value)}
                    // onFocus={() => setCreateSelected(true)}
                    onKeyDown={handleRowIncrease}
                    rows={row}
                />
                <button
                    className="absolute right-1 top-1 z-10 rounded-full bg-green-500 p-[2px]"
                    onClick={handleSubmitClick}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M6 12H18M18 12L13 7M18 12L13 17"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </form>
    );
}
