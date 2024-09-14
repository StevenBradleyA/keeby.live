"use client";

interface EachLeaderboardResultsProps {
    leaderboard: EachLeaderboard;
    ranknumber: number;
}

interface EachLeaderboard {
    id: string;
    username: string;
    rankedWpm: number;
}

export default function EachLeaderboardResults({
    leaderboard,
}: EachLeaderboardResultsProps) {
    return (
        <>
            <div>{leaderboard.username}</div>
            <div>#{leaderboard.rankedWpm}</div>
        </>
    );
}
