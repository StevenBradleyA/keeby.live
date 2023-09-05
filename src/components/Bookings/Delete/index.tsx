import { api } from "~/utils/api";
import type { Session } from "next-auth";

interface DeleteProps {
    id: string;
    session: Session;
    showDelete: boolean;
    setShowDelete: (show: boolean) => void;
}

export default function DeleteBooking({
    id,
    session,
    showDelete,
    setShowDelete,
}: DeleteProps) {
    const ctx = api.useContext();

    const { mutate } = api.booking.delete.useMutation({
        onSuccess: () => {
            void ctx.booking.getByUserId.invalidate();
            void ctx.booking.getAllBookedDates.invalidate();
        },
    });

    const deleteBooking = () => {
        setShowDelete(false);
        if (session.user) {
            const data = {
                id,
                userId: session.user.id,
            };
            return mutate(data);
        } else {
            throw new Error("Hot Toast Incoming!!!");
        }
    };

    return (
        <>
            {!showDelete && (
                <button onClick={() => setShowDelete(true)}>🗑️</button>
            )}
            {showDelete && (
                <div>
                    <button onClick={deleteBooking}>🔥</button>
                    <button onClick={() => setShowDelete(false)}>❎</button>
                </div>
            )}
        </>
    );
}
