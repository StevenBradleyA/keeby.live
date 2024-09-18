"use client";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../Loading";
import type { Session } from "next-auth";
import EachLeaderboardResults from "./eachLeaderboardResults";
import Image from "next/image";
import defaultProfile from "@public/Images/defaultProfile.png";
import LeaderboardUserRank from "./leaderboardUserRank";

interface LeaderboardProps {
    session: Session | null;
    isOpen: boolean;
}
type LeaderboardEntry = {
    id: string;
    rankedWpm: number | null;
    username: string | null;
};

export default function LeaderboardModal({
    session,
    isOpen,
}: LeaderboardProps) {
    const [page, setPage] = useState<number>(1);
    const [leaderboards, setLeaderboards] = useState<LeaderboardEntry[]>([]);

    const { data: standings, isLoading } = api.game.getLeaderboards.useQuery({
        ...(session ? { id: session.user.id } : {}),
        page: page,
    });
    useEffect(() => {
        if (isOpen) {
            setLeaderboards([]);
            setPage(1);
        }
    }, [isOpen]);

    useEffect(() => {
        if (standings && standings.getLeaderboards) {
            setLeaderboards((prev) => [...prev, ...standings.getLeaderboards]);
        }
    }, [standings]);

    if (isLoading && page === 1) {
        return (
            <div className="w-[50vw] laptop:w-[30vw] h-[60vh] text-xs flex flex-col">
                <div className=" flex w-full justify-center">
                    <div className=" rounded-lg p-3 flex flex-col items-center mt-3 min-w-[33%] min-h-[150px] skeleton-dark-glow  "></div>
                </div>
                <div className="flex w-full justify-between p-2 rounded-lg mt-2 h-8 skeleton-dark-glow"></div>
                <div className="flex w-full justify-between p-2 rounded-lg mt-2 h-8 skeleton-dark-glow"></div>
                <div className="flex w-full justify-between p-2 rounded-lg mt-2 h-8 skeleton-dark-glow"></div>
                <div className="flex w-full justify-between p-2 rounded-lg mt-2 h-8 skeleton-dark-glow"></div>
                <div className="flex w-full justify-between p-2 rounded-lg mt-2 h-8 skeleton-dark-glow"></div>
            </div>
        );
    }

    return (
        <div className="w-[50vw] laptop:w-[30vw] h-[60vh] text-xs flex flex-col">
            {session && session.user ? (
                <LeaderboardUserRank id={session.user.id} />
            ) : (
                <div className=" flex w-full justify-center">
                    <div className=" bg-black/30 rounded-lg p-3 flex flex-col items-center mt-3 min-w-[33%] ">
                        <Image
                            src={defaultProfile}
                            alt="user profile"
                            className="w-20 h-20 rounded-md"
                            width={300}
                            height={300}
                        />
                        <div className="text-sm">Not signed in</div>
                        <div className="text-xs mt-2">---</div>
                    </div>
                </div>
            )}
            <div className="px-3">
                <div className="flex w-full justify-between p-2 bg-black/50  rounded-lg mt-2">
                    <h2>Rank</h2>
                    <h2>Ranked wpm</h2>
                </div>
            </div>
            <div className="flex flex-col gap-1 mt-2 h-full overflow-y-auto px-3">
                {leaderboards &&
                    leaderboards.length > 0 &&
                    leaderboards.map((e, i) => (
                        <div
                            key={e.id}
                            className={` flex justify-between ${session && session.user.id === e.id ? "bg-green-500 text-black hover:bg-green-500/80" : "bg-black/40 hover:bg-black/30"}  rounded-lg p-2`}
                        >
                            <EachLeaderboardResults
                                leaderboard={e}
                                rankNumber={i}
                            />
                        </div>
                    ))}
                {leaderboards && leaderboards.length > 50 && (
                    <div className="w-full flex justify-center">
                        <button
                            className="mt-2 bg-black/30 p-3 rounded-lg hover:bg-black/20"
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            {isLoading ? (
                                <LoadingSpinner size="10px" />
                            ) : (
                                "Show more"
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
