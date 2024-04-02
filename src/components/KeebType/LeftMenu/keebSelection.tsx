import { api } from "~/utils/api";
import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

interface MenuKeebSelectionProps {
    userId: string;
    keeb: string;
    setKeeb: (keeb: string) => void;
    keebId: string;
    setKeebId: (keebId: string) => void;
    background: string;
}

export default function MenuKeebSelection({
    userId,
    keeb,
    setKeeb,
    keebId,
    setKeebId,
    background,
}: MenuKeebSelectionProps) {
    const { data: keebData } = api.keeb.getAllByUserId.useQuery(userId);

    const [selectedKeeb, setSelectedKeeb] = useState<{
        id: string;
        name: string;
    }>({
        id: keebId,
        name: keeb,
    });

    useEffect(() => {
        if (keeb === "" || keebId === "") {
            setKeeb(keebData && keebData[0] ? keebData[0].name : "");
            setKeebId(keebData && keebData[0] ? keebData[0].id : "");
            setSelectedKeeb({
                id: keebData && keebData[0] ? keebData[0].id : "",
                name: keebData && keebData[0] ? keebData[0].name : "",
            });
        }
    }, [keeb, keebId, setKeeb, setKeebId, keebData]);

    const handleKeebChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newKeebId: string = e.target.value;
        if (keebData && keebData.length > 0) {
            const newKeeb = keebData.find((keeb) => keeb.id === newKeebId);
            if (newKeeb) {
                setCookie("keeb", newKeeb.name, {
                    maxAge: 60 * 60 * 24 * 365,
                    path: "/",
                });
                setCookie("keebId", newKeebId, {
                    maxAge: 60 * 60 * 24 * 365,
                    path: "/",
                });
                setSelectedKeeb({ id: newKeeb.id, name: newKeeb.name });
                setKeeb(newKeeb.name);
                setKeebId(newKeeb.id);
            }
        }
    };

    return (
        <>
            {keebData && keebData.length > 0 && (
                <>
                    <label className="mt-2 ">Keeb</label>
                    <select
                        className={`
                    rounded-md ${background} py-1 shadow-sm`}
                        value={selectedKeeb ? selectedKeeb.id : ""}
                        onChange={handleKeebChange}
                    >
                        {keebData.map((e) => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </>
            )}
        </>
    );
}
