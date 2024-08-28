"use client";

import dynamic from "next/dynamic";
import LoadingSpinner from "~/app/_components/Loading";

const DynamicHeader = dynamic(
    () => import("~/app/_components/Listings/Create/createListingForm"),
    {
        loading: () => (
            <div className="mt-60 flex w-full justify-center text-green-500">
                <LoadingSpinner size="20px" />
            </div>
        ),
        ssr: false,
    },
);

export default function CreateListingPage() {
    return <DynamicHeader />;
}
