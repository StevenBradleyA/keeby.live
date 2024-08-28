import type { Pick } from "@prisma/client";
import Image from "next/image";

interface EachPickDisplayProps {
    pick: EachPick;
}

interface EachPick extends Pick {
    _count: {
        comments: number;
        favorites: number;
    };
    isFavorited?: boolean;
    favoriteId?: string;
}

export default function EachPickDisplay({ pick }: EachPickDisplayProps) {
    return (
        <>
            <div className="w-80 h-60 bg-black rounded-3xl overflow-hidden">
                <Image
                    alt="product"
                    className="w-full h-full object-cover"
                    width={500}
                    height={500}
                    src={pick.image}
                />
            </div>
        </>
    );
}
