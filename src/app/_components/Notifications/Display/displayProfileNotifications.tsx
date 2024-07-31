import { api } from "~/utils/api";
import type { RefObject } from "react";

export default function DisplayProfileNotifications({
    userId,
    setToggle,
    setKeebShopCategory,
    scrollRef,
}: {
    userId: string;
    setToggle: (toggle: string) => void;
    setKeebShopCategory: (keebShopCategory: string) => void;
    scrollRef: RefObject<HTMLDivElement | null>;
}) {
    const { data: notification } =
        api.notification.getOfferNotificationsByUserId.useQuery(userId);

    return (
        <div className="w-full">
            {notification && (
                <button
                    className=" mb-2 text-xs text-red-500"
                    onClick={() => {
                        setToggle("KEEBSHOP");
                        setKeebShopCategory("OFFERS");
                        scrollRef.current?.scrollIntoView({
                            behavior: "instant",
                        });
                    }}
                >
                    <div>{notification.text}</div>
                </button>
            )}
        </div>
    );
}
