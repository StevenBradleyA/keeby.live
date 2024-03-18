import { useSession } from "next-auth/react";
import Image from "next/image";
import defaultProfile from "@public/Profile/profile-default.png";

interface EachGameResultCard {}

export default function EachGameResultCard({ gameResults }) {
    const { data: session } = useSession();
    // react-vis
    return (
        <div className="flex w-full flex-col ">
            <div className="w-full bg-green-300 ">{gameResults.mode}</div>
            <div className="flex w-full gap-5  bg-red-200">
                <div className="mt-10 h-full w-1/4 shadow-md">
                    <div className="border-2 border-green-500 p-3">
                        <h2>wpm</h2>
                        {gameResults.wpm}
                        <h2>purewpm </h2>
                        {gameResults.pureWpm}
                    </div>

                    <div>
                        <h2>accuracy</h2>
                        {gameResults.accuracy}
                    </div>

                    {session && session.user && (
                        <div className="flex ">
                            <div className="h-full">
                                <Image
                                    alt="profile"
                                    src={
                                        session.user.profile
                                            ? session.user.profile
                                            : defaultProfile
                                    }
                                    width={400}
                                    height={400}
                                    className="h-28 w-28 rounded-md object-cover"
                                />
                            </div>
                            <div className="flex flex-col ">
                                user info stuff
                            </div>
                        </div>
                    )}
                </div>

                <div className="h-full w-1/2 ">
                    {" "}
                    graph data (wpm over time and accuracy rate over time)
                </div>

                <div className="mt-10 h-full w-1/4 bg-purple-100">
                    keeb info mode? rank info
                </div>
            </div>
        </div>
    );
}
