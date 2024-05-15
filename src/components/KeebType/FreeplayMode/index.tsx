import { useRef, useState } from "react";
import FreeplayKeyboard from "./keyboard";
import { themeStyles } from "../Theme/themeStyles";
import type { ThemeName } from "../Theme/themeStyles";
import Image from "next/image";
import hacktimeLogo from "@public/Vectors/hacktime.png";

interface FreeplayModeProps {
    theme: string;
}

export default function FreeplayMode({ theme }: FreeplayModeProps) {
    const [typedText, setTypedText] = useState("");
    const focusRef = useRef<HTMLTextAreaElement | null>(null);

    const styles = themeStyles[theme as ThemeName] || themeStyles["KEEBY"];

    return (
        <div
            className={`z-10 flex w-full flex-shrink-0 flex-col gap-2 px-5 ${styles.hit} `}
        >
            <div className="flex justify-center text-lg ">
                <textarea
                    className={` h-72 w-2/3 overflow-y-auto whitespace-pre-wrap break-words rounded-md ${styles.screen} p-5`}
                    value={typedText}
                    onChange={(e) => setTypedText(e.target.value)}
                    ref={focusRef}
                    spellCheck={false}
                ></textarea>
            </div>
            <div
                className={`${styles.mousepad} relative flex items-center justify-center rounded-2xl bg-black tablet:py-10 desktop:p-20`}
            >
                <FreeplayKeyboard
                    setTypedText={setTypedText}
                    focusRef={focusRef}
                    theme={theme}
                />

                {theme === "HACKERMAN" && (
                    <Image
                        alt="hacktime logo"
                        src={hacktimeLogo}
                        className="png-light-gray absolute left-0 top-0 z-50 h-12 w-12"
                    />
                )}
            </div>
        </div>
    );
}
