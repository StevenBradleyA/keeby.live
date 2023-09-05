interface EachLetterProps {
    letter: string;
    isActive: boolean;
    i: number;
}
export default function EachLetter({ letter, isActive, i }: EachLetterProps) {
    return (
        <div className={isActive ? "text-green-400" : "text-red-400"}>
            {letter}
        </div>
    );
}
