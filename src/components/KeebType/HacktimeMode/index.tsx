import { useEffect, useRef, useState } from "react";

const generateHackingCode = () => {
    const snippets = [
        "init 0x1337 decode",
        "override sys > config",
        "execute sequence start",
        "load kernel module",
        "decrypt data packet",
        "transfer authorization",
    ];
    const randomSnippet = snippets[Math.floor(Math.random() * snippets.length)];
    return randomSnippet as string;
};

export default function HacktimeMode() {
    const [hackingText, setHackingText] = useState("");
    const focusRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            event.preventDefault()

            if (
                focusRef.current &&
                document.activeElement !== focusRef.current
            ) {
                focusRef.current.focus(); // Ensure focus is maintained on the textarea
            }
            // setHackingText(
            //     (prev) => `${prev}${prev ? "\n" : ""}${generateHackingCode()}`
            // ); // Append a new line of hacking code

            setHackingText(prev => {
                const newText = `${prev}${prev ? '\n' : ''}${generateHackingCode()}`;
                // Ensure the new text is set before scrolling
                setTimeout(() => {
                    if (focusRef.current) {
                        focusRef.current.scrollTop = focusRef.current.scrollHeight;
                    }
                }, 0);
                return newText;
            });

        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [setHackingText, focusRef]);

    // as we type we want it to write cool hackercode
    // matrix with hacktime logos
    // cool terminal style?

    return (
        <div className="z-10 flex w-full px-5 text-lg text-green-500">
            <textarea
                className="  h-full w-full overflow-y-auto whitespace-pre-wrap break-words rounded-md bg-black p-10 "
                value={hackingText}
                onChange={(e) => setHackingText(e.target.value)}
                ref={focusRef}
                spellCheck={false}
                style={{
                    resize: "none",
                    outline: "none",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    overflowY: "scroll",
                }}
            ></textarea>
        </div>
    );
}
