export type ThemeName = 'KEEBY' | 'PIGGY' ;


interface ThemeStyle {
    backgroundColor: string;
    backgroundOutline: string;
    textColor: string;
    cursor: string;
    hit: string;
    miss: string;
}

export const themeStyles: Record<ThemeName, ThemeStyle> = {
    "KEEBY": {
        backgroundColor: "bg-green-300",
        backgroundOutline: "bg-green-300",
        textColor: "text-white/30",
        cursor: "bg-green-300",
        hit: "text-white",
        miss: "text-red-500",
    },
    "PIGGY": {
        backgroundColor: "bg-green-300",
        backgroundOutline: "bg-green-300",
        textColor: "text-white/30",
        cursor: "text-green-300",
        hit: "text-red-500",
        miss: "text-white",
    },
};
