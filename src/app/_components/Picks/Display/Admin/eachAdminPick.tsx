"use client";

import type { Pick } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import ModalDialogueEdit from "~/app/_components/Context/Modal/editModal";
import ManagePickModal from "../../Manage/Admin/managePickModal";

interface EachAdminPickProps {
    pick: Pick;
}

export default function EachAdminPick({ pick }: EachAdminPickProps) {
    // this needs to manage delete/edit

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className="w-72 h-60 bg-black rounded-3xl relative">
                <Image
                    alt=""
                    src={pick.image}
                    className="w-full h-full object-cover rounded-3xl"
                    width={400}
                    height={400}
                    priority
                />
                {/* {pick.title} */}

                <button
                    className="absolute -bottom-5 right-0 text-mediumGray hover:text-failure"
                    onClick={openModal}
                >
                    <div className="relative">
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

                        <ModalDialogueEdit isOpen={isOpen} onClose={closeModal}>
                          

                            <ManagePickModal pick={pick} closeModal={closeModal}/>
                        </ModalDialogueEdit>
                    </div>
                </button>
            </div>
        </>
    );
}
