import React, { useState, useEffect } from "react";

interface FreePlayKeyboardProps {
    setTypedText: (typedText: string | ((prevText: string) => string)) => void;
}

export default function FreeplayKeyboard({
    setTypedText,
}: FreePlayKeyboardProps) {
    // const [pressedKeys, setPressedKeys] = useState({});

    // todo integrate themestyle into this bad boiiiiii

    // fix width calculations they suck currently lmao
    

    const keycapWidth = "w-[40px]";
    const keycapHeight = "h-[40px]";
    const backspace = "w-[90px] h-[40px]";
    const tab = "w-[65px] h-[40px]";
    const caps = "w-[75px] h-[40px]";
    const shift = "w-[95px] h-[40px]";
    const rShift = "w-[110px] h-[40px]";
    const alt = "w-[50px] h-[40px]"
    const space = "w-[260px] h-[40px]"


    const letter = "text-[#999]";
    const caseTop = "border-t-[#666]";
    const caseBottom = "border-b-[#888]";
    const caseSide = "border-x-[#777]";
    // caps
    const keycapBackground = "bg-[#e9e8e6]";
    const keycapTop = "#ece8e4";
    const keycapSide = "#dedad6";
    const keycapBottom = "#c9c4c4";
    // capss
    const specialBackground = "bg-[#7f8384]";
    const specialSide = "#696c6f";
    const specialTop = "#848789";
    const specialBottom = "#676a6d";

    const [activeKey, setActiveKey] = useState("");

    useEffect(() => {
        // Function to handle keydown events
        const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event;
            const {code} = event
            if(code === 'ShiftRight'){
                setActiveKey("ShiftRight")
            }
            if(code === "ShiftLeft"){
                setActiveKey("ShiftLeft")
            }
          
            if (key.length === 1) {
                setTypedText((prevText) => prevText + key);
            }
            if (key !== "Shift") {
                setActiveKey(key);
            }
        };
        const handleKeyUp = () => {
            setActiveKey("");
        };

        // Add event listener
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [setActiveKey, setTypedText]);


    return (
        <>
            <div
                className={`keyboard-container flex h-96 w-full flex-col items-center justify-center ${letter} text-black text-opacity-80`}
            >
                <div
                    className={`flex flex-col  rounded-[4px] border-[13px] ${caseSide} ${caseBottom} ${caseTop} p-[6px] `}
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground} align  relative box-border flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground} flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground} flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground} flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground} flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground} flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground} flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground} flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground} flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground} flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground} flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground} flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground} flex flex-col `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
                            }}
                        >
                            <div>+</div>
                            <div>=</div>
                        </div>
                        <div
                            data-key="backspace"
                            className={`key ${
                                activeKey === "Backspace" ? "pressed" : ""
                            } ${backspace} ${specialBackground} flex items-center gap-1 p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${specialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: specialSide,
                                borderTopColor: specialTop,
                                borderBottomColor: specialBottom,
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
                            } ${tab} ${specialBackground} flex flex-col items-start pl-1 text-[10px] `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${specialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: specialSide,
                                borderTopColor: specialTop,
                                borderBottomColor: specialBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground} flex flex-col text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground} flex flex-col text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                                activeKey === "\" || activeKey === "|"
                                    ? "pressed"
                                    : ""
                            } ${tab}  ${keycapBackground} flex flex-col text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                                activeKey === "Backspace" ? "pressed" : ""
                            } ${caps} ${specialBackground} flex items-center gap-1 p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${specialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: specialSide,
                                borderTopColor: specialTop,
                                borderBottomColor: specialBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground} flex flex-col text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground} flex flex-col text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
                            }}
                        >
                            <div>{`"`}</div>
                            <div>{`'`}</div>
                        </div>
                        <div
                            data-key="enter"
                            className={`key ${
                                activeKey === "Enter" ? "pressed" : ""
                            } ${backspace}  ${specialBackground} flex items-center gap-1 p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${specialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: specialSide,
                                borderTopColor: specialTop,
                                borderBottomColor: specialBottom,
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
                            } ${shift} ${specialBackground} flex items-center gap-1 p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${specialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: specialSide,
                                borderTopColor: specialTop,
                                borderBottomColor: specialBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
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
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground}  `}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
                            }}
                        >
                            M
                        </div>
                        <div data-key="," data-alt="<"    className={`key ${
                                activeKey === "," || activeKey === "<"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground} flex flex-col text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
                            }}
                        >
                            <div>{`<`}</div>
                            <div>{`,`}</div>
                        </div>
                        <div data-key="." data-alt=">"    className={`key ${
                                activeKey === "." || activeKey === ">"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground} flex flex-col text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
                            }}
                        >
                            <div>{`>`}</div>
                            <div>{`.`}</div>
                        </div>
                        <div data-key="/" data-alt="?"    className={`key ${
                                activeKey === "/" || activeKey === "?"
                                    ? "pressed"
                                    : ""
                            } ${keycapHeight} ${keycapWidth} ${keycapBackground} flex flex-col text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
                            }}
                        >
                            <div>{`?`}</div>
                            <div>{`/`}</div>
                        </div>
                        <div data-key="rshift"    className={`key ${
                                activeKey === "ShiftRight" ? "pressed" : ""
                            } ${rShift} ${specialBackground} flex items-center gap-1 p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${specialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: specialSide,
                                borderTopColor: specialTop,
                                borderBottomColor: specialBottom,
                            }}
                        >
                            Shift
                        </div>
                    </div>
                    <div className="row mt-[2px] flex gap-[1px]">
                        <div data-key="lctrl"   className={`key ${
                                activeKey === "ShiftRight" ? "pressed" : ""
                            } ${alt} ${specialBackground} flex items-center gap-1 p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${specialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: specialSide,
                                borderTopColor: specialTop,
                                borderBottomColor: specialBottom,
                            }}
                        >
                            ctrl
                        </div>
                        <div data-key="lwin"   className={`key ${
                                activeKey === "ShiftRight" ? "pressed" : ""
                            } ${alt} ${specialBackground} flex items-center gap-1 p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${specialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: specialSide,
                                borderTopColor: specialTop,
                                borderBottomColor: specialBottom,
                            }}
                        >
                            wind
                        </div>
                        <div data-key="lalt"   className={`key ${
                                activeKey === "ShiftRight" ? "pressed" : ""
                            } ${alt} ${specialBackground} flex items-center gap-1 p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${specialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: specialSide,
                                borderTopColor: specialTop,
                                borderBottomColor: specialBottom,
                            }}
                        >
                            alt
                        </div>
                        <div data-key="space"   className={`key ${
                                activeKey === "ShiftRight" ? "pressed" : ""
                            } ${space} ${keycapBackground} flex items-center gap-1 p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: keycapSide,
                                borderTopColor: keycapTop,
                                borderBottomColor: keycapBottom,
                            }}
                        >
                        </div>
                        <div data-key="ralt" className={`key ${
                                activeKey === "ShiftRight" ? "pressed" : ""
                            } ${alt} ${specialBackground} flex items-center gap-1 p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${specialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: specialSide,
                                borderTopColor: specialTop,
                                borderBottomColor: specialBottom,
                            }}
                        >
                            alt
                        </div>
                        <div data-key="rwin" className={`key ${
                                activeKey === "ShiftRight" ? "pressed" : ""
                            } ${alt} ${specialBackground} flex items-center gap-1 p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${specialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: specialSide,
                                borderTopColor: specialTop,
                                borderBottomColor: specialBottom,
                            }}
                        >
                            win
                        </div>
                        <div data-key="rctx" className={`key ${
                                activeKey === "ShiftRight" ? "pressed" : ""
                            } ${alt} ${specialBackground} flex items-center gap-1 p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${specialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: specialSide,
                                borderTopColor: specialTop,
                                borderBottomColor: specialBottom,
                            }}
                        >
                            ctx
                        </div>
                        <div data-key="rctrl" className={`key ${
                                activeKey === "ShiftRight" ? "pressed" : ""
                            } ${alt} ${specialBackground} flex items-center gap-1 p-1 text-[10px]`}
                            style={{
                                border: "3px solid transparent",
                                borderTop: "2px solid transparent",
                                borderBottom: "6px solid transparent",
                                boxShadow: `0 -0.125em 0 -0.063em ${specialBottom}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                                borderColor: specialSide,
                                borderTopColor: specialTop,
                                borderBottomColor: specialBottom,
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
