import { ChangeEvent, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { getCookies } from "cookies-next";
import type { Keeb } from "@prisma/client";

interface DisplayAllGameStatsProps {
    keebData: Keeb[];
    userId: string;
    keebId: string;
    setKeebId: (newKeebId: string) => void;
    mode: string;
    setMode: (newMode: string) => void;
    keeb: string;
    setKeeb: (newKeeb: string) => void;
}

export default function DisplayAllGameStats({
    keebData,
    userId,
    keebId,
    mode,
    keeb,
    setMode,
    setKeebId,
    setKeeb,
}: DisplayAllGameStatsProps) {
    const { data: gameData } = api.user.getUserGameData.useQuery({
        userId,
        keebId,
        mode,
    });

    const [selectedKeeb, setSelectedKeeb] = useState<{
        id: string;
        name: string;
    }>({ id: keebId || "", name: keeb || "" });

    const handleKeebChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newKeebId: string = e.target.value;
        const newKeeb = keebData.find((keeb) => keeb.id === newKeebId);
        if (newKeeb) {
            setSelectedKeeb({ id: newKeeb.id, name: newKeeb.name });
            setKeeb(newKeeb.name);
            setKeebId(newKeebId);
        }
    };

    console.log(gameData);
    return (
        <>
            <>
                <label className="mt-2 ">Keeb</label>
                <select
                    className={` w-32
                    rounded-md bg-white/30 py-1 `}
                    value={selectedKeeb.id}
                    onChange={handleKeebChange}
                >
                    {keebData.map((e) => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>
                <label className="">Mode</label>
                <select
                    className=" w-full rounded-md  bg-white/30 py-1  shadow-lg "
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                >
                    <option value="Speed">Speed</option>
                    <option value="Quote">Quote</option>
                    <option value="hacktime">It&apos;s Hacking Time</option>
                </select>
            </>
        </>
    );
}
