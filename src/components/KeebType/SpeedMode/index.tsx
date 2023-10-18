import { useEffect, useState } from "react";
import SentenceGenerator from "./sentenceGenerator";

interface SpeedModeProps {
    gameLength: number;
}

export default function SpeedMode({ gameLength }: SpeedModeProps) {
    const [prompt, setPrompt] = useState<string[]>([]);
    const [totalUserInput, setTotalUserInput] = useState<string>("");
    const [userInput, setUserInput] = useState<string>("");

    return (
        <>
            <SentenceGenerator gameLength={gameLength} setPrompt={setPrompt} />
            <div className="flex w-2/3 justify-center gap-2 text-gray-400">
                {prompt.map((word, index) => (
                    <div className="flex" key={index}>
                        {word.split("").map((letter, letterIndex) => (
                            <div className="correct" key={letterIndex}>
                                {letter}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}
