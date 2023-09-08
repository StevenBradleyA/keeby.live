import { useState } from "react";
import TypingText from "./typingText";

interface TypeMechanicsProps {
    currentParagraph: string;
    inputRef: React.RefObject<HTMLInputElement>;
    totalCharacters: number;
    typedText: string;
    setTypedText: (typedText: string) => void;
    letterIndex: number;
    setLetterIndex: React.Dispatch<React.SetStateAction<number>>;
    isTyping: boolean;
    setIsTyping: (isTyping: boolean) => void;
    setIsTestFinished: (isTestFinished: boolean) => void;
    setHits: React.Dispatch<React.SetStateAction<number>>;
    setTotalTime: (time: number) => void;
    setMistakes: React.Dispatch<React.SetStateAction<number>>;
}

export default function TypeMechanics({
    currentParagraph,
    letterIndex,
    typedText,
    setTypedText,
    totalCharacters,
    inputRef,
    isTyping,
    setIsTyping,
    setHits,
    setLetterIndex,
    setTotalTime,
    setIsTestFinished,
    setMistakes,
}: TypeMechanicsProps) {
    const [timer, setTimer] = useState<number | null>(null);

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const typedChar = e.target.value[letterIndex];

    //     if (!isTyping) {
    //         const startTime = Date.now();
    //         setIsTyping(true);
    //         setTimer(startTime);
    //     }

    //     if (letterIndex < totalCharacters) {
    //         if (!typedChar) {
    //             if (letterIndex > 0) {
    //                 setLetterIndex((prevCharIndex) => prevCharIndex - 1);

    //                 if (currentParagraph[letterIndex - 1] !== " ") {
    //                     setMistakes((prevMistakes) => prevMistakes - 1);
    //                 }
    //             }
    //         } else {
    //             if (currentParagraph[letterIndex] !== typedChar) {
    //                 setMistakes((prevMistakes) => prevMistakes + 1);
    //             } else {
    //                 setHits((prevHits) => prevHits + 1);
    //             }

    //             setLetterIndex((prevCharIndex) => prevCharIndex + 1);
    //         }
    //     }

    //     if (letterIndex === currentParagraph.length - 1 && timer) {
    //         const endTime = Date.now();
    //         const elapsedTime = (endTime - timer) / 1000;
    //         setTotalTime(elapsedTime);
    //         setIsTestFinished(true);
    //     }

    //     setTypedText(e.target.value);
    // };

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

    return (
        <div
            className="content-box relative z-10"
            style={{ pointerEvents: "none", userSelect: "none" }}
        >
            <TypingText
                currentParagraph={currentParagraph}
                letterIndex={letterIndex}
                typedText={typedText}
                correctlySpelledWords={correctlySpelledWords}
            />
            <div
                className="content"
                style={{ pointerEvents: "none", userSelect: "none" }}
            >
                <input
                    ref={inputRef}
                    className="input-field "
                    type="text"
                    value={typedText}
                    onChange={handleInputChange}
                    onCopy={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                />
            </div>
        </div>
    );
}
