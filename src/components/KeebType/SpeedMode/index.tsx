import { useEffect, useState } from "react";
import SentenceGenerator from "./sentenceGenerator";

interface SpeedModeProps {
    gameLength: number;
    setGameOver: (gameOver: boolean) => void;
}

export default function SpeedMode({ gameLength, setGameOver }: SpeedModeProps) {
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
    // todo test out bottom margin idea might be clean?
    // todo saving stats when finished

    useEffect(() => {
        // Check if the game is over
        if (
            activeWordIndex === gameLength - 1 &&
            userInput === prompt[activeWordIndex]
        ) {
            // If activeWordIndex matches the length of the prompt
            // and the last word is spelled correctly, setGameOver to true
            setGameOver(true);
        }
    }, [activeWordIndex, userInput, gameLength, setGameOver, prompt]);

    const handleInputChange = (inputValue: string) => {
        setUserInput(inputValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // logic for moving forward
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
            if (activeWordIndex === gameLength - 1) {
                setGameOver(true);
            }
            // Prevent the space key from being input into the text field
            e.preventDefault();
        }

        //   Logic to move back to the previous word?
    };

    return (
        <div className="flex w-2/3 flex-col">
            <SentenceGenerator gameLength={gameLength} setPrompt={setPrompt} />
            <div
                className={`flex w-full transform flex-wrap gap-2 px-10 text-2xl text-white/30 transition 
                
                
                
                `}
            >
                {prompt.map((word, index) => (
                    <div className={`flex`} key={index}>
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

                            const isCursorLastLetter =
                                isCurrentWord &&
                                userInput.length === word.length &&
                                letterIndex === word.length - 1;

                            const isExtraCursor =
                                isCurrentWord &&
                                userInput.length === letterIndex + 1;

                            const extraInput = userInput
                                .substring(word.length)
                                .split("");

                            return (
                                <div
                                    className={` flex
                                    ${wordHit ? "text-white" : ""}
                                    ${wordMiss ? "text-red-500" : ""}
                                    ${letterHit ? "text-white" : ""}
                                    ${letterMiss ? "text-red-500" : ""}
                                    ${
                                        isCursor
                                            ? "border-l-2 border-blue-500 border-opacity-100"
                                            : isCursorLastLetter
                                            ? "border-r-opacity-100 border-r-2 border-blue-500"
                                            : "border-l-2 border-r-2 border-transparent"
                                    }
                                    `}
                                    key={letterIndex}
                                >
                                    {letter}
                                    {extra && (
                                        <div className={` text-red-500  `}>
                                            {extraInput.map(
                                                (eachExtra, index) => (
                                                    <span
                                                        key={index}
                                                        className={` border-r-2  ${
                                                            index ===
                                                            userInput.length -
                                                                word.length -
                                                                1
                                                                ? " border-blue-500"
                                                                : " border-transparent"
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
