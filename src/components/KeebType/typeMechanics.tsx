import { useEffect, useState } from "react";
import TypingText from "./typingText";
import EachWord from "./eachWord";

interface TypeMechanicsProps {
    currentParagraph: string;
    inputRef: React.RefObject<HTMLInputElement>;
    totalCharacters: number;
    letterIndex: number;
    setLetterIndex: React.Dispatch<React.SetStateAction<number>>;
    isTyping: boolean;
    setIsTyping: (isTyping: boolean) => void;
    setIsTestFinished: (isTestFinished: boolean) => void;
    setHits: React.Dispatch<React.SetStateAction<number>>;
    setTotalTime: (time: number) => void;
    setMistakes: React.Dispatch<React.SetStateAction<number>>;
    totalTyped: string;
    setTotalTyped: (totalTyped: string) => void;
}

export default function TypeMechanics({
    currentParagraph,
    letterIndex,
    totalCharacters,
    inputRef,
    isTyping,
    setIsTyping,
    setHits,
    setLetterIndex,
    setTotalTime,
    setIsTestFinished,
    setMistakes,
    totalTyped,
    setTotalTyped,
}: TypeMechanicsProps) {
    const [timer, setTimer] = useState<number | null>(null);
    const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
    const [hasTypedCharacter, setHasTypedCharacter] = useState<boolean>(false);
    const [flawless, setFlawless] = useState<boolean>(false);
    const [currentTypedLetter, setCurrentTypedLetter] = useState<string>("");
    const [inputLength, setInputLength] = useState<number>(0);
    const [typedText, setTypedText] = useState<string>("");

    const allWords = currentParagraph.split(" ");

    useEffect(() => {
        setInputLength(typedText.length);
    }, [typedText]);

    // const checkTestCompletion = () => {
    //     const endTime = Date.now();
    //     const elapsedTime = (endTime - timer) / 1000;
    //     setTotalTime(elapsedTime);
    //     setIsTestFinished(true);
    // };

    const handleType = (e) => {
        if (e.target.value.at(-1) === " ") return;

        setTypedText(e.target.value);

        if (!isTyping) {
            const startTime = Date.now();
            setIsTyping(true);
            setTimer(startTime);
        }
        // Check if a character was typed for the current word
    };

    // TODO need a way to keep track of if a word is correct we save the input and reset the typed Text
    // TODO instead of passing the entire typed text just send last letter.

    console.log(flawless);
    const handleKeyDown = (e: KeyboardEvent) => {
        // console.log(e.key, "yoyoyo");
        // e.key tells me

        if (e.key !== " ") {
            setHasTypedCharacter(true);
            setCurrentTypedLetter(e.key);
        }

        if (e.key === " " && hasTypedCharacter) {
            // Move to the next word index, but ensure it's within bounds
            if (flawless) {
                setTotalTyped((prevTotalTyped) =>
                    prevTotalTyped.concat(" ", typedText)
                );
                setTypedText("");
                setFlawless(false);
            }
            setActiveWordIndex((prevIndex) =>
                Math.min(prevIndex + 1, allWords.length - 1)
            );
            setCurrentTypedLetter("");
        }

        // Reset the flag after processing space key press
        if (e.key === " ") {
            setHasTypedCharacter(false);
        }
    };

    // console.log('hello', totalTyped);

    console.log("typed", currentTypedLetter);

    // TODO awesome so everytime a user presses a key other than " " they can use space to increase the active word index
    // TODO what needs to happen next is if the word is spelled correctly it needs to be locked
    // TODO if the word is spelled incorrectly we want the user to be able to go back to the incorrect class to fix the mistake.

    // everytime a user hits space it should add to hits
    // evertime a user hits backspace it should subtract hits
    // set the activeWordIndex(true) when the user types a character for the current word index

    return (
        <div
            className="content-box relative z-10"
            style={{ pointerEvents: "none", userSelect: "none" }}
        >
            <div className={`flex gap-2`}>
                {allWords.map((word, wordIndex) => (
                    <EachWord
                        key={wordIndex}
                        word={word}
                        activeWordIndex={activeWordIndex}
                        typedText={typedText}
                        inputLength={inputLength}
                        wordIndex={wordIndex}
                        wordCount={allWords.length}
                        setFlawless={setFlawless}
                        currentTypedLetter={currentTypedLetter}
                    />
                ))}
            </div>

            <div
                className="content"
                style={{ pointerEvents: "none", userSelect: "none" }}
            >
                <input
                    ref={inputRef}
                    className="input-field "
                    type="text"
                    value={typedText}
                    onChange={handleType}
                    onKeyDown={handleKeyDown} // Use onKeyPress instead of onChange
                    onCopy={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                />
            </div>
        </div>
    );
}

/*


 const [correctlySpelledWords, setCorrectlySpelledWords] = useState<
        string[]
    >([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const typedChar = e.target.value[letterIndex];

        if (!isTyping) {
            const startTime = Date.now();
            setIsTyping(true);
            setTimer(startTime);
        }

        if (letterIndex < totalCharacters) {
            if (!typedChar) {
                if (letterIndex > 0) {
                    // Check if the user is trying to delete a locked word
                    const typedWords = typedText.trim().split(" ");
                    const lastTypedWord = typedWords[typedWords.length - 1];
                    if (correctlySpelledWords.includes(lastTypedWord)) {
                        return; // Prevent deleting locked word
                    }

                    setLetterIndex((prevCharIndex) => prevCharIndex - 1);

                    if (currentParagraph[letterIndex - 1] !== " ") {
                        setMistakes((prevMistakes) => prevMistakes - 1);
                    }
                }
            } else {
                if (currentParagraph[letterIndex] !== typedChar) {
                    setMistakes((prevMistakes) => prevMistakes + 1);
                } else {
                    setHits((prevHits) => prevHits + 1);
                }

                setLetterIndex((prevCharIndex) => prevCharIndex + 1);
            }

            // Check for space to identify the end of a word
            if (typedChar === " ") {
                const typedWords = e.target.value.trim().split(" ");
                const lastTypedWord = typedWords[typedWords.length - 1];

                // Check if the last typed word matches the word in the paragraph
                if (
                    lastTypedWord ===
                    currentParagraph.split(" ")[typedWords.length - 1]
                ) {
                    // If it's correct, add it to the list of correctly spelled words
                    setCorrectlySpelledWords((prevCorrectWords) => [
                        ...prevCorrectWords,
                        lastTypedWord,
                    ]);
                }
            }
        }

        if (letterIndex === currentParagraph.length - 1 && timer) {
            const endTime = Date.now();
            const elapsedTime = (endTime - timer) / 1000;
            setTotalTime(elapsedTime);
            setIsTestFinished(true);
        }

        setTypedText(e.target.value);
    };



  // on key down " "
    // const handleCharacterTyping = (typedChar: string | undefined) => {
    //     if (letterIndex < totalCharacters) {
    //         // Check if the typedChar is empty (user pressed backspace)
    //         if (!typedChar) {
    //             if (letterIndex > 0) {
    //                 // Decrement letterIndex
    //                 setLetterIndex((prevCharIndex) => prevCharIndex - 1);

    //                 // Check if the previous character was not a space, decrement mistakes
    //                 if (currentParagraph[letterIndex - 1] !== " ") {
    //                     setMistakes((prevMistakes) => prevMistakes - 1);
    //                 }
    //             }
    //         } else {
    //             // Check if the typed character matches the current paragraph character
    //             if (currentParagraph[letterIndex] !== typedChar) {
    //                 // Check if the typed character matches the current paragraph character
    //                 setMistakes((prevMistakes) => prevMistakes + 1);
    //             } else {
    //                 // Increment hits for correct typing
    //                 setHits((prevHits) => prevHits + 1);
    //             }
    //             // Increment letterIndex
    //             setLetterIndex((prevCharIndex) => prevCharIndex + 1);
    //         }
    //     }
    // };

    // const checkTestCompletion = () => {
    //     if (letterIndex === totalCharacters - 1 && timer) {
    //         const endTime = Date.now();
    //         const elapsedTime = (endTime - timer) / 1000;
    //         setTotalTime(elapsedTime);
    //         setIsTestFinished(true);
    //     }
    // };

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const typedChar = e.target.value[letterIndex];
    //     // When the user starts typing --- start the timer, set boolean
    //     if (!isTyping) {
    //         const startTime = Date.now();
    //         setIsTyping(true);
    //         setTimer(startTime);
    //     }
    //     // Check if the letterIndex is within the paragraph length.
    //     handleCharacterTyping(typedChar);

    //     checkTestCompletion();
    //     // Update the typedText state with the current input value
    //     setTypedText(e.target.value);
    // };



*/
