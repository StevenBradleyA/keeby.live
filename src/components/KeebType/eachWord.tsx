import { useState } from "react";
import EachLetter from "./eachLetter";

type EachWordProps = {
    word: string;
    activeWordIndex: number;
    wordIndex: number;
    typedText: string;
    wordCount: number;
};

export default function EachWord({
    word,
    activeWordIndex,
    wordIndex,
    typedText,
    wordCount,
}: EachWordProps) {
    const activeWordLength = word.length;

    // ! need to add the class word, active, incorrect
    const [isAccepted, setIsAccepted] = useState<boolean>(false);

    return (
        <div
            className={`flex ${isAccepted ? "word-correct" : ""}`}
        >
            {word.split("").map((letter, letterIndex) => (
                <EachLetter
                    key={letterIndex}
                    letter={letter}
                    letterIndex={letterIndex}
                    typedText={typedText}
                    activeWordLength={activeWordLength}
                    activeWordIndex={activeWordIndex}
                    wordIndex={wordIndex}
                    wordCount={wordCount}
                    word={word}
                    setIsAccepted={setIsAccepted}
                />
            ))}
        </div>
    );
}
