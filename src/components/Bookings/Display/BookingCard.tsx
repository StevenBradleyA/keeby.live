import { useSession } from "next-auth/react";
import { useState } from "react";
import { format } from "date-fns";
import type { GCHBooking } from "@prisma/client";
import UpdateBooking from "../Update";
import DeleteBooking from "../Delete";

export default function BookingCard({ booking }: { booking: GCHBooking }) {
    const { data: session } = useSession();
    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    return (
        <div>
            {!showUpdate && (
                <>
                    <div className="text-slate-200">
                        {format(booking.date, "PPP")}
                    </div>
                </>
            )}

            {session && (
                <>
                    {!showDelete && (
                        <UpdateBooking
                            booking={booking}
                            session={session}
                            showUpdate={showUpdate}
                            setShowUpdate={setShowUpdate}
                        />
                    )}

                    {!showUpdate && (
                        <DeleteBooking
                            id={booking.id}
                            session={session}
                            showDelete={showDelete}
                            setShowDelete={setShowDelete}
                        />
                    )}
                </>
            )}
        </div>
    );
}
