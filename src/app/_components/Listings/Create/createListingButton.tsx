"use client";
import { useState } from "react";
import ModalDialog from "../../Context/Modal";
import { motion } from "framer-motion";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function CreateListingButton() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { data: session } = useSession();

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

    return session === null ? (
        <>
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
                <div className="p-2">
                    <div className="flex items-end gap-2">
                        <h1 className="text-2xl text-green-500">
                            Sign in to list your keyboard
                        </h1>
                        <Image alt="keebo" src={keebo} className="h-12 w-12" />
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="text-md keeb-share-preview-button mt-5 flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                            style={{
                                boxShadow: "0 0 20px #22C55E",
                            }}
                            onClick={() => void signIn()}
                        >
                            <svg
                                className="keeb-share-preview-button-arrow w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                                ></path>
                            </svg>
                            <span className="keeb-share-preview-button-text">
                                {`Let's Go `}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="keeb-share-preview-button-circle w-2"
                                viewBox="0 0 32 32"
                            >
                                <circle cx="16" cy="16" r="16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </ModalDialog>
        </>
    ) : (
        <>
            <Link
                aria-label="list your keyboard for sale"
                className=""
                href={`/marketplace/create-listing`}
            >
                <motion.button
                    className=" bg-green-500 rounded-lg p-1 ease-in text-black"
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
            </Link>
        </>
    );
}
