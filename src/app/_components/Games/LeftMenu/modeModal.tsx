"use client";
import { setCookie } from "cookies-next";
import type { ThemeStyle } from "../Theme/themeStyles";

interface ModeModalProps {
    setMode: (mode: string) => void;
    mode: string;
    setGameOver: (gameOver: boolean) => void;
    styles: ThemeStyle;
    closeModeModal: () => void;
}

export default function ModeModal({
    setMode,
    mode,
    setGameOver,
    styles,
    closeModeModal,
}: ModeModalProps) {
    const handleModeChange = (newMode: string) => {
        setCookie("mode", newMode, {
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
        });
        setGameOver(false);
        setMode(newMode);
        closeModeModal();
    };

    return (
        <>
            <div className="flex gap-5">
                <button
                    onClick={() => handleModeChange("speed")}
                    className={` w-40 h-48 ${styles.backgroundColor} rounded-lg hover:brightness-110 ease-in ${mode === "speed" ? `border-2 ${styles.border}` : ""} `}
                >
                    Speed
                </button>
                <button
                    onClick={() => handleModeChange("scholar")}
                    className={` w-40 h-48 ${styles.backgroundColor} rounded-lg hover:brightness-110 ease-in ${mode === "scholar" ? `border-2 ${styles.border}` : ""}`}
                >
                    Scholar
                </button>
                <button
                    onClick={() => handleModeChange("freeplay")}
                    className={` w-40 h-48 ${styles.backgroundColor} rounded-lg hover:brightness-110 ease-in ${mode === "freeplay" ? `border-2 ${styles.border}` : ""}`}
                >
                    Freeplay
                </button>
                <button
                    onClick={() => handleModeChange("hackingTime")}
                    className={` w-40 h-48 ${styles.backgroundColor} rounded-lg hover:brightness-110 ease-in ${mode === "hackingTime" ? `border-2 ${styles.border}` : ""}`}
                >
                    It&apos;s Hacking Time
                </button>
            </div>
        </>
    );
}
