import { useState } from "react";
import type { ChangeEvent } from "react";
import { api } from "~/trpc/react";
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
import LoadingSpinner from "~/app/_components/Loading";
import Image from "next/image";
import Link from "next/link";

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

    return gameData &&
        gameData.userWithGameResultsAndRank &&
        gameData.userWithGameResultsAndRank.rank ? (
        <div className="mt-10 w-full ">
            <div className="flex h-[45vh] w-full gap-5 ">
                <div className="flex h-[100%] w-1/4 flex-col ">
                    <div className=" flex items-center gap-2">
                        <h3 className="text-darkGray">Average WPM</h3>
                        <p className="rounded-md bg-black/10 px-4 py-1 text-xl">
                            {`${parseFloat(gameData.averageWpm.toFixed(2))} `}
                        </p>
                    </div>
                    <WpmVisualizer
                        averageWpm={gameData.averageWpm}
                        rank={gameData.userWithGameResultsAndRank.rank.maxWpm}
                    />
                    <div className=" mt-5 flex items-center gap-2">
                        <h3 className="text-darkGray">Average Accuracy</h3>
                        <p className="rounded-md bg-black/10 px-4 py-1 text-xl text-[#22B5C5] ">
                            {`${parseFloat(
                                gameData.averageAccuracy.toFixed(2),
                            )}`}
                            %
                        </p>
                    </div>
                    <div className="h-1/2 w-full px-5">
                        <AccuracyVisualizer
                            averageAccuracy={parseFloat(
                                gameData.averageAccuracy.toFixed(2),
                            )}
                        />
                    </div>
                </div>
                <div className="w-3/4">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={gameData.userWithGameResultsAndRank.games}
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
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                                    borderRadius: "8px",
                                    border: "1px solid rgba(0, 0, 0, 0.1)",
                                    color: "#22C55E",
                                }}
                            />
                            <Legend />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="wpm"
                                stroke="#22C55E"
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="accuracy"
                                stroke="#22B5C5"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className=" flex w-full gap-10  ">
                <div className="flex w-1/2 flex-col gap-5 ">
                    <div className="flex w-full flex-shrink-0 items-center justify-between rounded-md bg-black/10 p-6 ">
                        <div className="flex flex-col items-center">
                            <h3 className="text-darkGray">Rank (WPM)</h3>
                            <p className="text-5xl">
                                {parseFloat(gameData.rankedWpm.toFixed(2))}
                            </p>
                        </div>
                        <Image
                            alt="rank"
                            src={gameData.userWithGameResultsAndRank.rank.image}
                            width={300}
                            height={300}
                            className="h-20 w-32 object-contain"
                        />
                        <div className="flex flex-col items-center  ">
                            <h3 className="text-darkGray">Rank</h3>
                            <p className="text-2xl">
                                {
                                    gameData?.userWithGameResultsAndRank?.rank
                                        ?.name
                                }
                            </p>
                        </div>
                    </div>
                    <div className="flex w-full flex-shrink-0 items-center justify-between rounded-md bg-black/10 p-8">
                        <div className="flex flex-col items-center">
                            <h3 className="text-darkGray">Rank Min (WPM)</h3>
                            <p className="text-5xl">
                                {
                                    gameData.userWithGameResultsAndRank.rank
                                        .minWpm
                                }
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <h3 className="text-darkGray">Rank Max (WPM)</h3>
                            <p className="text-5xl">
                                {
                                    gameData.userWithGameResultsAndRank.rank
                                        .maxWpm
                                }
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <h3 className="text-darkGray">Standing (Top %)</h3>
                            <p className="text-5xl">
                                {
                                    gameData.userWithGameResultsAndRank.rank
                                        .standing
                                }
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex w-1/2 flex-col gap-5 ">
                    <div className="flex w-full items-end  justify-between gap-5 rounded-md bg-black/10 p-8">
                        {!isTotalData && (
                            <>
                                <div className="flex flex-col items-center">
                                    <label className="text-darkGray">
                                        Keeb
                                    </label>
                                    <select
                                        className="profile-select-button flex max-w-[200px] items-center gap-1 rounded-md  border-2 border-[#616161] bg-dark py-2 text-green-500"
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
                                <div className="flex flex-col items-center">
                                    <label className="text-darkGray">
                                        Mode
                                    </label>
                                    <select
                                        className="profile-select-button flex max-w-[200px] items-center gap-1 rounded-md  border-2 border-[#616161] bg-dark py-2 text-green-500"
                                        value={mode}
                                        onChange={(e) =>
                                            setMode(e.target.value)
                                        }
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
                            <button
                                onClick={() => setIsTotalData(false)}
                                className="profile-select-button flex items-center gap-1 rounded-md border-2  border-[#616161] bg-dark  px-6 py-2 text-green-500"
                            >
                                Specific
                            </button>
                        )}
                        <div>
                            <button
                                className="profile-select-button flex items-center gap-1 rounded-md border-2  border-[#616161] bg-dark  px-6 py-2 text-green-500"
                                onClick={() => setIsTotalData(true)}
                            >
                                All Games
                            </button>
                        </div>
                    </div>

                    <div className="flex w-full items-center justify-between rounded-md bg-black/10 p-8 ">
                        <div className="flex flex-col items-center">
                            <h3 className="text-darkGray">Total Games</h3>
                            <p className="text-5xl">
                                {
                                    gameData.userWithGameResultsAndRank.games
                                        .length
                                }
                            </p>
                        </div>
                        <Link
                            href={`/keebdex/how-keeby-works`}
                            aria-label="typing tips"
                            className="profile-select-button flex items-center gap-2 rounded-md border-2  border-[#616161] bg-dark py-2 pl-6 pr-4 text-green-500"
                        >
                            Stats Explained
                            <svg
                                className="profile-select-button-link w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                                ></path>
                            </svg>
                        </Link>
                        <Link
                            href={`/keebdex/typing-tips`}
                            aria-label="typing tips"
                            className="profile-select-button flex items-center gap-2 rounded-md border-2  border-[#616161] bg-dark  py-2 pl-6 pr-4 text-green-500"
                        >
                            Typing Tips
                            <svg
                                className="profile-select-button-link w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                                ></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="mt-20">
            <LoadingSpinner size="20" />
        </div>
    );
}
