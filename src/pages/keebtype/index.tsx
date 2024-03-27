import HomepageFooter from "~/components/Footer/KeebType";
import LeftMenu from "~/components/KeebType/LeftMenu";
import SelectQuote from "~/components/KeebType/QuoteMode/selectQuote";
import RightMenu from "~/components/KeebType/RightMenu";
import SpeedMode from "~/components/KeebType/SpeedMode";
import { useState, useEffect } from "react";
import { getCookies } from "cookies-next";
import { themeStyles } from "~/components/KeebType/Theme/themeStyles";
import type { ThemeName } from "~/components/KeebType/Theme/themeStyles";
import { useTheme } from "~/components/Context/Theme";

export default function KeebType() {
    // normal mode aka speedy speed boi (word count changes)
    // Quote mode (punctuation) (can select to learn about things... - keyboards -fun facts - biology - finance etc... )
    // hackerman mode (normal typing but with binary code falling in the background)
    // I want to add actual fun typing games later...
    // paragraph type
    // lets just start with paragraph type for now and try to get it working
    // improve mode where you can select a letter and all the words will contain that letter and will be randomly grabbed
    // keybr style keyboard option
    // obviously we just want the site live and working before we add all these different game modes etc but like two working ones would be pog
    //monkey type mode, keybr mode , type racer mode , hackerman mode, free type

    // learn mode --- type quotes to learn things like biology,  vocab, software enginnering, biology,

    const cookies = getCookies();
    const [mode, setMode] = useState<string>("Speed");
    const [gameLength, setGameLength] = useState<number>(20);
    const { theme, setTheme } = useTheme();
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [gameStart, setGameStart] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [keeb, setKeeb] = useState<string>("");
    const [keebId, setKeebId] = useState<string>("");

    const styles = themeStyles[theme as ThemeName] || themeStyles["KEEBY"];

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
        if (cookies.keebId) {
            setKeebId(cookies.keebId);
        }
        // if (cookies.theme) {
        //     setTheme(cookies.theme);
        // }
    }, [cookies]);

    return (
        <>
            <div className=" relative flex h-[80vh] w-full gap-2 laptop:p-2 desktop:gap-10 desktop:p-10">
                <div className=" z-10  mt-40 flex justify-center laptop:w-1/4 desktop:w-1/3">
                    <LeftMenu
                        mode={mode}
                        setMode={setMode}
                        gameLength={gameLength}
                        setGameLength={setGameLength}
                        theme={theme}
                        setTheme={setTheme}
                        keeb={keeb}
                        setKeeb={setKeeb}
                        keebId={keebId}
                        setKeebId={setKeebId}
                    />
                </div>

                {mode === "Speed" && (
                    <SpeedMode
                        gameLength={gameLength}
                        setGameOver={setGameOver}
                        gameOver={gameOver}
                        mode={mode}
                        keebId={keebId}
                        theme={theme}
                    />
                )}
                {/* {mode === "quote" && <SelectQuote />} */}

                <div
                    className={`fixed bottom-0 left-0 right-0 top-0 z-0 ${styles.baseColor}`}
                ></div>

                <div className="z-10 mt-40 flex justify-center laptop:w-1/4 desktop:w-1/3">
                    <RightMenu theme={theme} />
                </div>
            </div>
            <div className=" absolute bottom-3">
                <HomepageFooter />
            </div>
        </>
    );
}
