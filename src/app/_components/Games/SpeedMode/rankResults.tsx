"use client";
import type { ThemeStyle } from "../Theme/themeStyles";
import type { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

interface RankResultProps {
    gameResults: GameResults | null;
    styles: ThemeStyle;
    session: Session | null;
    totalGamesPlayed: number;
}
interface User {
    rank: {
        id: string;
        name: string;
        image: string;
        minWpm: number;
        maxWpm: number;
        standing: number;
    } | null;
    _count: {
        games: number;
    };
}
interface Keeb {
    id: string;
    name: string;
    keycaps: string;
    switches: string;
}
interface GameResults {
    id: string;
    accuracy: number;
    createdAt: Date;
    updatedAt: Date;
    keeb: Keeb | null;
    keebId: string | null;
    mode: string;
    pureWpm: number;
    user: User;
    userId: string;
    wpm: number;
}

export default function RankResults({
    gameResults,
    styles,
    session,
    totalGamesPlayed,
}: RankResultProps) {
    const [rank, setRank] = useState("---");

    useEffect(() => {
        if (
            gameResults &&
            gameResults.user &&
            gameResults.user.rank &&
            session &&
            session.user
        ) {
            setRank(gameResults.user.rank.name);
        }
    }, [gameResults]);

    return (
        <>
            <p
                className={`mt-3 flex w-full justify-center rounded-lg border-2 ${styles.border} border-opacity-50 ${styles.backgroundColor} bg-opacity-30 px-3 py-2 `}
            >
                {session && session.user ? (
                    <>
                        {rank === "Unranked" && totalGamesPlayed < 10 ? (
                            <>Unranked - {totalGamesPlayed}/10</>
                        ) : (
                            rank
                        )}
                    </>
                ) : (
                    <button
                        onClick={() => void signIn()}
                        className="hover:underline"
                    >
                        Sign in to play ranked!
                    </button>
                )}
            </p>
        </>
    );
}
