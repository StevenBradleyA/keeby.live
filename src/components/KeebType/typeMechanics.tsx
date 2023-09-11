import { useEffect, useState } from "react";
import TypingText from "./typingText";
import EachWord from "./eachWord";

interface TypeMechanicsProps {
    currentParagraph: string;
    inputRef: React.RefObject<HTMLInputElement>;
    totalCharacters: number;
    typedText: string;
    setTypedText: React.Dispatch<React.SetStateAction<string>>;
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
    const [activeWordIndex, setActiveWordIndex] = useState<number>(0);

    const allWords = currentParagraph.split(" ");

    const checkTestCompletion = () => {
        const endTime = Date.now();
        const elapsedTime = (endTime - timer) / 1000;
        setTotalTime(elapsedTime);
        setIsTestFinished(true);
    };

    const handleType = (e) => {
        setTypedText(e.target.value);

        if (!isTyping) {
            const startTime = Date.now();
            setIsTyping(true);
            setTimer(startTime);
        }

        // Split the current word to count the number of characters
        const currentWord = allWords[activeWordIndex];

        const charactersInCurrentWord = currentWord.length;

        if (
            e.nativeEvent instanceof KeyboardEvent &&
            e.nativeEvent.key === " " &&
            typedText.length > 0
        ) {
            // Move to the next word index, but ensure it's within bounds
            setActiveWordIndex((prevIndex) =>
                Math.min(prevIndex + 1, allWords.length - 1)
            );

            // Update letterIndex and hits if needed
            // setLetterIndex(0);
            // setHits((prevHits) => prevHits + charactersInCurrentWord);
        }

        // need keydown " " to increase to the next index after at least one character in the word is typed.
    };

    return (
        <div
            className="content-box relative z-10"
            style={{ pointerEvents: "none", userSelect: "none" }}
        >
            <div className="flex gap-2 text-slate-500">
                {allWords.map((word, wordIndex) => (
                    <EachWord
                        key={wordIndex}
                        word={word}
                        activeWordIndex={activeWordIndex}
                        typedText={typedText}
                        wordIndex={wordIndex}
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
