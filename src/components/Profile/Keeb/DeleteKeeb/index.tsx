import type { Keeb } from "@prisma/client";
import { deleteCookie, hasCookie } from "cookies-next";
import { api } from "~/utils/api";

// todo update delete domain when live

interface DeleteKeebProps {
    keeb: Keeb;
    closeModal: () => void;
}
interface KeebData {
    id: string;
    userId: string;
}
export default function DeleteKeeb({ keeb, closeModal }: DeleteKeebProps) {
    const ctx = api.useContext();

    const { mutate } = api.keeb.delete.useMutation({
        onSuccess: () => {
            void ctx.keeb.getAll.invalidate();
            closeModal();
        },
    });

    const deleteKeeb = (e: React.FormEvent) => {
        e.preventDefault();
        const keebData: KeebData = {
            id: keeb.id,
            userId: keeb.userId,
        };
        const keebCookie = hasCookie("keeb");

        if (keebCookie) {
            deleteCookie("keeb", {
                path: "/",
                // domain: ".keeb.live", will need to update when live
            });
        }

        mutate(keebData);
    };

    const cancelDelete = (e: React.FormEvent) => {
        e.preventDefault();
        closeModal();
    };

    return (
        <>
            <div> Are you sure you want to delete </div>
            <div>{keeb.name}</div>

            <div>
                Deleting a keyboard will permanently delete the typing data
                associated with it
            </div>

            <button
                onClick={deleteKeeb}
                className="rounded-2xl bg-black px-6 py-2"
            >
                GoodBye Forever{" "}
            </button>
            <button
                onClick={cancelDelete}
                className="rounded-2xl bg-black px-6 py-2"
            >
                Cancel{" "}
            </button>
        </>
    );
}
