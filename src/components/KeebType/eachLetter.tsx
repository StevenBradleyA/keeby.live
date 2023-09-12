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
    inputLength: number;
}
export default function EachLetter({
    letter,
    letterIndex,
    typedText,
    activeWordLength,
    activeWordIndex,
    wordIndex,
    wordCount,
    word,
    currentTypedLetter,
    inputLength,
}: EachLetterProps) {
    // ! need to add incorrect letters after word length
    // ! the extra letters
    // ! need to fix styling so that it stays
    // ! backspace should remove styling and
    const [isActiveWord, setIsActiveWord] = useState<boolean>(false);
    const [isActiveLetter, setIsActiveLetter] = useState<boolean>(false);
    const [hasBeenHit, setHasBeenHit] = useState<boolean>(false);
    // use letter index and inputLength to
// skip isnt working becuase we need to apply logic that allows us to go back and fix incorrect words
    useEffect(() => {
        setIsActiveWord(wordIndex === activeWordIndex);
    }, [activeWordIndex, wordIndex]);

    useEffect(() => {
        setIsActiveLetter(letterIndex === inputLength);
    }, [inputLength, letterIndex]);


    useEffect(() => {
        if (isActiveWord && isActiveLetter && letter === currentTypedLetter) {
            setHasBeenHit(true);
        }
    }, [isActiveWord, letter, currentTypedLetter]);

    const letterColor = hasBeenHit ? "text-green-500" : "text-slate-500";

    return (
        <div className={`relative flex text-slate-500  `}>
            <div className={letterColor}>{letter}</div>

            {/* {showCursor && <div className="cursor blink">|</div>} */}
        </div>
    );
}

//  only want styles to apply if word is active and an input has been received.

// new ideas
// if the word is correct we copy the input in a new variable and save it that way we can record the total hits
// then we permanently set the word to isCorrect and style it green in the parent.

/* 
 <div className={letterStyling}>{letter}</div>

   // -------- old ----------------------

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






*/
