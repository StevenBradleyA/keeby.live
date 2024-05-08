import { useState } from "react";
import FreeplayKeyboard from "./keyboard";

interface FreeplayModeProps {
    theme: string;
}

export default function FreeplayMode({ theme }: FreeplayModeProps) {

    const [typedText, setTypedText] = useState("");


    return (
        <div className="z-10 flex flex-shrink-0 flex-col laptop:w-3/4 desktop:w-2/3">
            <div className="w-full bg-black h-40 overflow-y-auto">{typedText}</div>

            <FreeplayKeyboard setTypedText={setTypedText}/>
        </div>
    );
}
