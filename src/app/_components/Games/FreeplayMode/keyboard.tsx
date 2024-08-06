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
            handleKeyDown as unknown as EventListener
        );
        window.addEventListener(
            "keyup",
            handleKeyUp as unknown as EventListener
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown as unknown as EventListener
            );
            window.removeEventListener(
                "keyup",
                handleKeyUp as unknown as EventListener
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
                            } flex items-center gap-1 p-1 text-[10px]`}
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
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    version="1.1"
                                    id="Capa_1"
                                    className="h-2 w-2"
                                    viewBox="0 0 401.949 401.949"
                                >
                                    <g>
                                        <g>
                                            <g id="Layer_5_54_">
                                                <path d="M401.947,159.301c0-8.583-6.949-15.742-15.497-15.889l0,0H197.515c-7.021-1.589-12.309-7.886-12.309-15.369V78.976     c0-8.675-5.397-11.163-11.993-5.535L4.948,190.735c-6.598,5.634-6.598,14.847,0,20.479l168.262,117.29     c6.599,5.632,11.996,3.146,11.996-5.528v-49.067c0-8.673,7.097-15.771,15.771-15.771l185.201-0.276     c8.676-0.004,15.771-7.101,15.771-15.771L401.947,159.301z" />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div>Backspace</div>
                        </div>
                    </div>
                    <div className="row mt-[2px] flex w-[618.6px] gap-[1px]">
                        <div
                            data-key="tab"
                            className={`key ${
                                activeKeys.includes("Tab") ? "pressed" : ""
                            } ${tab} ${
                                styles.keebSpecialBackground
                            } flex flex-col items-start pl-1 text-[10px] `}
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
                                className="-mb-1 -mt-[2px] h-7 w-7 rotate-180 text-black"
                                viewBox="0 0 16 16"
                                version="1.1"
                            >
                                <path
                                    fill="currentColor"
                                    d="M9 9h-9v-2h9v-3l5 4-5 4v-2z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M14 4h2v8h-2v-8z"
                                />
                            </svg>
                            Tab
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7  text-black"
                                viewBox="0 0 16 16"
                                version="1.1"
                            >
                                <path
                                    fill="currentColor"
                                    d="M9 9h-9v-2h9v-3l5 4-5 4v-2z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M14 4h2v8h-2v-8z"
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
                            } flex items-center gap-1 p-1 text-[10px]`}
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
                            Caps Lock
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
                            } flex items-center gap-1 p-1 text-[10px]`}
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
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    version="1.1"
                                    id="Capa_1"
                                    className="h-2 w-2"
                                    viewBox="0 0 401.949 401.949"
                                >
                                    <g>
                                        <g>
                                            <g id="Layer_5_54_">
                                                <path d="M401.947,159.301c0-8.583-6.949-15.742-15.497-15.889l0,0H197.515c-7.021-1.589-12.309-7.886-12.309-15.369V78.976     c0-8.675-5.397-11.163-11.993-5.535L4.948,190.735c-6.598,5.634-6.598,14.847,0,20.479l168.262,117.29     c6.599,5.632,11.996,3.146,11.996-5.528v-49.067c0-8.673,7.097-15.771,15.771-15.771l185.201-0.276     c8.676-0.004,15.771-7.101,15.771-15.771L401.947,159.301z" />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div>Enter</div>
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
                            } flex items-center gap-1 p-1 text-[10px]`}
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
                            Shift
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
                            } flex items-center gap-1 p-1 text-[10px]`}
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
                            Shift
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
                            } flex items-center gap-1 p-1 text-[10px]`}
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
                            ctrl
                        </div>
                        <div
                            data-key="lwin"
                            className={`key ${
                                activeKeys.includes("MetaLeft") ? "pressed" : ""
                            } ${alt} ${
                                styles.keebSpecialBackground
                            } flex items-center gap-1 p-1 text-[10px]`}
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
                            <Image
                                alt="keeby mascot"
                                className="h-4 w-4 "
                                src={keebo}
                            />
                        </div>
                        <div
                            data-key="lalt"
                            className={`key ${
                                activeKeys.includes("AltLeft") ? "pressed" : ""
                            } ${alt} ${
                                styles.keebSpecialBackground
                            } flex items-center gap-1 p-1 text-[10px]`}
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
                            alt
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
                            } flex items-center gap-1 p-1 text-[10px]`}
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
                            alt
                        </div>
                        <div
                            data-key="rwin"
                            className={`key ${
                                activeKeys.includes("MetaRight")
                                    ? "pressed"
                                    : ""
                            } ${alt} ${
                                styles.keebSpecialBackground
                            } flex items-center gap-1 p-1 text-[10px]`}
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
                            win
                        </div>
                        <div
                            data-key="rctx"
                            className={`key ${
                                activeKeys.includes("ContextMenu")
                                    ? "pressed"
                                    : ""
                            } ${alt} ${
                                styles.keebSpecialBackground
                            } flex items-center gap-1 p-1 text-[10px]`}
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
                            ctx
                        </div>
                        <div
                            data-key="rctrl"
                            className={`key ${
                                activeKeys.includes("ControlRight")
                                    ? "pressed"
                                    : ""
                            } ${alt} ${
                                styles.keebSpecialBackground
                            } flex items-center gap-1 p-1 text-[10px]`}
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
                            ctrl
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
