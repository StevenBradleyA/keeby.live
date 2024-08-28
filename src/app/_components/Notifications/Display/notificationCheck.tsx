"use client";
import { signIn } from "next-auth/react";
import type { Session } from "next-auth";
import DisplayNotifications from "./displayNotifications";

interface NotificationCheckProps {
    setIsMenuOpen: (isMenuOpen: boolean) => void;
    setIsSecondaryMenuOpen: (isSecondaryMenuOpen: boolean) => void;
    session: Session | null;
}

export default function NotificationCheck({
    setIsMenuOpen,
    setIsSecondaryMenuOpen,
    session,
}: NotificationCheckProps) {
    return (
        <>
            {session === null ? (
                <div className="relative w-full">
                    <button
                        className=" mb-2 flex w-full gap-2 rounded-md bg-white/5 p-2 text-xs text-mediumGray ease-in hover:bg-white/10 "
                        onClick={() => void signIn()}
                    >
                        <div className="flex w-full flex-col items-start">
                            <div className="flex w-full justify-between  ">
                                <h3 className="flex w-full justify-start ">
                                    Notification
                                </h3>
                                <p className=" flex-shrink-0 text-mediumGray">
                                    welcome to Keeby
                                </p>
                            </div>
                            <h2 className="mt-2 text-green-500 ">
                                Sign in to see notifications
                            </h2>
                        </div>
                    </button>
                </div>
            ) : (
                <DisplayNotifications
                    userId={session.user.id}
                    setIsMenuOpen={setIsMenuOpen}
                    setIsSecondaryMenuOpen={setIsSecondaryMenuOpen}
                />
            )}
        </>
    );
}
