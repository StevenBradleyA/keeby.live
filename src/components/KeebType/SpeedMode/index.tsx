import { useEffect, useRef, useState } from "react";
import SentenceGenerator from "./sentenceGenerator";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
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
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // todo need a variable that keeps track of total words typed going to need to reference this to spread the prev index into the userInput for backspace

    // timer
    const [timerId, setTimerId] = useState<number | null>(null);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    // if not signed in display wpm but nothing else
    // const {mutation: createGame} =

    // after game is working flawless then implement styling / pausing / end game stats etc.....

    // todo saving stats when finished

    // console.log(wordStatus);

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

    // const handleSubmitGame = ()=>{

    //     if(gameOver && session?.user.id)
    //     const data: {

    //     }

    // }
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // logic for moving forward
        if ((e.key >= 'a' && e.key <= 'z') || (e.key >= '0' && e.key <= '9')) {
            // setStartGame(true);
            setIsRunning(true)


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

    // todo fix game ending where typing the max amount of words on the final word ends the game whether correct or not

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
                                                <div className="absolute bottom-0 left-0 top-0 w-0.5 bg-blue-500 blinking-cursor"></div>
                                            )}
                                            {isCursor && isRunning && (
                                                <div className="absolute bottom-0 left-0 top-0 w-0.5 bg-blue-500"></div>
                                            )}
                                            {isCursorLastLetter && (
                                                <div className="absolute bottom-0 right-0 top-0 w-0.5 bg-blue-500"></div>
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
                                                                        1 && (
                                                                    <div className="absolute bottom-0 right-0 top-0 w-0.5 bg-blue-500"></div>
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
                            value={userInput}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                            className=" absolute bottom-0 left-0 right-0 top-0 opacity-0 "
                            maxLength={30}
                        />
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
