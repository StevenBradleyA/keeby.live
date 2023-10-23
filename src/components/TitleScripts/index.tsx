import { useEffect, useState } from "react";

interface TitleScriptsProps {
    page: string;
}

export default function TitleScripts({ page }: TitleScriptsProps) {
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (page === "signin") {
            const phrases = [
                "Please Stand By",
                "Scanning for Thock",
                "ಠ_ಠ none found",
                "Create a Listing",
            ];
            const delay = [0, 2000, 4000, 6000];

            phrases.forEach((phrase, i) =>
                setTimeout(() => {
                    setTitle(phrase);
                }, delay[i])
            );
        }
    }, [page]);

    return <h1 className="moving-title text-green-500">{title}</h1>;
}
