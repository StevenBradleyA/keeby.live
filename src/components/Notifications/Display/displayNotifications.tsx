import { api } from "~/utils/api";
import EachNotificationCard from "./eachNotification";

export default function DisplayNotifications({ userId }: { userId: string }) {
    const { data: notifications } =
        api.notification.getAllByUserId.useQuery(userId);


    return (
        <div className="w-full">
            {notifications &&
                notifications.map((notification) => (
                    <div key={notification.id} className="w-full">
                        <EachNotificationCard notification={notification} />
                    </div>
                ))}
        </div>
    );
}
