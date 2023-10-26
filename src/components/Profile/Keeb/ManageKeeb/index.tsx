import { useState } from "react";
import { api } from "~/utils/api";
import type { Keeb } from "@prisma/client";

interface ManageKeebProps {
    closeModal: () => void;
    userId: string;
}

export default function ManageKeeb({ closeModal, userId }: ManageKeebProps) {
    const ctx = api.useContext();
    const { data: keebData, isLoading } = api.keeb.getAll.useQuery();
    const [selectedKeeb, setSelectedKeeb] = useState<object>({});
    const [keebDirect, setKeebDirect] = useState<string>("");

    const selectKeeb = (keeb: Keeb) => {
        setSelectedKeeb(keeb);
    };

    return (
        <div className="">
            {Object.values(selectedKeeb).length === 0 && (
                <div className="flex flex-col gap-2">
                    <h1>Select your keeb</h1>
                    {keebData?.map((keeb, i) => (
                        <button
                            key={i}
                            className="rounded-2xl bg-black px-6 py-2"
                            onClick={() => selectKeeb(keeb)}
                        >
                            {keeb.name}
                        </button>
                    ))}
                </div>
            )}

            {Object.values(selectedKeeb).length > 0 && (
                <>
                    {keebDirect === "" && (
                        <div className="flex gap-2">
                            <button
                                className="rounded-2xl bg-black px-6 py-2"
                                onClick={() => setKeebDirect("update")}
                            >
                                update
                            </button>
                            <button
                                className="rounded-2xl bg-black px-6 py-2"
                                onClick={() => setKeebDirect("delete")}
                            >
                                delete
                            </button>
                        </div>
                    )}
                    {keebDirect === "update" && <div>pog update</div>}
                    {keebDirect === "delete" && <div>pog delete</div>}
                </>
            )}
        </div>
    );
}
