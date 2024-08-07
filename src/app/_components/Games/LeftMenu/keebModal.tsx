"use client";
import { setCookie } from "cookies-next";
import type { ThemeStyle } from "../Theme/themeStyles";
import { api } from "~/trpc/react";
import { useEffect } from "react";
import LoadingSpinner from "../../Loading";

interface KeebModalProps {
    setGameOver: (gameOver: boolean) => void;
    setKeebId: (keebId: string) => void;
    keebId: string;
    styles: ThemeStyle;
    closeKeebModal: () => void;
    userId: string;
}

export default function KeebModal({
    userId,
    setKeebId,
    keebId,
    styles,
    closeKeebModal,
    setGameOver,
}: KeebModalProps) {
    const { data: keebData, isLoading } =
        api.keeb.getAllByUserId.useQuery(userId);

    const handleKeebChange = (newKeeb: string, newKeebId: string) => {
        setCookie("keebId", newKeebId, {
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
        });
        setGameOver(false);
        setKeebId(newKeebId);
        closeKeebModal();
    };

    useEffect(() => {
        if (keebId === "") {
            if (keebData) {
                setKeebId(keebData[0] ? keebData[0].id : "");
            }
        }
    }, [keebId, setKeebId, keebData]);

    if (isLoading) return <LoadingSpinner size="20px" />;

    return (
        <>
            <div className="flex flex-col gap-5 w-[400px] h-[300px]">
                {keebData &&
                    keebData.length > 0 &&
                    keebData.map((e) => (
                        <button
                            key={e.id}
                            className={` w-full items-center rounded-lg hover:brightness-110 ease-in flex justify-center text-white ${styles.backgroundColor} p-3 ${keebId === e.id ? "border-2 border-white" : ""}`}
                            onClick={() => handleKeebChange(e.name, e.id)}
                        >
                            {e.name}
                        </button>
                    ))}
            </div>
        </>
    );
}
