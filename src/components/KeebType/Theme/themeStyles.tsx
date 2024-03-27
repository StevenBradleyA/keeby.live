export type ThemeName = "KEEBY" | "PIGGY";

interface ThemeStyle {
    title: string; 
    baseColor: string;
    secondaryBase: string;
    backgroundColor: string;
    menuInputBackground: string;
    border: string;
    cursor: string;
    hoverText: string; 
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
        title: "",
        baseColor: "bg-dark",
        secondaryBase: "bg-keebyGray",
        backgroundColor: "bg-green-300",
        border: "border-green-300",
        textColor: "text-darkGray",
        hoverText: "hover:text-green-300",
        cursor: "bg-green-300",
        menuInputBackground: "bg-white/30",
        pause: "text-green-300",
        hit: "text-white",
        miss: "text-red-500",
        graphBackground: "rgba(134, 239, 172, 0.3)",
        graphBorder: "rgba(134, 239, 172, 0.5)",
        graphHighlight: "rgba(134, 239, 172)",
    },
    PIGGY: {
        title: 'png-red',
        baseColor: "bg-white",
        secondaryBase: "bg-keebyGray",
        backgroundColor: "bg-pink-300",
        border: "border-pink-300",
        textColor: "text-darkGray",
        menuInputBackground: "bg-white/30",

        hoverText: "hover:text-pink-300",
        cursor: "bg-pink-300",
        pause: "text-pink-300",
        hit: "text-white",
        miss: "text-red-500",
        graphBackground: "rgba(134, 239, 172, 0.3)",
        graphBorder: "rgba(134, 239, 172, 0.5)",
        graphHighlight: "rgba(134, 239, 172)",
    },
};
