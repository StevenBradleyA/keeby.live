"use client";
import { api } from "~/trpc/react";

export default function DisplayNotificationCount({
    userId,
}: {
    userId: string;
}) {
    const { data: notifications } =
        api.notification.getCountByUserId.useQuery(userId);

    return notifications && notifications > 0 ? (
        <div className="absolute -right-1 -top-1 text-xs text-green-500">
            {notifications}
        </div>
    ) : null;
}
