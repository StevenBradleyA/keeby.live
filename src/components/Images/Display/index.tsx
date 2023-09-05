import { api } from "~/utils/api";
import type { Images } from "@prisma/client";
import ImageCard from "./imageCard";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface DeleteImageObj {
    [id: string]: string;
}

export default function DisplayImages({ userId }: { userId: string }) {
    const [deleteImageTrack, setDeleteImageTrack] = useState<DeleteImageObj>(
        {}
    );
    const { data: session } = useSession();
    const ctx = api.useContext();

    const { data: images, isLoading } =
        api.image.getAllByUserId.useQuery(userId);

    const { mutate } = api.image.delete.useMutation({
        onSuccess: () => {
            void ctx.image.getAllByUserId.invalidate();
        },
    });

    const handleDeleteImage = (e: React.FormEvent) => {
        e.preventDefault();
        if (session && session.user && session.user.id) {
            const data = {
                imageIds: Object.values(deleteImageTrack),
                userId: session.user.id,
            };

            return mutate(data);
        } else {
            throw new Error("Hot Toast Incoming!!!");
        }
    };

    if (isLoading) return <div>Loading All Images...</div>;

    if (!images) return <div>Oops</div>;

    return (
        <div className="mx-auto flex w-4/5 flex-col">
            <h1 className="mb-2 text-center text-xl font-semibold">
                here are all the images of one user
            </h1>
            <div className="mx-auto flex w-4/5">
                {images.map((image: Images, i: number) => {
                    return (
                        <ImageCard
                            key={i}
                            image={image}
                            i={i}
                            deleteImageTrack={deleteImageTrack}
                            setDeleteImageTrack={setDeleteImageTrack}
                        />
                    );
                })}
            </div>
            <div className="flex justify-center">
                <button onClick={handleDeleteImage} className="rounded-lg bg-gray-800 px-4 py-2 font-bold text-white shadow-lg transition-all duration-300 hover:bg-purple-500">
                    Update Images
                </button>
            </div>
        </div>
    );
}
