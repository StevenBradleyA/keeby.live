"use client";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { api } from "~/trpc/react";
import type { Keeb } from "@prisma/client";
import Link from "next/link";
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
                <div className="bg-black/10 rounded-lg p-5 flex text-sm items-center  gap-5 w-2/3 h-16 justify-center skeleton-dark-glow"></div>
                <div className="mt-5 gap-5 flex">
                    <div className="bg-black/10 rounded-lg w-20 h-12"></div>
                    <div className="bg-black/10 rounded-lg w-20 h-12"></div>
                    <div className="bg-black/10 rounded-lg w-20 h-12"></div>
                </div>
                <div className="bg-black/10 rounded-lg w-full mt-5 h-[300px] flex justify-center items-center skeleton-dark-glow"></div>
                <div className="mt-5 gap-5 flex">
                    <div className="bg-black/10 rounded-lg w-40 h-12"></div>
                    <div className="bg-black/10 rounded-lg w-40 h-12"></div>
                </div>
            </div>
        );

    return (
        gameData &&
        gameData.userWithGameResultsAndRank &&
        gameData.userWithGameResultsAndRank.rank && (
            <div className="mt-10 w-full flex flex-col items-center ">
                <div className="bg-black/10 rounded-lg p-5 flex text-sm items-center text-mediumGray gap-5">
                    <div className="flex flex-col items-center">
                        <h3 className="text-xs">Average WPM</h3>
                        <p className="text-lg text-green-500">{`${parseFloat(gameData.averageWpm.toFixed(2))} `}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-xs">Average Accuracy</h3>
                        <p className="text-lg text-green-500">{`${parseFloat(gameData.averageAccuracy.toFixed(2))} `}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-xs">Total Games</h3>
                        <p className="text-lg text-green-500">
                            {gameData.userWithGameResultsAndRank.games.length}
                        </p>
                    </div>

                    <div>|</div>

                    <div className="flex flex-col items-center">
                        <h3 className="text-xs">Rank Position</h3>
                        <p className="text-lg text-green-500">
                            #
                            {gameData.userRankNumber
                                ? gameData.userRankNumber
                                : "---"}
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-xs">Ranked Score</h3>
                        <p className="text-lg text-green-500">
                            {gameData.userWithGameResultsAndRank.rankedWpm
                                ? gameData.userWithGameResultsAndRank.rankedWpm.toFixed(
                                      1,
                                  )
                                : "---"}
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-xs">Rank</h3>
                        <p className="text-lg text-green-500">
                            {gameData.userWithGameResultsAndRank.rank.name
                                ? gameData.userWithGameResultsAndRank.rank.name
                                : "---"}
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-xs">Standing</h3>
                        <p className="text-lg text-green-500">
                            {gameData.userWithGameResultsAndRank.rank.standing
                                ? gameData.userWithGameResultsAndRank.rank
                                      .standing
                                : "---"}
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-xs">Rank Min</h3>
                        <p className="text-lg text-green-500">
                            {gameData.userWithGameResultsAndRank.rank.minWpm
                                ? gameData.userWithGameResultsAndRank.rank
                                      .minWpm
                                : "---"}
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-xs">Rank Max</h3>
                        <p className="text-lg text-green-500">
                            {gameData.userWithGameResultsAndRank.rank.maxWpm
                                ? gameData.userWithGameResultsAndRank.rank
                                      .maxWpm === 999999
                                    ? "---"
                                    : gameData.userWithGameResultsAndRank.rank
                                          .maxWpm
                                : "---"}
                        </p>
                    </div>
                </div>

                <div className=" flex w-full gap-10 justify-center mt-5 text-sm ">
                    <div className="flex items-end gap-5">
                        {!isTotalData && (
                            <>
                                <div className="flex flex-col items-center">
                                    <label className="text-mediumGray">
                                        Keeb
                                    </label>
                                    <select
                                        className="profile-select-button flex items-center gap-1 rounded-md  border-2 border-mediumGray bg-dark py-2 text-green-500"
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
                                    <label className="text-mediumGray">
                                        Mode
                                    </label>
                                    <select
                                        className="profile-select-button flex px-5 items-center gap-1 rounded-md  border-2 border-mediumGray bg-dark py-2 text-green-500"
                                        value={mode}
                                        onChange={(e) =>
                                            setMode(e.target.value)
                                        }
                                    >
                                        <option value="ranked">Ranked</option>
                                        <option value="scholar">Scholar</option>
                                    </select>
                                </div>
                            </>
                        )}
                        {isTotalData && (
                            <button
                                onClick={() => setIsTotalData(false)}
                                className="profile-select-button flex items-center gap-1 rounded-md border-2  border-mediumGray bg-dark  px-6 py-2 text-green-500"
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
                                    className="w-6"
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
                    <div className="w-full justify-center flex min-h-[400px] mt-5">
                        <GameDataCharting gameData={gameData} />
                    </div>
                )}

                <div className="flex w-full justify-center text-sm mt-5 gap-5">
                    <Link
                        href={`/how-keeby-works`}
                        aria-label="typing tips"
                        className="profile-select-button flex items-center gap-2 rounded-md border-2  border-mediumGray bg-dark py-2 pl-6 pr-4 text-green-500"
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
                        href={`/typing-tips`}
                        aria-label="typing tips"
                        className="profile-select-button flex items-center gap-2 rounded-md border-2  border-mediumGray bg-dark  py-2 pl-6 pr-4 text-green-500"
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
        )
    );
}
