"use client";
import { signIn, useSession } from "next-auth/react";
import { useState, type ChangeEvent } from "react";
import { setCookie } from "cookies-next";
import MenuKeebSelection from "./keebSelection";
import { themeStyles } from "../Theme/themeStyles";
import type { ThemeName } from "../Theme/themeStyles";
import ModalDialog from "../../Modal";
import ModeModal from "./modeModal";
import ThemeModal from "./themeModal";
import LengthModal from "./lengthModal";
import KeebModal from "./keebModal";

interface LeftMenuProps {
    mode: string;
    setMode: (mode: string) => void;
    gameLength: number;
    setGameLength: (gameLength: number) => void;
    theme: string;
    setTheme: (theme: string) => void;
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
        if (session && session.user) {
            setIsKeebModalOpen(true);
        }
    };

    const closeKeebModal = () => {
        setIsKeebModalOpen(false);
    };

    // remove selects and lets do custom modals that look really cool and work with the current color theme...
    // above selections
    // --- below
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
                        // onChange={handleScholarTypeChange}
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

            <button
                className=" flex flex-col items-center justify-center hover:opacity-70"
                onClick={() => {
                    if (session && session.user && session.user.hasProfile) {
                        openKeebModal();
                    } else {
                        void signIn();
                    }
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M7 14.5H17M6 10H6.01M10 10H10.01M14 10H14.01M18 10H18.01M5.2 18H18.8C19.9201 18 20.4802 18 20.908 17.782C21.2843 17.5903 21.5903 17.2843 21.782 16.908C22 16.4802 22 15.9201 22 14.8V9.2C22 8.0799 22 7.51984 21.782 7.09202C21.5903 6.71569 21.2843 6.40973 20.908 6.21799C20.4802 6 19.9201 6 18.8 6H5.2C4.07989 6 3.51984 6 3.09202 6.21799C2.71569 6.40973 2.40973 6.71569 2.21799 7.09202C2 7.51984 2 8.07989 2 9.2V14.8C2 15.9201 2 16.4802 2.21799 16.908C2.40973 17.2843 2.71569 17.5903 3.09202 17.782C3.51984 18 4.0799 18 5.2 18Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                Keeb
            </button>

            <div className={`w-full h-[2px] bg-white/30`}></div>

            <button className=" flex flex-col items-center justify-center hover:opacity-70">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    version="1.1"
                >
                    <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                    >
                        <g fill="currentColor" fillRule="nonzero">
                            <path d="M13.25,2.98001 C14.4926,2.98001 15.5,3.98737 15.5,5.23001 L15.5,7.00001 L18.75,7.00001 C19.9926,7.00001 21,8.00737 21,9.25001 L21,20.25 C21,20.6642 20.6642,21 20.25,21 L3.75,21 C3.33579,21 3,20.6642 3,20.25 L3,12.25 C3,11.0074 4.00736,10 5.25,10 L8.5,10 L8.5,5.23001 C8.5,3.98737 9.50736,2.98001 10.75,2.98001 L13.25,2.98001 Z M18.75,8.50001 L15.5,8.50001 L15.5,19.50001 L19.5,19.50001 L19.5,9.25001 C19.5,8.83579 19.1642,8.50001 18.75,8.50001 L18.75,8.50001 Z M13.25,4.48001 L10.75,4.48001 C10.3358,4.48001 10,4.8158 10,5.23001 L10,19.5 L14,19.5 L14,5.23001 C14,4.8158 13.6642,4.48001 13.25,4.48001 Z M8.5,11.5 L5.25,11.5 C4.83579,11.5 4.5,11.8358 4.5,12.25 L4.5,19.5 L8.5,19.5 L8.5,11.5 Z"></path>
                        </g>
                    </g>
                </svg>
                Stats
            </button>
            <button className=" flex flex-col items-center justify-center hover:opacity-70">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                >
                    <path d="M21,18H19V15a1,1,0,0,0-1-1H13V11.29l1.13.59a1,1,0,0,0,1.45-1.05l-.4-2.37L16.9,6.77a1,1,0,0,0,.26-1,1,1,0,0,0-.81-.68L14,4.72,12.9,2.56a1,1,0,0,0-1.8,0L10,4.72l-2.39.35a1,1,0,0,0-.81.68,1,1,0,0,0,.26,1L8.82,8.46l-.4,2.37a1,1,0,0,0,1.45,1.05L11,11.29V14H6a1,1,0,0,0-1,1v3H3a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V20H8v1a1,1,0,0,0,2,0V19a1,1,0,0,0-1-1H7V16H17v2H15a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V20h4v1a1,1,0,0,0,2,0V19A1,1,0,0,0,21,18ZM12,8.63a1,1,0,0,0-.47.12l-.8.42.15-.9a1,1,0,0,0-.29-.88l-.65-.64.9-.13a1,1,0,0,0,.76-.54l.4-.82.4.82a1,1,0,0,0,.76.54l.9.13-.65.64a1,1,0,0,0-.29.88l.15.9-.8-.42A1,1,0,0,0,12,8.63Z" />
                </svg>
                Leaderboards
            </button>
            <button className=" flex flex-col items-center justify-center hover:opacity-70">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                >
                    <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                    >
                        <g fill="currentColor" fillRule="nonzero">
                            <path d="M20.25,1.9994016 C21.2164983,1.9994016 22,2.78290329 22,3.7494016 L22,6.79211227 C22,7.81626852 21.4308714,8.75557754 20.5230663,9.22969348 L14.2412535,12.5100385 C15.8772891,13.3318105 17,15.0251921 17,16.9807969 C17,19.7422206 14.7614237,21.9807969 12,21.9807969 C9.23857625,21.9807969 7,19.7422206 7,16.9807969 C7,15.0251921 8.12271095,13.3318105 9.75874649,12.5100385 L3.47693369,9.22969348 C2.56912858,8.75557754 2,7.81626852 2,6.79211227 L2,3.7494016 C2,2.78290329 2.78350169,1.9994016 3.75,1.9994016 L20.25,1.9994016 Z M12,13.4807969 C10.0670034,13.4807969 8.5,15.0478003 8.5,16.9807969 C8.5,18.9137935 10.0670034,20.4807969 12,20.4807969 C13.9329966,20.4807969 15.5,18.9137935 15.5,16.9807969 C15.5,15.0478003 13.9329966,13.4807969 12,13.4807969 Z M15.5,3.4984016 L8.5,3.4984016 L8.5,10.1604016 L11.8842667,11.9283081 C11.9567756,11.9661771 12.0432244,11.9661771 12.1157333,11.9283081 L15.5,10.1594016 L15.5,3.4984016 Z M7,3.4984016 L3.75,3.4994016 C3.61192881,3.4994016 3.5,3.61133041 3.5,3.7494016 L3.5,6.79211227 C3.5,7.25763784 3.75869481,7.68459648 4.1713335,7.90010373 L7,9.3764016 L7,3.4984016 Z M20.25,3.4994016 L17,3.4984016 L17,9.3764016 L19.8286665,7.90010373 C20.2413052,7.68459648 20.5,7.25763784 20.5,6.79211227 L20.5,3.7494016 C20.5,3.61133041 20.3880712,3.4994016 20.25,3.4994016 Z"></path>
                        </g>
                    </g>
                </svg>
                Ranks
            </button>
            <button className=" flex flex-col items-center justify-center hover:opacity-70">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 16 16"
                    fill="none"
                >
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M8.316 2.07a.75.75 0 00-.632 0l-7 3.25a.75.75 0 000 1.36l1.434.666A.746.746 0 002 7.75V11a.75.75 0 00.158.46L2.75 11l-.592.46.001.002.001.001.003.004.008.01a1.882 1.882 0 00.103.12c.068.076.165.178.292.299.254.24.63.555 1.132.866C4.706 13.388 6.217 14 8.25 14c2.037 0 3.44-.615 4.345-1.266a5.32 5.32 0 00.977-.902 3.916 3.916 0 00.322-.448l.007-.012.003-.004v-.002h.001c0-.001 0-.002-.655-.366l.655.365A.754.754 0 0014 11V7.75a.747.747 0 00-.118-.404l1.434-.666a.75.75 0 000-1.36l-7-3.25zM12.5 7.988L8.316 9.93a.75.75 0 01-.632 0L3.5 7.988v2.723a5.585 5.585 0 00.99.776c.804.5 2.043 1.013 3.76 1.013 1.713 0 2.81-.51 3.468-.984a3.812 3.812 0 00.782-.745V7.988zM8 8.423L2.781 6 8 3.577 13.219 6 8 8.423z"
                        clipRule="evenodd"
                    />
                </svg>
                Improve
            </button>
            <button className=" flex flex-col items-center justify-center hover:opacity-70">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M5.75024 2C5.33603 2 5.00024 2.33579 5.00024 2.75V14.2505C5.00024 15.4932 6.0076 16.5005 7.25024 16.5005H9.5V19.5C9.5 20.8807 10.6193 22 12 22C13.3807 22 14.5 20.8807 14.5 19.5V16.5005H16.7502C17.9929 16.5005 19.0002 15.4932 19.0002 14.2505V2.75C19.0002 2.33579 18.6645 2 18.2502 2H5.75024ZM6.50024 11.0003V3.5H12.5V5.25154C12.5 5.66576 12.8358 6.00154 13.25 6.00154C13.6642 6.00154 14 5.66576 14 5.25154V3.5H15V6.25112C15 6.66534 15.3358 7.00112 15.75 7.00112C16.1642 7.00112 16.5 6.66534 16.5 6.25112V3.5H17.5002V11.0003H6.50024ZM6.50024 14.2505V12.5003H17.5002V14.2505C17.5002 14.6647 17.1645 15.0005 16.7502 15.0005H13.75C13.3358 15.0005 13 15.3363 13 15.7505V19.5C13 20.0523 12.5523 20.5 12 20.5C11.4477 20.5 11 20.0523 11 19.5V15.7505C11 15.3363 10.6642 15.0005 10.25 15.0005H7.25024C6.83603 15.0005 6.50024 14.6647 6.50024 14.2505Z" />
                </svg>
                Learn about keyboards
            </button>

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
            <ModalDialog isOpen={isKeebModalOpen} onClose={closeKeebModal}>
                {session?.user.id && (
                    <KeebModal
                        styles={styles}
                        setGameOver={setGameOver}
                        closeKeebModal={closeKeebModal}
                        userId={session.user.id}
                        setKeebId={setKeebId}
                        keebId={keebId}
                    />
                )}
            </ModalDialog>
        </div>
    );
}
