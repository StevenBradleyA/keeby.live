import { useSession } from "next-auth/react";
import Image from "next/image";
import defaultProfile from "@public/Profile/profile-default.png";
import type { Game } from "@prisma/client";
import React, { PureComponent } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
} from "recharts";

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

    console.log(statistics.allGameResults);
    const wpmData = statistics.allGameResults.map((result) => ({
        wpm: result.wpm,
    }));


    return (
        statistics.gameResults !== null && (
            <div className="flex w-full flex-col p-5 ">
                <div className="w-full bg-green-300 ">
                    {statistics.gameResults.mode}
                </div>
                <div className="flex w-full gap-5  ">
                    <div className="mt-10 h-full w-1/4 rounded-2xl bg-keebyGray bg-opacity-30 p-3  shadow-md">
                        <div className="flex flex-col border-b-2 border-green-500 p-3">
                            <h2>WPM</h2>
                            <p className="border-y-2 border-green-500">
                                {statistics.gameResults.wpm}
                            </p>
                            <h2>purewpm </h2>
                            {statistics.gameResults.pureWpm}
                        </div>

                        <div>
                            <h2>accuracy</h2>
                            <div className="flex">
                                {statistics.gameResults.accuracy}
                                <div className="h-96 w-96">
                                    {/* <KeebTypePieChart accuracy={statistics.gameResults.accuracy}/> */}
                                </div>
                            </div>
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

                    <div className="h-[50vh] w-1/2 ">
                        graph data (wpm over time and accuracy rate over time)
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={wpmData} width={300} height={100}>
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="wpm"
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
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
