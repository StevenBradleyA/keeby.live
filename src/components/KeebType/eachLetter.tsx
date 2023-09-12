import { useEffect, useState } from "react";

interface EachLetterProps {
    letter: string;
    letterIndex: number;
    typedText: string;
    activeWordLength: number;
    activeWordIndex: number;
    wordIndex: number;
    isCorrectWord: boolean;
    setIsAccepted: (isAccepted: boolean) => void;
    wordCount: number;
    word: string;
    currentTypedLetter: string;
}
export default function EachLetter({
    letter,
    letterIndex,
    typedText,
    activeWordLength,
    activeWordIndex,
    wordIndex,
    wordCount,
    setIsAccepted,
    word,
    currentTypedLetter,
}: EachLetterProps) {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [hasTyped, setHasTyped] = useState<boolean>(false);

    const [isCorrectWord, setIsCorrectWord] = useState<boolean>(false);
    const [isWordCorrect, setIsWordCorrect] = useState<boolean>(false);




    useEffect(() => {
        setIsActive(wordIndex === activeWordIndex);
        setHasTyped(wordIndex <= activeWordIndex)
    }, [activeWordIndex, wordIndex]);

    // TODO once correct it stays correct doesn't reset to the " "
// has typed could be a range variable. If the wordIndex is <= activeWordIndex it is true


    const isTyped = isActive && typedText[letterIndex] !== undefined; // Check if the letter has been typed
    const isExpectedLetter = isActive && typedText[letterIndex] === letter; // Check if the typed letter matches the expected letter

    // Check if the letter is incorrect extra (user types more than the index of the word)
    const isExtraIncorrect =
        isActive && // Only consider the active word for extra incorrect check
        !isExpectedLetter &&
        isTyped &&
        letterIndex >= activeWordLength;

    // If the word is correct, set isCorrectWord to true
    const letterStyling =
        isActive && isCorrectWord
            ? "correct"
            : isTyped
            ? isExpectedLetter
                ? "correct"
                : isExtraIncorrect
                ? "extra-incorrect"
                : "incorrect"
            : "";

    return (
        <div className={`relative flex`}>
            <div className={letterStyling}>{letter}</div>
            {/* {showCursor && <div className="cursor blink">|</div>} */}
        </div>
    );
}

//  only want styles to apply if word is active and an input has been received.

// new ideas
// if the word is correct we copy the input in a new variable and save it that way we can record the total hits
// then we permanently set the word to isCorrect and style it green in the parent.
