"use client";
import LeftMenu from "~/app/_components/Games/LeftMenu";
// import RightMenu from "~/app/_components/Games/RightMenu";
import SpeedMode from "~/app/_components/Games/SpeedMode";
import { useState, useEffect } from "react";
import { getCookies } from "cookies-next";
import { themeStyles } from "~/app/_components/Games/Theme/themeStyles";
import type { ThemeName } from "~/app/_components/Games/Theme/themeStyles";
import ScholarMode from "~/app/_components/Games/ScholarMode";
import FreeplayMode from "~/app/_components/Games/FreeplayMode";
import HacktimeMode from "~/app/_components/Games/HacktimeMode";
import { useGlobalState } from "../Context/GlobalState/globalState";

export default function KeebType() {
    // letter mode where you can select a letter and all the words have that letter
    // ---- also for letter mode itd be cool if it auto cycles between letters -- cycle mode --- or you can select a letter
    // type faster mode -- practice typing words all at once
    // listen type -- hear words via ai text to speech then type them
    // race against the clock mode?

    const cookies = getCookies();
    const [mode, setMode] = useState<string>("Speed");
    const { theme, setTheme } = useGlobalState();
    const [keebId, setKeebId] = useState<string>("");
    const [gameOver, setGameOver] = useState<boolean>(false);

    // mode specific
    const [gameLength, setGameLength] = useState<number>(20);
    const [scholarType, setScholarType] = useState<string>("Vocab");
    // const [letterSelect, setLetterSelect] = useState<string>("Cycle");
    // git gud game mode where all words start with a certain letter and cycles
    const styles = themeStyles[theme as ThemeName] || themeStyles["KEEBY"];

    useEffect(() => {
        if (cookies.mode) {
            setMode(cookies.mode);
        }
        if (cookies.gameLength) {
            setGameLength(+cookies.gameLength);
        }

        if (cookies.keebId) {
            setKeebId(cookies.keebId);
        }
    }, [cookies]);

    // todo change the padding so the end results fill the whole page but the

    return (
        <>
            <div className="absolute top-40 bottom-0 w-[10%] z-30 ">
                <LeftMenu
                    mode={mode}
                    setMode={setMode}
                    gameLength={gameLength}
                    setGameLength={setGameLength}
                    theme={theme}
                    setTheme={setTheme}
                    keebId={keebId}
                    setKeebId={setKeebId}
                    scholarType={scholarType}
                    setScholarType={setScholarType}
                    setGameOver={setGameOver}
                />
            </div>

            {mode === "speed" && (
                <div className="w-full z-20 ">
                    <SpeedMode
                        gameLength={gameLength}
                        setGameOver={setGameOver}
                        gameOver={gameOver}
                        mode={mode}
                        keebId={keebId}
                        theme={theme}
                    />
                </div>
            )}
            {mode === "scholar" && (
                <div className="w-full z-20 px-60 ">
                    <ScholarMode
                        setGameOver={setGameOver}
                        gameOver={gameOver}
                        mode={mode}
                        keebId={keebId}
                        theme={theme}
                        scholarType={scholarType}
                    />
                </div>
            )}
            {mode === "freeplay" && (
                <div className="w-full z-20 px-80 ">
                    <FreeplayMode theme={theme} />
                </div>
            )}
            {mode === "hackingTime" && (
                <div className="w-full h-full z-20 px-96 pb-20">
                    <HacktimeMode />
                </div>
            )}

            {/* <div className="z-30 mt-40 flex w-[15%] justify-center  ">
                    <RightMenu theme={theme} mode={mode} />
                </div> */}

            <div
                className={`${styles.baseColor} fixed top-0 bottom-0 left-0 right-0 z-10`}
            ></div>
        </>
    );
}