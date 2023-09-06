export default function TypingStats({
    totalTime,
    typedCorrectText,
    typedText,
    mistakes,
    hits,
    totalCharacters,
}) {

    // TODO implement rank system here if user is signed in...
    // wpm - total amount of characters in the correctly typed words (including spaces), divided by 5 and normalised to 60 seconds.

    // raw wpm - calculated just like wpm, but also includes incorrect words.

    // acc - percentage of correctly pressed keys.

    // char - correct characters / incorrect characters. Calculated after the test has ended.

    // consistency - based on the variance of your raw wpm. Closer to 100% is better. Calculated using the coefficient of variation of raw wpm and mapped onto a scale from 0 to 100.

    // const words = typedCorrectText.split(" ");
    const wpm = Math.round(hits / 5 / (totalTime / 60));

    const rawWpm = Math.round(totalCharacters / 5 / (totalTime / 60));

    const accuracy = ((hits / totalCharacters) * 100).toFixed(2);

    return (
        <div className="flex flex-col">
            <p>
                Words Per Minute (WPM): <b>{wpm}</b>
            </p>
            <p>
                Raw Words Per Minute (Raw WPM): <b>{rawWpm}</b>
            </p>

            <p>
                Accuracy: <b>{accuracy}%</b>
            </p>

            <p>
                Time: <b>{totalTime.toFixed(1)}</b> s
            </p>
        </div>
    );
}
