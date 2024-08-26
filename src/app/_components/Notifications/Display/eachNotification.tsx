"use client";
import type { Notification } from "@prisma/client";
import { api } from "~/trpc/react";
import {
    format,
    formatDistanceToNow,
    isToday,
    isYesterday,
    isThisYear,
} from "date-fns";
import toast from "react-hot-toast";
import Link from "next/link";

interface EachNotificationCardProps {
    notification: Notification;
    setIsMenuOpen: (isMenuOpen: boolean) => void;
    setIsSecondaryMenuOpen: (isSecondaryMenuOpen: boolean) => void;
}

export default function EachNotificationCard({
    notification,
    setIsMenuOpen,
    setIsSecondaryMenuOpen,
}: EachNotificationCardProps) {
    const utils = api.useUtils();

    // serverInteractions
    const { mutate: deleteNotification } = api.notification.delete.useMutation({
        onSuccess: () => {
            toast.success("Notification Deleted!", {
                icon: "🫡",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            void utils.notification.getAllByUserId.invalidate();
            void utils.notification.getCountByUserId.invalidate();
        },
    });

    // notification function
    let notificationLink = "/profile";

    if (
        typeof notification.typeId === "string" &&
        notification.type === "LISTINGCOMMENT"
    ) {
        notificationLink = `/marketplace/${notification.typeId}`;
    } else if (notification.type === "LISTINGCREATE") {
        notificationLink = `/create-listing`;
    } else if (
        typeof notification.typeId === "string" &&
        notification.type === "POSTCOMMENT"
    ) {
        notificationLink = `/keebshare/${notification.typeId}`;
    } else if (notification.type === "MESSAGE") {
        notificationLink = `/profile/messages`;
    }
    if (
        typeof notification.typeId === "string" &&
        notification.type === "OFFERREJECT"
    ) {
        notificationLink = `/marketplace/${notification.typeId}`;
    }

    // helpers
    const formatDate = (date: Date) => {
        if (isToday(date)) {
            return formatDistanceToNow(date, { addSuffix: true });
        } else if (isYesterday(date)) {
            return "Yesterday";
        } else if (
            new Date().getDay() - date.getDay() < 7 &&
            new Date().getDay() - date.getDay() > 0
        ) {
            return format(date, "EEEE");
        } else if (isThisYear(date)) {
            return format(date, "M/d");
        } else {
            return format(date, "M/d/yyyy");
        }
    };

    return (
        <div className="relative w-full">
            <Link
                className=" flex w-full gap-2 rounded-md bg-white/5 p-2 text-xs text-mediumGray ease-in hover:bg-white/10 "
                aria-label="notification"
                href={notificationLink}
                onClick={() => {
                    setIsMenuOpen(false);
                    setIsSecondaryMenuOpen(false);
                }}
            >
                <div className="flex w-full flex-col items-start">
                    <div className="flex w-full justify-between  ">
                        <div className="flex w-full justify-start ">
                            Notification
                        </div>
                        <div className=" flex-shrink-0 text-mediumGray">
                            {formatDate(notification.createdAt)}
                        </div>
                    </div>
                    <h1 className="mt-2 text-green-500 ">
                        {notification.text}
                    </h1>
                </div>
            </Link>
            <button className="absolute -bottom-1 right-0 z-10 rounded-full bg-white/20 p-[2px] ease-in hover:bg-green-500">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    className="h-3 w-3"
                    viewBox="0 0 32 32"
                    onClick={() =>
                        deleteNotification({
                            id: notification.id,
                            userId: notification.userId,
                        })
                    }
                >
                    <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z" />
                </svg>
            </button>
        </div>
    );
}
