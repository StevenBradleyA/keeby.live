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
            toast.success("Listing Eliminated!", {
                icon: "☠️",
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
        if (session?.user.isAdmin) {
            const data = {
                id: listing.id,
                sellerId: listing.sellerId,
            };

            mutate(data);
        }
    };

    return (
        <div className=" h-[40vh] w-1/3">
            <div className="h-full w-full rounded-xl bg-black/25 hover:bg-black/30">
                <div className="flex h-1/4 items-center justify-center p-5 text-failure">
                    {listing.title}
                </div>
                {listing && listing.images[0] && (
                    <div className="h-1/2 w-full">
                        <Image
                            alt="listing preview"
                            src={listing.images[0].link}
                            width={500}
                            height={500}
                            className="h-full w-full object-cover"
                        />
                    </div>
                )}
                <div className="relative h-1/4 w-full text-black  ">
                    {!confirmDelete ? (
                        <button
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-failure px-4 py-2 hover:bg-red-500 "
                            onClick={() => setConfirmDelete(true)}
                        >
                            {`C:\\\\> Delete`}
                        </button>
                    ) : (
                        <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform justify-center gap-5 ">
                            <button
                                className=" rounded-md bg-failure px-2 py-2 hover:bg-red-500 "
                                onClick={handleDeleteListing}
                            >
                                {`C:\\\\> XXXX`}
                            </button>
                            <button
                                className=" rounded-md bg-green-500 px-2 py-2 hover:bg-green-400 "
                                onClick={() => setConfirmDelete(false)}
                            >
                                {`C:\\\\> Abort`}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
