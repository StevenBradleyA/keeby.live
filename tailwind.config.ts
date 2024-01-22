import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                blackAlternative: "#181818",
                dark: "#222",
                darkGray: "#616161",
                keebyGray: "#2f2f2f",
                pogGray: "#2d2d2d",
                testTwo: "#121212",
                testFour: "#161618",
                testSeven: "#212121",
                testTen: "#242526",
                testEleven: "#282828",
                testTwelve: "#3A3B3C",
                testThirteen: "#404040",
            },
            fontFamily: {
                mrDafoe: ["Mr Dafoe", "cursive"],
                titillium: ["Titillium Web", "sans-serif"],
                retro: ["VT323", "monospace"],
            },
            textColor: {
                blackAlternative: "#181818",
                hack: "#00dd00",
                failure: "#ff0000",
                darkGray: "#616161",
            },
        },
    },
    plugins: [],
} satisfies Config;
