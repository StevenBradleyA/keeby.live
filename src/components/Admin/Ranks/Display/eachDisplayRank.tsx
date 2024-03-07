import Image from "next/image";

interface AdminEachDisplayRankProps {
    rank: {
        id: string;
        name: string;
        image: string;
        minWpm: number;
        maxWpm: number;
    };
}
export default function AdminEachDisplayRank({
    rank,
}: AdminEachDisplayRankProps) {
    // add update and delete

    return (
        <div className="" key={rank.id}>
            <h1>{rank.name}</h1>
            <p className="text-darkGray">{`max wpm ${rank.maxWpm}`}</p>
            <p className="mb-1 text-darkGray">{`min wpm ${rank.minWpm}`}</p>

            <Image
                alt="rank"
                src={rank.image}
                width={200}
                height={200}
                className="h-20 w-32 rounded-md object-cover"
            />
        </div>
    );
}
