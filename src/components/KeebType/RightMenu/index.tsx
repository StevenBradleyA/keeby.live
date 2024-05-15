import { themeStyles } from "../Theme/themeStyles";
import type { ThemeName } from "../Theme/themeStyles";

export default function RightMenu({
    theme,
    mode,
}: {
    theme: string;
    mode: string;
}) {
    const styles = themeStyles[theme as ThemeName] || themeStyles["KEEBY"];

    return (
        <div
            className={`flex flex-col rounded-xl border-2 ${styles.border} border-opacity-50 ${styles.backgroundColor} bg-opacity-30 p-5 ${styles.hit} relative w-full overflow-hidden laptop:h-[65%] desktop:h-[55%] `}
        >
            {mode === "Hacktime" ? (
                <div className=" absolute bottom-0 left-0 right-0 top-0 object-cover ">
                    <video
                        className="-z-10 h-full w-full object-cover"
                        autoPlay
                        loop
                        muted
                    >
                        <source
                            src="https://s3.us-west-2.amazonaws.com/keeby.live/matrix-fade-green.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>
            ) : (
                <>
                    <div>three listings</div>
                    <div>or personalized ads </div>
                </>
            )}
        </div>
    );
}
