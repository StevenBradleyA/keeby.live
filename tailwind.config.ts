import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                dark: "#222",
                keebyGray: "#2f2f2f",
                testTwo: "#121212",
                testFour: "#161618",
                testFive: "#181818",
                testSeven: "#212121",
                testTen: "#242526",
                testEleven: "#282828",
                testTwelve: "#3A3B3C",
                testThirteen: "#404040",
            },
            textColor: {
                hack: "#00dd00",
                failure: "#ff0000",
            },
        },
    },
    plugins: [],
} satisfies Config;
