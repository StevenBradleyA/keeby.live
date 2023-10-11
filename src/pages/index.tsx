import { useState } from "react";
import SelectQuote from "~/components/KeebType/QuoteMode/selectQuote";
import LeftMenu from "~/components/KeebType/LeftMenu";
import RightMenu from "~/components/KeebType/RightMenu";
import NormalMode from "~/components/KeebType/NormalMode";

export default function Home() {
    // Todo going to need different components for different games
    // normal mode aka speedy speed boi (word count changes)
    // Quote mode (punctuation) (can select to learn about things... - keyboards -fun facts - biology - finance etc... )
    // hackerman mode (normal typing but with binary code falling in the background)
    // I want to add actual fun typing games later...

    // paragraph type
    // lets just start with paragraph type for now and try to get it working

    // for generate type we are going to need a first parent component that generates the sentence then passes it to another component that uses it.
    const [mode, setMode] = useState<string>("normal");

    return (
        <>
            <div className="flex w-full p-10">
                <LeftMenu mode={mode} setMode={setMode} />
                {mode === "normal" && <NormalMode />}
                {mode === "quote" && <SelectQuote />}
                <RightMenu />
            </div>
        </>
    );
}
