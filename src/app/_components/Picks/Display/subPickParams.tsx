"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

type Category =
    | "keyboards"
    | "keycaps"
    | "switches"
    | "deskmats"
    | "lube"
    | "accessories";

// const subParams: Record<Category, string[]> = {
//     keyboards: ["60%", "65%", "75%", "TKL", "Full-size", "Alice", "Ortho"],
//     keycaps: ["PBT", "ABS", "Dye-sublimated", "Double-shot"],
//     switches: ["Linear", "Tactile", "Clicky"],
//     deskmats: ["Large", "Medium", "Small"],
//     lube: ["205g0", "3204", "105", "Tribosys"],
//     accessories: ["Wrist Rests", "Switch Pullers", "Keycap Pullers"],
// };
// split full

export default function SubPickParams() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // do a simple price high to low --- low to high as well

    const category = searchParams.get("category") as Category | null;
    const [subCategory, setSubCategory] = useState<string>("");

    // subs
    const color = searchParams.get("color") || "";
    const priceOrder = searchParams.get("priceOrder") || "";

    // keyboard subs
    const layoutType = searchParams.get("layoutType") || "";
    const caseMaterial = searchParams.get("caseMaterial") || "";

    const assemblyType = searchParams.get("assemblyType") || "";
    const pcbType = searchParams.get("pcbType") || "";
    // const soundType = searchParams.get("soundType") || "";

    // switch subs
    const switchType = searchParams.get("switchType") || "";

    // keycap subs
    const keycapMaterial = searchParams.get("keycapMaterial") || "";
    const profileType = searchParams.get("profileType") || "";

    const page = parseInt(searchParams.get("page") || "1");
    // param state management

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

    // generic
    const handlePriceOrderSelect = (type: string) => {
        updateQueryParams({ priceOrder: priceOrder === type ? "" : type });
    };
    const handleColorSelect = (type: string) => {
        updateQueryParams({ color: color === type ? "" : type });
    };

    // keyboard handles
    const handleLayoutSelect = (type: string) => {
        updateQueryParams({ layoutType: layoutType === type ? "" : type });
    };
    const handleCaseSelect = (type: string) => {
        updateQueryParams({ caseMaterial: caseMaterial === type ? "" : type });
    };
    const handleAssemblySelect = (type: string) => {
        updateQueryParams({ assemblyType: assemblyType === type ? "" : type });
    };
    const handlePcbSelect = (type: string) => {
        updateQueryParams({ pcbType: pcbType === type ? "" : type });
    };
    // const handleSoundSelect = (type: string) => {
    //     updateQueryParams({ soundType: soundType === type ? "" : type });
    // };

    // switch handles
    const handleSwitchSelect = (type: string) => {
        updateQueryParams({ switchType: switchType === type ? "" : type });
    };

    // keycap handles
    const handleProfileSelect = (type: string) => {
        updateQueryParams({ profileType: profileType === type ? "" : type });
    };
    const handleMaterialSelect = (type: string) => {
        updateQueryParams({
            keycapMaterial: keycapMaterial === type ? "" : type,
        });
    };

    const handleReset = () => {
        updateQueryParams({
            priceOrder: "",
            color: "",
            keycapMaterial: "",
            pcbType: "",
            assemblyType: "",
            caseMaterial: "",
            layoutType: "",
            profileType: "",
            soundType: "",
            switchType: "",
        });
    };

    // Define sub-params for each category

    return (
        <>
            <div
                className={`sticky top-64 bg-darkGray rounded-3xl w-[100px] left-16  p-3 flex-col self-start items-center gap-3 ${category === "keyboards" || category === "switches" || category === "keycaps" || category === "deskmats" ? "flex" : "hidden"} max-h-[60vh] overflow-y-auto hidden-scrollbar`}
            >
                {category === "keyboards" && (
                    <>
                        {(subCategory === "layout" || subCategory === "") && (
                            <button
                                className="flex flex-col items-center hover:opacity-80"
                                onClick={() => {
                                    if (subCategory === "layout")
                                        setSubCategory("");
                                    else {
                                        setSubCategory("layout");
                                    }
                                }}
                            >
                                <div className="bg-green-500 w-8 h-8 rounded-full "></div>
                                <p>Layout</p>
                            </button>
                        )}
                        {(subCategory === "case" || subCategory === "") && (
                            <button
                                className="flex flex-col items-center hover:opacity-80"
                                onClick={() => {
                                    if (subCategory === "case")
                                        setSubCategory("");
                                    else {
                                        setSubCategory("case");
                                    }
                                }}
                            >
                                <div className="bg-green-500 w-8 h-8 rounded-full "></div>
                                <p>Case</p>
                            </button>
                        )}
                        {(subCategory === "color" || subCategory === "") && (
                            <button
                                className="flex flex-col items-center hover:opacity-80"
                                onClick={() => {
                                    if (subCategory === "color")
                                        setSubCategory("");
                                    else {
                                        setSubCategory("color");
                                    }
                                }}
                            >
                                <div className="bg-green-500 w-8 h-8 rounded-full "></div>
                                <p>Color</p>
                            </button>
                        )}
                        {(subCategory === "pcb" || subCategory === "") && (
                            <button
                                className="flex flex-col items-center hover:opacity-80"
                                onClick={() => {
                                    if (subCategory === "pcb")
                                        setSubCategory("");
                                    else {
                                        setSubCategory("pcb");
                                    }
                                }}
                            >
                                <div className="bg-green-500 w-8 h-8 rounded-full "></div>
                                <p>Pcb</p>
                            </button>
                        )}
                        {(subCategory === "price" || subCategory === "") && (
                            <button
                                className="flex flex-col items-center hover:opacity-80"
                                onClick={() => {
                                    if (subCategory === "price")
                                        setSubCategory("");
                                    else {
                                        setSubCategory("price");
                                    }
                                }}
                            >
                                <div className="bg-green-500 w-8 h-8 rounded-full "></div>
                                <p>Price</p>
                            </button>
                        )}
                        {subCategory === "" && (
                            <button
                                className="flex flex-col items-center hover:opacity-80"
                                onClick={() => handleReset()}
                            >
                                <div className="bg-green-500 w-8 h-8 rounded-full "></div>
                                <p>Reset</p>
                            </button>
                        )}

                        {/* KEYBOARD SUB OPTIONS HERE */}

                        {subCategory === "layout" && (
                            <>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleLayoutSelect("alice")}
                                >
                                    <div
                                        className={`${layoutType === "alice" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Alice</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleLayoutSelect("ortho")}
                                >
                                    <div
                                        className={`${layoutType === "ortho" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Ortho</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleLayoutSelect("split")}
                                >
                                    <div
                                        className={`${layoutType === "split" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Split</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleLayoutSelect("100")}
                                >
                                    <div
                                        className={`${layoutType === "100" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>100%</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleLayoutSelect("75")}
                                >
                                    <div
                                        className={`${layoutType === "75" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>75%</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleLayoutSelect("65")}
                                >
                                    <div
                                        className={`${layoutType === "65" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>65%</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleLayoutSelect("60")}
                                >
                                    <div
                                        className={`${layoutType === "60" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>60%</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleLayoutSelect("40")}
                                >
                                    <div
                                        className={`${layoutType === "40" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>40%</p>
                                </button>
                            </>
                        )}
                        {subCategory === "case" && (
                            <>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleCaseSelect("plastic")}
                                >
                                    <div
                                        className={`${caseMaterial === "plastic" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Plastic</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleCaseSelect("aluminum")}
                                >
                                    <div
                                        className={`${caseMaterial === "aluminum" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Aluminum</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleCaseSelect("steel")}
                                >
                                    <div
                                        className={`${caseMaterial === "steel" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Steel</p>
                                </button>
                            </>
                        )}
                        {subCategory === "color" && (
                            <>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("black")}
                                >
                                    <div
                                        className={`${color === "black" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Black</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("white")}
                                >
                                    <div
                                        className={`${color === "white" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>White</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("blue")}
                                >
                                    <div
                                        className={`${color === "blue" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Blue</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("gray")}
                                >
                                    <div
                                        className={`${color === "gray" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Gray</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("green")}
                                >
                                    <div
                                        className={`${color === "green" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Green</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("orange")}
                                >
                                    <div
                                        className={`${color === "orange" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Orange</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("pink")}
                                >
                                    <div
                                        className={`${color === "pink" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Pink</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("purple")}
                                >
                                    <div
                                        className={`${color === "purple" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Purple</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("red")}
                                >
                                    <div
                                        className={`${color === "red" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Red</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("yellow")}
                                >
                                    <div
                                        className={`${color === "yellow" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Yellow</p>
                                </button>
                            </>
                        )}
                        {subCategory === "pcb" && (
                            <>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handlePcbSelect("hotswap")}
                                >
                                    <div
                                        className={`${pcbType === "hotswap" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Hotswap</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handlePcbSelect("solder")}
                                >
                                    <div
                                        className={`${pcbType === "solder" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Solder</p>
                                </button>
                            </>
                        )}
                        {subCategory === "price" && (
                            <>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() =>
                                        handlePriceOrderSelect("low")
                                    }
                                >
                                    <div
                                        className={`${priceOrder === "low" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Low</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() =>
                                        handlePriceOrderSelect("high")
                                    }
                                >
                                    <div
                                        className={`${priceOrder === "high" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>High</p>
                                </button>
                            </>
                        )}
                    </>
                )}

                {/* KEYCAPS */}

                {category === "keycaps" && (
                    <>
                        {(subCategory === "profile" || subCategory === "") && (
                            <button
                                className="flex flex-col items-center hover:opacity-80"
                                onClick={() => {
                                    if (subCategory === "profile")
                                        setSubCategory("");
                                    else {
                                        setSubCategory("profile");
                                    }
                                }}
                            >
                                <div className="bg-green-500 w-8 h-8 rounded-full "></div>
                                <p>Profile</p>
                            </button>
                        )}
                        {(subCategory === "material" || subCategory === "") && (
                            <button
                                className="flex flex-col items-center hover:opacity-80"
                                onClick={() => {
                                    if (subCategory === "material")
                                        setSubCategory("");
                                    else {
                                        setSubCategory("material");
                                    }
                                }}
                            >
                                <div className="bg-green-500 w-8 h-8 rounded-full "></div>
                                <p>Material</p>
                            </button>
                        )}
                        {(subCategory === "color" || subCategory === "") && (
                            <button
                                className="flex flex-col items-center hover:opacity-80"
                                onClick={() => {
                                    if (subCategory === "color")
                                        setSubCategory("");
                                    else {
                                        setSubCategory("color");
                                    }
                                }}
                            >
                                <div className="bg-green-500 w-8 h-8 rounded-full "></div>
                                <p>Color</p>
                            </button>
                        )}
                        {(subCategory === "price" || subCategory === "") && (
                            <button
                                className="flex flex-col items-center hover:opacity-80"
                                onClick={() => {
                                    if (subCategory === "price")
                                        setSubCategory("");
                                    else {
                                        setSubCategory("price");
                                    }
                                }}
                            >
                                <div className="bg-green-500 w-8 h-8 rounded-full "></div>
                                <p>Price</p>
                            </button>
                        )}
                        {subCategory === "" && (
                            <button
                                className="flex flex-col items-center hover:opacity-80"
                                onClick={() => handleReset()}
                            >
                                <div className="bg-green-500 w-8 h-8 rounded-full "></div>
                                <p>Reset</p>
                            </button>
                        )}

                        {subCategory === "profile" && (
                            <>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() =>
                                        handleProfileSelect("cherry")
                                    }
                                >
                                    <div
                                        className={`${profileType === "cherry" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Cherry</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleProfileSelect("sa")}
                                >
                                    <div
                                        className={`${profileType === "sa" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>SA</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleProfileSelect("oem")}
                                >
                                    <div
                                        className={`${profileType === "oem" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>OEM</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleProfileSelect("dsa")}
                                >
                                    <div
                                        className={`${profileType === "dsa" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>DSA</p>
                                </button>
                            </>
                        )}
                        {subCategory === "material" && (
                            <>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleMaterialSelect("abs")}
                                >
                                    <div
                                        className={`${keycapMaterial === "abs" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>ABS</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() =>
                                        handleMaterialSelect("aluminum")
                                    }
                                >
                                    <div
                                        className={`${keycapMaterial === "aluminum" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>PBT</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleMaterialSelect("pom")}
                                >
                                    <div
                                        className={`${keycapMaterial === "pom" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>POM</p>
                                </button>
                            </>
                        )}
                        {subCategory === "color" && (
                            <>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("black")}
                                >
                                    <div
                                        className={`${color === "black" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Black</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("white")}
                                >
                                    <div
                                        className={`${color === "white" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>White</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("blue")}
                                >
                                    <div
                                        className={`${color === "blue" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Blue</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("gray")}
                                >
                                    <div
                                        className={`${color === "gray" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Gray</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("green")}
                                >
                                    <div
                                        className={`${color === "green" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Green</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("orange")}
                                >
                                    <div
                                        className={`${color === "orange" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Orange</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("pink")}
                                >
                                    <div
                                        className={`${color === "pink" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Pink</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("purple")}
                                >
                                    <div
                                        className={`${color === "purple" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Purple</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("red")}
                                >
                                    <div
                                        className={`${color === "red" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Red</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("yellow")}
                                >
                                    <div
                                        className={`${color === "yellow" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Yellow</p>
                                </button>
                            </>
                        )}
                        {subCategory === "price" && (
                            <>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() =>
                                        handlePriceOrderSelect("low")
                                    }
                                >
                                    <div
                                        className={`${priceOrder === "low" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Low</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() =>
                                        handlePriceOrderSelect("high")
                                    }
                                >
                                    <div
                                        className={`${priceOrder === "high" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>High</p>
                                </button>
                            </>
                        )}
                    </>
                )}

                {/* SWITCHES */}
                {category === "switches" && (
                    <>
                        {(subCategory === "switchType" ||
                            subCategory === "") && (
                            <button
                                className="flex flex-col items-center hover:opacity-80"
                                onClick={() => {
                                    if (subCategory === "switchType")
                                        setSubCategory("");
                                    else {
                                        setSubCategory("switchType");
                                    }
                                }}
                            >
                                <div className="bg-green-500 w-8 h-8 rounded-full "></div>
                                <p>Type</p>
                            </button>
                        )}

                        {(subCategory === "color" || subCategory === "") && (
                            <button
                                className="flex flex-col items-center hover:opacity-80"
                                onClick={() => {
                                    if (subCategory === "color")
                                        setSubCategory("");
                                    else {
                                        setSubCategory("color");
                                    }
                                }}
                            >
                                <div className="bg-green-500 w-8 h-8 rounded-full "></div>
                                <p>Color</p>
                            </button>
                        )}
                        {(subCategory === "price" || subCategory === "") && (
                            <button
                                className="flex flex-col items-center hover:opacity-80"
                                onClick={() => {
                                    if (subCategory === "price")
                                        setSubCategory("");
                                    else {
                                        setSubCategory("price");
                                    }
                                }}
                            >
                                <div className="bg-green-500 w-8 h-8 rounded-full "></div>
                                <p>Price</p>
                            </button>
                        )}
                        {subCategory === "" && (
                            <button
                                className="flex flex-col items-center hover:opacity-80"
                                onClick={() => handleReset()}
                            >
                                <div className="bg-green-500 w-8 h-8 rounded-full "></div>
                                <p>Reset</p>
                            </button>
                        )}

                        {subCategory === "switchType" && (
                            <>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleSwitchSelect("linear")}
                                >
                                    <div
                                        className={`${switchType === "linear" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Linear</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() =>
                                        handleSwitchSelect("tactile")
                                    }
                                >
                                    <div
                                        className={`${switchType === "tactile" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Tactile</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleSwitchSelect("clicky")}
                                >
                                    <div
                                        className={`${switchType === "clicky" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Clicky</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleSwitchSelect("silent")}
                                >
                                    <div
                                        className={`${switchType === "silent" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Silent</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleSwitchSelect("other")}
                                >
                                    <div
                                        className={`${switchType === "other" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Other</p>
                                </button>
                            </>
                        )}
                        {subCategory === "color" && (
                            <>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("black")}
                                >
                                    <div
                                        className={`${color === "black" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Black</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("white")}
                                >
                                    <div
                                        className={`${color === "white" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>White</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("blue")}
                                >
                                    <div
                                        className={`${color === "blue" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Blue</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("gray")}
                                >
                                    <div
                                        className={`${color === "gray" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Gray</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("green")}
                                >
                                    <div
                                        className={`${color === "green" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Green</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("orange")}
                                >
                                    <div
                                        className={`${color === "orange" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Orange</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("pink")}
                                >
                                    <div
                                        className={`${color === "pink" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Pink</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("purple")}
                                >
                                    <div
                                        className={`${color === "purple" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Purple</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("red")}
                                >
                                    <div
                                        className={`${color === "red" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Red</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("yellow")}
                                >
                                    <div
                                        className={`${color === "yellow" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Yellow</p>
                                </button>
                            </>
                        )}
                        {subCategory === "price" && (
                            <>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() =>
                                        handlePriceOrderSelect("low")
                                    }
                                >
                                    <div
                                        className={`${priceOrder === "low" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Low</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() =>
                                        handlePriceOrderSelect("high")
                                    }
                                >
                                    <div
                                        className={`${priceOrder === "high" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>High</p>
                                </button>
                            </>
                        )}
                    </>
                )}

                {category === "deskmats" && (
                    <>
                        {(subCategory === "color" || subCategory === "") && (
                            <button
                                className="flex flex-col items-center hover:opacity-80"
                                onClick={() => {
                                    if (subCategory === "color")
                                        setSubCategory("");
                                    else {
                                        setSubCategory("color");
                                    }
                                }}
                            >
                                <div className="bg-green-500 w-8 h-8 rounded-full "></div>
                                <p>Color</p>
                            </button>
                        )}
                        {(subCategory === "price" || subCategory === "") && (
                            <button
                                className="flex flex-col items-center hover:opacity-80"
                                onClick={() => {
                                    if (subCategory === "price")
                                        setSubCategory("");
                                    else {
                                        setSubCategory("price");
                                    }
                                }}
                            >
                                <div className="bg-green-500 w-8 h-8 rounded-full "></div>
                                <p>Price</p>
                            </button>
                        )}
                        {subCategory === "" && (
                            <button
                                className="flex flex-col items-center hover:opacity-80"
                                onClick={() => handleReset()}
                            >
                                <div className="bg-green-500 w-8 h-8 rounded-full "></div>
                                <p>Reset</p>
                            </button>
                        )}

                        {subCategory === "color" && (
                            <>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("black")}
                                >
                                    <div
                                        className={`${color === "black" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Black</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("white")}
                                >
                                    <div
                                        className={`${color === "white" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>White</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("blue")}
                                >
                                    <div
                                        className={`${color === "blue" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Blue</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("gray")}
                                >
                                    <div
                                        className={`${color === "gray" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Gray</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("green")}
                                >
                                    <div
                                        className={`${color === "green" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Green</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("orange")}
                                >
                                    <div
                                        className={`${color === "orange" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Orange</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("pink")}
                                >
                                    <div
                                        className={`${color === "pink" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Pink</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("purple")}
                                >
                                    <div
                                        className={`${color === "purple" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Purple</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("red")}
                                >
                                    <div
                                        className={`${color === "red" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Red</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() => handleColorSelect("yellow")}
                                >
                                    <div
                                        className={`${color === "yellow" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full`}
                                    ></div>
                                    <p>Yellow</p>
                                </button>
                            </>
                        )}
                        {subCategory === "price" && (
                            <>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() =>
                                        handlePriceOrderSelect("low")
                                    }
                                >
                                    <div
                                        className={`${priceOrder === "low" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>Low</p>
                                </button>
                                <button
                                    className="flex flex-col items-center hover:opacity-80"
                                    onClick={() =>
                                        handlePriceOrderSelect("high")
                                    }
                                >
                                    <div
                                        className={`${priceOrder === "high" ? "bg-green-500" : "bg-mediumGray"} w-8 h-8 rounded-full "`}
                                    ></div>
                                    <p>High</p>
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
