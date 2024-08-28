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
            <div className="w-80 h-60 bg-white rounded-tr-3xl rounded-bl-3xl rounded-br-[1.9rem] rounded-tl-[1.9rem] relative  text-sm z-0">
                <div className="absolute left-0 top-0 bg-darkGray rounded-tl-3xl p-2 rounded-br-3xl z-20 flex gap-2 items-center ">
                    <h2>{pick.title}</h2>
                    <p className="flex gap-1 items-center">${pick.price}</p>
                </div>
                <a
                    href={pick.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-0 bottom-0 bg-darkGray rounded-tl-3xl rounded-br-3xl py-1 pl-6 pr-3 flex gap-2 items-center hover:bg-darkGray/90 z-20"
                >
                    Buy Now
                    <div className="bg-green-500 rounded-md p-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M7 17L17 7M17 7H8M17 7V16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </a>

                <Image
                    alt="product"
                    className="w-full h-full object-cover rounded-tr-3xl rounded-bl-3xl rounded-br-[1.9rem] rounded-tl-[1.9rem]"
                    width={500}
                    height={500}
                    src={pick.image}
                />
            </div>
        </>
    );
}
