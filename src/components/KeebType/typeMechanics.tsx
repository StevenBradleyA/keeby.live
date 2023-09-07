import { useState } from "react";
import TypingText from "./typingText";

interface TypeMechanicsProps {
    currentParagraph: string;
    inputRef: React.RefObject<HTMLInputElement>;
    totalCharacters: number;
    typedText: string;
    setTypedText: (typedText: string) => void;
    letterIndex: number;
    setLetterIndex: (letterIndex: number) => void;
    isTyping: boolean;
    setIsTyping: (isTyping: boolean) => void;
    setIsTestFinished: (isTestFinished: boolean) => void;
    setHits: (hits: number) => void;
    setTotalTime: (time: number) => void;
    setMistakes: (mistakes: number) => void;
    isFocused: boolean;
}

export default function TypeMechanics({
    isFocused,
    currentParagraph,
    letterIndex,
    typedText,
    setTypedText,
    totalCharacters,
    inputRef,
    isTyping,
    setIsTyping,
    setHits,
    setLetterIndex,
    setTotalTime,
    setIsTestFinished,
    setMistakes,
}: TypeMechanicsProps) {
    const [timer, setTimer] = useState<number | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const typedChar = e.target.value[letterIndex];

        if (!isTyping) {
            const startTime = Date.now();
            setIsTyping(true);
            setTimer(startTime);
        }

        if (letterIndex < totalCharacters) {
            if (!typedChar) {
                if (letterIndex > 0) {
                    setLetterIndex((prevCharIndex) => prevCharIndex - 1);

                    if (currentParagraph[letterIndex - 1] !== " ") {
                        setMistakes((prevMistakes) => prevMistakes - 1);
                    }
                }
            } else {
                if (currentParagraph[letterIndex] !== typedChar) {
                    setMistakes((prevMistakes) => prevMistakes + 1);
                } else {
                    setHits((prevHits) => prevHits + 1);
                }

                setLetterIndex((prevCharIndex) => prevCharIndex + 1);
            }
        }

        if (letterIndex === currentParagraph.length - 1 && timer) {
            const endTime = Date.now();
            const elapsedTime = (endTime - timer) / 1000;
            setTotalTime(elapsedTime);
            setIsTestFinished(true);
        }

        setTypedText(e.target.value);
    };

    return (
        <div
            className="content-box relative z-10"
            style={{ pointerEvents: "none", userSelect: "none" }}
        >
            <TypingText
                currentParagraph={currentParagraph}
                letterIndex={letterIndex}
                typedText={typedText}
            />
            <div
                className="content"
                style={{ pointerEvents: "none", userSelect: "none" }}
            >
                <input
                    ref={inputRef}
                    // onFocus={(e) => {
                    //     console.log("Focused on input");
                    // }}
                    // onBlur={(e) => {
                    //     console.log("Triggered because this input lost focus");
                    // }}
                    onFocus={(e) => {
                        if (e.currentTarget === e.target) {
                            console.log("focused self");
                        } else {
                            console.log("focused child", e.target);
                        }
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                            // Not triggered when swapping focus between children
                            console.log("focus entered self");
                        }
                    }}
                    onBlur={(e) => {
                        if (e.currentTarget === e.target) {
                            console.log("unfocused self");
                        } else {
                            console.log("unfocused child", e.target);
                        }
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                            // Not triggered when swapping focus between children
                            console.log("focus left self");
                        }
                    }}
                    className="input-field "
                    type="text"
                    value={typedText}
                    onChange={handleInputChange}
                    onCopy={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                />
            </div>
        </div>
    );
}
