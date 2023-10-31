import { useSession } from "next-auth/react";
import { useEffect } from "react";
import type { ChangeEvent } from "react";
import { api } from "~/utils/api";
import { setCookie } from "cookies-next";

interface LeftMenuProps {
    mode: string;
    setMode: (mode: string) => void;
    gameLength: number;
    setGameLength: (gameLength: number) => void;
    theme: string;
    setTheme: (theme: string) => void;
    keeb: string;
    setKeeb: (keeb: string) => void;
}

export default function LeftMenu({
    mode,
    setMode,
    gameLength,
    setGameLength,
    theme,
    setTheme,
    keeb,
    setKeeb,
}: LeftMenuProps) {
    // todo refactor theme to be session so its accessible in nav
    // todo add cookeis to keep track of selected mode/ settings

    const { data: keebData } = api.keeb.getAll.useQuery();
    const { data: session } = useSession();

    useEffect(() => {
        if (session && keebData && keebData[0] && keeb === "") {
            setKeeb(keebData[0].name);
        }
    }, [session, keebData, keeb, setKeeb]);


    const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newMode: string = e.target.value;

        setMode(newMode);
        setCookie("mode", newMode, {
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
        });
    };

    

    return (
        <div className="flex w-36 flex-col rounded-2xl border border-green-500 bg-black px-3 py-2">
            {/* <button>Rank</button> */}
            <div className="flex justify-center">Mode</div>
            <select
                className=" bg-black px-2 py-1 text-green-500"
                value={mode}
                // onChange={(e) => setMode(e.target.value)}
                onChange={handleModeChange}
            >
                <option value="speed">Speed</option>
                <option value="quote">Quote</option>
                <option value="hacktime">It&apos;s Hacking Time</option>
            </select>

            {mode === "speed" && (
                <div className="flex gap-5">
                    <div>Length</div>
                    <select
                        className=" bg-black px-2 py-1 text-green-500"
                        value={gameLength}
                        onChange={(e) => setGameLength(+e.target.value)}
                    >
                        <option value={10}>10</option>
                        <option value={20} defaultValue={20}>
                            20
                        </option>
                        <option value={50}>50</option>
                    </select>
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
            {session &&
                session.user.hasProfile &&
                keeb.length > 0 &&
                keebData &&
                keebData.length > 0 && (
                    <>
                        <div className="flex justify-center">Keeb</div>
                        <select
                            className={`
                    bg-black px-2 py-1 text-green-500 `}
                            value={keeb}
                            onChange={(e) => setKeeb(e.target.value)}
                        >
                            {keebData.map((e, i) => (
                                <option key={i} value={`${e.name}`}>
                                    {e.name}
                                </option>
                            ))}
                        </select>
                    </>
                )}
        </div>
    );
}
