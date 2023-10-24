import { useEffect, useState } from "react";

interface TitleScriptsProps {
    page: string;
}

export default function TitleScripts({ page }: TitleScriptsProps) {
    const [title, setTitle] = useState("");
    // 01101000 01100001 01100011 01101011 00100000 01110100 01101001 01101101 01100101 --- hacktime in binary
    // 01101000 01100001 01100011 01101011 -- hack
    // "Quantum Computing in 3, 2, 1...",
    // "C:\\> Hello, World!",
    // "Syntax Error: 8-bit Love Not Found",
    // "Calculating Quantum Nostalgia",
    // "Insert Coin to Continue",
    // "Defragmenting Memories",
    // "Initializing Time-Traveling Circuits",
    // "Pogchamp Error 404: Cringe Not Found",
    //  "Welcome, Time Traveler! Please Prove Your Identity",
    //   "Initiating Login Sequence... Brace for Time Travel",
    // "Loading 8-bit Security Wall... Please Authenticate",
    //  "Initiating Login Sequence... Brace for Time Travel",
    // "Ctrl + Alt + Authenticate: What's the Magic Word?",

    useEffect(() => {
        if (page === "signin") {
            const phrases = [
                "Initiating Login Sequence",
                "Accessing Mainframe",
                "Authorization Required",
                "Access Granted",
                "Prove Your Identity - Then Announce, Im In",
            ];
            const delay = [0, 2000, 4000, 6000, 8000];

            phrases.forEach((phrase, i) =>
                setTimeout(() => {
                    setTitle(phrase);
                }, delay[i])
            );
        }
    }, [page]);

    return (
        <h1
            className={`moving-title mb-10 text-4xl text-green-500  ${
                title === "Authorization Required" ? "text-red-600" : ""
            }`}
        >
            {title}
        </h1>
    );
}
