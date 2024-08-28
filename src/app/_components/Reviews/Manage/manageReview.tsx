"use client";
import type { Review } from "@prisma/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/trpc/react";
import UpdateReview from "./updateReview";
import ModalDialog from "../../Context/Modal";

interface ManageReviewProps {
    review: EachReview;
    userId: string;
    closeModal: () => void;
}

interface EachReview extends Review {
    recipient: { username: string | null; profile: string | null };
}

export default function ManageReview({
    review,
    userId,
    closeModal,
}: ManageReviewProps) {
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
    const { mutate } = api.review.delete.useMutation({
        onSuccess: () => {
            toast.success("Review Deleted!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            void utils.review.getAllEligibleByUserId.invalidate();
            void utils.review.getAllReceivedAndSentByUserId.invalidate();
            closeModal();
        },
    });

    // helpers
    const handleDeleteReview = () => {
        if (userId === review.userId) {
            const data = {
                id: review.id,
                userId: userId,
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
                <div className="p-5 w-[300px] ">
                    {!isDeleteFinal ? (
                        <>
                            <h1 className="flex justify-center w-full text-center">
                                Are you sure you want to delete this review?
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
                                Last chance, your review will be gone forever!
                            </h1>
                            <div className="flex gap-5 justify-center mt-5">
                                <button
                                    className="rounded-md  px-4 py-1  text-white bg-mediumGray/30 hover:bg-red-500/10 hover:text-red-500 ease-in flex items-center "
                                    onClick={handleDeleteReview}
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
                <UpdateReview review={review} closeModal={closeEditModal} />
            </ModalDialog>
        </>
    );
}
