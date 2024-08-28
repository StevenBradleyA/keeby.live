"use client";
import type { Tag } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import ModalDialog from "~/app/_components/Context/Modal";
import { api } from "~/trpc/react";
import AdminUpdateTag from "./updateTag";

interface ManagePickProps {
    tag: Tag;
    closeModal: () => void;
}

export default function ManageTagModal({ tag, closeModal }: ManagePickProps) {
    const { data: session } = useSession();
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
    const { mutate } = api.tag.delete.useMutation({
        onSuccess: () => {
            toast.success("Tag destroyed ggez", {
                icon: "🧹",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#ff0000",
                },
            });
            void utils.listing.getAllByUserId.invalidate();
            closeModal();
        },
    });

    // helpers
    const handleDeleteTag = () => {
        if (session && session.user.isAdmin) {
            const data = tag.id;
            mutate(data);
        }
    };

    return (
        <>
            {!isDelete ? (
                <div className="px-1 py-2 h-full m-0 flex flex-col items-center w-full text-white ">
                    <button
                        onClick={openEditModal}
                        className="hover:text-failure hover:bg-white/10 px-10 py-1 rounded-lg w-full ease-in"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => setIsDelete(true)}
                        className="hover:text-failure hover:bg-white/10 px-10 py-1 rounded-lg w-full ease-in"
                    >
                        Delete
                    </button>
                </div>
            ) : (
                <div className="p-5 w-[300px] text-white ">
                    {!isDeleteFinal ? (
                        <>
                            <h1 className="flex justify-center w-full text-center">
                                Are you sure you want to delete {tag.name}?
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
                            <h1 className="flex justify-center w-full text-center">
                                Last chance, this tag will be gone forever!
                            </h1>
                            <div className="flex gap-5 justify-center mt-5">
                                <button
                                    className="rounded-md  px-4 py-1  text-white bg-mediumGray/30 hover:bg-red-500/10 hover:text-red-500 ease-in flex items-center "
                                    onClick={handleDeleteTag}
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
                <AdminUpdateTag tag={tag} closeModal={closeModal} />
            </ModalDialog>
        </>
    );
}
