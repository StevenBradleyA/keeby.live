import { themeStyles } from "../Theme/themeStyles";
import type { ThemeName } from "../Theme/themeStyles";

export default function RightMenu({theme}: {theme: string}) {


    const styles = themeStyles[theme as ThemeName] || themeStyles["KEEBY"];

    return (
        <div className={`flex flex-col rounded-xl border-2 ${styles.border} border-opacity-50 ${styles.backgroundColor} bg-opacity-30 p-5 ${styles.hit} laptop:h-[65%] laptop:w-full desktop:h-[55%] desktop:w-[85%] `}>
            <div>three listings</div>
            <div>or personalized ads </div>
        </div>
    );
}
