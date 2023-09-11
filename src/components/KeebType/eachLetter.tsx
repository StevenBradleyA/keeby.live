interface EachLetterProps {
    letter: string;
    letterIndex: number;
    typedText: string;
}
export default function EachLetter({
    letter,
    letterIndex,
    typedText,
    activeWordLength,
}: EachLetterProps) {
    // need to check if the letter is correct... newest input === letter "text should turn white"
    // need to check if the letter is incorrect ... newest input !== letter "text should turn red"
    // need to check if the letter is incorrect extra ... if the user types more than the index of the word. We want to save those extra characters and display them here "text shoudl be red too"

    // Check if the letter is correct (newest input === letter)
    const isCorrect = typedText[letterIndex] === letter;

    // Check if the letter is incorrect (newest input !== letter)
    const isIncorrect = !isCorrect && letterIndex < typedText.length;

    // Check if the letter is incorrect extra (user types more than the index of the word)
    const isExtraIncorrect = !isCorrect && letterIndex >= typedText.length;

    return <div className="">{letter}</div>;
}
