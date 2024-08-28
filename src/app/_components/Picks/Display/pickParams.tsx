"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function PickParams() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const category = searchParams.get("category") || "";

    const updateQueryParams = (params: Record<string, string | number>) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());

        Object.keys(params).forEach((key) => {
            if (params[key]) {
                newSearchParams.set(key, params[key].toString());
            } else {
                newSearchParams.delete(key);
            }
        });

        const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
        router.push(newUrl, { scroll: false });
    };

    const handleCategorySelect = (type: string) => {
        updateQueryParams({
            category: category === type ? "" : type,
            priceOrder: "",
            color: "",
            layoutType: "",
            pcbType: "",
            assemblyType: "",
            caseMaterial: "",
            soundType: "",
            profileType: "",
            keycapMaterial: "",
            switchType: "",
        });
    };

    return (
        <div className="w-full flex flex-col mt-12 sticky top-40 px-16 bg-dark">
            <div className="w-full flex gap-10">
                <div className="flex gap-5 w-full justify-center ">
                    <button
                        onClick={() => handleCategorySelect("keyboards")}
                        className="flex flex-col items-center gap-1 hover:opacity-80"
                    >
                        <div className="rounded-full h-10 w-10 bg-green-500 shadow-lg"></div>
                        <h3>Keyboards</h3>
                    </button>
                    <button
                        onClick={() => handleCategorySelect("keycaps")}
                        className="flex flex-col items-center gap-1 hover:opacity-80"
                    >
                        <div className="rounded-full h-10 w-10 bg-green-500 shadow-lg"></div>
                        <h3>Keycaps</h3>
                    </button>
                    <button
                        onClick={() => handleCategorySelect("switches")}
                        className="flex flex-col items-center gap-1 hover:opacity-80"
                    >
                        <div className="rounded-full h-10 w-10 bg-green-500 shadow-lg"></div>
                        <h3>Switches</h3>
                    </button>
                    <button
                        onClick={() => handleCategorySelect("deskmats")}
                        className="flex flex-col items-center gap-1 hover:opacity-80"
                    >
                        <div className="rounded-full h-10 w-10 bg-green-500 shadow-lg"></div>
                        <h3>Deskmats</h3>
                    </button>
                    <button
                        onClick={() => handleCategorySelect("lube")}
                        className="flex flex-col items-center gap-1 hover:opacity-80"
                    >
                        <div className="rounded-full h-10 w-10 bg-green-500 shadow-lg"></div>
                        <h3>Lube</h3>
                    </button>
                    <button
                        onClick={() => handleCategorySelect("accessories")}
                        className="flex flex-col items-center gap-1 hover:opacity-80"
                    >
                        <div className="rounded-full h-10 w-10 bg-green-500 shadow-lg"></div>
                        <h3>Accessories</h3>
                    </button>
                </div>
            </div>
        </div>
    );
}
