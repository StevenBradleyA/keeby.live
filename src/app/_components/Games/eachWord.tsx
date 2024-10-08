import EachLetter from "./eachLetter";

type EachWordProps = {
    word: string;
    index: number;
    activeWordIndex: number;
};

export default function EachWord({
    word,
    index,
    activeWordIndex,
}: EachWordProps) {
    return (
        <div
            className={`flex word ${index === activeWordIndex ? "active" : ""}`}
            key={index}
        >
            {word.split("").map((letter, i) => (
                <EachLetter
                    key={i}
                    letter={letter}
                    isActive={index === activeWordIndex}
                />
            ))}
        </div>
    );
}
