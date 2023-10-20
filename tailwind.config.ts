import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                dark: "#222",
                testOne: "#0A0A0A",
                testTwo: "#121212",
                testFour: "#161618",
                testFive: "#181818",
                testSeven: "#212121",
                testTen: "#242526",
                testEleven: "#282828",
                testTwelve: "#3A3B3C",
                testThirteen: "#404040",
            },
        },
    },
    plugins: [],
} satisfies Config;
