import { useEffect, useState } from "react";

export default function KeebType() {
    // todo randomly selecting sentences or words for users to type
    // TODO select phrases between 10, 25, 50 words
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
    const [typeText, setTypeText] = useState("");

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
        setTypeText(""); // Clear the input field when a new sentence is generated
    }, []);

    return (
        <form className="flex w-3/4 items-center justify-center  p-20">
            <div className="relative w-full">
                <label className="pointer-events-none absolute left-0 top-0 z-10 text-gray-400 transition-all duration-200">
                    {sentence}
                </label>
                <input
                    type="text"
                    value={typeText}
                    className="z-10 w-full border-b border-green-400 bg-transparent text-white z-20"
                    placeholder="" // Empty placeholder to hide the default placeholder text
                    onChange={(e) => setTypeText(e.target.value)}
                />
            </div>
        </form>
    );
}
