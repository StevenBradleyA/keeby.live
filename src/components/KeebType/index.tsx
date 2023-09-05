import { useEffect, useState } from "react";

export default function KeebType() {
    // todo randomly selecting sentences or words for users to type

    // educational modes will just grab from an array full of them.
    // Comparing the user's input to the target text to calculate accuracy and WPM.

    const wordsArray = [
        "apple",
        "banana",
        "cherry",
        "date",
        "elderberry",
        "fig",
        "grape",
        "honeydew",
        "kiwi",
        "lemon",
        // Add more words to your array
    ];
    const [sentence, setSentence] = useState("");
    const [input, setInput] = useState("");

    // Function to generate a random sentence
    const generateRandomSentence = () => {
        const sentenceLength = Math.floor(Math.random() * 5) + 3; // Random sentence length between 3 and 7 words
        const randomWords = [];

        for (let i = 0; i < sentenceLength; i++) {
            const randomIndex = Math.floor(Math.random() * wordsArray.length);
            randomWords.push(wordsArray[randomIndex]);
        }

        return randomWords.join(" ");
    };

    useEffect(() => {
        const randomSentence = generateRandomSentence();
        setSentence(randomSentence);
        setInput(""); // Clear the input field when a new sentence is generated
    }, []);

    return (
        <form className="text-red-400">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <p>{sentence}</p>
        </form>
    );
}
