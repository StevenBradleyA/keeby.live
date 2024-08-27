"use client";
import type { Images } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";

interface EachListing {
    id: string;
    title: string;
    sellerId: string;
    images: Images[];
}
interface EachAdminListingProps {
    listing: EachListing;
}

export default function EachAdminListing({ listing }: EachAdminListingProps) {
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const { data: session } = useSession();
    const utils = api.useUtils();

    const { mutate } = api.listing.delete.useMutation({
        onSuccess: () => {
            toast.success("Listing eliminated ggez", {
                icon: "🧹",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#ff0000",
                },
            });
            void utils.listing.getAll.invalidate();
        },
    });

    const handleDeleteListing = () => {
        if (session && session.user.isAdmin) {
            const data = {
                id: listing.id,
                sellerId: listing.sellerId,
            };

            mutate(data);
        }
    };

    return (
        <div className=" h-48 w-72 desktop:h-64 desktop:w-96 rounded-xl relative overflow-hidden text-xs">
            <div className="flex items-center justify-center p-2 text-failure absolute bg-dark rounded-md top-2 left-2">
                {listing.title}
            </div>
            {listing && listing.images[0] && (
                <div className="h-full w-full">
                    <Image
                        alt="listing preview"
                        src={listing.images[0].link}
                        width={500}
                        height={500}
                        className="h-full w-full object-cover"
                    />
                </div>
            )}
            <div className="absolute bottom-2 right-2 text-failure">
                {!confirmDelete ? (
                    <button
                        className="rounded-md bg-dark p-2"
                        onClick={() => setConfirmDelete(true)}
                    >
                        {`C:\\\\> Delete`}
                    </button>
                ) : (
                    <div className=" flex gap-3 ">
                        <button
                            className="rounded-md bg-dark p-2"
                            onClick={handleDeleteListing}
                        >
                            Delete Forever
                        </button>
                        <button
                            className="rounded-md bg-dark p-2 text-green-500"
                            onClick={() => setConfirmDelete(false)}
                        >
                            {`C:\\\\> Abort`}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
