import { useState } from "react";
import SelectQuote from "~/components/KeebType/QuoteMode/selectQuote";
import LeftMenu from "~/components/KeebType/LeftMenu";
import RightMenu from "~/components/KeebType/RightMenu";
import SpeedMode from "~/components/KeebType/SpeedMode";
import HomepageFooter from "~/components/Footer";

export default function Home() {
    // Todo going to need different components for different games
    // normal mode aka speedy speed boi (word count changes)
    // Quote mode (punctuation) (can select to learn about things... - keyboards -fun facts - biology - finance etc... )
    // hackerman mode (normal typing but with binary code falling in the background)
    // I want to add actual fun typing games later...
    //!  theme might also have to be passed to navbar might have to just make it its own session so its accessible everywhere doe
    // paragraph type
    // lets just start with paragraph type for now and try to get it working

    // for generate type we are going to need a first parent component that generates the sentence then passes it to another component that uses it.
    const [mode, setMode] = useState<string>("speed");
    const [gameLength, setGameLength] = useState<number>(20);
    const [theme, setTheme] = useState<string>("keeby");

    return (
        <>
            <div className="flex w-full items-center justify-between p-10 mb-28">
                <LeftMenu
                    mode={mode}
                    setMode={setMode}
                    gameLength={gameLength}
                    setGameLength={setGameLength}
                    theme={theme}
                    setTheme={setTheme}
                />
                {mode === "speed" && <SpeedMode gameLength={gameLength} />}
                {mode === "quote" && <SelectQuote />}
                <RightMenu />
            </div>
            <HomepageFooter />
        </>
    );
}
