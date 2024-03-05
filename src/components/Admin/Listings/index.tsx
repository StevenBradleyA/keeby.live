import type { Images } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
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
    console.log("hello", listing);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const { data: session } = useSession();

    // const { mutate } = api.comment.delete.useMutation({
    //     onSuccess: () => {
    //         if (parentId) {
    //             void ctx.comment.getAllByTypeId.invalidate();
    //             void ctx.comment.getAllReplysByTypeId.invalidate();
    //         } else {
    //             void ctx.comment.getAllByTypeId.invalidate();
    //         }
    //         closeModal();
    //     },
    // });

    const handleDeleteListing = () => {
        console.log("bye");
    };

    return (
        <div className=" h-[40vh] w-1/3">
            <div className="h-full w-full rounded-xl bg-black">
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
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-failure px-4 py-2 "
                            onClick={() => setConfirmDelete(true)}
                        >
                            {`C:\\\\> Delete`}
                        </button>
                    ) : (
                        <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform justify-center gap-5 ">
                            <button
                                className=" rounded-md bg-failure px-2 py-2 "
                                onClick={handleDeleteListing}
                            >
                                {`C:\\\\> XXXX`}
                            </button>
                            <button
                                className=" rounded-md bg-green-500 px-2 py-2 "
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
