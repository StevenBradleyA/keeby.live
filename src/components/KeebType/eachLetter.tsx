
interface EachLetterProps {
    letter: string;
    i: number;
}
export default function EachLetter({ letter, i }: EachLetterProps) {
    return (
        <div>
            <span>{letter}</span>
        </div>
    );
}
