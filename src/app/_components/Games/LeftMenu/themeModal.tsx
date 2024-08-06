"use client";
import { setCookie } from "cookies-next";
import type { ThemeStyle } from "../Theme/themeStyles";

interface ThemeModalProps {
    setTheme: (mode: string) => void;
    styles: ThemeStyle;
    closeThemeModal: () => void;
}

export default function ThemeModal({
    setTheme,
    styles,
    closeThemeModal,
}: ThemeModalProps) {
    const handleThemeChange = (newTheme: string) => {
        setCookie("theme", newTheme, {
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
        });
        setTheme(newTheme);
        closeThemeModal();
    };

    return (
        <>
            <div className="flex gap-5">
                <button
                    onClick={() => handleThemeChange("KEEBY")}
                    className={` w-40 h-52 ${styles.backgroundColor} rounded-lg hover:brightness-110 ease-in`}
                >
                    keeby
                </button>
                <button
                    onClick={() => handleThemeChange("KEEBYRED")}
                    className={` w-40 h-52 ${styles.backgroundColor} rounded-lg hover:brightness-110 ease-in`}
                >
                    keeby red
                </button>
                <button
                    onClick={() => handleThemeChange("BANANA")}
                    className={` w-40 h-52 ${styles.backgroundColor} rounded-lg hover:brightness-110 ease-in`}
                >
                    banana
                </button>
                <button
                    onClick={() => handleThemeChange("HACKERMAN")}
                    className={` w-40 h-52 ${styles.backgroundColor} rounded-lg hover:brightness-110 ease-in`}
                >
                    hackerman
                </button>{" "}
                <button
                    onClick={() => handleThemeChange("HIPYO")}
                    className={` w-40 h-52 ${styles.backgroundColor} rounded-lg hover:brightness-110 ease-in`}
                >
                    hipyo
                </button>
                <button
                    onClick={() => handleThemeChange("PIGGY")}
                    className={` w-40 h-52 ${styles.backgroundColor} rounded-lg hover:brightness-110 ease-in`}
                >
                    piggy
                </button>
                <button
                    onClick={() => handleThemeChange("PRIMEAGEN")}
                    className={` w-40 h-52 ${styles.backgroundColor} rounded-lg hover:brightness-110 ease-in`}
                >
                    primeagen
                </button>
            </div>
        </>
    );
}
