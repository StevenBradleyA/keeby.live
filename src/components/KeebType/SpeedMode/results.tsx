import { api } from "~/utils/api";
import EachGameResultCard from "./eachGameResultCard";

interface SpeedModeResultsProps {
    gameId: string;
    userId: string;
    keebId: string;
    mode: string;
    wpmIntervals: number[];
    rankWpm: number
    theme: string
}

export default function SpeedModeResults({
    gameId,
    userId,
    mode,
    keebId,
    wpmIntervals,
    rankWpm, 
    theme,
}: SpeedModeResultsProps) {
    const { data: statistics } = api.game.getGameResults.useQuery({
        id: gameId,
        userId: userId,
        mode: mode,
        keebId: keebId,
    });

    return (
        <div className="flex w-full flex-col ">
            {statistics && <EachGameResultCard statistics={statistics} wpmIntervals={wpmIntervals} rankWpm={rankWpm} theme={theme} />}
        </div>
    );
}