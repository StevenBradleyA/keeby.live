import HomepageFooter from "~/components/Footer";
import LeftMenu from "~/components/KeebType/LeftMenu";
import SelectQuote from "~/components/KeebType/QuoteMode/selectQuote";
import RightMenu from "~/components/KeebType/RightMenu";
import SpeedMode from "~/components/KeebType/SpeedMode";
import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { DotLoader } from "react-spinners";
import { getCookies } from "cookies-next";

export default function KeebType() {
    const cookies = getCookies();
    const [mode, setMode] = useState<string>("speed");
    const [gameLength, setGameLength] = useState<number>(20);
    const [theme, setTheme] = useState<string>("keeby");
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [keeb, setKeeb] = useState<string>("");

    useEffect(() => {
        if (cookies.mode) {
            setMode(cookies.mode);
        }
        if (cookies.gameLength) {
            setGameLength(+cookies.gameLength);
        }
        if (cookies.keeb) {
            setKeeb(cookies.keeb);
        }
        if (cookies.theme) {
            setTheme(cookies.theme);
        }
    }, [cookies]);

    return (
        <>
            <div className="mt-40 flex w-full items-center justify-between overflow-hidden p-10">
                <LeftMenu
                    mode={mode}
                    setMode={setMode}
                    gameLength={gameLength}
                    setGameLength={setGameLength}
                    theme={theme}
                    setTheme={setTheme}
                    keeb={keeb}
                    setKeeb={setKeeb}
                />

                {mode === "speed" && (
                    <SpeedMode
                        gameLength={gameLength}
                        setGameOver={setGameOver}
                    />
                )}
                {mode === "quote" && <SelectQuote />}
                <RightMenu />
            </div>
            <HomepageFooter />
        </>
    );
}
