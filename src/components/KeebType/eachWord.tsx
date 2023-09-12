import { useState } from "react";
import EachLetter from "./eachLetter";

type EachWordProps = {
    word: string;
    activeWordIndex: number;
    wordIndex: number;
    typedText: string;
    wordCount: number;
    setFlawless: (flawless: boolean) => void;
    currentTypedLetter: string;
    inputLength: number
};

export default function EachWord({
    word,
    activeWordIndex,
    wordIndex,
    typedText,
    wordCount,
    setFlawless,
    currentTypedLetter,
    inputLength
}: EachWordProps) {
    const activeWordLength = word.length;

    const [isAccepted, setIsAccepted] = useState<boolean>(false);

    if(word === typedText){
        setFlawless(true)
    }


    return (
        <div className={`flex ${isAccepted ? "word-correct" : ""}`}>
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
                    currentTypedLetter={currentTypedLetter}
                    inputLength={inputLength}
                />
            ))}
        </div>
    );
}
