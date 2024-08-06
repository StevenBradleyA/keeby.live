import { useSession } from "next-auth/react";
import type { ChangeEvent } from "react";
import { setCookie } from "cookies-next";
import MenuKeebSelection from "./keebSelection";
import { themeStyles } from "../Theme/themeStyles";
import type { ThemeName } from "../Theme/themeStyles";

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

    const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newMode: string = e.target.value;

        setCookie("mode", newMode, {
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
        });
        setGameOver(false);
        setMode(newMode);
    };

    const handleGameLength = (e: ChangeEvent<HTMLSelectElement>) => {
        const newGameLength: number = +e.target.value;
        setCookie("gameLength", newGameLength, {
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
        });
        setGameLength(newGameLength);
    };

    const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newTheme: string = e.target.value;
        setCookie("theme", newTheme, {
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
        });
        setTheme(newTheme);
    };

    const handleScholarTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newScholarType: string = e.target.value;
        setCookie("scholarType", newScholarType, {
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
        });
        setScholarType(newScholarType);
    };

    // remove selects and lets do custom modals that look really cool and work with the current color theme...
    //

    return (
        <div
            className={`flex flex-col rounded-xl  border-opacity-50 ${styles.backgroundColor} bg-opacity-30 p-5 ${styles.hit} w-full h-full`}
        >
            <label className="">Mode</label>
            <select
                className={` w-full rounded-md  ${styles.menuInputBackground} py-1 shadow-sm`}
                value={mode}
                onChange={handleModeChange}
            >
                <option value="Speed">Speed</option>
                <option value="Scholar">Scholar</option>
                <option value="Freeplay">Freeplay</option>
                <option value="Hacktime">It&apos;s Hacking Time</option>
                {/* <option value="Gitgud">git gud</option> */}
            </select>

            {mode === "Speed" && (
                <>
                    <label className="mt-2 ">Length</label>
                    <select
                        className={` rounded-md shadow-sm ${styles.menuInputBackground} py-1 `}
                        value={gameLength}
                        onChange={handleGameLength}
                    >
                        <option value={10}>10</option>
                        <option value={20} defaultValue={20}>
                            20
                        </option>
                        <option value={50}>50</option>
                    </select>
                </>
            )}
            {mode === "Scholar" && (
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
            <label className="mt-2 ">Theme</label>
            <select
                className={`
                    rounded-md ${styles.menuInputBackground} py-1 shadow-sm `}
                value={theme}
                onChange={handleThemeChange}
            >
                <option value="KEEBY">keeby</option>
                <option value="KEEBYRED">keeby red</option>
                <option value="BANANA">banana</option>
                <option value="HACKERMAN">hackerman</option>
                <option value="HIPYO">hipyo</option>
                <option value="PIGGY">piggy</option>
                <option value="PRIMEAGEN">primeagen</option>
            </select>
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
        </div>
    );
}
