"use client";
import { api } from "~/trpc/react";
import EachDisplayKeebCard from "./eachDisplayKeebCard";
import { useEffect, useState } from "react";
import ModalDialog from "~/app/_components/Context/Modal";
import CreateKeeb from "../CreateKeeb";
import { motion } from "framer-motion";

export default function DisplayKeebs({ userId }: { userId: string }) {
    const { data: keebData } = api.keeb.getAllByUserId.useQuery(userId);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [keebCount, setKeebCount] = useState<number>(0);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
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
    useEffect(() => {
        if (keebData) {
            setKeebCount(keebData.length);
        }
    }, [keebData]);

    return (
        <div className="w-full font-poppins">
            <div className="mt-5 flex justify-between">
                <h1>
                    KeebType Keyboard Profiles ({" "}
                    {keebData ? keebData.length : 0} ){" "}
                </h1>
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
            </div>
            <ModalDialog isOpen={isOpen} onClose={closeModal}>
                <CreateKeeb closeModal={closeModal} userId={userId} />
            </ModalDialog>

            {keebData && keebData.length > 0 && (
                <div className="mt-5 flex w-full flex-wrap gap-5">
                    {keebData.map((keeb, i) => (
                        <EachDisplayKeebCard
                            key={i}
                            keeb={keeb}
                            length={keebCount}
                            userId={userId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
