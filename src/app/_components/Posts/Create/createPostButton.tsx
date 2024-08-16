"use client";
import { useState } from "react";
import ModalDialog from "../../Modal";
import CreatePostModal from ".";
import { motion } from "framer-motion";

export default function CreatePostButton() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const createButton = {
        hover: {
            scale: 1.1,
            transition: {
                type: "spring",
                stiffness: 250,
                damping: 8,
            },
        },
        tap: { scale: 0.9 },
    };

    return (
        <div>
            <motion.button
                className=" bg-green-500 rounded-lg p-1 ease-in text-black"
                onClick={openModal}
                whileTap="tap"
                whileHover="hover"
                variants={createButton}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M6 12H18M12 6V18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.button>
            <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                <CreatePostModal closeModal={closeModal} />
            </ModalDialog>
        </div>
    );
}
