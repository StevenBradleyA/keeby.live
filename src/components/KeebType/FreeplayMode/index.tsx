import FreeplayKeyboard from "./keyboard";

interface FreeplayModeProps {
    theme: string;
}

export default function FreeplayMode({ theme }: FreeplayModeProps) {
    return (
        <div className="z-10 flex flex-shrink-0 flex-col laptop:w-3/4 desktop:w-2/3">
            <div>helloooooo</div>

            {/* <FreeplayKeyboard /> */}
        </div>
    );
}
