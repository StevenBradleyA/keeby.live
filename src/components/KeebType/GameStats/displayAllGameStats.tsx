import { useState } from "react";
import type { ChangeEvent } from "react";
import { api } from "~/utils/api";
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
    const [isTotalData, setIsTotalData] = useState<boolean>(false);

    const { data: gameData } = api.user.getUserGameData.useQuery({
        userId,
        keebId,
        mode,
        isTotalData,
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
        <div className="mt-5 w-full ">
            <div className="flex ">
                {!isTotalData && (
                    <>
                        <div className="flex flex-col">
                            <label className="text-darkGray">Keeb</label>
                            <select
                                className={`
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
                        </div>
                        <div className="flex flex-col">
                            <label className="text-darkGray">Mode</label>
                            <select
                                className=" w-full rounded-md  bg-white/30 py-1  shadow-lg "
                                value={mode}
                                onChange={(e) => setMode(e.target.value)}
                            >
                                <option value="Speed">Speed</option>
                                <option value="Quote">Quote</option>
                                <option value="hacktime">
                                    It&apos;s Hacking Time
                                </option>
                            </select>
                        </div>
                    </>
                )}
                {isTotalData && (
                    <button onClick={() => setIsTotalData(false)}>
                        Specific
                    </button>
                )}
                <button
                    className={`bg-green-300 px-6 py-2`}
                    onClick={() => setIsTotalData(true)}
                >
                    Total
                </button>
            </div>
        </div>
    );
}
