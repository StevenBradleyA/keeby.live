"use client";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import ResetArrowSvg from "~/app/_components/Svgs/reset";
import NotificationSvg from "~/app/_components/Svgs/notification";
import { useRouter, useSearchParams } from "next/navigation";
import { useGlobalState } from "~/app/_components/Context/GlobalState/globalState";
import BinaryRain from "~/app/_components/Matrix/binaryRain";
import CreateListingButton from "../../Create/createListingButton";

export default function MarketplacePreviewFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const filter = searchParams.get("filter") || "hot";
    const search = searchParams.get("search") || "";

    const switchType = searchParams.get("switchType") || "";
    const soundType = searchParams.get("soundType") || "";
    // const isBudget = searchParams.get("isBudget") === "true";
    // const isBallin = searchParams.get("isBallin") === "true"
    // const priceOrder = searchParams.get("priceOrder") || "";

    const minPrice = parseInt(searchParams.get("minPrice") || "");
    const maxPrice = parseInt(searchParams.get("maxPrice") || "");
    const layoutType = searchParams.get("layoutType") || "";
    const assemblyType = searchParams.get("assemblyType") || "";
    const pcbType = searchParams.get("pcbType") || "";
    const page = parseInt(searchParams.get("page") || "1");

    const [searchInput, setSearchInput] = useState<string>(search);
    //
    const [minPriceInput, setMinPriceInput] = useState<number>(minPrice);
    const [maxPriceInput, setMaxPriceInput] = useState<number>(maxPrice);

    const [isSearchFocus, setIsSearchFocus] = useState<boolean>(false);
    const [isSpecify, setIsSpecify] = useState<boolean>(false);
    const { pageNumber, setPageNumber } = useGlobalState();

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

    const handleSearchClick = () => {
        setIsSpecify(false);
    };

    const handleSpecifyClick = () => {
        setIsSpecify(true);
    };

    const handleResetSpecify = () => {
        updateQueryParams({
            switchType: "",
            soundType: "",
            assemblyType: "",
            pcbType: "",
            layoutType: "",
            maxPrice: "",
            minPrice: "",
        });
        setMinPriceInput(0);
        setMaxPriceInput(0);
    };

    const handleSwitchSelect = (type: string) => {
        updateQueryParams({ switchType: switchType === type ? "" : type });
    };
    const handleSoundSelect = (type: string) => {
        updateQueryParams({ soundType: soundType === type ? "" : type });
    };
    const handleAssemblySelect = (type: string) => {
        updateQueryParams({ assemblyType: assemblyType === type ? "" : type });
    };
    const handlePcbSelect = (type: string) => {
        updateQueryParams({ pcbType: pcbType === type ? "" : type });
    };
    const handleLayoutSelect = (type: string) => {
        updateQueryParams({ layoutType: layoutType === type ? "" : type });
    };

    const handleFilters = (isNew: string) => {
        updateQueryParams({ filter: isNew });
    };

    useEffect(() => {
        const handler = debounce(() => {
            updateQueryParams({
                search: searchInput,
                minPrice: minPriceInput,
                maxPrice: maxPriceInput,
            });
        }, 250);

        handler();
        return () => {
            handler.cancel();
        };
    }, [searchInput, minPriceInput, maxPriceInput]);

    useEffect(() => {
        // Reset page number when the filter changes
        setPageNumber(1);
    }, [
        filter,
        search,
        switchType,
        soundType,
        pcbType,
        assemblyType,
        setPageNumber,
    ]);

    useEffect(() => {
        if (page !== pageNumber) {
            updateQueryParams({ page: pageNumber });
        }
    }, [pageNumber]);

    return (
        <>
            <div className="flex w-full items-start z-20 fixed top-44 bg-dark px-2 tablet:px-5 desktop:px-16 text-mediumGray">
                <div className="w-1/4 flex gap-5 items-start justify-start ">
                    <button
                        onClick={handleSearchClick}
                        className={`ease-in ${
                            !isSpecify
                                ? "border-b border-white text-white hover:text-white"
                                : "border-b border-white border-opacity-0 hover:text-white/40"
                        }`}
                    >
                        Search
                    </button>
                    <div className="relative flex">
                        <button
                            onClick={handleSpecifyClick}
                            className={`ease-in ${
                                isSpecify
                                    ? "border-b border-white text-white hover:text-white"
                                    : "border-b border-white border-opacity-0 hover:text-white/40"
                            }`}
                        >
                            Specify
                        </button>
                        {(switchType ||
                            assemblyType ||
                            soundType ||
                            switchType ||
                            layoutType) && (
                            <div className="absolute -right-5 bottom-3 h-5 w-5 text-green-500  ">
                                <NotificationSvg />
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-3/4  flex justify-between pl-10">
                    <div className="flex gap-5 items-start">
                        <button
                            className={`ease-in ${
                                filter === "hot"
                                    ? "border-b border-white text-white hover:text-white"
                                    : "border-b border-white border-opacity-0 hover:text-white/40"
                            }`}
                            onClick={() => handleFilters("hot")}
                        >
                            Hot
                        </button>
                        <button
                            className={`ease-in ${
                                filter === "new"
                                    ? "border-b border-white text-white hover:text-white"
                                    : "border-b border-white border-opacity-0 hover:text-white/40"
                            }`}
                            onClick={() => handleFilters("new")}
                        >
                            New
                        </button>
                    </div>
                    <CreateListingButton />
                </div>
            </div>

            <div className=" flex w-[23%] flex-col fixed top-56 left-16 z-20 ">
                <div
                    className={` relative tablet:h-[68vh] desktop:h-[72vh] ${
                        isSpecify ? "overflow-auto" : "overflow-hidden"
                    } w-full rounded-xl bg-darkGray p-5 text-mediumGray`}
                >
                    {isSpecify ? (
                        <div className="flex w-full flex-col items-start">
                            <div className="relative flex w-full">
                                <h2 className="text-green-500">Switches:</h2>
                                <button
                                    className=" absolute -top-1 right-0 h-7 w-7 text-mediumGray ease-in hover:text-green-500"
                                    onClick={handleResetSpecify}
                                >
                                    <ResetArrowSvg />
                                </button>
                            </div>
                            <div className="flex gap-5">
                                <div className="flex w-full flex-col items-start">
                                    <button
                                        onClick={() =>
                                            handleSwitchSelect("linear")
                                        }
                                        className={` mt-1 ease-in hover:text-white  ${
                                            switchType === "linear"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        linear
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleSwitchSelect("tactile")
                                        }
                                        className={` ease-in hover:text-white  ${
                                            switchType === "tactile"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        tactile
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleSwitchSelect("silent")
                                        }
                                        className={` ease-in hover:text-white  ${
                                            switchType === "silent"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        silent
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleSwitchSelect("clicky")
                                        }
                                        className={` ease-in hover:text-white  ${
                                            switchType === "clicky"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        clicky
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleSwitchSelect("other")
                                        }
                                        className={` ease-in hover:text-white  ${
                                            switchType === "other"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        other
                                    </button>

                                    <h2 className="text-green-500">Sound:</h2>
                                    <button
                                        onClick={() =>
                                            handleSoundSelect("thock")
                                        }
                                        className={` mt-1 ease-in hover:text-white  ${
                                            soundType === "thock"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        thock
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleSoundSelect("clack")
                                        }
                                        className={` ease-in hover:text-white  ${
                                            soundType === "clack"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        clack
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleSoundSelect("click")
                                        }
                                        className={` ease-in hover:text-white  ${
                                            soundType === "click"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        click
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleSoundSelect("silent")
                                        }
                                        className={` ease-in hover:text-white  ${
                                            soundType === "silent"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        silent
                                    </button>

                                    <h2 className="text-green-500">
                                        Assembly:
                                    </h2>
                                    <button
                                        onClick={() =>
                                            handleAssemblySelect("assembled")
                                        }
                                        className={` mt-1 ease-in hover:text-white  ${
                                            assemblyType === "assembled"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        assembled
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleAssemblySelect("unassembled")
                                        }
                                        className={` ease-in hover:text-white  ${
                                            assemblyType === "unassembled"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        unassembled
                                    </button>

                                    <h2 className="text-green-500">PCB:</h2>
                                    <button
                                        onClick={() =>
                                            handlePcbSelect("hotswap")
                                        }
                                        className={` mt-1 ease-in hover:text-white  ${
                                            pcbType === "hotswap"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        hotswap
                                    </button>
                                    <button
                                        onClick={() =>
                                            handlePcbSelect("soldered")
                                        }
                                        className={` ease-in hover:text-white  ${
                                            pcbType === "soldered"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        soldered
                                    </button>

                                    <h2 className="text-green-500">Layout:</h2>
                                    <button
                                        onClick={() =>
                                            handleLayoutSelect("alice")
                                        }
                                        className={` mt-1 ease-in hover:text-white  ${
                                            layoutType === "alice"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        alice
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleLayoutSelect("split")
                                        }
                                        className={` ease-in hover:text-white  ${
                                            layoutType === "split"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        split
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleLayoutSelect("ortho")
                                        }
                                        className={` ease-in hover:text-white  ${
                                            layoutType === "ortho"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        ortho
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleLayoutSelect("100")
                                        }
                                        className={` ease-in hover:text-white  ${
                                            layoutType === "100"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        100
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleLayoutSelect("100")
                                        }
                                        className={` ease-in hover:text-white  ${
                                            layoutType === "100"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        75
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleLayoutSelect("100")
                                        }
                                        className={` ease-in hover:text-white  ${
                                            layoutType === "100"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        65
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleLayoutSelect("100")
                                        }
                                        className={` ease-in hover:text-white  ${
                                            layoutType === "100"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        60
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleLayoutSelect("100")
                                        }
                                        className={` ease-in hover:text-white  ${
                                            layoutType === "100"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        40
                                    </button>
                                </div>
                                <div className="flex flex-col ">
                                    <input
                                        id="minimum price"
                                        type="number"
                                        value={minPriceInput}
                                        onChange={(e) =>
                                            setMinPriceInput(+e.target.value)
                                        }
                                        className="h-8 w-32 rounded-md bg-black text-white p-1"
                                        placeholder="Min price"
                                        min="0"
                                        step={1}
                                    />
                                    <input
                                        id="max price"
                                        type="number"
                                        value={maxPriceInput}
                                        onChange={(e) =>
                                            setMaxPriceInput(+e.target.value)
                                        }
                                        className="h-8 w-32 rounded-md bg-black text-white p-1"
                                        placeholder="Max price"
                                        min="0"
                                        step={1}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="relative w-full h-full ">
                            <input
                                id="searchInput"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className={`search-input-hack absolute h-10 w-full rounded-md px-3 z-20 ${
                                    isSearchFocus
                                        ? "search-input-placeholder bg-blackAlternative"
                                        : "bg-mediumGray"
                                } py-1 text-green-500 outline-none `}
                                placeholder="Search"
                                onFocus={() => setIsSearchFocus(true)}
                                onBlur={() => setIsSearchFocus(false)}
                            />

                            {isSearchFocus && (
                                <div className=" absolute -bottom-10 -left-10 -top-10 -right-10 z-10  ">
                                    <BinaryRain
                                        textColor="#22c55e"
                                        fontSize={10}
                                        letters="010110"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

// const cookies = getCookies();

// const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
// const [filter, setFilter] = useState<string>("Hot");

// const [isSpecify, setIsSpecify] = useState<boolean>(false);
// const [searchInput, setSearchInput] = useState<string>("");
// const [isSearchFocus, setIsSearchFocus] = useState<boolean>(false);
// const [debouncedSearchQuery, setDebouncedSearchQuery] =
//     useState<string>("");

// // specify
// const [switchType, setSwitchType] = useState<string>("");
// const [soundType, setSoundType] = useState<string>("");
// const [isBudget, setIsBudget] = useState<boolean>(false);
// const [isBallin, setIsBallin] = useState<boolean>(false);
// const [minPrice, setMinPrice] = useState<number | null>(null);
// const [maxPrice, setMaxPrice] = useState<number | null>(null);
// const [layoutType, setLayoutType] = useState<string>("");
// const [assemblyType, setAssemblyType] = useState<string>("");
// const [hotSwapType, setHotSwapType] = useState<string>("");
// const [priceOrder, setPriceOrder] = useState<string>("");

// const openModal = () => {
//     setIsModalOpen(true);
// };

// const closeModal = () => {
//     setIsModalOpen(false);
// };

// const handleSearchClick = () => {
//     setIsSpecify(false);
// };

// const handleSpecifyClick = () => {
//     setIsSpecify(true);
// };

// const handleResetSpecify = () => {
//     setSwitchType("");
//     setIsBudget(false);
//     setIsBallin(false);
//     setMinPrice(null);
//     setMaxPrice(null);
//     setSoundType("");
//     setLayoutType("");
//     setAssemblyType("");
//     setHotSwapType("");
// };

// const handleLayoutTypeSelect = (type: string) => {
//     if (layoutType === type) {
//         setLayoutType("");
//     } else {
//         if (type === "100%") {
//             setLayoutType("100%");
//         }
//         if (type === "75%") {
//             setLayoutType("75%");
//         }
//         if (type === "65%") {
//             setLayoutType("65%");
//         }
//         if (type === "60%") {
//             setLayoutType("60%");
//         }
//         if (type === "40%") {
//             setLayoutType("40%");
//         }
//     }
// };

// const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value ? Math.floor(+e.target.value) : null;
//     if (value) {
//         setIsBudget(false);
//         setIsBallin(false);
//     }
//     setMinPrice(value);
// };
// function handleMaxPrice(e: React.ChangeEvent<HTMLInputElement>) {
//     const value = e.target.value ? Math.floor(+e.target.value) : null;
//     if (value) {
//         setIsBudget(false);
//         setIsBallin(false);
//     }
//     setMaxPrice(value);
// }

// useEffect(() => {
//     const handler = debounce(() => {
//         setDebouncedSearchQuery(searchInput);
//     }, 250);

//     handler();
//     return () => {
//         handler.cancel();
//     };
// }, [searchInput]);

// useEffect(() => {
//     if (cookies.filter) {
//         setFilter(cookies.filter);
//     }
// }, [cookies]);

// const handleFilters = (isNew: string) => {
//     setFilter(isNew);
//     setCookie("filter", isNew, {
//         maxAge: 60 * 60 * 24 * 365, // 1 year
//         path: "/",
//     });
// };

// <div className="mt-10 flex w-full flex-col text-mediumGray tablet:px-5 desktop:px-16">
// <div className=" flex w-full  gap-10 ">
//     <div className=" very-sticky flex w-1/4 flex-col">
//         <div className="mb-5 flex gap-5 ">
//             <button
//                 onClick={handleSearchClick}
//                 className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
//                     !isSpecify
//                         ? "border-b border-white text-white"
//                         : "border-b border-white border-opacity-0"
//                 }`}
//             >
//                 Search
//             </button>
//             <div className="relative flex">
//                 <button
//                     onClick={handleSpecifyClick}
//                     className={` transition-colors duration-400 ease-custom-cubic hover:text-white  ${
//                         isSpecify
//                             ? "border-b border-white text-white"
//                             : "border-b border-white border-opacity-0"
//                     }`}
//                 >
//                     Specify
//                 </button>
//                 {(switchType ||
//                     isBudget === true ||
//                     isBallin === true ||
//                     minPrice ||
//                     maxPrice ||
//                     soundType ||
//                     layoutType ||
//                     assemblyType ||
//                     hotSwapType) && (
//                     <div className="absolute -right-5 bottom-3 h-5 w-5 text-green-500  ">
//                         <NotificationSvg />
//                     </div>
//                 )}
//             </div>
//         </div>

//         <div
//             className={` relative w-full ${
//                 isSpecify ? "overflow-auto" : "overflow-hidden"
//             } rounded-xl bg-darkGray p-5 text-mediumGray tablet:h-[68vh] desktop:h-[72vh]`}
//         >
//             {isSpecify ? (
//                 <div className="flex w-full flex-col items-start gap-5 ">
//                     <div className="flex w-full flex-col items-start">
//                         <div className="relative flex w-full">
//                             <h1 className="text-green-500">
//                                 Switch Type:
//                             </h1>
//                             <button
//                                 className=" absolute -top-1 right-0 h-7 w-7 text-mediumGray transition-colors duration-400 ease-custom-cubic hover:text-green-500"
//                                 onClick={handleResetSpecify}
//                             >
//                                 <ResetArrowSvg />
//                             </button>
//                         </div>
//                         <button
//                             onClick={() =>
//                                 handleSwitchTypeSelect(
//                                     "tactile",
//                                 )
//                             }
//                             className={` transition-colors duration-400 ease-custom-cubic hover:text-white  ${
//                                 switchType === "tactile"
//                                     ? "border-b border-white text-white"
//                                     : "border-b border-white border-opacity-0"
//                             }`}
//                         >
//                             tactile
//                         </button>
//                         <button
//                             onClick={() =>
//                                 handleSwitchTypeSelect("linear")
//                             }
//                             className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
//                                 switchType === "linear"
//                                     ? "border-b border-white text-white"
//                                     : "border-b border-white border-opacity-0"
//                             }`}
//                         >
//                             linear
//                         </button>
//                         <button
//                             onClick={() =>
//                                 handleSwitchTypeSelect("clicky")
//                             }
//                             className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
//                                 switchType === "clicky"
//                                     ? "border-b border-white text-white"
//                                     : "border-b border-white border-opacity-0"
//                             }`}
//                         >
//                             clicky
//                         </button>
//                         <button
//                             onClick={() =>
//                                 handleSwitchTypeSelect("other")
//                             }
//                             className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
//                                 switchType === "other"
//                                     ? "border-b border-white text-white"
//                                     : "border-b border-white border-opacity-0"
//                             }`}
//                         >
//                             other
//                         </button>
//                     </div>

//                     <div className="flex flex-col items-start ">
//                         <h1 className="text-green-500">
//                             Sound:
//                         </h1>
//                         <button
//                             onClick={() =>
//                                 handleSoundTypeSelect("thock")
//                             }
//                             className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
//                                 soundType === "thock"
//                                     ? "border-b border-white text-white"
//                                     : "border-b border-white border-opacity-0"
//                             }`}
//                         >
//                             thock
//                         </button>
//                         <button
//                             onClick={() =>
//                                 handleSoundTypeSelect("clack")
//                             }
//                             className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
//                                 soundType === "clack"
//                                     ? "border-b border-white text-white"
//                                     : "border-b border-white border-opacity-0"
//                             }`}
//                         >
//                             clack
//                         </button>
//                         <button
//                             onClick={() =>
//                                 handleSoundTypeSelect("click")
//                             }
//                             className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
//                                 soundType === "click"
//                                     ? "border-b border-white text-white"
//                                     : "border-b border-white border-opacity-0"
//                             }`}
//                         >
//                             click
//                         </button>
//                         <button
//                             onClick={() =>
//                                 handleSoundTypeSelect("silent")
//                             }
//                             className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
//                                 soundType === "silent"
//                                     ? "border-b border-white text-white"
//                                     : "border-b border-white border-opacity-0"
//                             }`}
//                         >
//                             silent
//                         </button>
//                     </div>

//                     <div className="flex flex-col items-start">
//                         <h1 className="text-green-500">
//                             {" "}
//                             Price:
//                         </h1>
//                         <div className="flex gap-16">
//                             <label>
//                                 {`budget < $200`}
//                                 <input
//                                     type="checkbox"
//                                     name="Preventing Scams"
//                                     className=" h-5 w-5 cursor-pointer rounded-md border-2 border-green-500 hover:bg-black hover:bg-opacity-30"
//                                     checked={isBudget}
//                                     onChange={() => {
//                                         setIsBudget(!isBudget);
//                                         if (isBallin) {
//                                             setIsBallin(false);
//                                         }
//                                         if (
//                                             minPrice ||
//                                             maxPrice
//                                         ) {
//                                             setMinPrice(null);
//                                             setMaxPrice(null);
//                                         }
//                                     }}
//                                 />
//                             </label>

//                             <label>
//                                 {`ballin > $200`}

//                                 <input
//                                     type="checkbox"
//                                     name="Preventing Scams"
//                                     className=" h-5 w-5 cursor-pointer rounded-md border-2 border-green-500 hover:bg-black hover:bg-opacity-30"
//                                     checked={isBallin}
//                                     onChange={() => {
//                                         setIsBallin(!isBallin);
//                                         if (isBudget) {
//                                             setIsBudget(false);
//                                         }
//                                         if (
//                                             minPrice ||
//                                             maxPrice
//                                         ) {
//                                             setMinPrice(null);
//                                             setMaxPrice(null);
//                                         }
//                                     }}
//                                 />
//                             </label>
//                         </div>
//                         <div>
//                             <div className="mt-2 flex gap-12 text-green-500">
//                                 <input
//                                     id="priceInput"
//                                     type="number"
//                                     value={
//                                         minPrice !== null
//                                             ? minPrice
//                                             : ""
//                                     }
//                                     onChange={handleMinPrice}
//                                     className="h-8 w-1/3 rounded-md bg-mediumGray p-1"
//                                     placeholder="$ Min"
//                                 />
//                                 <input
//                                     id="priceInput"
//                                     type="number"
//                                     value={
//                                         maxPrice !== null
//                                             ? maxPrice
//                                             : ""
//                                     }
//                                     onChange={handleMaxPrice}
//                                     className="h-8 w-1/3 rounded-md bg-mediumGray p-1"
//                                     placeholder="$ Max"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex flex-col items-start ">
//                         <h1 className="text-green-500">
//                             Layout:
//                         </h1>
//                         <button
//                             onClick={() =>
//                                 handleLayoutTypeSelect("100%")
//                             }
//                             className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
//                                 layoutType === "100%"
//                                     ? "border-b border-white text-white"
//                                     : "border-b border-white border-opacity-0"
//                             }`}
//                         >
//                             100%
//                         </button>
//                         <button
//                             onClick={() =>
//                                 handleLayoutTypeSelect("75%")
//                             }
//                             className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
//                                 layoutType === "75%"
//                                     ? "border-b border-white text-white"
//                                     : "border-b border-white border-opacity-0"
//                             }`}
//                         >
//                             75%
//                         </button>
//                         <button
//                             onClick={() =>
//                                 handleLayoutTypeSelect("65%")
//                             }
//                             className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
//                                 layoutType === "65%"
//                                     ? "border-b border-white text-white"
//                                     : "border-b border-white border-opacity-0"
//                             }`}
//                         >
//                             65%
//                         </button>
//                         <button
//                             onClick={() =>
//                                 handleLayoutTypeSelect("60%")
//                             }
//                             className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
//                                 layoutType === "60%"
//                                     ? "border-b border-white text-white"
//                                     : "border-b border-white border-opacity-0"
//                             }`}
//                         >
//                             60%
//                         </button>
//                         <button
//                             onClick={() =>
//                                 handleLayoutTypeSelect("40%")
//                             }
//                             className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
//                                 layoutType === "40%"
//                                     ? "border-b border-white text-white"
//                                     : "border-b border-white border-opacity-0"
//                             }`}
//                         >
//                             40%
//                         </button>
//                     </div>

//                     <div className="flex w-full justify-between">
//                         <div className="flex flex-col items-start ">
//                             <h1 className="text-green-500">
//                                 Assembly:
//                             </h1>
//                             <button
//                                 onClick={() =>
//                                     handleAssemblyTypeSelect(
//                                         "assembled",
//                                     )
//                                 }
//                                 className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
//                                     assemblyType === "assembled"
//                                         ? "border-b border-white text-white"
//                                         : "border-b border-white border-opacity-0"
//                                 }`}
//                             >
//                                 assembled
//                             </button>
//                             <button
//                                 onClick={() =>
//                                     handleAssemblyTypeSelect(
//                                         "unassembled",
//                                     )
//                                 }
//                                 className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
//                                     assemblyType ===
//                                     "unassembled"
//                                         ? "border-b border-white text-white"
//                                         : "border-b border-white border-opacity-0"
//                                 }`}
//                             >
//                                 unassembled
//                             </button>
//                         </div>

//                         <div className="flex flex-col items-start ">
//                             <h1 className="text-green-500">
//                                 Hotswap:
//                             </h1>
//                             <button
//                                 onClick={() =>
//                                     handleHotSwapTypeSelect(
//                                         "hotswap",
//                                     )
//                                 }
//                                 className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
//                                     hotSwapType === "hotswap"
//                                         ? "border-b border-white text-white"
//                                         : "border-b border-white border-opacity-0"
//                                 }`}
//                             >
//                                 Yes
//                             </button>
//                             <button
//                                 onClick={() =>
//                                     handleHotSwapTypeSelect(
//                                         "soldered",
//                                     )
//                                 }
//                                 className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
//                                     hotSwapType === "soldered"
//                                         ? "border-b border-white text-white"
//                                         : "border-b border-white border-opacity-0"
//                                 }`}
//                             >
//                                 No
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="relative w-full  ">
//                     <input
//                         id="searchInput"
//                         value={searchInput}
//                         onChange={(e) =>
//                             setSearchInput(e.target.value)
//                         }
//                         className={` search-input-hack absolute h-10 w-full rounded-md px-3 ${
//                             isSearchFocus
//                                 ? "search-input-placeholder bg-blackAlternative"
//                                 : "bg-mediumGray"
//                         } py-1 text-green-500 outline-none `}
//                         placeholder="Search"
//                         onFocus={() => setIsSearchFocus(true)}
//                         onBlur={() => setIsSearchFocus(false)}
//                     />

//                     {isSearchFocus && (
//                         <div className=" search-input-matrix absolute -bottom-[70vh] left-0 top-0 -m-5 rounded-md opacity-70  ">
//                             <video
//                                 className="h-full object-cover"
//                                 autoPlay
//                                 loop
//                                 muted
//                             >
//                                 <source
//                                     src="https://s3.us-west-2.amazonaws.com/keeby.live/matrix-fade-green.mp4"
//                                     type="video/mp4"
//                                 />
//                                 Your browser does not support
//                                 the video tag.
//                             </video>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     </div>

//     <div className=" flex w-3/4 flex-col">
//         <div className=" very-sticky flex w-full justify-between bg-dark">
//             <div className="mb-5 flex gap-5 text-white/40">
//                 <button
//                     className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
//                         filter === "Hot"
//                             ? "border-b border-white text-white"
//                             : "border-b border-white border-opacity-0"
//                     }`}
//                     onClick={() => handleFilters("Hot")}
//                 >
//                     Hot
//                 </button>
//                 <button
//                     className={`transition-colors  duration-400 ease-custom-cubic hover:text-white ${
//                         filter === "New"
//                             ? "border-b border-white text-white"
//                             : "border-b border-white border-opacity-0"
//                     }`}
//                     onClick={() => handleFilters("New")}
//                 >
//                     New
//                 </button>
//             </div>
//             <div className="flex items-center gap-16 ">
//                 <div className="shop-price-filter-button relative">
//                     <select
//                         className=" custom-select  flex h-5 w-8 items-center rounded-lg bg-darkGray px-2 "
//                         value={priceOrder}
//                         onChange={(e) =>
//                             setPriceOrder(e.target.value)
//                         }
//                     >
//                         <option value="">none</option>
//                         <option value="asc">
//                             Price: Low to High
//                         </option>
//                         <option value="desc">
//                             Price: High to Low
//                         </option>
//                     </select>
//                     <span
//                         className={`select-fake flex h-5 w-8 items-center justify-center rounded-md bg-darkGray ${
//                             priceOrder === ""
//                                 ? "text-mediumGray"
//                                 : "text-green-500"
//                         } shop-price-filter-arrow `}
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 24 24"
//                             width="28px"
//                             height="28px"
//                             fill="none"
//                         >
//                             <path
//                                 d="M7 10L12 15L17 10"
//                                 stroke="currentColor"
//                                 strokeWidth="1.5"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                             />
//                         </svg>
//                     </span>
//                 </div>

//                 <button onClick={openModal}>
//                     <Image
//                         src={plus}
//                         alt="create listing"
//                         width={200}
//                         height={200}
//                         className="shop-create-listing w-12  "
//                     />
//                 </button>
//             </div>
//         </div>
//         <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
//             <CreateListingModal />
//         </ModalDialog>

//         <div>
//             {filter === "New" && (
//                 <DisplayListingPreviews
//                     searchInput={debouncedSearchQuery}
//                     switchType={switchType}
//                     soundType={soundType}
//                     isBudget={isBudget}
//                     isBallin={isBallin}
//                     minPrice={minPrice}
//                     maxPrice={maxPrice}
//                     layoutType={layoutType}
//                     assemblyType={assemblyType}
//                     hotSwapType={hotSwapType}
//                     priceOrder={priceOrder}
//                 />
//             )}
//             {filter === "Hot" && (
//                 <DisplayPopularListingPreviews
//                     searchInput={debouncedSearchQuery}
//                     switchType={switchType}
//                     soundType={soundType}
//                     isBudget={isBudget}
//                     isBallin={isBallin}
//                     minPrice={minPrice}
//                     maxPrice={maxPrice}
//                     layoutType={layoutType}
//                     assemblyType={assemblyType}
//                     hotSwapType={hotSwapType}
//                     priceOrder={priceOrder}
//                 />
//             )}
//         </div>
//     </div>
// </div>
// </div>
