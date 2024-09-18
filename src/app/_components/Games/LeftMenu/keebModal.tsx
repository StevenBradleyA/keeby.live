"use client";
import { setCookie } from "cookies-next";
import type { ThemeStyle } from "../Theme/themeStyles";
import { api } from "~/trpc/react";
import { useGlobalState } from "../../Context/GlobalState/globalState";

interface KeebModalProps {
    setGameOver: (gameOver: boolean) => void;
    styles: ThemeStyle;
    closeKeebModal: () => void;
    userId: string;
}

export default function KeebModal({
    userId,
    styles,
    closeKeebModal,
    setGameOver,
}: KeebModalProps) {
    const { keebId, setKeebId } = useGlobalState();

    const { data: keebData, isLoading } =
        api.keeb.getAllByUserId.useQuery(userId);

    const handleKeebChange = (newKeebId: string) => {
        setCookie("keebId", newKeebId, {
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
        });
        setGameOver(false);
        setKeebId(newKeebId);
        closeKeebModal();
    };

    if (isLoading)
        return (
            <div className="flex flex-col gap-5 w-[400px] h-[50vh]">
                <div className="skeleton-dark-glow h-12 rounded-lg"></div>
                <div className="skeleton-dark-glow h-12 rounded-lg"></div>
                <div className="skeleton-dark-glow h-12 rounded-lg"></div>
            </div>
        );

    return (
        <>
            <div className="flex flex-col gap-5 w-[400px] h-[50vh]">
                {keebData &&
                    keebData.length > 0 &&
                    keebData.map((e) => (
                        <button
                            key={e.id}
                            className={` w-full items-center rounded-lg hover:brightness-110 ease-in flex justify-center text-white ${styles.backgroundColor} p-3 ${keebId === e.id ? `border-2 ${styles.border}` : ""}`}
                            onClick={() => handleKeebChange(e.id)}
                        >
                            {e.name}
                        </button>
                    ))}
            </div>
        </>
    );
}
