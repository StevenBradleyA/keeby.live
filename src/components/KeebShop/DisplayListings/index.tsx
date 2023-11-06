import { api } from "~/utils/api";
import type { Listing } from "@prisma/client";
import Image from "next/image";
import matrix from "@public/Gifs/matrix.gif";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface EachListingCardProps {
    keeb: Listing;
    index: number;
    isClicked: string;
    setIsClicked: (isClicked: string) => void;
    activeIndex: number;
    setActiveIndex: (activeIndex: number) => void;
    nextFiveIndexes: number[];
    setNextFiveIndexes: (nextFiveIndexes: number[]) => void;
}

export default function EachListingCard({
    keeb,
    index,
    isClicked,
    setIsClicked,
    activeIndex,
    setActiveIndex,
    nextFiveIndexes,
    setNextFiveIndexes,
}: EachListingCardProps) {
    const { data: previewImage, isLoading } =
        api.image.getAllByResourceId.useQuery({
            resourceType: "LISTINGPREVIEW",
            resourceId: keeb.id,
        });

    const isMain = activeIndex === index;
    const isSide = nextFiveIndexes.includes(index);
    const isNormal = !isMain && !isSide

    const cardClick = () => {
        if (keeb.id === isClicked) {
            setIsClicked("");
            setActiveIndex(null);
            setNextFiveIndexes([]);
        } else {
            setIsClicked(keeb.id);
            setActiveIndex(index);
            setNextFiveIndexes([
                index + 1,
                index + 2,
                index + 3,
                index + 4,
                index + 5,
            ]);
        }
    };

    // todo maybe we push info absolutely positioned to the left of the card could be clean doe

    console.log(isSide);
    return (
        <div className={`flex flex-col`}>
            {previewImage && previewImage[0] && previewImage[0].link ? (
                <div className=" cursor-pointer">
                    <Image
                        alt="preview"
                        src={previewImage[0].link}
                        width={600}
                        height={600}
                        onClick={cardClick}
                        className={`${ isMain? "w-96 h-96": ""} ${ isSide? "w-80 h-10": ""} ${ isNormal? "w-80 h-80": ""}  rounded-3xl object-cover`}
                    />
                </div>
            ) : (
                <Image alt="preview" src={matrix} width={200} height={200} />
            )}
            {isClicked === keeb.id && (
                <div className="flex flex-col px-2 ">
                    <div className="flex justify-between">
                        <div>{keeb.title}</div>
                        <div>{keeb.price}</div>
                    </div>
                    <div className="flex justify-center">
                        <motion.button
                            className=" w-28 rounded-2xl bg-black px-6 py-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >{`let's go`}</motion.button>
                    </div>
                </div>
            )}
        </div>
    );
}
