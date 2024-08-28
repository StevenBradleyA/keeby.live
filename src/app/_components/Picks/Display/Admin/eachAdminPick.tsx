"use client";

import type { Pick } from "@prisma/client";

interface EachAdminPickProps {
    pick: Pick;
}

export default function EachAdminPick({ pick }: EachAdminPickProps) {

// this needs to manage delete/edit

    return (
        <>
            <div className="w-80 h-60 bg-black rounded-3xl">{pick.title}</div>
        </>
    );
}
