import React, { useState, useEffect } from "react";
import type { MutableRefObject } from "react";
import { themeStyles } from "../Theme/themeStyles";
import type { ThemeName } from "../Theme/themeStyles";

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
    // todo integrate themestyle into this bad boiiiiii

    // theme
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

    const [activeKey, setActiveKey] = useState("");

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event;
            const { code } = event;
            console.log(key);
            if (
                code === "ShiftRight" ||
                code === "ShiftLeft" ||
                code === "ControlLeft" ||
                code === "ControlRight" ||
                code === "MetaRight" ||
                code === "MetaLeft" ||
                code === "AltRight" ||
                code === "AltLeft" ||
                code === "Space"
            ) {
                setActiveKey(code);
            }
            if (
                key !== "Shift" &&
                key !== "Control" &&
                key !== "Meta" &&
                key !== "Alt" &&
                key !== " "
            ) {
                setActiveKey(key);
            }
            if (key === "Backspace") {
                if (
                    focusRef.current &&
                    document.activeElement !== focusRef.current
                ) {
                    focusRef.current.focus();
                }
            } else if (key.length === 1) {
                if (
                    focusRef.current &&
                    document.activeElement !== focusRef.current
                ) {
                    focusRef.current.focus();
                }
            }
        };
        const handleKeyUp = () => {
            setActiveKey("");
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [setActiveKey, setTypedText]);

    return (
        <>
            <div
                className={`keyboard-container flex flex-col items-center justify-center ${styles.keebTextColor}  text-opacity-80 relative z-20`}
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
                                activeKey === "`" || activeKey === "~"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground} align  relative box-border flex flex-col `}
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
                                activeKey === "1" || activeKey === "!"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground} flex flex-col `}
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
                                activeKey === "2" || activeKey === "@"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground} flex flex-col `}
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
                                activeKey === "3" || activeKey === "#"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground} flex flex-col `}
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
                                activeKey === "4" || activeKey === "$"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground} flex flex-col `}
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
                                activeKey === "5" || activeKey === "%"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground} flex flex-col `}
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
                                activeKey === "6" || activeKey === "^"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground} flex flex-col `}
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
                                activeKey === "7" || activeKey === "&"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground} flex flex-col `}
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
                                activeKey === "8" || activeKey === "*"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground} flex flex-col `}
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
                                activeKey === "9" || activeKey === "("
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground} flex flex-col `}
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
                                activeKey === "0" || activeKey === ")"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground} flex flex-col `}
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
                                activeKey === "-" || activeKey === "_"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground} flex flex-col `}
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
                                activeKey === "=" || activeKey === "+"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground} flex flex-col `}
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
                                activeKey === "Backspace" ? "pressed" : ""
                            } ${backspace} ${styles.keebSpecialBackground} flex items-center gap-1 p-1 text-[10px]`}
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
                                activeKey === "Tab" ? "pressed" : ""
                            } ${tab} ${styles.keebSpecialBackground} flex flex-col items-start pl-1 text-[10px] `}
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
                                activeKey === "q" || activeKey === "Q"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "w" || activeKey === "W"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "e" || activeKey === "E"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "r" || activeKey === "R"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "t" || activeKey === "T"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "y" || activeKey === "Y"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "u" || activeKey === "U"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "i" || activeKey === "I"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "o" || activeKey === "O"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "p" || activeKey === "P"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "[" || activeKey === "{"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground} flex flex-col text-[10px]`}
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
                                activeKey === "]" || activeKey === "}"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground} flex flex-col text-[10px]`}
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
                                activeKey === "\\" || activeKey === "|"
                                    ? "pressed"
                                    : ""
                            } ${tab}  ${styles.keebKeycapBackground} flex flex-col text-[10px]`}
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
                                activeKey === "CapsLock" ? "pressed" : ""
                            } ${caps} ${styles.keebSpecialBackground} flex items-center gap-1 p-1 text-[10px]`}
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
                                activeKey === "a" || activeKey === "A"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "s" || activeKey === "S"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "d" || activeKey === "D"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "f" || activeKey === "F"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "g" || activeKey === "G"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "h" || activeKey === "H"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "j" || activeKey === "J"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "k" || activeKey === "K"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "l" || activeKey === "L"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === ";" || activeKey === ":"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground} flex flex-col text-[10px]`}
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
                                activeKey === "'" || activeKey === '"'
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground} flex flex-col text-[10px]`}
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
                                activeKey === "Enter" ? "pressed" : ""
                            } ${backspace}  ${styles.keebSpecialBackground} flex items-center gap-1 p-1 text-[10px]`}
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
                                activeKey === "ShiftLeft" ? "pressed" : ""
                            } ${shift} ${styles.keebSpecialBackground} flex items-center gap-1 p-1 text-[10px]`}
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
                                activeKey === "z" || activeKey === "Z"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "x" || activeKey === "X"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "c" || activeKey === "C"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "v" || activeKey === "V"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "b" || activeKey === "B"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "n" || activeKey === "N"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "m" || activeKey === "M"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground}  `}
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
                                activeKey === "," || activeKey === "<"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground} flex flex-col text-[10px]`}
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
                                activeKey === "." || activeKey === ">"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground} flex flex-col text-[10px]`}
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
                                activeKey === "/" || activeKey === "?"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${styles.keebKeycapBackground} flex flex-col text-[10px]`}
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
                                activeKey === "ShiftRight" ? "pressed" : ""
                            } ${rShift} ${styles.keebSpecialBackground} flex items-center gap-1 p-1 text-[10px]`}
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
                                activeKey === "ControlLeft" ? "pressed" : ""
                            } ${alt} ${styles.keebSpecialBackground} flex items-center gap-1 p-1 text-[10px]`}
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
                                activeKey === "MetaLeft" ? "pressed" : ""
                            } ${alt} ${styles.keebSpecialBackground} flex items-center gap-1 p-1 text-[10px]`}
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
                            wind
                        </div>
                        <div
                            data-key="lalt"
                            className={`key ${
                                activeKey === "AltLeft" ? "pressed" : ""
                            } ${alt} ${styles.keebSpecialBackground} flex items-center gap-1 p-1 text-[10px]`}
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
                                activeKey === "Space" ? "pressed" : ""
                            } ${space} ${styles.keebKeycapBackground} flex items-center gap-1 p-1 text-[10px]`}
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
                                activeKey === "AltRight" ? "pressed" : ""
                            } ${alt} ${styles.keebSpecialBackground} flex items-center gap-1 p-1 text-[10px]`}
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
                                activeKey === "MetaRight" ? "pressed" : ""
                            } ${alt} ${styles.keebSpecialBackground} flex items-center gap-1 p-1 text-[10px]`}
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
                                activeKey === "ContextMenu" ? "pressed" : ""
                            } ${alt} ${styles.keebSpecialBackground} flex items-center gap-1 p-1 text-[10px]`}
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
                                activeKey === "ControlRight" ? "pressed" : ""
                            } ${alt} ${styles.keebSpecialBackground} flex items-center gap-1 p-1 text-[10px]`}
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
