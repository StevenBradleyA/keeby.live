import { useSession } from "next-auth/react";
import Image from "next/image";
import defaultProfile from "@public/Profile/profile-default.png";
import type { Game } from "@prisma/client";

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
        } | null;
    };
}

interface GameStatistics {
    id: string;
    wpm: number;
    accuracy: number;
}

interface GameResultsResponse {
    gameResults: GameResult;
    allGameResults: GameStatistics[];
    averageWpm: number;
    averageAccuracy: number;
}

interface EachGameResultCardProps {
    statistics: GameResultsResponse;
}

export default function EachGameResultCard({
    statistics,
}: EachGameResultCardProps) {
    const { data: session } = useSession();
    // react-vis
    return (
        <div className="flex w-full flex-col ">
            <div className="w-full bg-green-300 ">
                {statistics.gameResults.mode}
            </div>
            <div className="flex w-full gap-5  bg-red-200">
                <div className="mt-10 h-full w-1/4 shadow-md">
                    <div className="border-2 border-green-500 p-3">
                        <h2>wpm</h2>
                        {statistics.gameResults.wpm}
                        <h2>purewpm </h2>
                        {statistics.gameResults.pureWpm}
                    </div>

                    <div>
                        <h2>accuracy</h2>
                        {statistics.gameResults.accuracy}
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
                                user info stuff
                            </div>
                        </div>
                    )}
                </div>

                <div className="h-full w-1/2 ">
                    {" "}
                    graph data (wpm over time and accuracy rate over time)
                </div>

                <div className="mt-10 h-full w-1/4 bg-purple-100">
                    keeb info mode? rank info
                </div>
            </div>
        </div>
    );
}
