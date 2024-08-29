import { useState } from "react";
import type { Keeb } from "@prisma/client";
import DisplayAllGameStats from "./displayAllGameStats";

interface DisplayAllGameStatsProps {
    userId: string;
    keebData: Keeb[];
}

export default function GameStatsConfigurator({
    userId,
    keebData,
}: DisplayAllGameStatsProps) {
    const [mode, setMode] = useState<string>("ranked");
    const [keebId, setKeebId] = useState<string>(
        keebData[0] ? keebData[0].id : ""
    );
    const [keeb, setKeeb] = useState<string>(
        keebData[0] ? keebData[0].name : ""
    );

    return (
        <>
            <DisplayAllGameStats
                userId={userId}
                mode={mode}
                keebId={keebId}
                keeb={keeb}
                keebData={keebData}
                setMode={setMode}
                setKeeb={setKeeb}
                setKeebId={setKeebId}
            />
        </>
    );
}
