"use client";

import { Images, Listing } from "@prisma/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/trpc/react";
import ModalDialog from "../../Context/Modal";
import UpdateListing from "./Update/updateListing";

interface ManageListingModalProps {
    listing: PreviewFavoriteListing;
    userId: string;
    closeModal: () => void;
}

interface PreviewFavoriteListing extends Listing {
    _count: {
        comments: number;
        favorites: number;
    };
    images: Images[];
}
export default function ManageListingModal({
    listing,
    userId,
    closeModal,
}: ManageListingModalProps) {
    // handle the delete here and the update in a separate modal where we will have to fetch that juicy listing...

    // state
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isDeleteFinal, setIsDeleteFinal] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

    const openEditModal = () => {
        setIsEditOpen(true);
    };

    const closeEditModal = () => {
        setIsEditOpen(false);
    };

    const utils = api.useUtils();

    // server
    const { mutate } = api.listing.delete.useMutation({
        onSuccess: () => {
            toast.success("Listing Deleted!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            void utils.listing.getAllByUserId.invalidate();
            closeModal();
        },
    });

    // helpers
    const handleDeleteListing = () => {
        if (userId === listing.sellerId) {
            const data = {
                id: listing.id,
                sellerId: listing.sellerId,
            };

            mutate(data);
        }
    };

    return (
        <>
            {!isDelete ? (
                <div className="px-1 py-2 h-full m-0 flex flex-col items-center w-full ">
                    <button
                        onClick={openEditModal}
                        className="hover:text-green-500 hover:bg-white/10 px-10 py-1 rounded-lg w-full ease-in"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => setIsDelete(true)}
                        className="hover:text-green-500 hover:bg-white/10 px-10 py-1 rounded-lg w-full ease-in"
                    >
                        Delete
                    </button>
                </div>
            ) : (
                <div className="p-5 w-[500px] ">
                    {!isDeleteFinal ? (
                        <>
                            <h1 className="flex justify-center w-full">
                                Are you sure you want to delete {listing.title}?
                            </h1>
                            <div className="flex gap-5 justify-center mt-5">
                                <button
                                    className="rounded-md  px-4 py-1  text-white bg-mediumGray/30 hover:bg-red-500/10 hover:text-red-500 ease-in flex items-center "
                                    onClick={() => setIsDeleteFinal(true)}
                                >
                                    Yes
                                </button>
                                <button
                                    className="rounded-md  px-4 py-1  text-white bg-mediumGray/30 hover:bg-green-500/10 hover:text-green-500 ease-in flex items-center "
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="flex justify-center w-full">
                                Last chance, your listing will be gone forever!
                            </h1>
                            <div className="flex gap-5 justify-center mt-5">
                                <button
                                    className="rounded-md  px-4 py-1  text-white bg-mediumGray/30 hover:bg-red-500/10 hover:text-red-500 ease-in flex items-center "
                                    onClick={handleDeleteListing}
                                >
                                    Delete Forever
                                </button>
                                <button
                                    className="rounded-md  px-4 py-1  text-white bg-mediumGray/30 hover:bg-green-500/10 hover:text-green-500 ease-in flex items-center "
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}

            <ModalDialog isOpen={isEditOpen} onClose={closeEditModal}>
                <UpdateListing
                    listingId={listing.id}
                    userId={userId}
                    closeModal={closeEditModal}
                />
            </ModalDialog>
        </>
    );
}
