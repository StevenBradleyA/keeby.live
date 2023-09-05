import { api } from "~/utils/api";
import CreateBooking from "../../components/Bookings/Create";
import DisplayBookings from "../../components/Bookings/Display";
import { useSession } from "next-auth/react";

export interface CalendarOptions {
    disabled: (
        | Date
        | {
              from: Date;
              to: Date;
          }
    )[];
    fromYear: number;
    fromMonth: Date;
    modifiers: {
        booked: Date[];
    };
    modifiersStyles: {
        booked: {
            color: string;
            fontWeight: string;
            textDecoration: string;
        };
    };
    fixedWeeks: boolean;
    showOutsideDays: boolean;
}

const createCalendarOptions = (booked: Date[]): CalendarOptions => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const yesterday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
    );

    const disabled = [...booked, { from: startOfMonth, to: yesterday }];

    const options = {
        disabled,
        fromYear: today.getFullYear(),
        fromMonth: today,
        modifiers: { booked },
        modifiersStyles: {
            booked: {
                color: "red",
                fontWeight: "bolder",
                textDecoration: "line-through",
            },
        },
        fixedWeeks: true,
        showOutsideDays: true,
    };

    return options;
};

export default function Booking() {
    const { data: session } = useSession();

    let { data: booked } = api.booking.getAllBookedDates.useQuery();
    if (!booked) booked = [];

    return (
        <>
            {session && (
                <>
                    <CreateBooking {...createCalendarOptions(booked)} />
                    <DisplayBookings session={session} />
                </>
            )}
        </>
    );
}
