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
    const [wordStatus, setWordStatus] = useState<boolean[]>(
        new Array(gameLength).fill(false)
    );
    const [extraCharacters, setExtraCharacters] = useState<string[]>(
        new Array(gameLength).fill("")
    );

    // after game is working flawless then implement styling / pausing / end game stats etc.....

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
            const activePrompt = prompt[activeWordIndex];
            if (activePrompt && userInput.length > activePrompt.length) {
                const newExtraCharacters = [...extraCharacters];
                newExtraCharacters[activeWordIndex] = `${userInput.substring(
                    activePrompt.length
                )}`;
                setExtraCharacters(newExtraCharacters);
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

    return (
        <div className="flex w-2/3 flex-col">
            <SentenceGenerator gameLength={gameLength} setPrompt={setPrompt} />
            <div
                className={`flex w-full flex-wrap gap-2 px-10 text-2xl text-gray-400 `}
            >
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
                            const extra =
                                isCurrentWord &&
                                letterIndex === word.length - 1;

                            const isCursor =
                                isCurrentWord &&
                                userInput.length === letterIndex;
                            const isExtraCursor =
                                isCurrentWord &&
                                userInput.length === letterIndex + 1;

                            const extraInput = userInput
                                .substring(word.length)
                                .split("");

                            return (
                                <div
                                    className={`flex
                                    ${wordHit ? "text-white" : ""}
                                    ${wordMiss ? "text-red-500" : ""}
                                    ${letterHit ? "text-white" : ""}
                                    ${letterMiss ? "text-red-500" : ""}
                                    ${
                                        isCursor
                                            ? "border-l-2 border-blue-500"
                                            : ""
                                    }
                                    `}
                                    key={letterIndex}
                                >
                                    {letter}
                                    {extra && (
                                        <div
                                            className={`text-red-500  ${
                                                isExtraCursor
                                                    ? "border-l-2 border-blue-500"
                                                    : ""
                                            }  `}
                                        >
                                            {extraInput.map(
                                                (eachExtra, index) => (
                                                    <span
                                                        key={index}
                                                        className={`  ${
                                                            index ===
                                                            userInput.length -
                                                                word.length -
                                                                1
                                                                ? "border-r-2 border-blue-500"
                                                                : ""
                                                        }  `}
                                                    >
                                                        {eachExtra}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    )}
                                    {extraCharacters[index] &&
                                        letterIndex === word.length - 1 && (
                                            <div className={`text-red-500 `}>
                                                {extraCharacters[index]}
                                            </div>
                                        )}
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
                    maxLength={30}
                />
            </div>
        </div>
    );
}
