import React, { useState, useEffect } from "react";

export default function FreeplayKeyboard({
    setTypedText,
}: {
    setTypedText: (typedText: string) => void;
}) {
    // const [pressedKeys, setPressedKeys] = useState({});

    // todo integrate themestyle into this bad boiiiiii

    // fix width calculations they suck currently lmao

    const keycapWidth = "w-[40px]";
    const keycapHeight = "h-[40px]";

    const letter = "text-[#999]";
    const caseTop = "border-t-[#666]";
    const caseBottom = "border-b-[#888]";
    const caseSide = "border-x-[#777]";
    const keycapBackground = "bg-[#e9e8e6]";
    const keycapTop = "border-t-[#ece8e4]";
    const keycapSide = "border-x-[#dedad6]";
    const keycapBottom = "border-b-[#c9c4c4]";
    const keycapBottomHex = "#c9c4c4";
    const [activeKey, setActiveKey] = useState("");

    useEffect(() => {
        // Function to handle keydown events
        const handleKeyDown = (event: KeyboardEvent) => {
            // Prevent adding special keys like Shift, Ctrl, etc.
            if (event.key.length === 1) {
                setTypedText((currentText: string) => currentText + event.key);
                setActiveKey(event.key);
            }
        };
        const handleKeyUp = (event: KeyboardEvent) => {
            setActiveKey(""); // Reset the active key when it is released
        };

        // Add event listener
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return (
        <>
            <div
                className={`keyboard-container flex h-96 w-full flex-col items-center justify-center ${letter}`}
            >
                <div
                    className={`keyboard flex flex-col items-center justify-center rounded-[4px] border-[13px] ${caseSide} ${caseBottom} ${caseTop} p-[6px] `}
                    style={{
                        boxShadow:
                            "inset 0 1rem 1rem rgba(0, 0, 0, 0.5),0 2rem 3rem -0.5rem rgba(0, 0, 0, 0.55)",
                    }}
                >
                    <div className="row flex w-[618.6px] gap-[1px] ">
                        <kbd
                            tabIndex={1}
                            data-key="`"
                            data-alt="~"
                            className={`${keycapHeight} ${keycapWidth} ${keycapSide} ${keycapBottom} ${keycapTop} ${keycapBackground} `}
                            style={{
                                boxShadow: `0 -0.125em 0 -0.063em ${keycapBottomHex}, 0 0.125em 0 -0.063em rgba(0, 0, 0, 0.5)`,
                            }}
                        ></kbd>
                        <kbd data-key="1" data-alt="!" className=""></kbd>
                        <kbd data-key="2" data-alt="@" className=""></kbd>
                        <kbd data-key="3" data-alt="#" className=""></kbd>
                        <kbd data-key="4" data-alt="$" className=""></kbd>
                        <kbd data-key="5" data-alt="%" className=""></kbd>
                        <kbd data-key="6" data-alt="^" className=""></kbd>
                        <kbd data-key="7" data-alt="&" className=""></kbd>
                        <kbd data-key="8" data-alt="*" className=""></kbd>
                        <kbd data-key="9" data-alt="(" className=""></kbd>
                        <kbd data-key="0" data-alt=")" className=""></kbd>
                        <kbd data-key="-" data-alt="_" className=""></kbd>
                        <kbd data-key="=" data-alt="+" className=""></kbd>
                        <kbd data-key="backspace" className=""></kbd>
                    </div>
                    <div className="row flex w-[618.6px] gap-[1px]">
                        <kbd data-key="tab" className=""></kbd>
                        <kbd data-key="q" className=""></kbd>
                        <kbd data-key="w" className=""></kbd>
                        <kbd data-key="e" className=""></kbd>
                        <kbd data-key="r" className=""></kbd>
                        <kbd data-key="t" className=""></kbd>
                        <kbd data-key="y" className=""></kbd>
                        <kbd data-key="u" className=""></kbd>
                        <kbd data-key="i" className=""></kbd>
                        <kbd data-key="o" className=""></kbd>
                        <kbd data-key="p" className=""></kbd>
                        <kbd data-key="[" data-alt="{" className=""></kbd>
                        <kbd data-key="]" data-alt="}" className=""></kbd>
                        <kbd
                            data-key="\"
                            data-alt="|"
                            id="backslash"
                            className=""
                        ></kbd>
                    </div>
                    <div className="row">
                        <kbd data-key="caps" className=""></kbd>
                        <kbd data-key="a" className=""></kbd>
                        <kbd data-key="s" className=""></kbd>
                        <kbd data-key="d" className=""></kbd>
                        <kbd data-key="f" className=""></kbd>
                        <kbd data-key="g" className=""></kbd>
                        <kbd data-key="h" className=""></kbd>
                        <kbd data-key="j" className=""></kbd>
                        <kbd data-key="k" className=""></kbd>
                        <kbd data-key="l" className=""></kbd>
                        <kbd data-key=";" data-alt=":" className=""></kbd>
                        <kbd
                            data-key="'"
                            data-alt='"'
                            id="quote"
                            className=""
                        ></kbd>
                        <kbd data-key="enter" className=""></kbd>
                    </div>
                    <div className="row">
                        <kbd data-key="lshift" className=""></kbd>
                        <kbd data-key="z" className=""></kbd>
                        <kbd data-key="x" className=""></kbd>
                        <kbd data-key="c" className=""></kbd>
                        <kbd data-key="v" className=""></kbd>
                        <kbd data-key="b" className=""></kbd>
                        <kbd data-key="n" className=""></kbd>
                        <kbd data-key="m" className=""></kbd>
                        <kbd data-key="," data-alt="<" className=""></kbd>
                        <kbd data-key="." data-alt=">" className=""></kbd>
                        <kbd data-key="/" data-alt="?" className=""></kbd>
                        <kbd data-key="rshift" className=""></kbd>
                    </div>
                    <div className="row">
                        <kbd data-key="lctrl" className=""></kbd>
                        <kbd data-key="lwin" className=""></kbd>
                        <kbd data-key="lalt" className=""></kbd>
                        <kbd data-key="space" className=""></kbd>
                        <kbd data-key="ralt" className=""></kbd>
                        <kbd data-key="rwin" className=""></kbd>
                        <kbd data-key="rctx" className=""></kbd>
                        <kbd data-key="rctrl" className=""></kbd>
                    </div>
                </div>
            </div>
        </>
    );
}
