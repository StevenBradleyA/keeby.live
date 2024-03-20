import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import EachGameResultCard from "./eachGameResultCard";

interface SpeedModeResultsProps {
    gameId: string;
    userId: string;
    keebId: string;
    mode: string;
    wpmIntervals: number[];
}

export default function SpeedModeResults({
    gameId,
    userId,
    mode,
    keebId,
    wpmIntervals
}: SpeedModeResultsProps) {
    const { data: statistics } = api.game.getGameResults.useQuery({
        id: gameId,
        userId: userId,
        mode: mode,
        keebId: keebId,
    });

    return (
        <div className="flex w-full flex-col ">
            <button>reset game here</button>
            {statistics && <EachGameResultCard statistics={statistics} wpmIntervals={wpmIntervals} />}
        </div>
    );
}
