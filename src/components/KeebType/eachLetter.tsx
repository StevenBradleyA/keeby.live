interface EachLetterProps {
    letter: string;
    letterIndex: number;
    typedText: string;
    activeWordLength: number;
    activeWordIndex: number
}
export default function EachLetter({
    letter,
    letterIndex,
    typedText,
    activeWordLength,
    activeWordIndex
}: EachLetterProps) {
    // need to check if the letter is correct... newest input === letter "text should turn white"
    // need to check if the letter is incorrect ... newest input !== letter "text should turn red"
    // need to check if the letter is incorrect extra ... if the user types more than the index of the word. We want to save those extra characters and display them here "text shoudl be red too"

    // Check if the letter is correct (newest input === letter)
    const isCorrect = typedText[letterIndex] === letter;

    // console.log(typedText.length);
    // Check if the letter is incorrect extra (user types more than the index of the word)
    const isExtraIncorrect = !isCorrect && letterIndex >= activeWordLength;

    let letterStyling = "keeb-type-text";
    if (isCorrect) {
        letterStyling = "correct";
    } else if (!isCorrect) {
        letterStyling = "incorrect";
    } else if (isExtraIncorrect) {
        letterStyling = "extra-incorrect";
    }

    // could only show it when letterIndex === typedText.length and the word is active
    // const showCursor = letterIndex === typedText.length;
// problem is that letter index resets with each word 

    // console.log(activeWordIndex)
    return (
        <div className={`relative flex`}>
            <div className={letterStyling}>{letter}</div>
            {/* {showCursor && <div className="cursor blink">|</div>} */}
        </div>
    );
}
