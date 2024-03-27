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
}: LeftMenuProps) {
    // todo refactor theme to be session so its accessible in nav to apply title png state variables????
    // theme needs to have context...

    const { data: session } = useSession();

    const styles = themeStyles[theme as ThemeName] || themeStyles["KEEBY"];

    const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newMode: string = e.target.value;

        setCookie("mode", newMode, {
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
        });
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

    return (
        <div
            className={`flex flex-col rounded-xl border-2 ${styles.border} border-opacity-50 ${styles.backgroundColor} bg-opacity-30 p-5 ${styles.hit} laptop:h-[65%] laptop:w-full desktop:h-[55%] desktop:w-[85%] `}
        >
            <label className="">Mode</label>
            <select
                className={` w-full rounded-md  ${styles.menuInputBackground} py-1 shadow-sm `}
                value={mode}
                onChange={handleModeChange}
            >
                <option value="Speed">Speed</option>
                <option value="quote">Quote</option>
                <option value="hacktime">It&apos;s Hacking Time</option>
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
            <label className="mt-2 ">Theme</label>
            <select
                className={`
                    rounded-md ${styles.menuInputBackground} py-1 shadow-sm `}
                value={theme}
                onChange={handleThemeChange}
            >
                <option value="KEEBY">keeby</option>
                <option value="PRIMEAGEN">primeagen</option>
                <option value="PIGGY">piggy</option>
                <option value="HIPYO">hipyo</option>
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
