"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/trpc/react";
import type { Keeb } from "@prisma/client";
import { setCookie } from "cookies-next";
import ModalDialog from "~/app/_components/Context/Modal";
import UpdateKeeb from "./updateKeeb";

interface ManagePostModalProps {
    userId: string;
    closeModal: () => void;
    keeb: Keeb;
    length: number;
}

export default function ManageKeebModal({
    keeb,
    userId,
    closeModal,
    length,
}: ManagePostModalProps) {
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

    // helpers
    const { mutate: deleteKeeb } = api.keeb.delete.useMutation({
        onSuccess: (data) => {
            void utils.keeb.getAllByUserId.invalidate();
            toast.success("Keed Deleted!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            if (data.newKeebName && data.newKeebId) {
                setCookie("keebId", data.newKeebId, {
                    maxAge: 60 * 60 * 24 * 365,
                    path: "/",
                });
            }
            closeModal();
        },
    });

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        if (length > 0) {
            const keebData = {
                id: keeb.id,
                userId: keeb.userId,
            };

            deleteKeeb(keebData);
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
                    {length > 1 && (
                        <button
                            onClick={() => setIsDelete(true)}
                            className="hover:text-green-500 hover:bg-white/10 px-10 py-1 rounded-lg w-full ease-in"
                        >
                            Delete
                        </button>
                    )}
                </div>
            ) : (
                <div className="p-5 w-[300px] ">
                    {!isDeleteFinal ? (
                        <>
                            <h1 className="flex justify-center w-full text-green-500 text-center">
                                Are you sure you want to delete {keeb.name}?
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
                            <h1 className="flex justify-center w-full text-green-500 text-center">
                                Last chance, your keeb will be gone forever!
                            </h1>
                            <div className="flex gap-5 justify-center mt-5">
                                <button
                                    className="rounded-md  px-4 py-1  text-white bg-mediumGray/30 hover:bg-red-500/10 hover:text-red-500 ease-in flex items-center "
                                    onClick={handleDelete}
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
                <UpdateKeeb
                    closeModal={closeEditModal}
                    userId={userId}
                    keeb={keeb}
                />
            </ModalDialog>
        </>
    );
}
