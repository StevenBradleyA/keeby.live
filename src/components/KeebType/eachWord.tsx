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

    return (
        <div className="flex">
            {word.split("").map((letter, letterIndex) => (
                <EachLetter
                    key={letterIndex}
                    letter={letter}
                    letterIndex={letterIndex}
                    typedText={typedText}
                    activeWordLength={activeWordLength}
                />
            ))}
        </div>
    );
}
