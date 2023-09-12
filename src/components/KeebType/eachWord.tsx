import { useState } from "react";
import EachLetter from "./eachLetter";

type EachWordProps = {
    word: string;
    activeWordIndex: number;
    wordIndex: number;
    typedText: string;
};

export default function EachWord({
    word,
    activeWordIndex,
    wordIndex,
    typedText,
}: EachWordProps) {
    const activeWordLength = word.length;
    const [isCorrectWord, setIsCorrectWord] = useState<boolean>(false)

// ! need to add the class word, active, incorrect 

    return (
        <div className="flex">
            {word.split("").map((letter, letterIndex) => (
                <EachLetter
                    key={letterIndex}
                    letter={letter}
                    letterIndex={letterIndex}
                    typedText={typedText}
                    activeWordLength={activeWordLength}
                    activeWordIndex={activeWordIndex}
                    wordIndex={wordIndex}
                />
            ))}
        </div>
    );
}
