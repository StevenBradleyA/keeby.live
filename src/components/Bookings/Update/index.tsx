import { useState } from "react";
import { api } from "~/utils/api";
import { DayPicker } from "react-day-picker";
import type { GCHBooking } from "@prisma/client";
import type { Session } from "next-auth";
import { isEqual } from "date-fns";

interface UpdateProps {
    booking: GCHBooking;
    session: Session;
    showUpdate: boolean;
    setShowUpdate: (show: boolean) => void;
}

export default function UpdateBooking({
    booking,
    session,
    showUpdate,
    setShowUpdate,
}: UpdateProps) {
    const [date, setDate] = useState<Date>();
    const { data: check } = api.booking.getByDate.useQuery(date);

    const checkConflicts = () => {
        if (!date) return true;
        if (date && check && isEqual(check.date, date)) return true;
        return false;
    };

    const book = (e: React.FormEvent) => {
        e.preventDefault();

        if (session && session.user && session.user.id && date) {
            const data = {
                date,
                id: booking.id,
                userId: session.user.id,
            };

            setDate(undefined);

            return mutate(data);
        } else {
            throw new Error("Hot Toast Incoming!!!");
        }
    };

    const ctx = api.useContext();

    const { mutate } = api.booking.update.useMutation({
        onSuccess: () => {
            void ctx.booking.getByUserId.invalidate();
            void ctx.booking.getAllBookedDates.invalidate();
            setShowUpdate(false);
        },
    });

    return (
        <>
            {!showUpdate && (
                <button onClick={() => setShowUpdate(true)}>✏️</button>
            )}
            {showUpdate && (
                <form
                    onSubmit={book}
                    className="container flex flex-col items-center justify-center px-4 py-16"
                >
                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="shadow-3xl  rounded-lg bg-white"
                    />
                    <div>
                        <button
                            disabled={checkConflicts()}
                            className="mx-2 rounded-lg bg-blue-500 px-4 py-1 text-white transition-all duration-200 hover:scale-105 hover:bg-blue-600 disabled:bg-slate-300 disabled:text-slate-500"
                        >
                            Update
                        </button>
                        <button
                            className={`mx-2 rounded-lg border px-4 py-1 text-slate-200 `}
                            onClick={() => {
                                setShowUpdate(false);
                                setDate(booking.date);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </>
    );
}
