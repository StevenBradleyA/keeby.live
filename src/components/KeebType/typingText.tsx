export default function TypingText({ currentParagraph, charIndex, typedText }) {
    return (
        <div className="typing-text break-words">
        <p>
            {currentParagraph.split("").map((char, index) => {
                const isCurrentChar = index === charIndex;
                const isTyped = index < typedText.length;
                const typedChar = typedText[index];

                const isCorrectChar =
                    isTyped && typedChar === char;
                const isIncorrectChar =
                    isTyped && typedChar !== char;

                return (
                    <span
                        key={index}
                        className={`${
                            isCurrentChar ? "active" : ""
                        } ${isCorrectChar ? "correct" : ""} ${
                            isIncorrectChar ? "incorrect" : ""
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
