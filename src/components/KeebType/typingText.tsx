interface TypingTextProps {

    currentParagraph: string;
    letterIndex: number; 
    typedText: string;
}



export default function TypingText({
    currentParagraph,
    letterIndex,
    typedText,
}: TypingTextProps) {

// Space submits a word pushes to the next word index
// if a word has errors in it 
// word error class
// word class or word active class 

    const words: string[] = currentParagraph.split(" ");



    console.log(words);
    console.log(currentParagraph)

    

    return (
        <div
            id="words"
            className="flex "
        >
            {words.map((word, wordIndex) => {
                const isCurrentWord = wordIndex === letterIndex;
                const wordClassName = isCurrentWord ? "word active" : "word";

                return (
                    <div key={wordIndex} className={wordClassName}>
                        {word.split("").map((char, charIndex) => {
                            const isTyped = charIndex < typedText.length;
                            const typedChar = typedText[charIndex];

                            const isCorrectChar = isTyped && typedChar === char;
                            const isIncorrectChar =
                                isTyped && typedChar !== char;
                            const letterClassName = isCorrectChar
                                ? "correct"
                                : isIncorrectChar
                                ? "incorrect"
                                : "incorrect extra";

                            return (
                                <div
                                    key={charIndex}
                                    className={`letter ${letterClassName}`}
                                >
                                    {isTyped ? typedChar : char}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

/*


<p>
                {currentParagraph.split("").map((char, index) => {
                    const isCurrentChar = index === letterIndex;
                    const isTyped = index < typedText.length;
                    const typedChar = typedText[index];

                    const isCorrectChar = isTyped && typedChar === char;
                    const isIncorrectChar = isTyped && typedChar !== char;

                    return (
                        <span
                            key={index}
                            className={`${isCurrentChar ? "active" : ""} ${
                                isCorrectChar ? "correct" : ""
                            } ${isIncorrectChar ? "incorrect" : ""}`}
                        >
                            {isTyped ? typedChar : char}
                        </span>
                    );
                })}
            </p>





*/
