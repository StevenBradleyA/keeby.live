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

 // Todo going to need different components for different games
    // normal mode aka speedy speed boi (word count changes)
    // Quote mode (punctuation) (can select to learn about things... - keyboards -fun facts - biology - finance etc... )
    // hackerman mode (normal typing but with binary code falling in the background)
    // I want to add actual fun typing games later...
    //!  theme might also have to be passed to navbar might have to just make it its own session so its accessible everywhere doe
    // paragraph type
    // lets just start with paragraph type for now and try to get it working



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
