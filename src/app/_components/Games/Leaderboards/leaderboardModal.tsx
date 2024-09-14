"use client";
import { api } from "~/trpc/react";
import { useState } from "react";
import LoadingSpinner from "../../Loading";
import type { Session } from "next-auth";
import EachLeaderboardResults from "./eachLeaderboardResults";

interface LeaderboardProps {
    session: Session | null;
}

export default function LeaderboardModal({ session }: LeaderboardProps) {
    const [page, setPage] = useState<number>(0);

    const { data: standings, isLoading } = api.game.getLeaderboards.useQuery({
        ...(session ? { id: session.user.id } : {}),
        page: page,
    });

    if (isLoading) {
        return (
            <div>
                <LoadingSpinner size="12px" />
            </div>
        );
    }

    console.log(standings);

    return (
        <div className="w-[200px] laptop:w-[400px]">
            <h1>Ranked Leaderboards</h1>
            {session && standings && standings.userRankNumber && (
                <div className="bg-white/30 rounded-md p-3 flex justify-between mt-3">
                    <div>{session.user.username}</div>
                    <div># {standings.userRankNumber}</div>
                </div>
            )}

            {standings &&
                standings.getLeaderboards.length > 0 &&
                standings.getLeaderboards.map((e, i) => (
                    <div key={e.id} className="mt-3">
                        <EachLeaderboardResults  leaderboard={e} rankNumber={i}/>
                    </div>
                ))}
        </div>
    );
}
