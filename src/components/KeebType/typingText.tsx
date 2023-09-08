export default function TypingText({
    currentParagraph,
    letterIndex,
    typedText,
    correctlySpelledWords,
}) {
    return (
        <div className="typing-text break-words">
            <p>
                {currentParagraph.split("").map((char, index) => {
                    const isCurrentChar = index === letterIndex;
                    const isTyped = index < typedText.length;
                    const typedChar = typedText[index];

                    const isCorrectChar = isTyped && typedChar === char;
                    const isIncorrectChar = isTyped && typedChar !== char;
                    const isLocked = correctlySpelledWords.includes(
                        typedText.split(" ")[index]
                    );

                    return (
                        <span
                            key={index}
                            className={`${isCurrentChar ? "active" : ""} ${
                                isCorrectChar ? "correct" : ""
                            } ${isIncorrectChar ? "incorrect" : ""} ${
                                isLocked ? "locked" : ""
                            }`}
                        >
                            {isTyped ? typedChar : char}
                        </span>
                    );
                })}
            </p>
        </div>
    );
}
