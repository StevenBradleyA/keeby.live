import { api } from "~/utils/api";
import type { Listing } from "@prisma/client";
import Image from "next/image";
import matrix from "@public/Gifs/matrix.gif";
import { motion } from "framer-motion";

interface EachListingCardProps {
    keeb: Listing;
    isClicked: string;
    setIsClicked: (isClicked: string) => void;
}

export default function EachListingCard({
    keeb,
    isClicked,
    setIsClicked,
}: EachListingCardProps) {
    const { data: previewImage, isLoading } =
        api.image.getAllByResourceId.useQuery({
            resourceType: "LISTINGPREVIEW",
            resourceId: keeb.id,
        });

    const cardClick = () => {
        if (keeb.id === isClicked) {
            setIsClicked("");
        } else {
            setIsClicked(keeb.id);
        }
    };

    // todo maybe we push info absolutely positioned to the left of the card could be clean doe

    return (
        <div className={`flex flex-col`}>
            {previewImage && previewImage[0] && previewImage[0].link ? (
                <div className="w-full cursor-pointer">
                    <Image
                        alt="preview"
                        src={previewImage[0].link}
                        width={600}
                        height={600}
                        onClick={cardClick}
                        className="h-80 w-80 rounded-3xl object-cover"
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
