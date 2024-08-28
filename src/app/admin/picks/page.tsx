"use client";

import dynamic from "next/dynamic";
import LoadingSpinner from "~/app/_components/Loading";

const AdminPicksDisplay = dynamic(
    () => import("~/app/_components/Picks/Display/Admin/displayAdminPicks"),
    {
        loading: () => (
            <div className="mt-60 flex w-full justify-center text-green-500">
                <LoadingSpinner size="20px" />
            </div>
        ),
        ssr: false,
    },
);

export default function AdminPicksPage() {
    return (
        <>
            <AdminPicksDisplay />
        </>
    );
}
