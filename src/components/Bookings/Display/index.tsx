import { api } from "~/utils/api";
import type { GCHBooking } from "@prisma/client";
import type { Session } from "next-auth";
import BookingCard from "./BookingCard";

export default function DisplayBookings({ session }: { session: Session }) {
    if (!session) return <div>Please login to see appointments</div>;

    const { data: bookings, isLoading } = api.booking.getByUserId.useQuery(
        session.user.id
    );

    if (isLoading) return <div>Loading All Bookings...</div>;

    if (!bookings || (bookings && !bookings.length)) return <div>Oops</div>;

    return (
        <>
            {bookings.map((booking: GCHBooking, i: number) => {
                return <BookingCard key={i} booking={booking} />;
            })}
        </>
    );
}
