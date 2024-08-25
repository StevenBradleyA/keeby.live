"use client";
import { api } from "~/trpc/react";
import EachNotificationCard from "./eachNotification";
import LoadingSpinner from "../../Loading";

export default function DisplayNotifications({
    userId,
    setIsMenuOpen,
    setIsSecondaryMenuOpen,
}: {
    userId: string;
    setIsMenuOpen: (isMenuOpen: boolean) => void;
    setIsSecondaryMenuOpen: (isSecondaryMenuOpen: boolean) => void;
}) {
    const { data: notifications, isLoading } =
        api.notification.getAllByUserId.useQuery(userId);

    if (isLoading) {
        return (
            <div className="p-3 text-green-500">
                <LoadingSpinner size="15px" />
            </div>
        );
    }

    return (
        <div className="w-full">
            {notifications && notifications.length > 0 ? (
                <>
                    {notifications.map((notification) => (
                        <div key={notification.id} className="w-full">
                            <EachNotificationCard
                                notification={notification}
                                setIsMenuOpen={setIsMenuOpen}
                                setIsSecondaryMenuOpen={setIsSecondaryMenuOpen}
                            />
                        </div>
                    ))}
                </>
            ) : (
                <div className="relative w-full">
                    <button className=" mb-2 flex w-full gap-2 rounded-md bg-white/5 p-2 text-xs text-mediumGray ease-in hover:bg-white/10 ">
                        <div className="flex w-full flex-col items-start">
                            <div className="flex w-full justify-between  ">
                                <h3 className="flex w-full justify-start ">
                                    Notification
                                </h3>
                                <p className=" flex-shrink-0 text-mediumGray">
                                    nothing new
                                </p>
                            </div>
                            <h2 className="mt-2 text-green-500 ">
                                All caught up!
                            </h2>
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
}
