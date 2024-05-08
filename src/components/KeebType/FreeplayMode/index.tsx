import { useRef, useState } from "react";
import FreeplayKeyboard from "./keyboard";

interface FreeplayModeProps {
    theme: string;
}

export default function FreeplayMode({ theme }: FreeplayModeProps) {
    const [typedText, setTypedText] = useState("");
    const focusRef = useRef<HTMLTextAreaElement | null>(null);

    // idea make it look like your coding setup with triple monitors

    return (
        <div className="z-10 flex flex-shrink-0 flex-col laptop:w-3/4 desktop:w-2/3">
            <div className="flex justify-center text-lg">
                <textarea
                    className="monitor-tilt h-40 w-1/2 overflow-y-auto whitespace-pre-wrap break-words rounded-md bg-[#A9DFFD] p-5 "
                    value={typedText}
                    onChange={(e) => setTypedText(e.target.value)}
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

            <FreeplayKeyboard setTypedText={setTypedText} focusRef={focusRef} theme={theme} />
        </div>
    );
}
