"use client";
import { setCookie } from "cookies-next";
import type { ThemeStyle } from "../Theme/themeStyles";

interface LengthModalProps {
    setGameLength: (mode: number) => void;
    setGameOver: (gameOver: boolean) => void;
    styles: ThemeStyle;
    closeLengthModal: () => void;
}

export default function LengthModal({
    setGameLength,
    setGameOver,
    styles,
    closeLengthModal,
}: LengthModalProps) {
    const handleLengthChange = (newLength: number) => {
        setCookie("gameLength", newLength, {
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
        });
        setGameOver(false);
        setGameLength(newLength);
        closeLengthModal();
    };

    return (
        <>
            <div className="flex gap-5">
                <button
                    onClick={() => handleLengthChange(10)}
                    className={` w-32 h-32 ${styles.backgroundColor} rounded-lg hover:brightness-110 ease-in`}
                >
                    10
                </button>
                <button
                    onClick={() => handleLengthChange(20)}
                    className={` w-32 h-32 ${styles.backgroundColor} rounded-lg hover:brightness-110 ease-in`}
                >
                    20
                </button>
                <button
                    onClick={() => handleLengthChange(50)}
                    className={` w-32 h-32 ${styles.backgroundColor} rounded-lg hover:brightness-110 ease-in`}
                >
                    50
                </button>
            </div>
        </>
    );
}
