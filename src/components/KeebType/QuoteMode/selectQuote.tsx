import { useEffect, useState } from "react";
import QuoteType from ".";

export default function SelectQuote() {
    const paragraphs: string[] = [
        "keys typing qwerty layout letters spacebar backspace shift enter capslock function arrow control alt command escape delete tab home numeric",
        "keyboards typing keys qwerty spacebar layout letters backspace shift enter capslock function arrow control alt command escape delete tab home numeric",
        "typing qwerty keys layout letters spacebar backspace shift enter capslock function arrow control alt command escape delete tab home numeric keyboards",
        "enter typing keys qwerty layout letters spacebar backspace shift capslock function arrow control alt command escape delete tab home numeric keyboards",
        "qwerty layout typing keys letters spacebar backspace shift enter capslock function arrow control alt command escape delete tab home numeric keyboards",
        "numeric keyboards typing keys qwerty layout letters spacebar backspace shift enter capslock function arrow control alt command escape delete tab home",
        "letters spacebar enthusiasts qwerty layout mechanical keyboard typing enthusiasts artisan backspace enthusiast switches keycaps function arrow control alt command escape delete custom hobby tab numeric",
        "backspace switches mechanical typing keys enthusiasts qwerty layout artisan letters enthusiasts spacebar enthusiast keycaps function arrow control alt custom command hobby escape delete tab home numeric",
        "keycaps enthusiasts qwerty layout typing keys mechanical keyboard switches artisan letters enthusiasts spacebar backspace enthusiast function arrow control alt custom command escape hobby delete tab numeric",
    ];

    const [currentParagraph, setCurrentParagraph] = useState<string>("");
    const [isNewParagraph, setIsNewParagraph] = useState<boolean>(false);

    useEffect(() => {
        setIsNewParagraph(false);
        const randomIndex = Math.floor(Math.random() * paragraphs.length);
        const newParagraph = paragraphs[randomIndex] || "";
        setCurrentParagraph(newParagraph);
    }, [isNewParagraph]);

    if (!currentParagraph)
        return <div className="text-lg text-white">loading</div>;

    return (
        <>
            <QuoteType
                currentParagraph={currentParagraph}
                setIsNewParagraph={setIsNewParagraph}
            />
        </>
    );
}
