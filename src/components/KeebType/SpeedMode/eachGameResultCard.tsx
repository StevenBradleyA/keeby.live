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
                            <h2 className="flex gap-2">
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
                            <h2>Accuracy</h2>
                        </div>

                        <div className="w-full rounded-lg bg-green-300 bg-opacity-50 px-3 py-2 text-3xl">
                             {`${Math.round(statistics.gameResults.accuracy)}%`}
                        </div>
                        {session && session.user && (
                            <div className="flex ">
                                <div className="h-full">
                                    <Image
                                        alt="profile"
                                        src={
                                            session.user.profile
                                                ? session.user.profile
                                                : defaultProfile
                                        }
                                        width={400}
                                        height={400}
                                        className="h-28 w-28 rounded-md object-cover"
                                    />
                                </div>
                                <div className="flex flex-col ">
                                    <div>
                                        {statistics.allGameResults.length}
                                    </div>
                                    <div>{statistics.averageWpm}</div>
                                    <div>{statistics.averageAccuracy}</div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className=" w-1/2 ">
                        graph data (wpm over time and accuracy rate over time)
                        or jus wpm
                        {/* lets just display the time it takes to type each word... or a segment  */}
                    </div>

                    <div className="mt-10 h-full w-1/4 rounded-2xl bg-keebyGray p-3 shadow-md">
                        {statistics.gameResults.keeb && (
                            <>
                                <h2>Keyboard</h2>
                                <p>{statistics.gameResults.keeb.name}</p>
                            </>
                        )}
                        {statistics.gameResults.user.rank && (
                            <>
                                <h2>Rank</h2>
                                <p>{statistics.gameResults.user.rank.name}</p>
                                <Image
                                    alt="profile"
                                    src={
                                        statistics.gameResults.user.rank.image
                                            ? statistics.gameResults.user.rank
                                                  .image
                                            : defaultProfile
                                    }
                                    width={400}
                                    height={400}
                                    className="h-28 w-28 rounded-md object-cover"
                                />
                                <p>{statistics.gameResults.user.rank.minWpm}</p>
                                <p>{statistics.gameResults.user.rank.maxWpm}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    );
}
