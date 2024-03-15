import { useEffect, useRef, useState } from "react";
import SentenceGenerator from "./sentenceGenerator";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useStopwatch } from "react-use-precision-timer";

interface SpeedModeProps {
    gameLength: number;
    gameOver: boolean;
    setGameOver: (gameOver: boolean) => void;
    gameStart: boolean;
    setGameStart: (gameStart: boolean) => void;
    mode: string;
    keebId: string;
}

export default function SpeedMode({
    gameLength,
    gameOver,
    setGameOver,
    gameStart,
    setGameStart,
    keebId,
    mode,
}: SpeedModeProps) {
    const { data: session } = useSession();

    // typing
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

    // game
    const [finishedGameId, setFinishedGameId] = useState<string>("");
    const [isVisualPaused, setIsVisualPaused] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // todo need a variable that keeps track of total words typed going to need to reference this to spread the prev index into the userInput for backspace

    // timer
    // npm i react-use-precision-timer
    // const [timerId, setTimerId] = useState<NodeJS.Timer | null>(null);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    // const [elapsedTime, setElapsedTime] = useState<number>(0);

    const stopwatch = useStopwatch();

    const { mutate: createGame } = api.game.create.useMutation({
        onSuccess: (data) => {
            console.log("hey");

            setFinishedGameId(data);
        },
    });

    // const { mutate } = api.listing.create.useMutation({
    //     onSuccess: async () => {
    //         toast.success("Listing Complete!", {
    //             style: {
    //                 borderRadius: "10px",
    //                 background: "#333",
    //                 color: "#fff",
    //             },
    //         });
    //         void ctx.listing.getAll.invalidate();
    //         await router.push("/");
    //     },
    // });

    const handleSubmitGame = () => {
        if (gameOver && session?.user.id && keebId) {
            // wpm
            const totalTypedWords = totalUserInput.trim().split(" ");
            const correctlyTypedWords = totalTypedWords.filter(
                (word, index) => wordStatus[index]
            );
            const totalCorrectlyTypedCharacters =
                correctlyTypedWords.join(" ").length;

            // pure wpm
            const totalTypedCharacters = totalUserInput.length;

            // accuracy
            const totalPromptCharacters = prompt.join(" ").length;

            // calculations
            const timeInSeconds = stopwatch.getElapsedRunningTime() / 1000;
            const timeInMinutes = timeInSeconds / 60;
            const pureWpm = totalTypedCharacters / 5 / timeInMinutes;
            const wpm = totalCorrectlyTypedCharacters / 5 / timeInMinutes;
            const accuracy =
                (totalCorrectlyTypedCharacters / totalPromptCharacters) * 100;

            // wpm - total number of characters in the correctly typed words (including spaces), divided by 5 and normalised to 60 seconds.
            // pure wpm - calculated just like wpm, but also includes incorrect words.
            // accuracy - percentage of correctly pressed keys.

            const data = {
                userId: session.user.id,
                keebId: keebId,
                wpm: wpm,
                pureWpm: pureWpm,
                accuracy: accuracy,
                mode: mode,
            };
            createGame(data);
        }
    };

    // typing
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const currentWord = prompt[activeWordIndex];
        if (
            gameOver === false &&
            currentWord &&
            activeWordIndex === gameLength - 1 &&
            userInput.length === currentWord.length
        ) {
            // Retrieve the active word from the prompt based on the current activeWordIndex.
            const activeWord = prompt[activeWordIndex] ?? "";
            // Check if the user's input matches the active word, implying the word was typed correctly.
            const isCorrect = activeWord === userInput;
            // If the word is correctly spelled:
            if (isCorrect) {
                // Update the word status array to reflect that the current word is correctly spelled.
                // This is done by creating a copy of the wordStatus array and setting the element
                // at the activeWordIndex to true (indicating a correctly spelled word).
                const newWordStatus = [...wordStatus];
                newWordStatus[activeWordIndex] = true;
                setWordStatus(newWordStatus);
            }

            // If activeWordIndex matches the length of the prompt
            // and the last word is spelled correctly, setGameOver to true

            setGameOver(true);
            // setUserInput(""); not sure if we need to do this at all the game will end soooo
        }
    }, [
        activeWordIndex,
        userInput,
        gameLength,
        prompt,
        wordStatus,
        gameOver,
        setGameOver,
    ]);

    const handleInputChange = (inputValue: string) => {
        setUserInput(inputValue);
    };

    const handleBlur = () => {
        setIsRunning(false);
        setIsVisualPaused(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // here we want to start the game...
        // going to want different logic depending on if the game is starting vs if the game is resuming
        if (
            !isRunning &&
            ((e.key >= "a" && e.key <= "z") || (e.key >= "0" && e.key <= "9"))
        ) {
            setIsRunning(true);
            if (totalUserInput.length === 0) {
                stopwatch.start();
            }
            if (totalUserInput.length > 0) {
                stopwatch.resume();
            }
        }

        if (e.key === " ") {
            // Retrieve the active word from the prompt based on the current activeWordIndex.
            const activeWord = prompt[activeWordIndex] ?? "";
            // Check if the user's input matches the active word, implying the word was typed correctly.
            const isCorrect = activeWord === userInput;
            // If the word is correctly spelled:
            if (isCorrect) {
                // Update the word status array to reflect that the current word is correctly spelled.
                // This is done by creating a copy of the wordStatus array and setting the element
                // at the activeWordIndex to true (indicating a correctly spelled word).
                const newWordStatus = [...wordStatus];
                newWordStatus[activeWordIndex] = true;
                setWordStatus(newWordStatus);
            }

            // This part handles extra characters that the user has typed beyond the length of the active word.
            const activePrompt = prompt[activeWordIndex];
            if (activePrompt && userInput.length > activePrompt.length) {
                // Calculate the extra characters by substringing the userInput from the length of the active word.
                // Update the extraCharacters array for the current word.
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
            // Check if the game is over (i.e., if the activeWordIndex reaches the last word).
            if (activeWordIndex === gameLength - 1) {
                setGameOver(true);
            }
            setActiveWordIndex(activeWordIndex + 1);
            // Prevent the space key from being input into the text field
            e.preventDefault();
        }

        //   Logic to move back to the previous word?
    };

    // timer

    useEffect(() => {
        if (!isRunning) {
            stopwatch.pause();
        }
        if (gameOver) {
            stopwatch.pause();
            // setElapsedTime(stopwatch.getElapsedRunningTime());
            handleSubmitGame();
        }
    }, [isRunning, gameOver, stopwatch]);

    console.log("elapsed time", stopwatch.getElapsedRunningTime());
    console.log("words type", totalUserInput);

    // todo implement logic where one word back always backspace to take you back...

    return (
        <>
            {gameOver === false && (
                <div className="flex w-2/3 flex-col">
                    <SentenceGenerator
                        gameLength={gameLength}
                        setPrompt={setPrompt}
                    />
                    <div className="relative flex w-full flex-wrap gap-2 px-10 text-2xl text-white/30">
                        {prompt.map((word, index) => (
                            <div className="flex" key={index}>
                                {word.split("").map((letter, letterIndex) => {
                                    const wordHit =
                                        wordStatus[index] &&
                                        index < activeWordIndex;
                                    const wordMiss =
                                        !wordStatus[index] &&
                                        index < activeWordIndex;
                                    const isCurrentWord =
                                        index === activeWordIndex;
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

                                    const extraInput = userInput
                                        .substring(word.length)
                                        .split("");

                                    return (
                                        <div
                                            className="relative flex"
                                            key={letterIndex}
                                        >
                                            <span
                                                className={`  flex
                                    ${wordHit ? "text-white" : ""}
                                    ${wordMiss ? "text-red-500" : ""}
                                    ${letterHit ? "text-white" : ""}
                                    ${letterMiss ? "text-red-500" : ""}
                                    `}
                                            >
                                                {letter}
                                            </span>
                                            {isCursor && !isRunning && (
                                                <div className="blinking-cursor absolute bottom-0 left-0 top-0 w-0.5 bg-green-500"></div>
                                            )}
                                            {isCursor && isRunning && (
                                                <div className="absolute bottom-0 left-0 top-0 w-0.5 bg-green-500"></div>
                                            )}
                                            {isCursorLastLetter &&
                                                isRunning && (
                                                    <div className="absolute bottom-0 right-0 top-0 w-0.5 bg-green-500"></div>
                                                )}
                                            {isCursorLastLetter &&
                                                !isRunning && (
                                                    <div className="blinking-cursor absolute bottom-0 right-0 top-0 w-0.5 bg-green-500"></div>
                                                )}

                                            {extra && (
                                                <div
                                                    className={` flex text-red-500 `}
                                                >
                                                    {extraInput.map(
                                                        (eachExtra, index) => (
                                                            <div
                                                                className="relative"
                                                                key={index}
                                                            >
                                                                <span>
                                                                    {eachExtra}
                                                                </span>
                                                                {index ===
                                                                    userInput.length -
                                                                        word.length -
                                                                        1 &&
                                                                    isRunning && (
                                                                        <div className="absolute bottom-0 right-0 top-0 w-0.5 bg-green-500"></div>
                                                                    )}
                                                                {index ===
                                                                    userInput.length -
                                                                        word.length -
                                                                        1 &&
                                                                    !isRunning && (
                                                                        <div className="blinking-cursor absolute bottom-0 right-0 top-0 w-0.5 bg-green-500"></div>
                                                                    )}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                            {extraCharacters[index] &&
                                                letterIndex ===
                                                    word.length - 1 && (
                                                    <div
                                                        className={`text-red-500 `}
                                                    >
                                                        {extraCharacters[index]}
                                                    </div>
                                                )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}

                        <input
                            id="gameInput"
                            ref={inputRef}
                            onBlur={handleBlur}
                            onFocus={() => setIsVisualPaused(false)}
                            value={userInput}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                            className=" keeb-type-input absolute bottom-0 left-0 right-0 top-0 opacity-0  "
                            maxLength={30}
                        />
                        {isVisualPaused && (
                            <div className="keeb-type-pause-menu absolute bottom-0 left-0 right-0  top-0 flex items-center justify-center text-xl text-green-500 backdrop-blur-sm ">
                                Paused
                            </div>
                        )}
                    </div>
                </div>
            )}

            {gameOver && finishedGameId && (
                <div className="flex w-2/3 text-white">
                    hey the game is finished
                </div>
            )}
        </>
    );
}

// timer
// useEffect(() => {
//     return () => {
//         if (timerId !== null) clearTimeout(timerId);
//     };
// }, [timerId]);

// const startTimer = () => {
//     if (!isRunning) {
//         setIsRunning(true);
//         const id = window.setInterval(() => {
//             setElapsedTime((prevTime) => prevTime + 1);
//         }, 1000);
//         setTimerId(id);
//     }
// };

// const pauseTimer = () => {
//     if (isRunning && timerId !== null) {
//         clearInterval(timerId);
//         setIsRunning(false);
//         setTimerId(null);
//     }
// };

// const stopTimer = () => {
//     if (timerId !== null) {
//         clearInterval(timerId);
//     }
//     setIsRunning(false);
//     setTimerId(null);
//     setElapsedTime(0);
// };
