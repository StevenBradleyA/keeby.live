interface EachLetterProps {
    letter: string;
    isActive: boolean;
}
export default function EachLetter({ letter, isActive }: EachLetterProps) {
    return (
        <div className={isActive ? "text-green-400" : "text-red-400"}>
            {letter}
        </div>
    );
}
