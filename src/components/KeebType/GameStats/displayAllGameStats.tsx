import { useState } from "react";
import type { ChangeEvent } from "react";
import { api } from "~/utils/api";
import type { Keeb } from "@prisma/client";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import AccuracyVisualizer from "./accuracyVisualizer";
import WpmVisualizer from "./wpmVisualizer";

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

    console.log("um", gameData);

    return (
        <div className="mt-10 w-full ">
            {gameData && gameData.userWithGameResultsAndRank && (
                <div className="flex h-[45vh] w-full gap-5 ">
                    <div className="flex h-[90%] w-1/4 flex-col ">
                        <h3>average wpm </h3>
                        <p>{gameData?.averageWpm}</p>
                        <div className="h-1/2 w-full">
                            <WpmVisualizer averageWpm={gameData.averageWpm} />
                        </div>
                        <h3>average accuracy </h3>
                        <p>{gameData.averageAccuracy}</p>
                        <div className="h-1/2 w-full px-5">
                            <AccuracyVisualizer
                                averageAccuracy={parseFloat(
                                    gameData.averageAccuracy.toFixed(2)
                                )}
                            />
                        </div>
                    </div>
                    <div className="w-3/4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={gameData.userWithGameResultsAndRank.games}
                                // margin={{
                                //     top: 5,
                                //     right: 30,
                                //     left: 20,
                                //     bottom: 5,
                                // }}
                            >
                                <CartesianGrid strokeDasharray="1 5" />
                                <XAxis tick={false} />
                                <YAxis
                                    yAxisId="left"
                                    label={{
                                        value: "WPM",
                                        angle: -90,
                                        position: "insideLeft",
                                    }}
                                />
                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    label={{
                                        value: "Accuracy (%)",
                                        angle: 90,
                                        position: "insideRight",
                                    }}
                                />
                                <Tooltip />
                                <Legend />
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="wpm"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="accuracy"
                                    stroke="#82ca9d"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            <div className="flex mt-96 ">
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
