import { api } from "~/utils/api";

export default function DisplayNotificationCount({
    userId,
}: {
    userId: string;
}) {
    const { data: notifications } =
        api.notification.getCountByUserId.useQuery(userId);

    return notifications ? (
        <div className="absolute -right-0 -top-0 text-[10px] text-red-500">
            {notifications > 0 ? notifications : ""}
        </div>
    ) : null;
}
