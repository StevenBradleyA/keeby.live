import type { Notification } from "@prisma/client";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";
import {
    format,
    formatDistanceToNow,
    isToday,
    isYesterday,
    isThisYear,
} from "date-fns";

interface EachNotificationCardProps {
    notification: Notification;
}

export default function EachNotificationCard({
    notification,
}: EachNotificationCardProps) {
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
        <>
            <button
                className="relative mb-2 flex w-full gap-2 rounded-md bg-white/5 p-2   text-xs text-darkGray transition-background duration-400 ease-custom-cubic hover:bg-white/10 "
                // onClick={() => setActiveTransactionId(message.listingTransactionId)}
            >
                <div className="flex w-full flex-col items-start">
                    <div className="flex w-full justify-between  ">
                        <div className="flex w-full justify-start ">
                            Notification
                        </div>
                        <div className=" flex-shrink-0 text-darkGray">
                            {formatDate(notification.createdAt)}
                        </div>
                    </div>
                    <h1 className="mt-2 text-green-500 ">
                        {notification.text}
                    </h1>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    className="w-4 h-4 bg-white/20 rounded-full p-[2px] absolute -bottom-1 right-0 hover:bg-green-500 duration-400 transition-background ease-custom-cubic"
                    viewBox="0 0 32 32"
                    // onClick={}
                >
                    <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z" />
                </svg>
            </button>
        </>
    );
}
