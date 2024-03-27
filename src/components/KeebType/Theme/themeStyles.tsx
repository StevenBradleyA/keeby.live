export type ThemeName = "KEEBY" | "PIGGY";

interface ThemeStyle {
    baseColor: string;
    secondaryBase: string; 
    backgroundColor: string;
    border: string;
    cursor: string;
    hit: string;
    miss: string;
    pause: string;
    textColor: string;
    graphBackground: string; 
    graphBorder: string; 
    graphHighlight: string;

}

export const themeStyles: Record<ThemeName, ThemeStyle> = {
    KEEBY: {
        baseColor: "bg-dark",
        secondaryBase: "bg-keebyGray",
        backgroundColor: "bg-green-300",
        border: "border-green-300",
        textColor: "text-darkGray",
        cursor: "bg-green-300",
        pause: "text-green-300",
        hit: "text-white",
        miss: "text-red-500",
        graphBackground: "rgba(134, 239, 172, 0.3)",
        graphBorder: "rgba(134, 239, 172, 0.5)",
        graphHighlight: "rgba(134, 239, 172)",

    },
    PIGGY: {
        baseColor: "bg-dark",
        secondaryBase: "bg-keebyGray",

        backgroundColor: "bg-green-300",
        border: "bg-green-300",
        cursor: "text-green-300",
        hit: "text-red-500",
        miss: "text-white",
        pause: "text-green-300",
        textColor: "text-white/30",
        graphBackground: "rgba(134, 239, 172, 0.3)",
        graphBorder: "rgba(134, 239, 172, 0.5)",
        graphHighlight: "rgba(134, 239, 172)",

    },
};
