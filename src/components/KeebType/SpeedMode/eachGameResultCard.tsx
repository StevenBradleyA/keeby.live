import { useSession } from "next-auth/react";
import Image from "next/image";
import defaultProfile from "@public/Profile/profile-default.png";
import type { Game } from "@prisma/client";
import {
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
} from "recharts";
import { themeStyles } from "../Theme/themeStyles";
import type { ThemeName } from "../Theme/themeStyles";

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
    theme: string;
}

export default function EachGameResultCard({
    statistics,
    wpmIntervals,
    rankWpm,
    theme,
}: EachGameResultCardProps) {
    const { data: session } = useSession();
    // npm install recharts

    // theme
    const styles = themeStyles[theme as ThemeName] || themeStyles["KEEBY"];

    const calculateAveragedWpmIntervals = (wpmIntervals: number[]) => {
        const intervalCount = 10;
        const totalIntervals = wpmIntervals.length;
        const intervalSize = Math.floor(totalIntervals / intervalCount);
        let remainder = totalIntervals % intervalCount;
        let startIndex = 0;
        const data = [];

        for (let i = 0; i < intervalCount; i++) {
            const endIndex =
                startIndex + intervalSize + (remainder > 0 ? 1 : 0);
            if (remainder > 0) remainder--;
            const intervalSlice = wpmIntervals.slice(startIndex, endIndex);
            const average =
                intervalSlice.reduce((acc, cur) => acc + cur, 0) /
                intervalSlice.length;
            const roundedAverage = isNaN(average)
                ? 0
                : Number(average.toFixed(2));
            data.push({
                index: `${i + 1}`,
                wpm: roundedAverage,
            });
            startIndex = endIndex;
        }

        return data;
    };

    const data = calculateAveragedWpmIntervals(wpmIntervals);

    return (
        statistics.gameResults !== null && (
            <div className="flex w-full flex-col ">
                <div className="flex h-[60vh] w-full gap-5 desktop:h-[50vh]">
                    <div
                        className={`z-40 h-[92%] w-1/4 rounded-2xl ${styles.secondaryBase} bg-opacity-30 p-3 shadow-md  laptop:mt-5 desktop:mt-10`}
                    >
                        <div className="flex flex-col items-start px-3 pt-3">
                            <h2 className={`flex gap-2 ${styles.pause}`}>
                                {statistics.gameResults.mode}
                            </h2>
                            <p
                                className={`mt-3 border-y-2 ${styles.border}  border-opacity-50 p-2 text-3xl`}
                            >
                                {Math.round(statistics.gameResults.wpm)}{" "}
                                <span
                                    className={`text-sm ${styles.textColor} `}
                                >
                                    WPM
                                </span>
                            </p>
                            <p className=" p-2 text-xl ">
                                <span className={`text-xs ${styles.textColor}`}>
                                    Pure WPM
                                </span>{" "}
                                {Math.round(statistics.gameResults.pureWpm)}
                            </p>
                            <h2 className="text-darkGray">Accuracy</h2>
                        </div>

                        <div
                            className={`w-full rounded-lg border-2 ${styles.border} border-opacity-50 ${styles.backgroundColor} bg-opacity-30 px-3 py-2 text-3xl`}
                        >
                             {`${Math.round(statistics.gameResults.accuracy)}%`}
                        </div>
                        {session && session.user && (
                            <div className="mt-6 flex h-36 w-full gap-5 ">
                                <div className="h-full w-1/2">
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
                                <div className="flex h-full w-1/2 flex-col justify-between laptop:text-sm desktop:text-base">
                                    <h2
                                        className={`border-b-2 ${styles.border} border-opacity-50 ${styles.textColor} `}
                                    >
                                        Games Played
                                    </h2>
                                    <div className={`${styles.pause}`}>
                                        {statistics.allGameResults.length}
                                    </div>
                                    <h2
                                        className={`border-b-2 ${styles.border} border-opacity-50 ${styles.textColor} `}
                                    >
                                        Avg WPM
                                    </h2>

                                    <div className={`${styles.pause}`}>
                                        {Math.round(statistics.averageWpm)}
                                    </div>
                                    <h2
                                        className={`border-b-2 ${styles.border} border-opacity-50 ${styles.textColor} `}
                                    >
                                        Avg Accurary
                                    </h2>
                                    <div className={`${styles.pause}`}>
                                        {` ${Math.round(
                                            statistics.averageAccuracy
                                        )}%`}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className=" relative flex h-full w-1/2 flex-col ">
                        {theme === "KEEBY" && (
                            <>
                                <div className=" absolute -left-5 -right-5 -top-12 bottom-[40%] overflow-hidden  ">
                                    <video
                                        className="-z-10 w-full object-cover"
                                        autoPlay
                                        loop
                                        muted
                                    >
                                        <source
                                            src="/Videos/matrix-fade-green-222.mp4"
                                            type="video/mp4"
                                        />
                                        Your browser does not support the video
                                        tag.
                                    </video>
                                </div>
                                <div className=" absolute -left-5 -right-5 -top-12 bottom-[40%] z-20 bg-gradient-to-b from-[rgba(0,0,0,0)] to-[#222]  object-cover"></div>
                            </>
                        )}
                        <div
                            className={` z-30 mt-10 flex h-full w-full items-end bg-opacity-0 px-5 ${styles.pause}`}
                        >
                            <ResponsiveContainer width="100%" height="45%">
                                <LineChart data={data}>
                                    <Legend />
                                    <XAxis dataKey="index" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor:
                                                styles.graphBackground,
                                            borderColor: styles.graphBorder,
                                            borderRadius: "8px",
                                            color: styles.graphHighlight,
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="wpm"
                                        stroke={`${styles.graphBorder}`}
                                        dot={{
                                            fill: styles.graphBorder,
                                            stroke: styles.graphBorder,
                                            strokeWidth: 1,
                                        }}
                                        activeDot={{
                                            r: 8,
                                            fill: styles.graphHighlight,
                                            stroke: styles.graphHighlight,
                                            strokeWidth: 2,
                                        }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div
                        className={`z-40 h-[92%] w-1/4 rounded-2xl ${styles.secondaryBase} bg-opacity-30 px-3 pt-3 shadow-md  laptop:mt-5 desktop:mt-10`}
                    >
                        <div className="flex flex-col items-start px-3 pt-3">
                            {statistics.gameResults.keeb && (
                                <div className="flex w-full flex-col">
                                    <h2
                                        className={`flex justify-center ${styles.pause}`}
                                    >
                                        Keyboard
                                    </h2>
                                    <p
                                        className={`flex justify-center rounded-lg border-2 ${styles.border} border-opacity-50 ${styles.backgroundColor} bg-opacity-30 px-3 py-2 desktop:mt-1 `}
                                    >
                                        {statistics.gameResults.keeb.name}
                                    </p>
                                </div>
                            )}
                            {statistics.gameResults.user.rank && (
                                <div className="mt-2 flex w-full flex-col items-center laptop:text-xs desktop:mt-3 desktop:text-sm">
                                    <h2
                                        className={`text-base ${styles.textColor}`}
                                    >
                                        Rank
                                    </h2>
                                    <div className="flex w-full justify-center gap-2 desktop:mt-1 ">
                                        <div
                                            className={` flex w-full flex-col overflow-hidden rounded-2xl border-2  ${styles.border} border-opacity-50 p-3`}
                                        >
                                            <h2
                                                className={`flex justify-center border-b-2 ${styles.border} border-opacity-50 ${styles.textColor} `}
                                            >
                                                Standing
                                            </h2>
                                            <p
                                                className={`mt-1 flex justify-center ${styles.pause}`}
                                            >
                                                {`top ${statistics.gameResults.user.rank.standing}%`}
                                            </p>
                                            <h2
                                                className={`mt-3 flex justify-center border-b-2 ${styles.border} border-opacity-50 ${styles.textColor}`}
                                            >
                                                Rank min
                                            </h2>
                                            <p
                                                className={`mt-1 flex justify-center gap-1 ${styles.pause}`}
                                            >
                                                {statistics.gameResults.user
                                                    .rank.minWpm === 0
                                                    ? "---"
                                                    : statistics.gameResults
                                                          .user.rank.minWpm}
                                            </p>
                                        </div>
                                        <div
                                            className={`border-2xl flex w-full flex-col rounded-2xl border-2 ${styles.border} border-opacity-50  p-3`}
                                        >
                                            <h2
                                                className={`flex justify-center border-b-2 ${styles.border} border-opacity-50 ${styles.textColor} `}
                                            >
                                                Rank
                                            </h2>

                                            <div
                                                className={`mt-1 flex justify-center ${styles.pause}`}
                                            >
                                                {rankWpm > 0
                                                    ? Math.round(rankWpm)
                                                    : "---"}
                                            </div>
                                            <h2
                                                className={`mt-3 flex justify-center border-b-2 ${styles.border} border-opacity-50 ${styles.textColor}`}
                                            >
                                                Rank max
                                            </h2>
                                            <p
                                                className={`mt-1 flex justify-center ${styles.pause}`}
                                            >
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
                                    <p
                                        className={`mt-3 flex w-full justify-center rounded-lg border-2 ${styles.border} border-opacity-50 ${styles.backgroundColor} bg-opacity-30 px-3 py-2  `}
                                    >
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
