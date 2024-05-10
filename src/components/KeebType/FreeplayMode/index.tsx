import { useRef, useState } from "react";
import FreeplayKeyboard from "./keyboard";
import { themeStyles } from "../Theme/themeStyles";
import type { ThemeName } from "../Theme/themeStyles";

interface FreeplayModeProps {
    theme: string;
}

export default function FreeplayMode({ theme }: FreeplayModeProps) {
    const [typedText, setTypedText] = useState("");
    const focusRef = useRef<HTMLTextAreaElement | null>(null);

    const styles = themeStyles[theme as ThemeName] || themeStyles["KEEBY"];

    return (
        <div className="z-10 flex flex-shrink-0 flex-col gap-2 laptop:w-3/4 desktop:w-2/3">
            <div className="flex justify-center text-lg ">
                <textarea
                    className="monitor-tilt h-72 w-2/3 overflow-y-auto whitespace-pre-wrap break-words rounded-md bg-[#A9DFFD] p-5 "
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
                        boxShadow: styles.screenGlow,
                    }}
                ></textarea>
            </div>
            <div className="mousepad flex items-center justify-center rounded-2xl bg-black tablet:p-3 desktop:p-20">
                <FreeplayKeyboard
                    setTypedText={setTypedText}
                    focusRef={focusRef}
                    theme={theme}
                />
            </div>
        </div>
    );
}
