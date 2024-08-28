"use client";

import dynamic from "next/dynamic";
import LoadingSpinner from "~/app/_components/Loading";

const ProfilePlus = dynamic(
    () => import("../_components/Profile/User/Update/profilePlus"),
    {
        loading: () => (
            <div className="mt-60 flex w-full justify-center text-green-500">
                <LoadingSpinner size="20px" />
            </div>
        ),
        ssr: false,
    },
);

export default function ProfilePlusPage() {
    return <ProfilePlus />;
}
