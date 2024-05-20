import { api } from "~/utils/api";
import toast from "react-hot-toast";
import type { Ticket } from "@prisma/client";

interface EachAdminTicketProps {
    ticket: Ticket;
    closeModal: () => void;
}

export default function DeleteTicket({
    ticket,
    closeModal,
}: EachAdminTicketProps) {
    const ctx = api.useContext();

    const { mutate } = api.ticket.delete.useMutation({
        onSuccess: () => {
            toast.success("Ticket Resolved!", {
                icon: "☠️",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#ff0000",
                },
            });
            void ctx.ticket.getAll.invalidate();
            closeModal();
        },
    });

    const handleDeleteTicket = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data = {
            id: ticket.id,
        };

        mutate(data);
    };

    return (
        <div>
            <div>Are you sure you want to delete this ticket? </div>
            <div className="mt-5 flex justify-center gap-5 ">
                <button
                    className=" rounded-md bg-black/30 px-4 py-2 hover:bg-black/40"
                    onClick={closeModal}
                >
                    Cancel
                </button>
                <button
                    className="rounded-md bg-black/30 px-4 py-2 text-red-500 hover:bg-black/40"
                    onClick={handleDeleteTicket}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
