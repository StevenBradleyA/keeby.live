"use client";
import type { Rank } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import ModalDialog from "~/app/_components/Context/Modal";
import { api } from "~/trpc/react";
import AdminUpdateRank from "./updateRank";

interface ManagePickProps {
    rank: Rank;
    closeModal: () => void;
}

export default function ManageRankModal({ rank, closeModal }: ManagePickProps) {
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
    const { mutate } = api.rank.delete.useMutation({
        onSuccess: () => {
            toast.success("Rank destroyed ggez", {
                icon: "🧹",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#ff0000",
                },
            });
            void utils.rank.getAll.invalidate();
            closeModal();
        },
    });

    // helpers
    const handleDeleteRank = () => {
        if (session && session.user.isAdmin) {
            const data = {
                id: rank.id,
                image: rank.image,
            };

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
                <div className="p-5 w-[300px] ">
                    {!isDeleteFinal ? (
                        <>
                            <h1 className="flex justify-center w-full text-center">
                                Are you sure you want to delete {rank.name}?
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
                                Last chance, this rank will be gone forever!
                            </h1>
                            <div className="flex gap-5 justify-center mt-5">
                                <button
                                    className="rounded-md  px-4 py-1  text-white bg-mediumGray/30 hover:bg-red-500/10 hover:text-red-500 ease-in flex items-center "
                                    onClick={handleDeleteRank}
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
                <AdminUpdateRank rank={rank} closeModal={closeEditModal} />
            </ModalDialog>
        </>
    );
}
