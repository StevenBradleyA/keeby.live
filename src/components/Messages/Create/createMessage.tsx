import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { api } from "~/utils/api";
import React from "react";

interface CreateMessageProps {
    activeTransactionId: string;
    recipientId: string;
    userId: string;
}

interface ErrorsObj {
    text?: string;
}

export default function CreateMessage({
    activeTransactionId,
    recipientId,
    userId,
}: CreateMessageProps) {
    const [text, setText] = useState<string>("");
    const [row, setRow] = useState<number>(1);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const [errors, setErrors] = useState<ErrorsObj>({});
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
                userId: userId,
                recipientId: recipientId,
                listingTransactionId: activeTransactionId,
            };

            setText("");
            setRow(1);
            mutate(data);
            if (buttonRef.current) {
                buttonRef.current.blur();
            }
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
            <div className="relative">
                <textarea
                    className="comment-input-box w-full rounded-lg border-none bg-pogGray py-2 pl-2 pr-10 text-white outline-none"
                    value={text}
                    placeholder="Send a message..."
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleRowIncrease}
                    rows={row}
                />
                <button
                    className="send-message-button absolute right-1 top-1 z-10 rounded-full bg-green-500 p-[2px]"
                    onClick={handleSubmitClick}
                    ref={buttonRef}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="send-message-button-arrow h-6 w-6 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M6 12H18M18 12L13 7M18 12L13 17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </form>
    );
}
