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

interface GameDataChartingProps {
    gameData: GameDataTypes;
}
interface GameDataTypes {
    userRankNumber?: number;
    userWithGameResultsAndRank: GameData | null;
    averageWpm: number;
    averageAccuracy: number;
}

interface GameData {
    rankedWpm: number | null;
    rank: {
        name: string;
        image: string;
        standing: number;
        minWpm: number;
        maxWpm: number;
    } | null;
    games: {
        id: string;
        wpm: number;
        accuracy: number;
    }[];
}

export default function GameDataCharting({ gameData }: GameDataChartingProps) {
    return (
        <>
            {gameData && gameData.userWithGameResultsAndRank ? (
                <div className="w-full bg-black/10 p-10 rounded-lg min-h-[300px]">
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
            ) : (
                <div className="w-full bg-black/10 p-10 rounded-lg min-h-[300px]"></div>
            )}
        </>
    );
}
