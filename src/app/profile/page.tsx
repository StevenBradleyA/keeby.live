"use client";

import dynamic from "next/dynamic";
import LoadingSpinner from "~/app/_components/Loading";

const Profile = dynamic(() => import("../_components/Profile/User/profile"), {
    loading: () => (
        <div className="mt-60 flex w-full justify-center text-green-500">
            <LoadingSpinner size="20px" />
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
