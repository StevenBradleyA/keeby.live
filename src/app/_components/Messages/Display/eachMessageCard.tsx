import type { Message } from "@prisma/client";
import defaultProfile from "@public/Images/defaultProfile.png";
import Image from "next/image";

interface EachMessageCardProps {
    userId: string;
    message: EachMessage;
}
interface EachMessage extends Message {
    user: {
        profile: string | null;
    };
}

export default function EachMessageCard({
    message,
    userId,
}: EachMessageCardProps) {
    return (
        <div className="w-full overflow-x-hidden ">
            {message.userId === userId ? (
                <div className=" flex  justify-end rounded-md pr-3 ">
                    <div
                        className="whitespace-pre-wrap break-words  rounded-md px-4 py-2 text-messageBlue bg-messenger "
                        style={{
                            maxWidth: "66.666%",
                        }}
                    >
                        {message.text}
                    </div>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="relative  -left-[7px] top-[3px] h-6 w-6 rotate-45"
                        style={{
                            color: "rgba(25, 147, 147, 0.2)",
                        }}
                        viewBox="0 0 16 16"
                        version="1.1"
                        fill="currentColor"
                    >
                        <rect
                            width="16"
                            height="16"
                            id="icon-bound"
                            fill="none"
                        />
                        <polygon points="3,8 11,0 11,16" />
                    </svg>
                    <Image
                        alt="profile"
                        src={
                            message.user.profile
                                ? message.user.profile
                                : defaultProfile
                        }
                        width={200}
                        height={200}
                        className="h-10 w-10 rounded-md object-cover"
                    />
                </div>
            ) : (
                <div className=" flex justify-start rounded-md pl-3 ">
                    <Image
                        alt="profile"
                        src={
                            message.user.profile
                                ? message.user.profile
                                : defaultProfile
                        }
                        width={200}
                        height={200}
                        className="h-10 w-10 rounded-md object-cover"
                    />

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="relative  -right-[7px] top-[3px] h-6 w-6"
                        style={{
                            color: "rgba(25, 147, 147, 0.2)",
                            transform: "scaleX(-1) rotate(45deg)",
                        }}
                        viewBox="0 0 16 16"
                        version="1.1"
                        fill="currentColor"
                    >
                        <rect
                            width="16"
                            height="16"
                            id="icon-bound"
                            fill="none"
                        />
                        <polygon points="3,8 11,0 11,16" />
                    </svg>
                    <div
                        className="whitespace-pre-wrap break-words rounded-md bg-darkGray px-4 py-2 text-messageGreen bg-messenger"
                        style={{
                            maxWidth: "66.666%",
                        }}
                    >
                        {message.text}
                    </div>
                </div>
            )}
        </div>
    );
}
