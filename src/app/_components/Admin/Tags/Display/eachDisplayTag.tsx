"use client";
import { useState } from "react";
import ModalDialogueEdit from "~/app/_components/Context/Modal/editModal";
import ManageTagModal from "../Manage/manageTagModal";

interface AdminEachDisplayTagProps {
    tag: { id: string; name: string; description: string };
}
export default function AdminEachDisplayTag({ tag }: AdminEachDisplayTagProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="w-80 h-36 rounded-3xl bg-white p-3 text-sm text-black shadow-xl relative">
            <h1 className="text-xl">{tag.name}</h1>
            <p className="h-full w-full overflow-y-auto text-mediumGray">
                {tag.description}
            </p>
            <div className="absolute -bottom-8 right-0">
                <div className="relative">
                    <button
                        className=" text-mediumGray hover:text-failure"
                        onClick={openModal}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M4 8C4 9.10457 3.10457 10 2 10C0.895431 10 0 9.10457 0 8C0 6.89543 0.895431 6 2 6C3.10457 6 4 6.89543 4 8Z"
                                fill="currentColor"
                            />
                            <path
                                d="M10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8Z"
                                fill="currentColor"
                            />
                            <path
                                d="M14 10C15.1046 10 16 9.10457 16 8C16 6.89543 15.1046 6 14 6C12.8954 6 12 6.89543 12 8C12 9.10457 12.8954 10 14 10Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>

                    <ModalDialogueEdit
                        isOpen={isModalOpen}
                        onClose={closeModal}
                    >
                        <ManageTagModal closeModal={closeModal} tag={tag} />
                    </ModalDialogueEdit>
                </div>
            </div>
        </div>
    );
}
