"use client";
import Image from "next/image";
import defaultProfile from "@public/Images/defaultProfile.png";
import { api } from "~/trpc/react";
import LoadingSpinner from "../../Loading";

export default function LeaderboardUserRank({ id }: { id: string }) {
    const { data: userRank, isLoading } = api.game.getUserRank.useQuery({
        id: id,
    });

    if (isLoading) {
        return (
            <div className=" flex w-full justify-center">
                <div className=" bg-black/30 rounded-lg p-3 flex flex-col items-center mt-3 min-w-[33%] ">
                    <Image
                        src={defaultProfile}
                        alt="user profile"
                        className="w-20 h-20 rounded-md"
                        width={300}
                        height={300}
                    />
                    <div className="text-xs mt-2 h-2"></div>
                    <LoadingSpinner size="12px" />
                </div>
            </div>
        );
    }

    return (
        <>
            {userRank && userRank.userRankNumber && (
                <div className=" flex w-full justify-center">
                    <div className=" bg-black/30 rounded-lg p-3 flex flex-col items-center mt-3 min-w-[33%] ">
                        <Image
                            src={
                                userRank.user.profile
                                    ? userRank.user.profile
                                    : defaultProfile
                            }
                            alt="user profile"
                            className="w-20 h-20 rounded-md"
                            width={300}
                            height={300}
                        />
                        <div className="text-sm">{userRank.user.username}</div>
                        <div className="w-full flex justify-between">
                            <div className="text-xs mt-2">
                                # {userRank.userRankNumber}
                            </div>
                            <div className="text-xs mt-2">
                                {userRank.user.rankedWpm} wpm
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
