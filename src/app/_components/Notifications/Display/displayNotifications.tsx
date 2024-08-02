import { api } from "~/trpc/react";
import EachNotificationCard from "./eachNotification";

export default function DisplayNotifications({ userId }: { userId: string }) {
    const { data: notifications } =
        api.notification.getAllByUserId.useQuery(userId);

    return (
        <div className="w-full">
            {notifications && notifications.length > 0 ? (
                <>
                    {notifications.map((notification) => (
                        <div key={notification.id} className="w-full">
                            <EachNotificationCard notification={notification} />
                        </div>
                    ))}
                </>
            ) : (
                <div
                    className=" mb-2 flex w-full gap-2 rounded-md bg-white/5 p-2 text-xs text-mediumGray transition-background duration-400 ease-custom-cubic hover:bg-white/10 "
                    aria-label="notification"
                >
                    <div className="flex w-full flex-col items-start">
                        <div className="flex w-full">No new notifications</div>

                        <h1 className="mt-2 text-green-500 ">All caught up!</h1>
                    </div>
                </div>
            )}
        </div>
    );
}
