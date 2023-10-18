import { useEffect, useState } from "react";
import SentenceGenerator from "./sentenceGenerator";

interface SpeedModeProps {
    gameLength: number;
}

export default function SpeedMode({ gameLength }: SpeedModeProps) {
    // gamelength generates a random sentence
    const [prompt, setPrompt] = useState<string[]>([]);

    return (
        <>
            <SentenceGenerator gameLength={gameLength} setPrompt={setPrompt} />
            <div> {prompt}</div>
        </>
    );
}
