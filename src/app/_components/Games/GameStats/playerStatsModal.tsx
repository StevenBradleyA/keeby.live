"use client";
import { signIn, useSession } from "next-auth/react";
import PlayerStatsModalCheck from "./playerStatsModalCheck";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";

export default function PlayerStatsModal() {
    const { data: session } = useSession();

    return (
        <>
            <div className=" w-[50vw] desktop:w-[60vw] laptop:w-[70vw] h-[80vh] laptop:h-[70vh] desktop:h-[60vh] text-xs flex flex-col overflow-y-auto px-1 laptop:px-5">
                {session && session.user ? (
                    <PlayerStatsModalCheck userId={session.user.id} />
                ) : (
                    <div className="flex w-full justify-center mt-10 flex-col items-center text-mediumGray">
                        <div className="bg-black/10 rounded-lg p-5 flex text-sm items-center  gap-5 w-3/4 h-16 justify-center "></div>
                        <div className="mt-3 gap-5 flex">
                            <div className="bg-black/10 rounded-lg w-20 h-8"></div>
                            <div className="bg-black/10 rounded-lg w-20 h-8"></div>
                            <div className="bg-black/10 rounded-lg w-20 h-8"></div>
                        </div>
                        <div className="bg-black/10 rounded-lg w-full mt-5 h-[350px] flex justify-center items-center ">
                            <div className=" w-full flex justify-center">
                                <div className="flex flex-col items-center">
                                    <div className="flex items-end gap-2">
                                        <h1 className="text-lg text-green-500">
                                            Sign in to see your stats
                                        </h1>
                                        <Image
                                            alt="keebo"
                                            src={keebo}
                                            className="h-10 w-10 object-contain"
                                        />
                                    </div>
                                    <div className=" mt-5 flex justify-center">
                                        <button
                                            className="text-md keeb-share-preview-button flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                                            style={{
                                                boxShadow: "0 0 20px #22C55E",
                                            }}
                                            onClick={() => void signIn()}
                                        >
                                            <svg
                                                className="keeb-share-preview-button-arrow w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="3"
                                                    d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                                                ></path>
                                            </svg>
                                            <span className="keeb-share-preview-button-text">
                                                {`Let's Go `}
                                            </span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                className="keeb-share-preview-button-circle w-2"
                                                viewBox="0 0 32 32"
                                            >
                                                <circle
                                                    cx="16"
                                                    cy="16"
                                                    r="16"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
