"use client";
import type { Keeb } from "@prisma/client";
import { useState } from "react";
import ModalDialogueEdit from "~/app/_components/Context/Modal/editModal";
import ManageKeebModal from "../Manage/manageKeebModal";

interface KeebProps {
    keeb: Keeb;
    length: number;
    userId: string;
}

export default function EachDisplayKeebCard({
    keeb,
    length,
    userId,
}: KeebProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className=" relative text-white  font-poppins text-sm ">
            <div className="w-96 h-40 rounded-2xl bg-darkGray shadow-lg p-5 hover:bg-darkGray/80 flex flex-col ">
                <h1 className="z-20 flex justify-center text-xl">
                    {keeb.name}
                </h1>
                <div className="mt-3 text-green-500 ">
                    <span className="z-20 text-mediumGray">Switches:</span>{" "}
                    {keeb.switches}
                </div>
                <div className="text-green-500 mt-1">
                    <span className="z-20 text-mediumGray">Keycaps:</span>{" "}
                    {keeb.keycaps}
                </div>
            </div>
            <div className="absolute right-0 -bottom-8 ">
                <div className="relative">
                    <button onClick={openModal}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-mediumGray w-8 h-8 hover:text-white "
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z" />
                            <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" />
                            <path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" />
                        </svg>
                    </button>

                    <ModalDialogueEdit isOpen={isOpen} onClose={closeModal}>
                        <ManageKeebModal
                            keeb={keeb}
                            closeModal={closeModal}
                            userId={userId}
                            length={length}
                        />
                    </ModalDialogueEdit>
                </div>
            </div>
        </div>
    );
}
