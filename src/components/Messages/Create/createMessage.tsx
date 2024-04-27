import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import React from "react";
import ModalDialog from "~/components/Modal";
import SignInModal from "~/components/Comments/Modal/signInModal";
// import SignInModal from "../Modal/signInModal";

interface CreateMessageProps {
    listingTransactionId: string;
    senderId: string;
    receiverId: string;
}

interface ErrorsObj {
    text?: string;
}

export default function CreateMessage({
    listingTransactionId,
    senderId,
    receiverId,
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
        }
       else if (e.key === "Backspace") {
        // Check if the cursor is at the start of a line (new line or start of text)
        const beforeCursor = value.substring(0, selectionStart);
        const afterCursor = value.substring(selectionEnd);
        
        // Determine if the cursor is on an empty line
        const isCursorAtLineStart = beforeCursor.endsWith('\n') || beforeCursor === "";
        const isCursorAtLineEnd = afterCursor.startsWith('\n') || afterCursor === "";

        if (isCursorAtLineStart && isCursorAtLineEnd) {
            setRow(prevRow => prevRow > 1 ? prevRow - 1 : 1); // Prevent row count from being less than 1
        }
    }
    };

    const cancelComment = (e: React.FormEvent) => {
        e.preventDefault();
        setText("");
        setCreateSelected(false);
        setRow(1);
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
                senderId: senderId,
                receiverId: receiverId,
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
            {createSelected && (
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
            )}
            <textarea
                className="comment-input-box w-full rounded-lg border-none bg-pogGray p-2 text-white outline-none"
                value={text}
                placeholder="Send a message..."
                onChange={(e) => setText(e.target.value)}
                onFocus={() => setCreateSelected(true)}
                onKeyDown={handleRowIncrease}
                rows={row}
            />
        </form>
    );
}
