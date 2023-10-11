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
    // todo refactor theme to be session so its accessible in nav

    return (
        <div className="flex flex-col rounded-2xl border border-green-500 bg-black p-10">
            {/* <button>Rank</button> */}
            <div className="flex justify-center">Mode</div>
            <select
                className=" bg-black px-2 py-1 text-green-500"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
            >
                <option value="speed">Speed</option>
                <option value="quote">Quote</option>
                <option value="hacktime">It&apos;s Hacking Time</option>
            </select>

            {mode === "speed" && (
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
            <div className="flex justify-center">Theme</div>
            <select
                className={`
                    bg-black px-2 py-1 text-green-500 `}
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
            >
                <option value="keeby">keeby</option>
                <option value="pastel-blue">blue</option>
                <option value="pastel-pink">pink</option>
                <option value="pastel-pink">primeagen</option>
                <option value="pastel-pink">hipyo</option>
            </select>
        </div>
    );
}
