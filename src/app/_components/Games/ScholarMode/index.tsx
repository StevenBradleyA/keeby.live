import { useSession } from "next-auth/react";
import { themeStyles } from "../Theme/themeStyles";
import type { ThemeName } from "../Theme/themeStyles";
import { useEffect, useRef, useState } from "react";
import { useStopwatch } from "react-use-precision-timer";
import { api } from "~/trpc/react";
import SpeedModeResults from "../SpeedMode/results";
import OfflineGameResults from "../GameStats/offlineGameResults";
import ScholarGenerator from "./scholarGenerator";

interface ScholarModeProps {
    gameOver: boolean;
    setGameOver: (gameOver: boolean) => void;
    mode: string;
    keebId: string;
    theme: string;
    scholarType: string;
}

export default function ScholarMode({
    gameOver,
    setGameOver,
    mode,
    keebId,
    theme,
    scholarType,
}: ScholarModeProps) {
    const { data: session } = useSession();

    // theme
    const styles = themeStyles[theme as ThemeName] || themeStyles["KEEBY"];

    // typing
    const [prompt, setPrompt] = useState<string[]>([]);
    // console.log("PROMPT CHECK B", prompt);
    const [totalUserInput, setTotalUserInput] = useState<string>("");
    const [userInput, setUserInput] = useState<string>("");
    const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
    const [wordStatus, setWordStatus] = useState<boolean[]>(
        new Array(prompt.length).fill(false),
    );
    // console.log("WORD STATUS CHECH", wordStatus);
    const [extraCharacters, setExtraCharacters] = useState<string[]>(
        new Array(prompt.length).fill(""),
    );
    const [trigger, setTrigger] = useState<number>(0);

    // game
    const [finishedGameId, setFinishedGameId] = useState<string>("");
    const [rankWpm, setRankWpm] = useState<number>(0);
    const [isVisualPaused, setIsVisualPaused] = useState<boolean>(false);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // stats
    const [wpmIntervals, setWpmIntervals] = useState<number[]>([]);
    const [offlineWpm, setOfflineWpm] = useState<number>(0);
    const [offlineAccuracy, setOfflineAccuracy] = useState<number>(0);
    const [offlinePureWpm, setOfflinePureWpm] = useState<number>(0);

    const stopwatch = useStopwatch();

    const { mutate: createGame } = api.game.create.useMutation({
        onSuccess: (data) => {
            if (data) {
                setFinishedGameId(data.gameId);
                if (data.averageWpm) setRankWpm(data.averageWpm);
            }
        },
    });

    const handleSubmitGame = () => {
        if (gameOver && session?.user.id && keebId) {
            // wpm
            const totalTypedWords = totalUserInput.trim().split(" ");
            const correctlyTypedWords = totalTypedWords.filter(
                (word, index) => wordStatus[index],
            );

            const totalCorrectlyTypedCharacters =
                correctlyTypedWords.join(" ").length;

            // pure wpm
            const totalTypedCharacters = totalUserInput.length;

            // accuracy
            const totalPromptCharacters = prompt.join(" ").trim().length;

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

        // offline
        if (gameOver && session === null) {
            // wpm
            const totalTypedWords = totalUserInput.trim().split(" ");
            const correctlyTypedWords = totalTypedWords.filter(
                (word, index) => wordStatus[index],
            );
            const totalCorrectlyTypedCharacters =
                correctlyTypedWords.join(" ").length;

            // pure wpm
            const totalTypedCharacters = totalUserInput.length;

            // accuracy
            const totalPromptCharacters = prompt.join(" ").trim().length;

            // calculations
            const timeInSeconds = stopwatch.getElapsedRunningTime() / 1000;
            const timeInMinutes = timeInSeconds / 60;
            setOfflinePureWpm(totalTypedCharacters / 5 / timeInMinutes);

            setOfflineWpm(totalCorrectlyTypedCharacters / 5 / timeInMinutes);
            setOfflineAccuracy(
                (totalCorrectlyTypedCharacters / totalPromptCharacters) * 100,
            );
        }
    };

    const handleBlur = () => {
        setIsRunning(false);
        setIsVisualPaused(true);
    };

    const handleResetGame = () => {
        setUserInput("");
        setTotalUserInput("");
        setActiveWordIndex(0);
        setWordStatus(new Array(prompt.length).fill(false));
        setExtraCharacters(new Array(prompt.length).fill(""));
        if (inputRef.current) {
            inputRef.current.focus();
            setIsVisualPaused(false);
        }
        stopwatch.stop();
        setWpmIntervals([]);
    };

    const handleNextGame = () => {
        setFinishedGameId("");
        setGameOver(false);
        setTrigger((prev) => prev + 1);
        setTotalUserInput("");
        setUserInput("");
        setActiveWordIndex(0);
        setWordStatus(new Array(prompt.length).fill(false));
        setExtraCharacters(new Array(prompt.length).fill(""));
        stopwatch.stop();
        setIsVisualPaused(false);
        setIsRunning(false);
        setWpmIntervals([]);
    };

    useEffect(() => {
        setWordStatus(new Array(prompt.length).fill(false));
    }, [prompt]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
            const activeWord = prompt[activeWordIndex] ?? "";
            const isCorrect = activeWord === userInput;
            if (isCorrect) {
                const newWordStatus = [...wordStatus];
                newWordStatus[activeWordIndex] = true;
                setWordStatus(newWordStatus);
            }
            const activePrompt = prompt[activeWordIndex];
            if (activePrompt && userInput.length > activePrompt.length) {
                const newExtraCharacters = [...extraCharacters];
                newExtraCharacters[activeWordIndex] = `${userInput.substring(
                    activePrompt.length,
                )}`;
                setExtraCharacters(newExtraCharacters);
            }

            setTotalUserInput(totalUserInput + userInput + " ");
            setUserInput("");
            if (activeWordIndex === prompt.length - 1) {
                setGameOver(true);
            }
            setActiveWordIndex(activeWordIndex + 1);
            e.preventDefault();
        }

        if (
            e.key === "Backspace" &&
            userInput.length === 0 &&
            wordStatus[activeWordIndex - 1] === false &&
            activeWordIndex > 0
        ) {
            const totalInputArray = totalUserInput.split(" ");

            if (totalInputArray[totalInputArray.length - 1] === "") {
                totalInputArray.pop();
            }
            const lastWord = totalInputArray.pop() || "";

            const newExtraCharacters = [...extraCharacters];
            if (newExtraCharacters[activeWordIndex - 1]) {
                newExtraCharacters[activeWordIndex - 1] = "";
                setExtraCharacters(newExtraCharacters);
            }

            setTotalUserInput(
                totalInputArray.join(" ") +
                    (totalInputArray.length > 0 ? " " : ""),
            );

            if (lastWord) {
                setUserInput(lastWord);
            }

            setActiveWordIndex(activeWordIndex - 1);
            e.preventDefault();
        }
    };

    useEffect(() => {
        if (!gameOver && inputRef.current) {
            inputRef.current.focus();
        }
    }, [gameOver, trigger]);

    useEffect(() => {
        const currentWord = prompt[activeWordIndex];
        if (
            gameOver === false &&
            currentWord &&
            activeWordIndex === prompt.length - 1 &&
            userInput.length === currentWord.length
        ) {
            const activeWord = prompt[activeWordIndex] ?? "";
            const isCorrect = activeWord === userInput;
            if (isCorrect) {
                const newWordStatus = [...wordStatus];
                newWordStatus[activeWordIndex] = true;
                setWordStatus(newWordStatus);
            }
            setTotalUserInput(totalUserInput + userInput);

            setGameOver(true);
        }
    }, [
        activeWordIndex,
        userInput,
        prompt.length,
        prompt,
        wordStatus,
        gameOver,
        setGameOver,
        totalUserInput,
    ]);

    const handleInputChange = (inputValue: string) => {
        setUserInput(inputValue);
    };

    // timer
    useEffect(() => {
        if (!isRunning) {
            stopwatch.pause();
        }
        if (gameOver) {
            stopwatch.pause();
            handleSubmitGame();
        }
    }, [isRunning, gameOver, stopwatch]);

    // interval
    useEffect(() => {
        if (isRunning && totalUserInput.length > 0) {
            const timeInSeconds = stopwatch.getElapsedRunningTime() / 1000;
            const timeInMinutes = timeInSeconds / 60;
            const totalTypedWords = totalUserInput.length / 5;
            const currentWpm = totalTypedWords / timeInMinutes;
            if (currentWpm > 0) {
                setWpmIntervals((prev) => [...prev, currentWpm]);
            }
        }
    }, [totalUserInput, gameOver, isRunning, stopwatch]);

    return (
        <div className="z-10 flex w-full flex-shrink-0 flex-col">
            {gameOver === false && (
                <div className="mt-72 flex w-full flex-col">
                    <ScholarGenerator
                        setPrompt={setPrompt}
                        key={trigger}
                        scholarType={scholarType}
                    />
                    <div
                        className={`relative flex w-full flex-wrap gap-2 px-10 text-2xl ${
                            styles.textColor
                        } justify-center`}
                    >
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
                                    ${wordHit ? styles.hit : ""}
                                    ${wordMiss ? styles.miss : ""}
                                    ${letterHit ? styles.hit : ""}
                                    ${letterMiss ? styles.miss : ""}
                                    `}
                                            >
                                                {letter}
                                            </span>
                                            {isCursor && !isRunning && (
                                                <div
                                                    className={`blinking-cursor absolute bottom-0 left-0 top-0 w-0.5 ${styles.cursor}`}
                                                ></div>
                                            )}
                                            {isCursor && isRunning && (
                                                <div
                                                    className={`absolute bottom-0 left-0 top-0 w-0.5 ${styles.cursor}`}
                                                ></div>
                                            )}
                                            {isCursorLastLetter &&
                                                isRunning && (
                                                    <div
                                                        className={`absolute bottom-0 right-0 top-0 w-0.5 ${styles.cursor}`}
                                                    ></div>
                                                )}
                                            {isCursorLastLetter &&
                                                !isRunning && (
                                                    <div
                                                        className={`blinking-cursor absolute bottom-0 right-0 top-0 w-0.5 ${styles.cursor}`}
                                                    ></div>
                                                )}

                                            {extra && (
                                                <div
                                                    className={` flex ${styles.miss} `}
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
                                                                        <div
                                                                            className={`absolute bottom-0 right-0 top-0 w-0.5 ${styles.cursor}`}
                                                                        ></div>
                                                                    )}
                                                                {index ===
                                                                    userInput.length -
                                                                        word.length -
                                                                        1 &&
                                                                    !isRunning && (
                                                                        <div
                                                                            className={`blinking-cursor absolute bottom-0 right-0 top-0 w-0.5 ${styles.cursor}`}
                                                                        ></div>
                                                                    )}
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                            {extraCharacters[index] &&
                                                letterIndex ===
                                                    word.length - 1 && (
                                                    <div
                                                        className={`${styles.miss} `}
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
                            <div
                                className={`keeb-type-pause-menu absolute bottom-0 left-0 right-0  top-0 flex items-center justify-center text-xl ${styles.pause} backdrop-blur-sm `}
                            >
                                Paused
                            </div>
                        )}
                    </div>
                </div>
            )}

            {gameOver && finishedGameId && session && session.user && (
                <div className={`flex w-full flex-col ${styles.hit}`}>
                    <div
                        className={`z-10 flex w-full justify-between rounded-lg border-2 ${styles.border} border-opacity-50 ${styles.backgroundColor} bg-opacity-30 px-5 py-2`}
                    >
                        <button
                            onClick={handleNextGame}
                            className={`flex items-center ${styles.hoverText}`}
                        >
                            Next Game
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-7 -rotate-90   "
                                fill="none"
                            >
                                <path
                                    d="M7 10L12 15L17 10"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <div className="flex items-center">Non-ranked mode</div>
                    </div>
                    <SpeedModeResults
                        gameId={finishedGameId}
                        userId={session.user.id}
                        mode={mode}
                        keebId={keebId}
                        wpmIntervals={wpmIntervals}
                        rankWpm={rankWpm}
                        theme={theme}
                    />
                </div>
            )}

            {gameOver && session === null && (
                <div className={`flex w-full flex-col ${styles.hit}`}>
                    <div
                        className={`z-10 flex w-full rounded-lg border-2 ${styles.border} border-opacity-50 ${styles.backgroundColor} justify-between bg-opacity-30 px-5 py-2`}
                    >
                        <button
                            onClick={handleNextGame}
                            className={`flex items-center ${styles.hoverText}`}
                        >
                            Next Game
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-7 -rotate-90   "
                                fill="none"
                            >
                                <path
                                    d="M7 10L12 15L17 10"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <div className="flex items-center">
                            Offline mode. Sign in to save your progress
                        </div>
                    </div>
                    <OfflineGameResults
                        mode={mode}
                        offlineAccuracy={offlineAccuracy}
                        offlinePureWpm={offlinePureWpm}
                        offlineWpm={offlineWpm}
                        wpmIntervals={wpmIntervals}
                        theme={theme}
                    />
                </div>
            )}
            {!gameOver && (
                <div className="mt-20 flex w-full justify-center gap-10">
                    <button
                        onClick={handleResetGame}
                        className={`${styles.textColor} ${styles.hoverText}`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-6"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z" />
                            <path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z" />
                        </svg>
                    </button>
                    <button onClick={handleNextGame}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className={`w-9 -rotate-90 ${styles.textColor} ${styles.hoverText} `}
                            fill="none"
                        >
                            <path
                                d="M7 10L12 15L17 10"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}
