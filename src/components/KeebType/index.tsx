import { useEffect, useState } from "react";
import EachWord from "./eachWord";

export default function KeebType() {
    // todo randomly selecting sentences or words for users to type
    // TODO select phrases between 10, 25, 50 words
    // educational modes will just grab from an array full of them.
    // Comparing the user's input to the target text to calculate accuracy and WPM.

    // Going to need a bunch of words flexed next to each other
    // Each word is made up of letters

    const [words, setWords] = useState([]);
    const [activeWordIndex, setActiveWordIndex] = useState(0);
    const [typedWord, setTypedWord] = useState("");

    const sampleWords = [
        "and",
        "leave",
        "line",
        "this",
        "tell",
        "more",
        "course",
        "they",
        "give",
        "what",
        "over",
        "should",
        "from",
        "move",
        "down",
        "and",
        "most",
        "general",
        "about",
        "large",
        "through",
        "move",
        "thing",
        "part",
        "group",
    ];

    // Initialize the game with words
    useEffect(() => {
        setWords(sampleWords);
    }, []);

    // Handle user input
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setTypedWord(inputValue);

        // Check if the typed word matches the active word
        const activeWord = words[activeWordIndex];
        if (inputValue === activeWord) {
            // Word typed correctly, move to the next word
            setActiveWordIndex(activeWordIndex + 1);
            setTypedWord("");
        }
    };

    return (
        <div className="bg-red-900 p-10 text-green-400">
            <div
                id="words"
                className="highlight-letter blurred"
                // style={{
                //     fontSize: "1.5rem",
                //     height: "156px",
                //     overflow: "hidden",
                //     width: "100%",
                //     marginLeft: "unset",
                //     transition: "all 0.25s ease 0s",
                // }}
            >
                {words.map((word, index) => (
                    <EachWord
                        word={word}
                        key={index}
                        index={index}
                        activeWordIndex={activeWordIndex}
                    />
                ))}
                {activeWordIndex === words.length ? (
                    <div>
                        <p>Congratulations! You completed the game.</p>
                        <button>Play Again</button>
                    </div>
                ) : (
                    <input
                        type="text"
                        value={typedWord}
                        onChange={handleInputChange}
                        autoFocus
                    />
                )}
            </div>
        </div>
    );
}
