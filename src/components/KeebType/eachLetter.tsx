import { useEffect, useState } from "react";

interface EachLetterProps {
    letter: string;
    letterIndex: number;
    typedText: string;
    activeWordLength: number;
    activeWordIndex: number;
    wordIndex: number;
}
export default function EachLetter({
    letter,
    letterIndex,
    typedText,
    activeWordLength,
    activeWordIndex,
    wordIndex,
}: EachLetterProps) {
    
    const [isActive, setIsActive] = useState<boolean>(false);
    // need to check if the letter is correct... newest input === letter "text should turn white"
    // need to check if the letter is incorrect ... newest input !== letter "text should turn red"
    // need to check if the letter is incorrect extra ... if the user types more than the index of the word. We want to save those extra characters and display them here "text shoudl be red too"

    // Check if the letter is correct (newest input === letter)

    // We need to create a typedIndex

    // right now each word has its own letter index so its hard to compare

    // console.log("wordIndex", wordIndex);
    // console.log("activeWordIndex", activeWordIndex);

    useEffect(() => {
        setIsActive(wordIndex === activeWordIndex);
    }, [activeWordIndex, wordIndex]);

    // const isCorrect = isActive && typedText[letterIndex] === letter;

    // console.log(typedText.length);
    // Check if the letter is incorrect extra (user types more than the index of the word)
    // const isExtraIncorrect = !isCorrect && letterIndex >= activeWordLength;
    const isTyped = isActive && typedText[letterIndex] !== undefined; // Check if the letter has been typed
    const isExpectedLetter = isActive && typedText[letterIndex] === letter; // Check if the typed letter matches the expected letter
  
    // Check if the letter is incorrect extra (user types more than the index of the word)
    const isExtraIncorrect =
    isActive && // Only consider the active word for extra incorrect check
    !isExpectedLetter &&
    isTyped &&
    letterIndex >= activeWordLength;
  

    const letterStyling = isTyped
    ? isExpectedLetter
      ? "correct"
      : isExtraIncorrect
      ? "extra-incorrect"
      : "incorrect"
    : ""; // Default styling when not typed
    // ! I don't want a letter to be red until the user spells that letter incorrect.

    return (
        <div className={`relative flex`}>
            <div className={letterStyling}>{letter}</div>
            {/* {showCursor && <div className="cursor blink">|</div>} */}
        </div>
    );
}

//  only want styles to apply if word is active and an input has been received.
