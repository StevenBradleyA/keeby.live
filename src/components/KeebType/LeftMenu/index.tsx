import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
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
    keebId: string;
    setKeebId: (keebId: string) => void;
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
    keebId,
    setKeebId,
}: LeftMenuProps) {
    // todo refactor theme to be session so its accessible in nav
    // theme needs to have context...
    // todo we need the keeb id

    const { data: keebData } = api.keeb.getAll.useQuery();
    const { data: session } = useSession();
    const [selectedKeeb, setSelectedKeeb] = useState<{
        id: string;
        name: string;
    } | null>(null);

    useEffect(() => {
        if (session && keebData && keebData[0] && keeb === "") {
            setKeeb(keebData[0].name);
            setKeebId(keebData[0].id);
            setSelectedKeeb({ id: keebData[0].id, name: keebData[0].name });
        }
    }, [session, keebData, keeb, setKeeb, setKeebId]);

    //      ------ Setting Cookies && State -------
    const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newMode: string = e.target.value;

        setMode(newMode);
        setCookie("mode", newMode, {
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
        });
    };

    const handleGameLength = (e: ChangeEvent<HTMLSelectElement>) => {
        const newGameLength: number = +e.target.value;
        setGameLength(newGameLength);
        setCookie("gameLength", newGameLength, {
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
        });
    };

    const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newTheme: string = e.target.value;
        setTheme(newTheme);
        setCookie("theme", newTheme, {
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
        });
    };
    const handleKeebChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newKeebId: string = e.target.value;
        if (keebData && keebData.length > 0) {
            const newKeeb = keebData.find((keeb) => keeb.id === newKeebId);
            if (newKeeb) {
                setKeeb(newKeeb.name);
                setKeebId(newKeebId);
                setCookie("keeb", newKeeb.name, {
                    maxAge: 60 * 60 * 24 * 365,
                    path: "/",
                });
                setCookie("keebId", newKeebId, {
                    maxAge: 60 * 60 * 24 * 365,
                    path: "/",
                });
            }
        }
    };

    return (
        <div className="flex w-3/4 flex-col rounded-xl border-2 border-green-500 bg-black/40 p-5">
            <label className="text-darkGray">Mode</label>
            <select
                className=" w-full rounded-md  bg-darkGray py-1 text-green-500 shadow-lg "
                value={mode}
                onChange={handleModeChange}
            >
                <option value="speed">Speed</option>
                <option value="quote">Quote</option>
                <option value="hacktime">It&apos;s Hacking Time</option>
            </select>

            {mode === "speed" && (
                <>
                    <label className="mt-2 text-darkGray">Length</label>
                    <select
                        className=" rounded-md  bg-black py-1 text-green-500"
                        value={gameLength}
                        onChange={handleGameLength}
                    >
                        <option value={10}>10</option>
                        <option value={20} defaultValue={20}>
                            20
                        </option>
                        <option value={50}>50</option>
                    </select>
                </>
            )}
            <label className="mt-2 text-darkGray">Theme</label>
            <select
                className={`
                    rounded-md bg-black py-1 text-green-500 `}
                value={theme}
                onChange={handleThemeChange}
            >
                <option value="keeby">keeby</option>
                <option value="pastel-blue">blue</option>
                <option value="pastel-pink">pink</option>
                <option value="primeagen">primeagen</option>
                <option value="hipyo">hipyo</option>
            </select>
            {session &&
                session.user.hasProfile &&
                keeb.length > 0 &&
                keebData &&
                keebData.length > 0 && (
                    <>
                        <label className="mt-2 text-darkGray">Keeb</label>
                        <select
                            className={`
                    rounded-md bg-black py-1 text-green-500`}
                            value={selectedKeeb ? selectedKeeb.id : ""}
                            onChange={handleKeebChange}
                        >
                            {keebData.map((e) => (
                                <option key={e.id} value={e.id}>
                                    {e.name}
                                </option>
                            ))}
                        </select>
                    </>
                )}
        </div>
    );
}
