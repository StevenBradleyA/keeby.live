"use client";

import dynamic from "next/dynamic";
import LoadingSpinner from "~/app/_components/Loading";

const Profile = dynamic(() => import("../_components/Profile/User/profile"), {
    loading: () => (
        <div className="w-full flex justify-center px-2 tablet:px-5">
            <div className="mt-48 flex w-full desktop:w-3/4 gap-2 tablet:gap-10 desktop:gap-20  ">
                <div className="w-1/2">
                    <div className="bg-gray-500/10 w-full h-5"></div>
                    <div className="bg-black/10 w-full h-40 mt-3 skeleton-dark-glow"></div>
                    <div className="bg-black/10 w-full h-[500px] mt-20 skeleton-dark-glow"></div>
                </div>
                <div className="w-1/2">
                    <div className="bg-black/10 w-full h-[500px] skeleton-dark-glow"></div>
                    <div className="bg-gray-500/10 w-full h-5 mt-20"></div>
                    <div className="bg-gray-500/10 w-full h-5 mt-3"></div>
                    <div className="bg-gray-500/10 w-full h-5 mt-3"></div>
                    <div className="bg-gray-500/10 w-full h-5 mt-3"></div>
                </div>
            </div>
        </div>
    ),
    ssr: false,
});

export default function ProfilePage() {
    return (
        <>
            <Profile />
        </>
    );
}
