import { useSession } from "next-auth/react";
import Image from "next/image";
import defaultProfile from "@public/Profile/profile-default.png";
import type { Game } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import {
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
} from "recharts";
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
//     PieChart,
//     Pie,
//     ScatterChart,
//     Scatter,
// } from "recharts";

interface GameResult extends Game {
    keeb: {
        id: string;
        name: string;
        keycaps: string;
        switches: string;
    } | null;
    user: {
        rank: {
            name: string;
            image: string;
            minWpm: number;
            maxWpm: number;
            standing: number;
        } | null;
    };
}

interface GameStatistics {
    id: string;
    wpm: number;
    accuracy: number;
}

interface GameResultsResponse {
    gameResults: GameResult | null;
    allGameResults: GameStatistics[];
    averageWpm: number;
    averageAccuracy: number;
}

interface EachGameResultCardProps {
    statistics: GameResultsResponse;
    wpmIntervals: number[];
    rankWpm: number;
}

export default function EachGameResultCard({
    statistics,
    wpmIntervals,
    rankWpm,
}: EachGameResultCardProps) {
    const { data: session } = useSession();
    // npm install recharts
    // npm i react-chartjs-2 chart.js

    console.log("check ", wpmIntervals);
    const calculateAveragedWpmIntervals = (wpmIntervals: number[]) => {
        const intervalCount = 10;
        const totalIntervals = wpmIntervals.length;
        const intervalSize = Math.floor(totalIntervals / intervalCount);
        let remainder = totalIntervals % intervalCount;
        let startIndex = 0;
        const averagedWpmIntervals = [];

        for (let i = 0; i < intervalCount; i++) {
            const endIndex =
                startIndex + intervalSize + (remainder > 0 ? 1 : 0);
            if (remainder > 0) remainder--;
            const intervalSlice = wpmIntervals.slice(startIndex, endIndex);
            const average =
                intervalSlice.reduce((acc, cur) => acc + cur, 0) /
                intervalSlice.length;
            averagedWpmIntervals.push(isNaN(average) ? 0 : average);

            startIndex = endIndex;
        }

        return averagedWpmIntervals;
    };

    const averagedWpmIntervals = calculateAveragedWpmIntervals(wpmIntervals);

    // Transform the averagedWpmIntervals into a suitable format for the graph
    const data = averagedWpmIntervals.map((wpm, index) => ({
        index: `Interval ${index + 1}`, // Naming intervals for clarity
        wpm: wpm,
    }));

    return (
        statistics.gameResults !== null && (
            <div className="flex w-full flex-col ">
                <div className="flex h-[50vh] w-full gap-5">
                    <div className="mt-10 h-[92%] w-1/4 rounded-2xl bg-keebyGray bg-opacity-30 p-3  shadow-md">
                        <div className="flex flex-col items-start px-3 pt-3">
                            <h2 className="flex gap-2 text-green-300">
                                {statistics.gameResults.mode}
                            </h2>
                            <p className="mt-3 border-y-2 border-green-300  border-opacity-50 p-2 text-3xl">
                                {Math.round(statistics.gameResults.wpm)}{" "}
                                <span className="text-sm text-darkGray ">
                                    WPM
                                </span>
                            </p>
                            <p className=" p-2 text-xl ">
                                <span className="text-xs text-darkGray">
                                    Pure WPM
                                </span>{" "}
                                {Math.round(statistics.gameResults.pureWpm)}
                            </p>
                            <h2 className="text-darkGray">Accuracy</h2>
                        </div>

                        <div className="w-full rounded-lg border-2 border-green-300 border-opacity-50 bg-green-300 bg-opacity-30 px-3 py-2 text-3xl">
                             {`${Math.round(statistics.gameResults.accuracy)}%`}
                        </div>
                        {session && session.user && (
                            <div className="mt-6 flex h-36 w-full gap-5 ">
                                <div className="h-full w-1/2 bg-black">
                                    <Image
                                        alt="profile"
                                        src={
                                            session.user.profile
                                                ? session.user.profile
                                                : defaultProfile
                                        }
                                        width={400}
                                        height={400}
                                        className="h-full w-full rounded-md object-cover"
                                    />
                                </div>
                                <div className="flex h-full w-1/2 flex-col justify-between">
                                    <h2 className="border-b-2 border-green-300 border-opacity-50 text-darkGray ">
                                        Games Played
                                    </h2>
                                    <div className="text-green-300">
                                        {statistics.allGameResults.length}
                                    </div>
                                    <h2 className="border-b-2 border-green-300 border-opacity-50 text-darkGray ">
                                        Avg WPM
                                    </h2>

                                    <div className="text-green-300">
                                        {Math.round(statistics.averageWpm)}
                                    </div>
                                    <h2 className="border-b-2 border-green-300 border-opacity-50 text-darkGray ">
                                        Avg Accurary
                                    </h2>
                                    <div className="text-green-300">
                                        {` ${Math.round(
                                            statistics.averageAccuracy
                                        )}%`}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className=" flex h-full w-1/2 items-end px-5">
                        <ResponsiveContainer
                            width="100%"
                            height={300}
                            className=" text-green-300"
                        >
                            <LineChart data={data}>
                                <XAxis dataKey="index" />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="wpm"
                                    // stroke="#8884d8"
                                    className="text-green-300"
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-10 h-[92%] w-1/4 rounded-2xl bg-keebyGray bg-opacity-30 px-3 pt-3  shadow-md">
                        <div className="flex flex-col items-start px-3 pt-3">
                            {statistics.gameResults.keeb && (
                                <div className="flex w-full flex-col">
                                    <h2 className="flex justify-center text-green-300">
                                        Keyboard
                                    </h2>
                                    <p className="flex justify-center rounded-lg border-2 border-green-300 border-opacity-50 bg-green-300 bg-opacity-30 px-3 py-2  ">
                                        {statistics.gameResults.keeb.name}
                                    </p>
                                </div>
                            )}
                            {statistics.gameResults.user.rank && (
                                <div className="mt-2 flex w-full flex-col items-center">
                                    <h2 className="text-darkGray">Rank</h2>
                                    <div className="flex w-full justify-center gap-2 ">
                                        <div className="flex w-full flex-col overflow-hidden rounded-2xl border-2 border-green-300  border-opacity-50 p-3">
                                            <h2 className="flex justify-center border-b-2 border-green-300 border-opacity-50 text-sm text-darkGray ">
                                                Standing
                                            </h2>
                                            <p className="mt-1 flex justify-center text-green-300">
                                                {`top ${statistics.gameResults.user.rank.standing}%`}
                                            </p>
                                            <h2 className="mt-3 flex justify-center border-b-2 border-green-300 border-opacity-50 text-sm text-darkGray">
                                                Rank min
                                            </h2>
                                            <p className="mt-1 flex justify-center gap-1 text-green-300">
                                                {statistics.gameResults.user
                                                    .rank.minWpm === 0
                                                    ? "---"
                                                    : statistics.gameResults
                                                          .user.rank.minWpm}
                                            </p>
                                        </div>
                                        <div className="border-2xl flex w-full flex-col rounded-2xl border-2 border-green-300 border-opacity-50  p-3">
                                            <h2 className="flex justify-center border-b-2 border-green-300 border-opacity-50 text-sm text-darkGray ">
                                                Ranked WPM
                                            </h2>

                                            <div className="mt-1 flex justify-center text-green-300">
                                                {rankWpm > 0
                                                    ? Math.round(rankWpm)
                                                    : "---"}
                                            </div>
                                            <h2 className="mt-3 flex justify-center border-b-2 border-green-300 border-opacity-50 text-sm text-darkGray">
                                                Rank max
                                            </h2>
                                            <p className="mt-1 flex justify-center text-green-300">
                                                {statistics.gameResults.user
                                                    .rank.maxWpm === 10 ||
                                                statistics.gameResults.user.rank
                                                    .maxWpm === 999999
                                                    ? "---"
                                                    : statistics.gameResults
                                                          .user.rank.maxWpm}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-3 flex w-full justify-center rounded-lg border-2 border-green-300 border-opacity-50 bg-green-300 bg-opacity-30 px-3 py-2  ">
                                        {statistics.gameResults.user.rank.name}
                                    </p>

                                    <Image
                                        alt="profile"
                                        src={
                                            statistics.gameResults.user.rank
                                                .image
                                                ? statistics.gameResults.user
                                                      .rank.image
                                                : defaultProfile
                                        }
                                        width={400}
                                        height={400}
                                        className="mt-3 h-20 w-32 rounded-md object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
