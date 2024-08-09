import React, { useState, useEffect } from "react";
import type { KeyboardEvent, MutableRefObject } from "react";
import { themeStyles } from "../Theme/themeStyles";
import type { ThemeName } from "../Theme/themeStyles";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";

interface FreePlayKeyboardProps {
    setTypedText: (typedText: string | ((prevText: string) => string)) => void;
    focusRef: MutableRefObject<HTMLTextAreaElement | null>;
    theme: string;
}

export default function FreeplayKeyboard({
    setTypedText,
    focusRef,
    theme,
}: FreePlayKeyboardProps) {
    const styles = themeStyles[theme as ThemeName] || themeStyles["KEEBY"];

    const keycapWidth = "w-[40px]";
    const keycapHeight = "h-[40px]";
    const backspace = "w-[90px] h-[40px]";
    const tab = "w-[65px] h-[40px]";
    const caps = "w-[75px] h-[40px]";
    const shift = "w-[95px] h-[40px]";
    const rShift = "w-[110px] h-[40px]";
    const alt = "w-[50px] h-[40px]";
    const space = "w-[260px] h-[40px]";

    const [activeKeys, setActiveKeys] = useState<string[]>([]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const { code } = event;

            setActiveKeys((prevKeys: string[]) => {
                return prevKeys.includes(code) ? prevKeys : [...prevKeys, code];
            });

            if (code.length >= 1) {
                if (
                    focusRef.current &&
                    document.activeElement !== focusRef.current
                ) {
                    focusRef.current.focus();
                }
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            const { code } = event;
            setActiveKeys((prevKeys) => prevKeys.filter((k) => k !== code));
        };

        window.addEventListener(
            "keydown",
            handleKeyDown as unknown as EventListener,
        );
        window.addEventListener(
            "keyup",
            handleKeyUp as unknown as EventListener,
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown as unknown as EventListener,
            );
            window.removeEventListener(
                "keyup",
                handleKeyUp as unknown as EventListener,
            );
        };
    }, [setTypedText, setActiveKeys, focusRef]);

    // todo style keyboard svgs

    return (
        <>
            <div
                className={`keyboard-container flex flex-col items-center justify-center ${styles.keebTextColor}  relative z-20 bg-black/40 text-opacity-80 rounded-xl`}
            >
                <div
                    className={`flex flex-col  rounded-[4px] border-[13px] ${styles.keebCaseTop} ${styles.keebCaseSide} ${styles.keebCaseBottom} p-[6px] `}
                    style={{
                        boxShadow:
                            "inset 0 1rem 1rem rgba(0, 0, 0, 0.5),0 2rem 3rem -0.5rem rgba(0, 0, 0, 0.55)",
                    }}
                >
                    <div className="row flex w-[618.6px] gap-[1px] text-xs ">
                        <div
                            data-key="`"
                            data-alt="~"
                            className={`key ${
                                activeKeys.includes("Backquote")
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            } flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            <div>~</div>
                            <div>`</div>
                        </div>
                        <div
                            data-key="1"
                            data-alt="!"
                            className={`key ${
                                activeKeys.includes("Digit1") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            } flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            {" "}
                            <div>!</div>
                            <div>1</div>
                        </div>
                        <div
                            data-key="2"
                            data-alt="@"
                            className={`key ${
                                activeKeys.includes("Digit2") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            } flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            {" "}
                            <div>@</div>
                            <div>2</div>
                        </div>
                        <div
                            data-key="3"
                            data-alt="#"
                            className={`key ${
                                activeKeys.includes("Digit3") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            } flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            {" "}
                            <div>#</div>
                            <div>3</div>
                        </div>
                        <div
                            data-key="4"
                            data-alt="$"
                            className={`key ${
                                activeKeys.includes("Digit4") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            } flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            {" "}
                            <div>$</div>
                            <div>4</div>
                        </div>
                        <div
                            data-key="5"
                            data-alt="%"
                            className={`key ${
                                activeKeys.includes("Digit5") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            } flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            {" "}
                            <div>%</div>
                            <div>5</div>
                        </div>
                        <div
                            data-key="6"
                            data-alt="^"
                            className={`key ${
                                activeKeys.includes("Digit6") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            } flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            {" "}
                            <div>^</div>
                            <div>6</div>
                        </div>
                        <div
                            data-key="7"
                            data-alt="&"
                            className={`key ${
                                activeKeys.includes("Digit7") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            } flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            {" "}
                            <div>&</div>
                            <div>7</div>
                        </div>
                        <div
                            data-key="8"
                            data-alt="*"
                            className={`key ${
                                activeKeys.includes("Digit8") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            } flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            <div>*</div>
                            <div>8</div>
                        </div>
                        <div
                            data-key="9"
                            data-alt="("
                            className={`key ${
                                activeKeys.includes("Digit9") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            } flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            <div>{`(`}</div>
                            <div>9</div>
                        </div>
                        <div
                            data-key="0"
                            data-alt=")"
                            className={`key ${
                                activeKeys.includes("Digit0") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            } flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            <div>{`)`}</div>
                            <div>0</div>
                        </div>
                        <div
                            data-key="-"
                            data-alt="_"
                            className={`key ${
                                activeKeys.includes("Minus") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            } flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            <div>_</div>
                            <div>-</div>
                        </div>
                        <div
                            data-key="="
                            data-alt="+"
                            className={`key ${
                                activeKeys.includes("Equal") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            } flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            <div>+</div>
                            <div>=</div>
                        </div>
                        <div
                            data-key="backspace"
                            className={`key ${
                                activeKeys.includes("Backspace")
                                    ? "pressed"
                                    : ""
                            } ${backspace} ${
                                styles.keebSpecialBackground
                            } flex items-center justify-center gap-1 p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebSpecialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebSpecialSide,
                                borderTopColor: styles.keebSpecialTop,
                                borderBottomColor: styles.keebSpecialBottom,
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-7 h-7 rotate-180"
                                viewBox="-6 -4 32 32"
                                fill="none"
                            >
                                <path
                                    d="M24 6V18M-4 12H20M20 12L16 8M20 12L16 16"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="row mt-[2px] flex w-[618.6px] gap-[1px]">
                        <div
                            data-key="tab"
                            className={`key ${
                                activeKeys.includes("Tab") ? "pressed" : ""
                            } ${tab} ${
                                styles.keebSpecialBackground
                            } flex flex-col items-center justify-center pl-1 text-[10px] `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebSpecialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebSpecialSide,
                                borderTopColor: styles.keebSpecialTop,
                                borderBottomColor: styles.keebSpecialBottom,
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                viewBox="-4 0 28 24"
                                fill="none"
                            >
                                <path
                                    d="M20 6V18M-4 12H16M16 12L12 8M16 12L12 16"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div
                            data-key="q"
                            className={`key ${
                                activeKeys.includes("KeyQ") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            Q
                        </div>
                        <div
                            data-key="w"
                            className={`key ${
                                activeKeys.includes("KeyW") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            W
                        </div>
                        <div
                            data-key="e"
                            className={`key ${
                                activeKeys.includes("KeyE") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            E
                        </div>
                        <div
                            data-key="r"
                            className={`key ${
                                activeKeys.includes("KeyR") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            R
                        </div>
                        <div
                            data-key="t"
                            className={`key ${
                                activeKeys.includes("KeyT") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            T
                        </div>
                        <div
                            data-key="y"
                            className={`key ${
                                activeKeys.includes("KeyY") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            Y
                        </div>
                        <div
                            data-key="u"
                            className={`key ${
                                activeKeys.includes("KeyU") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            U
                        </div>
                        <div
                            data-key="i"
                            className={`key ${
                                activeKeys.includes("KeyI") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            I
                        </div>
                        <div
                            data-key="o"
                            className={`key ${
                                activeKeys.includes("KeyO") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            O
                        </div>
                        <div
                            data-key="p"
                            className={`key ${
                                activeKeys.includes("KeyP") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            P
                        </div>
                        <div
                            data-key="["
                            data-alt="{"
                            className={`key ${
                                activeKeys.includes("BracketLeft")
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            } flex flex-col text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            <div>{`{`}</div>
                            <div>{`[`}</div>
                        </div>
                        <div
                            data-key="]"
                            data-alt="}"
                            className={`key ${
                                activeKeys.includes("BracketRight")
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            } flex flex-col text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            <div>{`}`}</div>
                            <div>{`]`}</div>
                        </div>
                        <div
                            data-key="\"
                            data-alt="|"
                            id="backslash"
                            className={`key ${
                                activeKeys.includes("Backslash")
                                    ? "pressed"
                                    : ""
                            } ${tab}  ${
                                styles.keebKeycapBackground
                            } flex flex-col text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            <div>{`|`}</div>
                            <div>{`\\`}</div>
                        </div>
                    </div>
                    <div className="row mt-[2px] flex gap-[1px]">
                        <div
                            data-key="caps"
                            className={`key ${
                                activeKeys.includes("CapsLock") ? "pressed" : ""
                            } ${caps} ${
                                styles.keebSpecialBackground
                            } flex items-center justify-center p-1 `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebSpecialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebSpecialSide,
                                borderTopColor: styles.keebSpecialTop,
                                borderBottomColor: styles.keebSpecialBottom,
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M8 8L12 4M12 4L16 8M12 4V16M4 20H20"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div
                            data-key="a"
                            className={`key ${
                                activeKeys.includes("KeyA") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            A
                        </div>
                        <div
                            data-key="s"
                            className={`key ${
                                activeKeys.includes("KeyS") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            S
                        </div>
                        <div
                            data-key="d"
                            className={`key ${
                                activeKeys.includes("KeyD") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            D
                        </div>
                        <div
                            data-key="f"
                            className={`key ${
                                activeKeys.includes("KeyF") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            F
                        </div>
                        <div
                            data-key="g"
                            className={`key ${
                                activeKeys.includes("KeyG") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            G
                        </div>
                        <div
                            data-key="h"
                            className={`key ${
                                activeKeys.includes("KeyH") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            H
                        </div>
                        <div
                            data-key="j"
                            className={`key ${
                                activeKeys.includes("KeyJ") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            J
                        </div>
                        <div
                            data-key="k"
                            className={`key ${
                                activeKeys.includes("KeyK") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            K
                        </div>
                        <div
                            data-key="l"
                            className={`key ${
                                activeKeys.includes("KeyL") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            L
                        </div>
                        <div
                            data-key=";"
                            data-alt=":"
                            className={`key ${
                                activeKeys.includes("Semicolon")
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            } flex flex-col text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            <div>{`:`}</div>
                            <div>{`;`}</div>
                        </div>
                        <div
                            data-key="'"
                            data-alt='"'
                            id="quote"
                            className={`key ${
                                activeKeys.includes("Quote") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            } flex flex-col text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            <div>{`"`}</div>
                            <div>{`'`}</div>
                        </div>
                        <div
                            data-key="enter"
                            className={`key ${
                                activeKeys.includes("Enter") ? "pressed" : ""
                            } ${backspace}  ${
                                styles.keebSpecialBackground
                            } flex items-center justify-center gap-1 p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebSpecialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebSpecialSide,
                                borderTopColor: styles.keebSpecialTop,
                                borderBottomColor: styles.keebSpecialBottom,
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M20 7V8.2C20 9.88016 20 10.7202 19.673 11.362C19.3854 11.9265 18.9265 12.3854 18.362 12.673C17.7202 13 16.8802 13 14 13H2M2 13L6 9M2 13L6 17"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-7 h-7"
                                viewBox="0 0 30 24"
                                fill="none"
                            >
                                <path
                                    d="M26 7V8.2C26 9.88016 26 10.7202 25.673 11.362C25.3854 11.9265 24.9265 12.3854 24.362 12.673C23.7202 13 22.8802 13 20 13H0M0 13L5 9M0 13L5 17"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg> */}
                        </div>
                    </div>
                    <div className="row mt-[2px] flex gap-[1px]">
                        <div
                            data-key="lshift"
                            className={`key ${
                                activeKeys.includes("ShiftLeft")
                                    ? "pressed"
                                    : ""
                            } ${shift} ${
                                styles.keebSpecialBackground
                            } flex items-center justify-center p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebSpecialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebSpecialSide,
                                borderTopColor: styles.keebSpecialTop,
                                borderBottomColor: styles.keebSpecialBottom,
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M12 6V18M12 6L7 11M12 6L17 11"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div
                            data-key="z"
                            className={`key ${
                                activeKeys.includes("KeyZ") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            Z
                        </div>
                        <div
                            data-key="x"
                            className={`key ${
                                activeKeys.includes("KeyX") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            X
                        </div>
                        <div
                            data-key="c"
                            className={`key ${
                                activeKeys.includes("KeyC") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            C
                        </div>
                        <div
                            data-key="v"
                            className={`key ${
                                activeKeys.includes("KeyV") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            V
                        </div>
                        <div
                            data-key="b"
                            className={`key ${
                                activeKeys.includes("KeyB") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            B
                        </div>
                        <div
                            data-key="n"
                            className={`key ${
                                activeKeys.includes("KeyN") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            N
                        </div>
                        <div
                            data-key="m"
                            className={`key ${
                                activeKeys.includes("KeyM") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            }  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            M
                        </div>
                        <div
                            data-key=","
                            data-alt="<"
                            className={`key ${
                                activeKeys.includes("Comma") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            } flex flex-col text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            <div>{`<`}</div>
                            <div>{`,`}</div>
                        </div>
                        <div
                            data-key="."
                            data-alt=">"
                            className={`key ${
                                activeKeys.includes("Period") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            } flex flex-col text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            <div>{`>`}</div>
                            <div>{`.`}</div>
                        </div>
                        <div
                            data-key="/"
                            data-alt="?"
                            className={`key ${
                                activeKeys.includes("Slash") ? "pressed" : ""
                            } ${keycapHeight} ${keycapWidth} ${
                                styles.keebKeycapBackground
                            } flex flex-col text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        >
                            <div>{`?`}</div>
                            <div>{`/`}</div>
                        </div>
                        <div
                            data-key="rshift"
                            className={`key ${
                                activeKeys.includes("ShiftRight")
                                    ? "pressed"
                                    : ""
                            } ${rShift} ${
                                styles.keebSpecialBackground
                            } flex items-center justify-center p-1 `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebSpecialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebSpecialSide,
                                borderTopColor: styles.keebSpecialTop,
                                borderBottomColor: styles.keebSpecialBottom,
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M12 6V18M12 6L7 11M12 6L17 11"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="row mt-[2px] flex gap-[1px]">
                        <div
                            data-key="lctrl"
                            className={`key ${
                                activeKeys.includes("ControlLeft")
                                    ? "pressed"
                                    : ""
                            } ${alt} ${
                                styles.keebSpecialBackground
                            } flex items-center justify-center gap-1 p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebSpecialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebSpecialSide,
                                borderTopColor: styles.keebSpecialTop,
                                borderBottomColor: styles.keebSpecialBottom,
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-7 h-7"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M9.5 11.5L7 14M17 14L12 9"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div
                            data-key="lwin"
                            className={`key ${
                                activeKeys.includes("MetaLeft") ? "pressed" : ""
                            } ${alt} ${
                                styles.keebSpecialBackground
                            } flex items-center justify-center p-1`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebSpecialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebSpecialSide,
                                borderTopColor: styles.keebSpecialTop,
                                borderBottomColor: styles.keebSpecialBottom,
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M16 9L20 5V16H4V5L6 7M8 9L12 5L14 7M4 19H20"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div
                            data-key="lalt"
                            className={`key ${
                                activeKeys.includes("AltLeft") ? "pressed" : ""
                            } ${alt} ${
                                styles.keebSpecialBackground
                            } flex items-center justify-center p-1`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebSpecialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebSpecialSide,
                                borderTopColor: styles.keebSpecialTop,
                                borderBottomColor: styles.keebSpecialBottom,
                            }}
                        >
                            {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                viewBox="0 -1.5 20 20"
                                version="1.1"
                            >
                                <g
                                    id="Page-1"
                                    stroke="none"
                                    strokeWidth="1"
                                    fill="none"
                                    fillRule="evenodd"
                                >
                                    <g
                                        transform="translate(-60.000000, -4840.000000)"
                                        fill="currentColor"
                                    >
                                        <g transform="translate(56.000000, 160.000000)">
                                            <path d="M20.18,4680 L7.819,4680 L4,4685.97804 L14,4697 L24,4685.76489 L20.18,4680 Z M19.095,4681.96452 L21.498,4685.59103 L13.985,4694.03062 L6.492,4685.77275 L8.925,4681.96452 L19,4681.96452 L19.095,4681.96452 Z"></path>
                                        </g>
                                    </g>
                                </g>
                            </svg> */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M15 17L20 12L15 7M6.5 9.5L9 7M9 17L4 12"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div
                            data-key="space"
                            className={`key ${
                                activeKeys.includes("Space") ? "pressed" : ""
                            } ${space} ${
                                styles.keebKeycapBackground
                            } flex items-center gap-1 p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebKeycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebKeycapSide,
                                borderTopColor: styles.keebKeycapTop,
                                borderBottomColor: styles.keebKeycapBottom,
                            }}
                        ></div>
                        <div
                            data-key="ralt"
                            className={`key ${
                                activeKeys.includes("AltRight") ? "pressed" : ""
                            } ${alt} ${
                                styles.keebSpecialBackground
                            } flex items-center justify-center p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebSpecialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebSpecialSide,
                                borderTopColor: styles.keebSpecialTop,
                                borderBottomColor: styles.keebSpecialBottom,
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M15 17L20 12L15 7M6.5 9.5L9 7M9 17L4 12"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div
                            data-key="rwin"
                            className={`key ${
                                activeKeys.includes("MetaRight")
                                    ? "pressed"
                                    : ""
                            } ${alt} ${
                                styles.keebSpecialBackground
                            } flex items-center justify-center p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebSpecialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebSpecialSide,
                                borderTopColor: styles.keebSpecialTop,
                                borderBottomColor: styles.keebSpecialBottom,
                            }}
                        >
                            {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                             className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M9 9H15M9 9V15M9 9H6C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6M15 9V15M15 9V6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6C21 7.65685 19.6569 9 18 9M15 15V18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15H15ZM9 15H12M9 15L6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21C7.65685 21 9 19.6569 9 18V15Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </svg> */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M16 9L20 5V16H4V5L6 7M8 9L12 5L14 7M4 19H20"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div
                            data-key="rctx"
                            className={`key ${
                                activeKeys.includes("ContextMenu")
                                    ? "pressed"
                                    : ""
                            } ${alt} ${
                                styles.keebSpecialBackground
                            } flex items-center justify-center p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebSpecialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebSpecialSide,
                                borderTopColor: styles.keebSpecialTop,
                                borderBottomColor: styles.keebSpecialBottom,
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M4 17H8M12 17H20M4 12H20M4 7H12M16 7H20"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div
                            data-key="rctrl"
                            className={`key ${
                                activeKeys.includes("ControlRight")
                                    ? "pressed"
                                    : ""
                            } ${alt} ${
                                styles.keebSpecialBackground
                            } flex items-center justify-center p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${styles.keebSpecialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: styles.keebSpecialSide,
                                borderTopColor: styles.keebSpecialTop,
                                borderBottomColor: styles.keebSpecialBottom,
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-7 h-7"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M9.5 11.5L7 14M17 14L12 9"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
