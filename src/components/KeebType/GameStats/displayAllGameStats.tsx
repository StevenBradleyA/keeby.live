import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { getCookies } from "cookies-next";
import type { Keeb } from "@prisma/client";

interface DisplayAllGameStatsProps {
    userId: string;
    keebData: Keeb[];
}

export default function DisplayAllGameStats({
    userId,
    keebData,
}: DisplayAllGameStatsProps) {
    const cookies = getCookies();

    const [mode, setMode] = useState<string>("Speed");
    const [keebId, setKeebId] = useState<string>(
        keebData[0] ? keebData[0].id : ""
    );
    const [keeb, setKeeb] = useState<string>(
        keebData[0] ? keebData[0].name : ""
    );

    useEffect(() => {
        if (cookies.mode) {
            setMode(cookies.mode);
        }

        if (cookies.keeb) {
            setKeeb(cookies.keeb);
        }

        if (cookies.keebId) {
            setKeebId(cookies.keebId);
        }
    }, [cookies]);

    console.log("yo", mode);
    console.log("keebId", keebId);
    console.log("keeb name", keeb);

    //    what if the user clears their cookies what then?
    // we need to take the userId and get all their keeb data then grab the first one.
    // we should check cookies for mode and keeb but if they don't exist we need to default to the first keeb they have and speed mode

    return (
        <>
            <div>uh hey</div>
            {keebId}
            {keeb}
            {mode}
        </>
    );
}
