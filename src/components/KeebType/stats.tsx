export default function TypingStats() {
    // const words = typedCorrectText.split(' ');
    // const wpm = Math.round((words.length / totalTime) * 60);

    // Display WPM in your component
    // <p>
    //   Words Per Minute (WPM): <b>{wpm}</b>
    // </p>

    //     const allWords = typedText.split(' ');
    // const rawWpm = Math.round((allWords.length / totalTime) * 60);
    {
        /* <p>
  Raw Words Per Minute (Raw WPM): <b>{rawWpm}</b>
</p> */
    }

    // const totalCharacters = typedText.length; // Total characters typed
    // const correctCharacters = typedCorrectText.length; // Correctly typed characters

    // const accuracy = ((correctCharacters / totalCharacters) * 100).toFixed(2);

    // // Display Accuracy in your component
    // <p>
    //   Accuracy: <b>{accuracy}%</b>
    // </p>

    return (
        <ul className="">
            <li>
                <p>
                    Time: <b>{totalTime.toFixed(1)}</b> s
                </p>
            </li>
            <li>
                <p>
                    Mistakes: <b>{mistakes}</b>
                </p>
            </li>
            <li>
                <p>
                    Words Per Minute (WPM): <b>{wpm}</b>
                </p>
            </li>
            <li>
                <p>
                    Characters Per Minute (CPM): <b>{charIndex - mistakes}</b>
                </p>
            </li>
        </ul>
    );
}
