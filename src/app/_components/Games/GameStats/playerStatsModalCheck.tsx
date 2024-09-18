"use client";
import { api } from "~/trpc/react";
import PlayerStatsKeebCheck from "./playerStatsKeebCheck";

export default function PlayerStatsModalCheck({ userId }: { userId: string }) {
    const { data: keebData } = api.keeb.getAllByUserId.useQuery(userId);

    return (
        <>
            {keebData && keebData.length > 0 && (
                <PlayerStatsKeebCheck userId={userId} keebData={keebData} />
            )}
        </>
    );
}
