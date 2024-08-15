"use client";
import { useEffect, useRef, useState } from "react";

export default function HackermanTypeBinary() {
    const [text, setText] = useState<string>("");
    const binaryDivRef = useRef<HTMLDivElement>(null);

    const textToBinary = (text: string): string => {
        return text
            .split("")
            .map((char) => {
                return char.charCodeAt(0).toString(2).padStart(8, "0");
            })
            .join(" ");
    };

    useEffect(() => {
        if (binaryDivRef.current) {
            binaryDivRef.current.scrollTop = binaryDivRef.current.scrollHeight;
        }
    }, [text]);

    return (
        <div className="flex h-full w-full">
            <div className="h-full w-1/2">
                <textarea
                    className="flex h-full w-full flex-wrap bg-black/20 p-2 text-white outline-none"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{
                        resize: "none",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                    autoFocus
                ></textarea>
            </div>
            <div
                className="flex h-full w-1/2 flex-wrap overflow-y-auto break-words break-all p-2 text-[#00FF99]"
                ref={binaryDivRef}
                style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                {textToBinary(text)}
            </div>
        </div>
    );
}
