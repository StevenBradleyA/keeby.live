export type ThemeName = "KEEBY" | "PIGGY"| "PRIMEAGEN";

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
        title: "png-white",
        baseColor: "bg-[#fcd5ce]",
        secondaryBase: "bg-[#f8edeb]",
        backgroundColor: "bg-[#f9dcc4]",
        border: "border-[#ffff]",
        textColor: "text-[#383838]",
        hoverText: "hover:text-[#fab4a9]",
        cursor: "bg-[#ffffff]",
        menuInputBackground: "bg-[#f8edeb]/30",
        pause: "text-[#fab4a9]",
        hit: "text-[#ffffff]",
        miss: "text-[#db7093]",
        graphBackground: "rgba(0, 0, 0, 0.1)",
        graphBorder: "rgba(255, 225, 225)",
        graphHighlight: "rgba(255, 225, 225)",
    },
    PRIMEAGEN: {
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
};
