import { useEffect, useRef, useState } from "react";
import EachLetter from "./eachLetter";

type EachWordProps = {
    word: string;
    index: number;
    activeWordIndex: number;
    inputRef: React.RefObject<HTMLInputElement>;
};
export default function EachWord({
    word,
    activeWordIndex,
    inputRef,
    isLastWord,
    onNextWord,
    index
}: EachWordProps) {
    const [inputValue, setInputValue] = useState("");
    // const isWordActive = activeWordIndex === word.split(" ").length - 1;
    const isWordActive = activeWordIndex === index; // Check this condition

    const isWordComplete = inputValue === word;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setInputValue(value);

        // Check if the typed word matches the target word
        if (value === word) {
            onNextWord(); // Move to the next word
            setInputValue(""); // Clear the input field
        }
    };

    // Use useEffect to focus on the input when it becomes active
  
    useEffect(() => {
        console.log("isWordActive:", isWordActive); // Check the value
        if (isWordActive) {
            inputRef.current?.focus();
        }
    }, [isWordActive, inputRef]);

    return (
        <div className="flex w-full text-blue-400">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                disabled={!isWordActive} // Disable input for inactive words
                autoFocus={isWordActive} // Auto-focus on the active word
                ref={inputRef} // Assign the input ref
            />
            {word.split(" ").map((letter, i) => (
                <EachLetter key={i} letter={letter} isActive={i === 0} i={i} />
            ))}
            {!isLastWord && <span>&nbsp;</span>}
        </div>
    );
}
