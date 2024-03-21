import { useSession } from "next-auth/react";
import Image from "next/image";
import defaultProfile from "@public/Profile/profile-default.png";
import type { Game } from "@prisma/client";
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
}

export default function EachGameResultCard({
    statistics,
    wpmIntervals,
}: EachGameResultCardProps) {
    const { data: session } = useSession();
    // npm install recharts
    // npm i react-chartjs-2 chart.js

    console.log(statistics.allGameResults);
    const wpmData = statistics.allGameResults.map((result) => ({
        wpm: result.wpm,
    }));

    return (
        statistics.gameResults !== null && (
            <div className="flex w-full flex-col ">
                <div className="flex w-full gap-5  ">
                    <div className="mt-10 h-full w-1/4 rounded-2xl bg-keebyGray bg-opacity-30 p-3  shadow-md">
                        <div className="flex flex-col items-start px-3 pt-3">
                            <h2 className="flex gap-2 text-green-300">
                                {statistics.gameResults.mode}
                            </h2>
                            <p className="mt-2 border-y-2 border-green-300  border-opacity-50 p-2 text-3xl">
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
                            <div className="mt-4 flex h-36 w-full gap-5 ">
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
                                    <div className="text-green-500">
                                        {statistics.allGameResults.length}
                                    </div>
                                    <h2 className="border-b-2 border-green-300 border-opacity-50 text-darkGray ">
                                        Avg WPM
                                    </h2>

                                    <div className="text-green-500">
                                        {Math.round(statistics.averageWpm)}
                                    </div>
                                    <h2 className="border-b-2 border-green-300 border-opacity-50 text-darkGray ">
                                        Avg Accurary
                                    </h2>
                                    <div className="text-green-500">
                                        {` ${Math.round(
                                            statistics.averageAccuracy
                                        )}%`}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className=" w-1/2 ">
                        graph data (wpm over time and accuracy rate over time)
                        or jus wpm
                        {/* lets just display the time it takes to type each word... or a segment  */}
                    </div>

                    <div className="mt-10 h-full w-1/4 rounded-2xl bg-keebyGray bg-opacity-30 p-3  shadow-md">
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
                                            <h2 className="flex justify-center border-b-2 border-green-300 border-opacity-50 text-darkGray ">
                                                Avg WPM
                                            </h2>
                                            <p className="mt-1 flex justify-center">
                                                top 0.001%
                                            </p>
                                            <h2 className="mt-3 flex justify-center border-b-2 border-green-300 border-opacity-50 text-darkGray">
                                                Rank min
                                            </h2>
                                            <p className="mt-1 flex justify-center gap-1 text-darkGray">
                                                {
                                                    statistics.gameResults.user
                                                        .rank.minWpm
                                                }
                                                <span>WPM</span>
                                            </p>
                                        </div>
                                        <div className="border-2xl flex w-full flex-col rounded-2xl border-2 border-green-300 border-opacity-50  p-3">
                                            <h2 className="flex justify-center border-b-2 border-green-300 border-opacity-50 text-darkGray ">
                                                Avg WPM
                                            </h2>

                                            <div className="mt-1 flex justify-center text-green-300">
                                                {Math.round(
                                                    statistics.averageWpm
                                                )}
                                            </div>
                                            <h2 className="mt-3 flex justify-center border-b-2 border-green-300 border-opacity-50 text-darkGray">
                                                Rank max
                                            </h2>
                                            <p className="mt-1 flex justify-center text-darkGray">
                                                {
                                                    statistics.gameResults.user
                                                        .rank.maxWpm
                                                }
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
                                        className="mt-10 h-28 w-28 rounded-md object-cover"
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
