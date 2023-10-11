interface LeftMenuProps {
    mode: string;
    setMode: (mode: string) => void;
    normalModeLength: string;
    setNormalModeLength: (normalModeLength: string) => void;
    theme: string;
    setTheme: (theme: string) => void;
}

export default function LeftMenu({
    mode,
    setMode,
    normalModeLength,
    setNormalModeLength,
    theme,
    setTheme,
}: LeftMenuProps) {
    // ideas we might want dropdowns so you can just select ur mode then the
    // mode: then below you have a dropdown
    // speed:
    // want these bars to be super clean yet fun

    return (
        <div className="flex flex-col rounded-2xl border border-green-500 bg-black p-10">
            <div className="flex justify-center">Mode</div>
            <select
                className={`
                    bg-black px-2 py-1 text-green-300 `}
                value={mode}
                onChange={(e) => setMode(e.target.value)}
            >
                <option value="speed">Speed</option>
                <option value="quote">Quote</option>
            </select>
            <div className="flex justify-center">Theme</div>

            {/* <button
                className={` ${
                    mode === "normal" ? "text-green-300" : "text-white"
                }`}
                onClick={() => changeMode("normal")}
            >
                speedy
            </button>
            {mode === "normal" && (
                <div className="flex gap-5">
                    <div
                        className={` ${
                            normalModeLength === "10"
                                ? "text-yellow-300"
                                : "text-white"
                        }`}
                    >
                        10
                    </div>
                    <div
                        className={` ${
                            normalModeLength === "20"
                                ? "text-yellow-300"
                                : "text-white"
                        }`}
                    >
                        20
                    </div>
                    <div
                        className={` ${
                            normalModeLength === "50"
                                ? "text-yellow-300"
                                : "text-white"
                        }`}
                    >
                        50
                    </div>
                </div>
            )}
            <button
                className={` ${
                    mode === "quote" ? "text-green-300" : "text-white"
                }`}
                onClick={() => changeMode("quote")}
            >
                quote
            </button> */}
            <button>theme</button>
            <button>Rank</button>
        </div>
    );
}
