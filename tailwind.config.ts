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
                lightGray: "#d3d3d3",

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
                montserrat: ["Montserrat", "sans-serif"],
                poppins: ["Poppins", "sans-serif"],
                yellowTail: ["Yellowtail", "sans-serif"],
            },
            textColor: {
                blackAlternative: "#181818",
                hack: "#00dd00",
                failure: "#ff0000",
                darkGray: "#616161",
                keebyGray: "#2f2f2f",
                lightGray: "#d3d3d3",
                purple: "#f008e4",
                cadetBlue: "#5F9EA0",
            },
            screens: {
                mobile: "320px",
                tablet: "600px",
                laptop: "1024px",
                largeLaptop: "1440px",
                desktop: "1920px",
                ultrawide: "2560px",
            },
        },
    },
    plugins: [],
} satisfies Config;
