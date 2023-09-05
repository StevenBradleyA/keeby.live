import type { Images } from "@prisma/client";
import { useState } from "react";

interface DeleteImageObj {
    [id: string]: string;
}

export default function ImageCard({
    image,
    i,
    deleteImageTrack,
    setDeleteImageTrack,
}: {
    image: Images;
    i: number;
    deleteImageTrack: DeleteImageObj;
    setDeleteImageTrack: (obj: DeleteImageObj) => void;
}) {


    return (
        <div className="flex w-full flex-wrap justify-center gap-2">
            <img
                alt="user"
                src={image.link}
                style={deleteImageTrack[i] ? { border: "5px solid red" } : {}}
                className="h-32 w-32 transform cursor-pointer rounded-md object-cover shadow-md hover:scale-105 hover:shadow-lg sm:h-40 sm:w-40"
            />
            <button
                onClick={() => {
                    const deleteImageObj = { ...deleteImageTrack };
               
                    if (deleteImageObj[i]) {
                        delete deleteImageObj[i];
                        setDeleteImageTrack(deleteImageObj);
                    } else {
                        deleteImageObj[i] = image.id;
                        setDeleteImageTrack(deleteImageObj);
                    }
                }}
            >
                ❌
            </button>
        </div>
    );
}
