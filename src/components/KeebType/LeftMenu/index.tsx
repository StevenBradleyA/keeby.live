interface LeftMenuProps {
    mode: string;
    setMode: (mode: string) => void;
}

export default function LeftMenu({ mode, setMode }: LeftMenuProps) {
    const changeMode = (mode: string) => {
        setMode(mode);
    };

    return (
        <div className="flex flex-col rounded-2xl border border-green-500 bg-black p-10">
            <button
                className={` ${
                    mode === "normal" ? "text-green-300" : "text-white"
                }`}
                onClick={() => changeMode("normal")}
            >
                normal
            </button>
            <button
                className={` ${
                    mode === "quote" ? "text-green-300" : "text-white"
                }`}
                onClick={() => changeMode("quote")}
            >
                quote
            </button>
            <button>theme</button>
        </div>
    );
}
