import { useEffect, useState } from "react";
import SentenceGenerator from "./sentenceGenerator";

interface SpeedModeProps {
    gameLength: number;
}

export default function SpeedMode({ gameLength }: SpeedModeProps) {
    const [prompt, setPrompt] = useState<string[]>([]);
    const [totalUserInput, setTotalUserInput] = useState<string>("");
    const [userInput, setUserInput] = useState<string>("");
    const [activeWordIndex, setActiveWordIndex] = useState<number>(0);

    console.log("userInput", userInput);
    console.log("activeWordIndex", activeWordIndex);
    console.log("totalInput", totalUserInput);

    const handleInputChange = (inputValue: string) => {
        setUserInput(inputValue);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === " ") {
            // Add userInput to totalUserInput and clear userInput
            setTotalUserInput(totalUserInput + userInput + " ");
            setUserInput("");
            // Increase activeWordIndex by one
            setActiveWordIndex(activeWordIndex + 1);
            // Prevent the space key from being input into the text field
            e.preventDefault();
        }
    };

    return (
        <div className="flex flex-col">
            <SentenceGenerator gameLength={gameLength} setPrompt={setPrompt} />
            <div className="flex w-2/3 gap-2 text-gray-400">
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
            <div>
                <input
                    value={userInput}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    className="w-full bg-dark text-red-600 "
                />
            </div>
        </div>
    );
}
