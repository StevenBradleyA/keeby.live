"use client";
import { useSession } from "next-auth/react";
import { useState, type ChangeEvent } from "react";
import { setCookie } from "cookies-next";
import MenuKeebSelection from "./keebSelection";
import { themeStyles } from "../Theme/themeStyles";
import type { ThemeName } from "../Theme/themeStyles";
import ModalDialog from "../../Modal";
import ModeModal from "./modeModal";
import ThemeModal from "./themeModal";
import LengthModal from "./lengthModal";

interface LeftMenuProps {
    mode: string;
    setMode: (mode: string) => void;
    gameLength: number;
    setGameLength: (gameLength: number) => void;
    theme: string;
    setTheme: (theme: string) => void;
    keeb: string;
    setKeeb: (keeb: string) => void;
    keebId: string;
    setKeebId: (keebId: string) => void;
    scholarType: string;
    setScholarType: (scholarType: string) => void;
    setGameOver: (gameOver: boolean) => void;
}

export default function LeftMenu({
    mode,
    setMode,
    gameLength,
    setGameLength,
    theme,
    setTheme,
    keeb,
    setKeeb,
    keebId,
    setKeebId,
    scholarType,
    setScholarType,
    setGameOver,
}: LeftMenuProps) {
    // todo refactor theme to be a modal showing the color pallettes so it's easier to see as a user

    const { data: session } = useSession();
    const styles = themeStyles[theme as ThemeName] || themeStyles["KEEBY"];

    // modals
    const [isModeModalOpen, setIsModeModalOpen] = useState<boolean>(false);
    const [isLengthModalOpen, setIsLengthModalOpen] = useState<boolean>(false);
    const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);
    const [isScholarTypeModalOpen, setIsScholarTypeModalOpen] =
        useState<boolean>(false);
    const [isKeebModalOpen, setIsKeebModalOpen] = useState<boolean>(false);

    // const handleScholarTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    //     const newScholarType: string = e.target.value;
    //     setCookie("scholarType", newScholarType, {
    //         maxAge: 60 * 60 * 24 * 365,
    //         path: "/",
    //     });
    //     setScholarType(newScholarType);
    // };

    const openModeModal = () => {
        setIsModeModalOpen(true);
    };

    const closeModeModal = () => {
        setIsModeModalOpen(false);
    };

    const openLengthModal = () => {
        setIsLengthModalOpen(true);
    };

    const closeLengthModal = () => {
        setIsLengthModalOpen(false);
    };
    const openThemeModal = () => {
        setIsThemeModalOpen(true);
    };

    const closeThemeModal = () => {
        setIsThemeModalOpen(false);
    };
    const openScholarTypeModal = () => {
        setIsScholarTypeModalOpen(true);
    };

    const closeScholarTypeModal = () => {
        setIsScholarTypeModalOpen(false);
    };
    const openKeebModal = () => {
        setIsKeebModalOpen(true);
    };

    const closeKeebModal = () => {
        setIsKeebModalOpen(false);
    };

    // remove selects and lets do custom modals that look really cool and work with the current color theme...
    // above selections
    // --- below
    //stats
    // ranking
    // leaderboards?
    // typing layouts
    // learn about keyboards idk
    // could also add links to share -- marketplace -- shop

    return (
        <div
            className={`flex flex-col rounded-xl  border-opacity-50 ${styles.backgroundColor}  p-5 ${styles.hit} w-full h-full gap-3`}
        >
            <button
                className=" flex flex-col items-center justify-center hover:opacity-70 ease-in"
                onClick={openModeModal}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                >
                    <path d="M20.937 7.53C19.227 4.119 15.803 2 12 2 6.486 2 2 6.486 2 12s4.486 10 10 10c3.803 0 7.227-2.119 8.937-5.53a1 1 0 0 0-.397-1.316L15.017 12l5.522-3.153c.461-.264.636-.842.398-1.317zm-8.433 3.602a.999.999 0 0 0 0 1.736l6.173 3.525A7.949 7.949 0 0 1 12 20c-4.411 0-8-3.589-8-8s3.589-8 8-8a7.95 7.95 0 0 1 6.677 3.606l-6.173 3.526z" />
                    <circle cx="11.5" cy="7.5" r="1.5" />
                </svg>
                Mode
            </button>

            {mode === "speed" && (
                <>
                    <button
                        className=" flex flex-col items-center justify-center hover:opacity-70"
                        onClick={openLengthModal}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                        >
                            <path
                                id="primary"
                                d="M18,11.74a1,1,0,0,0-.52-.63L14.09,9.43,15,3.14a1,1,0,0,0-1.78-.75l-7,9a1,1,0,0,0-.18.87,1.05,1.05,0,0,0,.6.67l4.27,1.71L10,20.86a1,1,0,0,0,.63,1.07A.92.92,0,0,0,11,22a1,1,0,0,0,.83-.45l6-9A1,1,0,0,0,18,11.74Z"
                            />
                        </svg>
                        Length
                    </button>
                </>
            )}

            {mode === "scholar" && (
                <>
                    <label className="mt-2 ">Type</label>
                    <select
                        className={`
                    rounded-md ${styles.menuInputBackground} py-1 shadow-sm `}
                        value={scholarType}
                        onChange={handleScholarTypeChange}
                    >
                        <option value="Animals">animal</option>
                        <option value="Vocab">vocab</option>
                        <option value="Keyboards">keyboards</option>
                        {/* <option value="SoftwareEngineering">
                            software engineering
                        </option> */}
                    </select>
                </>
            )}

            <button
                className=" flex flex-col items-center justify-center hover:opacity-70"
                onClick={openThemeModal}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M5.75024 2C5.33603 2 5.00024 2.33579 5.00024 2.75V14.2505C5.00024 15.4932 6.0076 16.5005 7.25024 16.5005H9.5V19.5C9.5 20.8807 10.6193 22 12 22C13.3807 22 14.5 20.8807 14.5 19.5V16.5005H16.7502C17.9929 16.5005 19.0002 15.4932 19.0002 14.2505V2.75C19.0002 2.33579 18.6645 2 18.2502 2H5.75024ZM6.50024 11.0003V3.5H12.5V5.25154C12.5 5.66576 12.8358 6.00154 13.25 6.00154C13.6642 6.00154 14 5.66576 14 5.25154V3.5H15V6.25112C15 6.66534 15.3358 7.00112 15.75 7.00112C16.1642 7.00112 16.5 6.66534 16.5 6.25112V3.5H17.5002V11.0003H6.50024ZM6.50024 14.2505V12.5003H17.5002V14.2505C17.5002 14.6647 17.1645 15.0005 16.7502 15.0005H13.75C13.3358 15.0005 13 15.3363 13 15.7505V19.5C13 20.0523 12.5523 20.5 12 20.5C11.4477 20.5 11 20.0523 11 19.5V15.7505C11 15.3363 10.6642 15.0005 10.25 15.0005H7.25024C6.83603 15.0005 6.50024 14.6647 6.50024 14.2505Z" />
                </svg>
                Theme
            </button>

            {session && session.user.hasProfile && (
                <MenuKeebSelection
                    userId={session.user.id}
                    keeb={keeb}
                    keebId={keebId}
                    setKeeb={setKeeb}
                    setKeebId={setKeebId}
                    background={styles.menuInputBackground}
                />
            )}

            <ModalDialog isOpen={isModeModalOpen} onClose={closeModeModal}>
                <ModeModal
                    setGameOver={setGameOver}
                    setMode={setMode}
                    styles={styles}
                    closeModeModal={closeModeModal}
                />
            </ModalDialog>

            <ModalDialog isOpen={isThemeModalOpen} onClose={closeThemeModal}>
                <ThemeModal
                    setTheme={setTheme}
                    styles={styles}
                    closeThemeModal={closeThemeModal}
                />
            </ModalDialog>
            <ModalDialog isOpen={isLengthModalOpen} onClose={closeLengthModal}>
                <LengthModal
                    setGameLength={setGameLength}
                    styles={styles}
                    setGameOver={setGameOver}
                    closeLengthModal={closeLengthModal}
                />
            </ModalDialog>
        </div>
    );
}
