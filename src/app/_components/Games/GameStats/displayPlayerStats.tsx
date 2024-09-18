"use client";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { api } from "~/trpc/react";
import type { Keeb } from "@prisma/client";
import GameDataCharting from "./gameDataCharting";

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

export default function DisplayPlayerStats({
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

    const { data: gameData, isLoading } = api.user.getUserGameData.useQuery({
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

    if (isLoading)
        return (
            <div className="flex w-full justify-center mt-10 flex-col items-center text-mediumGray">
                <div className="bg-black/10 rounded-lg p-5 flex text-sm items-center  gap-5 w-3/4 h-16 justify-center skeleton-dark-glow"></div>
                <div className="mt-3 gap-5 flex">
                    <div className="bg-black/10 rounded-lg w-20 h-8"></div>
                    <div className="bg-black/10 rounded-lg w-20 h-8"></div>
                    <div className="bg-black/10 rounded-lg w-20 h-8"></div>
                </div>
                <div className="bg-black/10 rounded-lg w-full mt-5 h-[350px] flex justify-center items-center skeleton-dark-glow"></div>
            </div>
        );

    return (
        <>
            {gameData &&
                gameData.userWithGameResultsAndRank &&
                gameData.userWithGameResultsAndRank.rank && (
                    <div className="mt-10 w-full flex flex-col items-center text-xs ">
                        <div className="bg-black/10 rounded-lg p-5 flex text-sm items-center text-mediumGray gap-5">
                            <div className="flex flex-col items-center">
                                <h3 className="text-[10px]">Average WPM</h3>
                                <p className="text-sm text-green-500">{`${parseFloat(gameData.averageWpm.toFixed(2))} `}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <h3 className="text-[10px]">
                                    Average Accuracy
                                </h3>
                                <p className="text-sm text-green-500">{`${parseFloat(gameData.averageAccuracy.toFixed(2))} `}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <h3 className="text-[10px]">Total Games</h3>
                                <p className="text-sm text-green-500">
                                    {
                                        gameData.userWithGameResultsAndRank
                                            .games.length
                                    }
                                </p>
                            </div>

                            <div>|</div>

                            <div className="flex flex-col items-center">
                                <h3 className="text-[10px]">Rank Position</h3>
                                <p className="text-sm text-green-500">
                                    #
                                    {gameData.userRankNumber
                                        ? gameData.userRankNumber
                                        : "---"}
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <h3 className="text-[10px]">Ranked Score</h3>
                                <p className="text-sm text-green-500">
                                    {gameData.userWithGameResultsAndRank
                                        .rankedWpm
                                        ? gameData.userWithGameResultsAndRank
                                              .rankedWpm
                                        : "---"}
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <h3 className="text-[10px]">Rank</h3>
                                <p className="text-sm text-green-500">
                                    {gameData.userWithGameResultsAndRank.rank
                                        .name
                                        ? gameData.userWithGameResultsAndRank
                                              .rank.name
                                        : "---"}
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <h3 className="text-[10px]">Standing</h3>
                                <p className="text-sm text-green-500">
                                    {gameData.userWithGameResultsAndRank.rank
                                        .standing
                                        ? gameData.userWithGameResultsAndRank
                                              .rank.standing
                                        : "---"}
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <h3 className="text-[10px]">Rank Min</h3>
                                <p className="text-sm text-green-500">
                                    {gameData.userWithGameResultsAndRank.rank
                                        .minWpm
                                        ? gameData.userWithGameResultsAndRank
                                              .rank.minWpm
                                        : "---"}
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <h3 className="text-[10px]">Rank Max</h3>
                                <p className="text-sm text-green-500">
                                    {gameData.userWithGameResultsAndRank.rank
                                        .maxWpm
                                        ? gameData.userWithGameResultsAndRank
                                              .rank.maxWpm === 999999
                                            ? "---"
                                            : gameData
                                                  .userWithGameResultsAndRank
                                                  .rank.maxWpm
                                        : "---"}
                                </p>
                            </div>
                        </div>

                        <div className=" flex w-full gap-10 justify-center mt-3  ">
                            <div className="flex items-end gap-5">
                                {!isTotalData && (
                                    <>
                                        <div className="flex flex-col items-center">
                                            <label className="text-mediumGray">
                                                Keeb
                                            </label>
                                            <select
                                                className="profile-select-button flex items-center gap-1 rounded-md  border-2 border-mediumGray bg-dark py-1 px-3 text-green-500"
                                                value={selectedKeeb.id}
                                                onChange={handleKeebChange}
                                            >
                                                {keebData.map((e) => (
                                                    <option
                                                        key={e.id}
                                                        value={e.id}
                                                    >
                                                        {e.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <label className="text-mediumGray">
                                                Mode
                                            </label>
                                            <select
                                                className="profile-select-button flex items-center gap-1 rounded-md  border-2 border-mediumGray bg-dark px-3 py-1 text-green-500"
                                                value={mode}
                                                onChange={(e) =>
                                                    setMode(e.target.value)
                                                }
                                            >
                                                <option value="ranked">
                                                    Ranked
                                                </option>
                                                <option value="scholar">
                                                    Scholar
                                                </option>
                                            </select>
                                        </div>
                                    </>
                                )}
                                {isTotalData && (
                                    <button
                                        onClick={() => setIsTotalData(false)}
                                        className="profile-select-button flex items-center gap-1 rounded-md border-2  border-mediumGray bg-dark  px-6 py-[6px] text-green-500"
                                    >
                                        Specific
                                    </button>
                                )}
                                <div className="flex flex-col items-center">
                                    <label className="text-mediumGray">
                                        Everything
                                    </label>

                                    <button
                                        className={` ${isTotalData === true ? "bg-green-500 text-black  hover:bg-green-500/90" : "bg-dark text-green-500 hover:bg-white/5 "} border-mediumGray  rounded-md border-2 px-6 py-1`}
                                        onClick={() => setIsTotalData(true)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M5.63636 16C2.90909 16 2 14 2 12C2 10 2.90909 8 5.63636 8C9.27273 8 14.7273 16 18.3636 16C21.0909 16 22 14 22 12C22 10 21.0909 8 18.3636 8C14.7273 8 9.27273 16 5.63636 16Z"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {gameData && (
                            <div className="w-full justify-center flex min-h-[350px] mt-2">
                                <GameDataCharting gameData={gameData} />
                            </div>
                        )}
                    </div>
                )}
        </>
    );
}
