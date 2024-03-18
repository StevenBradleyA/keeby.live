import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import EachGameResultCard from "./eachGameResultCard";

interface SpeedModeResultsProps {
    gameId: string;
}

export default function SpeedModeResults({ gameId }: SpeedModeResultsProps) {
    const { data: session } = useSession();
    const { data: gameResults } = api.game.getGameResults.useQuery({
        id: gameId,
    });

    return (
        <div className="flex w-full flex-col ">
            <button>reset game here</button>
            {gameResults && <EachGameResultCard gameResults={gameResults} />}
        </div>
    );
}
