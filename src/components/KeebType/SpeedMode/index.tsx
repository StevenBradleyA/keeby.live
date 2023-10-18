import { useEffect, useState } from "react";
import SentenceGenerator from "./sentenceGenerator";

interface SpeedModeProps {
    gameLength: number;
}
type ColorClass = "correct" | "correct-typing" | "";

export default function SpeedMode({ gameLength }: SpeedModeProps) {
    const [prompt, setPrompt] = useState<string[]>([]);
    const [totalUserInput, setTotalUserInput] = useState<string>("");
    const [userInput, setUserInput] = useState<string>("");
    const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
    const [wordStatus, setWordStatus] = useState<boolean[]>(
        new Array(gameLength).fill(false)
    );
    console.log(wordStatus);
    // console.log("userInput", userInput);
    // console.log("activeWordIndex", activeWordIndex);
    // console.log("totalInput", totalUserInput);

    const handleInputChange = (inputValue: string) => {
        setUserInput(inputValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === " ") {
            const activeWord = prompt[activeWordIndex] ?? "";

            const isCorrect = activeWord === userInput;

            if (isCorrect) {
                // Update word status if the word is correctly spelled
                const newWordStatus = [...wordStatus];
                newWordStatus[activeWordIndex] = true;
                setWordStatus(newWordStatus);
            }

            // Add userInput to totalUserInput and clear userInput
            setTotalUserInput(totalUserInput + userInput + " ");
            setUserInput("");
            // Increase activeWordIndex by one
            setActiveWordIndex(activeWordIndex + 1);
            // Prevent the space key from being input into the text field
            e.preventDefault();
        }
    };
    // incorrect
    // incorrect extra

    return (
        <div className="flex flex-col">
            <SentenceGenerator gameLength={gameLength} setPrompt={setPrompt} />
            <div className={`flex w-2/3 gap-2 text-gray-400 `}>
                {prompt.map((word, index) => (
                    <div
                        className={`flex ${
                            index === activeWordIndex ? "active" : "word"
                        }`}
                        key={index}
                    >
                        {word.split("").map((letter, letterIndex) => {
                            const wordHit =
                                wordStatus[index] && index < activeWordIndex;
                            const wordMiss =
                                !wordStatus[index] && index < activeWordIndex;

                            const isCurrentWord = index === activeWordIndex;
                            const letterHit =
                                isCurrentWord &&
                                letter === userInput[letterIndex];
                            const letterMiss =
                                isCurrentWord &&
                                userInput[letterIndex] !== undefined &&
                                letter !== userInput[letterIndex];

                            // const isIncorrectExtra =
                            // isCurrentWord && letterIndex < userInput.length;

                            return (
                                <div
                                    className={`${
                                        wordHit ? "text-green-500" : ""
                                    } ${wordMiss ? "text-red-500" : ""}
                                    ${letterHit ? "text-green-500" : ""}
                                    ${
                                        isCurrentWord && letterMiss
                                            ? "text-red-500"
                                            : ""
                                    }
                                    
                                    
                                    `}
                                    key={letterIndex}
                                >
                                    {letter}
                                </div>
                            );
                        })}
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
