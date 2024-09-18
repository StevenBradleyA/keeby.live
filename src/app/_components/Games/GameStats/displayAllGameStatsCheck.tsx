"use client";
import { api } from "~/trpc/react";
// import LoadingSpinner from "~/app/_components/Loading";
import DisplayAllGameStats from "./gameStatsConfigurator";

export default function DisplayAllGameStatsCheck({
    userId,
}: {
    userId: string;
}) {
    const { data: keebData } = api.keeb.getAllByUserId.useQuery(userId);


    return (
        <>
            {keebData && keebData.length > 0 && (
                <DisplayAllGameStats userId={userId} keebData={keebData} />
            )}
        </>
    );
}
