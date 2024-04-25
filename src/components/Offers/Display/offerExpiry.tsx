import { addDays, intervalToDuration, isAfter } from "date-fns";
import { useEffect } from "react";

export default function OfferExpiry({
    updatedAt,
    setCanCancel,
}: {
    updatedAt: Date;
    setCanCancel: (canCancel: boolean) => void;
}) {
    const expirationDate = addDays(new Date(updatedAt), 7);

    useEffect(() => {
        const now = new Date();
        const expired = isAfter(now, expirationDate);
        setCanCancel(expired);
    }, [updatedAt, setCanCancel]);

    const formatDuration = (fromDate: Date, toDate: Date) => {
        const duration = intervalToDuration({ start: fromDate, end: toDate });
        const parts = [];
        if (duration.days) {
            parts.push(
                `${duration.days} ${duration.days === 1 ? "day" : "days"}`
            );
        }
        if (duration.hours) {
            parts.push(
                `${duration.hours} ${duration.hours === 1 ? "hour" : "hours"}`
            );
        }
        return parts.join(", ");
    };

    return (
        <p>
            {isAfter(new Date(), expirationDate)
                ? "Offer has exceeded 7 days, you can cancel it"
                : `Buyer has ${formatDuration(
                      new Date(),
                      expirationDate
                  )} to verify`}
        </p>
    );
}
