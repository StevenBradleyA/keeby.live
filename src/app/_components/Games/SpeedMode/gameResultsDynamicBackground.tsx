"use client";
import BinaryRain from "~/app/_components/Matrix/binaryRain";
import coconutOily from "@public/KeebType/Coconut-oily-primeagen.png";
import piggy from "@public/KeebType/piggy.png";
import Image from "next/image";
import { themeStyles } from "~/app/_components/Games/Theme/themeStyles";
import type { ThemeName } from "~/app/_components/Games/Theme/themeStyles";
import { useGlobalState } from "../../Context/GlobalState/globalState";

export default function GameResultsDynamicBackground() {
    const { theme } = useGlobalState();

    const styles = themeStyles[theme as ThemeName];

    return (
        <>
            {(theme === "KEEBY" ||
                theme === "KEEBYRED" ||
                theme === "HACKERMAN") && (
                <>
                    <div className="absolute -left-5 -top-12 overflow-hidden h-[80%] z-0 -right-5">
                        <BinaryRain
                            key={`${styles.matrix}-${styles.matrixBackground}-${styles.matrixLetters}`}
                            matrix={`${styles.matrix}`}
                            matrixBackground={`${styles.matrixBackground}`}
                            fontSize={10}
                            letters={`${styles.matrixLetters}`}
                        />
                    </div>
                    <div
                        className={` absolute -left-5 -right-5 -top-12 h-[80%] z-10 bg-gradient-to-b from-[rgba(0,0,0,0)] ${styles.matrixFade} `}
                    ></div>
                </>
            )}

            {theme === "PRIMEAGEN" && (
                <div className=" absolute -left-5 -top-12  h-[60%] z-0 -right-5  flex justify-center items-end opacity-70">
                    <Image
                        alt="primetime"
                        src={coconutOily}
                        className="w-80 "
                        width={300}
                        height={300}
                    />
                </div>
            )}
            {theme === "PIGGY" && (
                <div className=" absolute -left-5 -top-12 overflow-hidden h-[60%] z-0 -right-5  flex justify-center items-end opacity-30">
                    <Image
                        alt="piggy"
                        src={piggy}
                        className="w-60 "
                        width={300}
                        height={300}
                    />
                </div>
            )}
        </>
    );
}
