import type { Ticket } from "@prisma/client";
import ModalDialog from "~/app/_components/Modal";
import { useState } from "react";
import DeleteTicket from "../Delete/deleteTicket";

interface EachAdminTicketProps {
    ticket: Ticket;
}

export default function EachAdminTicket({ ticket }: EachAdminTicketProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className="h-64 w-96 rounded-xl bg-black/30 p-5 text-sm text-failure shadow-xl">
                <h1 className="break-words break-all border-b border-red-400 pb-2">
                    {ticket.email}
                </h1>
                <p className="bg- mt-3 h-40 w-full overflow-y-auto rounded-md border border-red-400 p-3 text-failure">
                    {ticket.text}
                </p>
            </div>
            <button
                className="flex w-full items-start  justify-end text-sm "
                onClick={openModal}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white-500 relative bottom-1 w-8 text-red-500 transition-colors duration-400 ease-custom-cubic hover:text-white "
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z" />
                    <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" />
                    <path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" />
                </svg>
            </button>

            <ModalDialog isOpen={isOpen} onClose={closeModal}>
                <DeleteTicket ticket={ticket} closeModal={closeModal} />
            </ModalDialog>
        </>
    );
}
