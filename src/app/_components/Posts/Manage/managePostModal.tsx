"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/trpc/react";
import type { Images } from "@prisma/client";
import UpdatePost from "./Update/updatePost";
import ModalDialog from "../../Context/Modal";

interface ManagePostModalProps {
    userId: string;
    closeModal: () => void;
    post: EachPost;
}

interface EachPost {
    id: string;
    tag: string;
    title: string;
    link: string | null;
    text: string | null;
    isLiked?: boolean;
    likeId?: string;
    isFavorited?: boolean;
    favoriteId?: string;
    _count: Count;
    images: Images[];
    user: {
        id: string;
        profile: string | null;
        username: string | null;
    };
}
interface Count {
    comments: number;
    postLikes: number;
    favorites: number;
}

export default function ManagePostModal({
    post,
    userId,
    closeModal,
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
    const { mutate } = api.post.delete.useMutation({
        onSuccess: () => {
            toast.success("Post Deleted!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            void utils.post.getAllByUserId.invalidate();
            closeModal();
        },
    });

    // helpers
    const handleDeleteListing = () => {
        if (userId === post.user.id) {
            const data = {
                id: post.id,
                userId: post.user.id,
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
                            <h1 className="flex justify-center w-full text-green-500">
                                Are you sure you want to delete {post.title}?
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
                            <h1 className="flex justify-center w-full text-green-500">
                                Last chance, your post will be gone forever!
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
                <UpdatePost
                    postId={post.id}
                    userId={userId}
                    closeModal={closeEditModal}
                />
            </ModalDialog>
        </>
    );
}
