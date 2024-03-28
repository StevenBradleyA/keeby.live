import HomepageFooter from "~/components/Footer/KeebType";
import LeftMenu from "~/components/KeebType/LeftMenu";
import RightMenu from "~/components/KeebType/RightMenu";
import SpeedMode from "~/components/KeebType/SpeedMode";
import { useState, useEffect } from "react";
import { getCookies } from "cookies-next";
import { themeStyles } from "~/components/KeebType/Theme/themeStyles";
import type { ThemeName } from "~/components/KeebType/Theme/themeStyles";
import { useTheme } from "~/components/Context/Theme";
import QuoteMode from "~/components/KeebType/ScholarMode";
import ScholarMode from "~/components/KeebType/ScholarMode";

export default function KeebType() {
    // todo quote mode full on typing sentences -- ranked as well
    // todo letter mode where you can select a letter and all the words have that letter
    // ---- also for letter mode itd be cool if it auto cycles between letters -- cycle mode --- or you can select a letter
    // keybr style keyboard could be kinda cool
    // todo free play mode -- shows mini screen and keyboard type whatever
    // todo hacker mode --- literally shows a hacker script as you type literally anything
    // type faster mode -- practice typing words all at once
    // listen type -- hear words via ai text to speech then type them
    // race against the clock mode?

    const cookies = getCookies();
    const [mode, setMode] = useState<string>("Speed");
    const { theme, setTheme } = useTheme();
    const [keeb, setKeeb] = useState<string>("");
    const [keebId, setKeebId] = useState<string>("");
    const [gameOver, setGameOver] = useState<boolean>(false);

    // mode specific
    const [gameLength, setGameLength] = useState<number>(20);
    const [scholarType, setScholarType] = useState<string>("Vocab");
    const [letterSelect, setLetterSelect] = useState<string>("Cycle");

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
                        scholarType={scholarType}
                        setScholarType={setScholarType}
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
                {mode === "Scholar" && (
                    <ScholarMode
                        setGameOver={setGameOver}
                        gameOver={gameOver}
                        mode={mode}
                        keebId={keebId}
                        theme={theme}
                        scholarType={scholarType}
                    />
                )}
                {mode === "Gitgud" && <div>uh gitgud</div>}

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
