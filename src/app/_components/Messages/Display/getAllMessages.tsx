"use client";
import { api } from "~/trpc/react";
import LoadingSpinner from "../../Loading";
import Image from "next/image";
import defaultProfile from "@public/Images/defaultProfile.png";
import keebo from "@public/Profile/keebo.png";
import DisplayMessages from "./displayMessages";

export default function GetAllMessages({ userId }: { userId: string }) {
    const { data: messages, isLoading } =
        api.message.getAllByUserId.useQuery(userId);

    if (isLoading) {
        return (
            <div className="mt-40 ml-20 text-messageBlue">
                <LoadingSpinner size="20px" />
            </div>
        );
    }
    return (
        <>
            {messages && messages.length > 0 ? (
                <DisplayMessages userId={userId} messages={messages} />
            ) : (
                <div className="flex h-[80vh] w-full gap-2 tablet:px-4 desktop:px-16 px-3 mt-40 ">
                    <div className="h-full w-1/4 overflow-y-auto rounded-xl bg-darkGray tablet:p-2 desktop:p-3 flex flex-col gap-2">
                        <div className=" flex w-full gap-2 rounded-md  p-2 text-xs ease-in hover:bg-white/10 bg-white/5">
                            <Image
                                src={defaultProfile}
                                alt="profile"
                                height={300}
                                width={300}
                                className="mt-1 h-12 w-12 rounded-md object-cover"
                                priority
                            />
                            <div className="flex w-full flex-col items-start">
                                <div className="flex w-full justify-between  ">
                                    <div className="flex w-full justify-start text-white">
                                        Keeby
                                    </div>
                                    <div className=" flex-shrink-0 text-mediumGray">
                                        10/10 would message again
                                    </div>
                                </div>
                                <h1 className="mt-1 tablet:text-xs desktop:text-base text-messageBlue">
                                    You have no messages
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="h-full w-3/4 ">
                        <div className="flex justify-center items-end gap-1 text-messageBlue text-xl">
                            <h1>{`Keeby's Private Messenger`} </h1>
                            <Image
                                src={keebo}
                                alt="keeby mascot"
                                className="w-8 h-8 object-contain"
                            />
                        </div>

                        <div className=" flex justify-start rounded-md pl-3 mt-10 ">
                            <Image
                                alt="profile"
                                src={defaultProfile}
                                width={300}
                                height={300}
                                className="h-10 w-10 rounded-md"
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
                                When you buy a keeb on marketplace you will be
                                put into a private messenger with the seller
                                here!
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
