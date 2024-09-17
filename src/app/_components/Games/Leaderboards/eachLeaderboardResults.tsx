"use client";

import Link from "next/link";

interface EachLeaderboardResultsProps {
    leaderboard: EachLeaderboard;
    rankNumber: number;
}

interface EachLeaderboard {
    id: string;
    username: string | null;
    rankedWpm: number | null;
}

export default function EachLeaderboardResults({
    leaderboard,
    rankNumber,
}: EachLeaderboardResultsProps) {
    return (
        <>
            <div>#{rankNumber + 1}</div>
            <Link
                href={`/profile/public/${leaderboard.username}`}
                className="hover:underline"
            >
                {leaderboard.username}
            </Link>
            <div>{leaderboard.rankedWpm} wpm</div>
        </>
    );
}
