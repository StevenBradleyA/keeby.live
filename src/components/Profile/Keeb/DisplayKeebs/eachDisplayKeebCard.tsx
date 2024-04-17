import type { Keeb } from "@prisma/client";
import { useState } from "react";
import ModalDialog from "~/components/Modal";
import ManageKeeb from "../ManageKeeb";

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
        <div className="flex h-[25vh] w-96 flex-col justify-between ">
            <div className="relative z-10 h-full overflow-hidden rounded-2xl bg-keebyGray p-10 ">
                <div className=" display-keeb-card-overlay absolute bottom-0 left-0 right-0 top-32 -z-10 h-full w-full bg-black/40"></div>
                <div className="z-20 flex justify-center text-2xl">
                    {keeb.name}
                </div>
                <div className="mt-5 ">
                    {" "}
                    <span className="z-20 text-darkGray">Switches:</span>{" "}
                    {keeb.switches}
                </div>
                <div>
                    <span className="z-20 text-darkGray">Keycaps:</span>{" "}
                    {keeb.keycaps}
                </div>
            </div>

            <button
                className="flex w-full items-start  justify-end pr-3 text-sm "
                onClick={openModal}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative bottom-1 w-8 text-green-500 transition-colors duration-400 ease-custom-cubic hover:text-white "
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z" />
                    <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" />
                    <path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" />
                </svg>
            </button>

            <ModalDialog isOpen={isOpen} onClose={closeModal}>
                <ManageKeeb
                    closeModal={closeModal}
                    userId={userId}
                    keeb={keeb}
                    length={length}
                />
            </ModalDialog>
        </div>
    );
}
