import { useState } from "react";
import { api } from "~/utils/api";
import ModalDialog from "~/components/Modal";
import CreateListingModal from "~/components/KeebShop/CreateListing/CreateModal";
import plus from "@public/Vectors/plus-plus.png";
import Image from "next/image";
import DisplayListingPreviews from "~/components/KeebShop/DisplayListing/DisplayListingsPreview";
import DisplayPopularListingPreviews from "~/components/KeebShop/DisplayListing/DisplayListingsPreview/displayPopularListingPreviews";
import ResetArrowSvg from "~/components/Svgs/reset";
import NotificationSvg from "~/components/Svgs/notification";

export default function Home() {
    // this is a premium keyboard auction site so make it really cool you can do it!

    // TODO onFocus search should show the matrix
    // svg logos next to filters
    // budget or ballin  under or above 250
    // todo add cookies for search filters? maybe
    // maybe just filters for hot / new
    // todo if site gets very popular in future we will have to implement pagination
    // todo search and switch to be sticky
    // todo add price filter maybe change switch to Filters?
    // TODO Layout would be so sick "full tkl 60% 40% "
    // todo also add price asc or desc
    // idk if pre selected prices or just input range.
    // todo could also add a sound Profile selector?
    // thocky, clacky, clicky, quiet
    // todo could add hotswap but idkkkkk
    // assembled vs unassembled

    // todo we def wanna be able to search with filters on huh
    // do we need to indicate that filters are active maybe add a lil star next to specify when they are active?

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isNewFilter, setIsNewFilter] = useState<boolean>(false);
    const [isSpecify, setIsSpecify] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");
    const [isSearchFocus, setIsSearchFocus] = useState<boolean>(false);

    // specify
    const [switchType, setSwitchType] = useState<string>("");
    const [soundType, setSoundType] = useState<string>("");
    const [isBudget, setIsBudget] = useState<boolean>(false);
    const [isBallin, setIsBallin] = useState<boolean>(false);
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [layoutType, setLayoutType] = useState<string>("");
    const [assemblyType, setAssemblyType] = useState<string>("");
    const [hotSwapType, setHotSwapType] = useState<string>("");
    const [priceOrder, setPriceOrder] = useState<string>("");

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSearchClick = () => {
        setIsSpecify(false);
        setSwitchType("");
    };

    const handleSwitchClick = () => {
        setIsSpecify(true);
        setSearchInput("");
    };

    const handleResetSpecify = () => {
        setSwitchType("");
        setIsBudget(false);
        setIsBallin(false);
        setMinPrice(null);
        setMaxPrice(null);
        setSoundType("");
        setLayoutType("");
        setAssemblyType("");
        setHotSwapType("");
    };

    const handleSwitchTypeSelect = (type: string) => {
        if (switchType === type) {
            setSwitchType("");
        } else {
            if (type === "tactile") {
                setSwitchType("tactile");
            }
            if (type === "linear") {
                setSwitchType("linear");
            }
            if (type === "clicky") {
                setSwitchType("clicky");
            }
            if (type === "other") {
                setSwitchType("other");
            }
        }
    };
    const handleSoundTypeSelect = (type: string) => {
        if (soundType === type) {
            setSoundType("");
        } else {
            if (type === "thock") {
                setSoundType("thock");
            }
            if (type === "clack") {
                setSoundType("clack");
            }
            if (type === "click") {
                setSoundType("click");
            }
            if (type === "silent") {
                setSoundType("silent");
            }
        }
    };
    const handleAssemblyTypeSelect = (type: string) => {
        if (assemblyType === type) {
            setAssemblyType("");
        } else {
            if (type === "assembled") {
                setAssemblyType("assembled");
            }
            if (type === "unassembled") {
                setAssemblyType("unassembled");
            }
        }
    };
    const handleLayoutTypeSelect = (type: string) => {
        if (layoutType === type) {
            setLayoutType("");
        } else {
            if (type === "100%") {
                setLayoutType("100%");
            }
            if (type === "75%") {
                setLayoutType("75%");
            }
            if (type === "65%") {
                setLayoutType("65%");
            }
            if (type === "60%") {
                setLayoutType("60%");
            }
            if (type === "40%") {
                setLayoutType("40%");
            }
        }
    };
    const handleHotSwapTypeSelect = (type: string) => {
        if (hotSwapType === type) {
            setHotSwapType("");
        } else {
            if (type === "yes") {
                setHotSwapType("yes");
            }
            if (type === "no") {
                setHotSwapType("no");
            }
        }
    };

    const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? Math.floor(+e.target.value) : null;
        if (value) {
            setIsBudget(false);
            setIsBallin(false);
        }
        setMinPrice(value);
    };
    function handleMaxPrice(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value ? Math.floor(+e.target.value) : null;
        if (value) {
            setIsBudget(false);
            setIsBallin(false);
        }
        setMaxPrice(value);
    }

    return (
        <div className="mt-10 flex w-full flex-col px-16 text-darkGray">
            <div className=" flex w-full  gap-10 ">
                <div className=" very-sticky flex w-1/4 flex-col">
                    <div className="mb-5 flex gap-5 ">
                        <button
                            onClick={handleSearchClick}
                            className={`${
                                !isSpecify
                                    ? "border-b border-white text-white"
                                    : "border-b border-white border-opacity-0"
                            }`}
                        >
                            Search
                        </button>
                        <div className="relative flex">
                            <button
                                onClick={handleSwitchClick}
                                className={`${
                                    isSpecify
                                        ? "border-b border-white text-white"
                                        : "border-b border-white border-opacity-0"
                                }`}
                            >
                                Specify
                            </button>
                            {(switchType ||
                                isBudget === true ||
                                isBallin === true ||
                                minPrice ||
                                maxPrice ||
                                soundType ||
                                layoutType ||
                                assemblyType ||
                                hotSwapType) && (
                                <div className="absolute -right-5 bottom-3 h-5 w-5 text-green-500  ">
                                    <NotificationSvg />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className=" relative h-[70vh] w-full overflow-hidden rounded-xl bg-keebyGray p-5 text-darkGray">
                        {isSpecify ? (
                            <div className="flex w-full flex-col items-start gap-5">
                                <div className="flex w-full flex-col items-start">
                                    <div className="relative flex w-full">
                                        <h1 className="text-green-500">
                                            Switch Type:
                                        </h1>
                                        <button
                                            className=" absolute -top-1 right-0 h-7 w-7"
                                            onClick={handleResetSpecify}
                                        >
                                            <ResetArrowSvg />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleSwitchTypeSelect("tactile")
                                        }
                                        className={`${
                                            switchType === "tactile"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        tactile
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleSwitchTypeSelect("linear")
                                        }
                                        className={`${
                                            switchType === "linear"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        linear
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleSwitchTypeSelect("clicky")
                                        }
                                        className={`${
                                            switchType === "clicky"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        clicky
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleSwitchTypeSelect("other")
                                        }
                                        className={`${
                                            switchType === "other"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        other
                                    </button>
                                </div>

                                <div className="flex flex-col items-start ">
                                    <h1 className="text-green-500">Sound:</h1>
                                    <button
                                        onClick={() =>
                                            handleSoundTypeSelect("thock")
                                        }
                                        className={`${
                                            soundType === "thock"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        thock
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleSoundTypeSelect("clack")
                                        }
                                        className={`${
                                            soundType === "clack"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        clack
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleSoundTypeSelect("click")
                                        }
                                        className={`${
                                            soundType === "click"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        click
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleSoundTypeSelect("silent")
                                        }
                                        className={`${
                                            soundType === "silent"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        silent
                                    </button>
                                </div>

                                <div className="flex flex-col items-start">
                                    <h1 className="text-green-500"> Price:</h1>
                                    <div className="flex gap-10">
                                        <label>
                                            {`budget < $200`}
                                            <input
                                                type="checkbox"
                                                name="Preventing Scams"
                                                className=" h-5 w-5 cursor-pointer rounded-md border-2 border-green-500 hover:bg-black hover:bg-opacity-30"
                                                checked={isBudget}
                                                onClick={() => {
                                                    setIsBudget(!isBudget);
                                                    if (isBallin) {
                                                        setIsBallin(false);
                                                    }
                                                    if (minPrice || maxPrice) {
                                                        setMinPrice(null);
                                                        setMaxPrice(null);
                                                    }
                                                }}
                                            />
                                        </label>

                                        <label>
                                            {`ballin > $200`}

                                            <input
                                                type="checkbox"
                                                name="Preventing Scams"
                                                className=" h-5 w-5 cursor-pointer rounded-md border-2 border-green-500 hover:bg-black hover:bg-opacity-30"
                                                checked={isBallin}
                                                onClick={() => {
                                                    setIsBallin(!isBallin);
                                                    if (isBudget) {
                                                        setIsBudget(false);
                                                    }
                                                    if (minPrice || maxPrice) {
                                                        setMinPrice(null);
                                                        setMaxPrice(null);
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <div className="mt-2 flex gap-5 text-green-500">
                                            <input
                                                id="priceInput"
                                                type="number"
                                                value={
                                                    minPrice !== null
                                                        ? minPrice
                                                        : ""
                                                }
                                                onChange={handleMinPrice}
                                                className="h-8 w-1/3 rounded-md bg-darkGray p-1"
                                                placeholder="$ Min"
                                            />
                                            <input
                                                id="priceInput"
                                                type="number"
                                                value={
                                                    maxPrice !== null
                                                        ? maxPrice
                                                        : ""
                                                }
                                                onChange={handleMaxPrice}
                                                className="h-8 w-1/3 rounded-md bg-darkGray p-1"
                                                placeholder="$ Max"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start ">
                                    <h1 className="text-green-500">Layout:</h1>
                                    <button
                                        onClick={() =>
                                            handleLayoutTypeSelect("100%")
                                        }
                                        className={`${
                                            layoutType === "100%"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        100%
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleLayoutTypeSelect("75%")
                                        }
                                        className={`${
                                            layoutType === "75%"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        75%
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleLayoutTypeSelect("65%")
                                        }
                                        className={`${
                                            layoutType === "65%"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        65%
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleLayoutTypeSelect("60%")
                                        }
                                        className={`${
                                            layoutType === "60%"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        60%
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleLayoutTypeSelect("40%")
                                        }
                                        className={`${
                                            layoutType === "40%"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        40%
                                    </button>
                                </div>

                                <div className="flex w-full justify-between">
                                    <div className="flex flex-col items-start ">
                                        <h1 className="text-green-500">
                                            Assembly:
                                        </h1>
                                        <button
                                            onClick={() =>
                                                handleAssemblyTypeSelect(
                                                    "assembled"
                                                )
                                            }
                                            className={`${
                                                assemblyType === "assembled"
                                                    ? "border-b border-white text-white"
                                                    : "border-b border-white border-opacity-0"
                                            }`}
                                        >
                                            assembled
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleAssemblyTypeSelect(
                                                    "unassembled"
                                                )
                                            }
                                            className={`${
                                                assemblyType === "unassembled"
                                                    ? "border-b border-white text-white"
                                                    : "border-b border-white border-opacity-0"
                                            }`}
                                        >
                                            unassembled
                                        </button>
                                    </div>

                                    <div className="flex flex-col items-start ">
                                        <h1 className="text-green-500">
                                            Hotswap:
                                        </h1>
                                        <button
                                            onClick={() =>
                                                handleHotSwapTypeSelect("yes")
                                            }
                                            className={`${
                                                hotSwapType === "yes"
                                                    ? "border-b border-white text-white"
                                                    : "border-b border-white border-opacity-0"
                                            }`}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleHotSwapTypeSelect("no")
                                            }
                                            className={`${
                                                hotSwapType === "no"
                                                    ? "border-b border-white text-white"
                                                    : "border-b border-white border-opacity-0"
                                            }`}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="relative w-full ">
                                <input
                                    id="searchInput"
                                    value={searchInput}
                                    onChange={(e) =>
                                        setSearchInput(e.target.value)
                                    }
                                    className={` search-input-hack absolute h-10 w-full rounded-md ${
                                        isSearchFocus
                                            ? "search-input-placeholder bg-blackAlternative"
                                            : "bg-darkGray"
                                    } p-1 text-green-500 outline-none `}
                                    placeholder="Search"
                                    onFocus={() => setIsSearchFocus(true)}
                                    onBlur={() => setIsSearchFocus(false)}
                                />

                                {isSearchFocus && (
                                    <div className=" search-input-matrix absolute -bottom-[70vh] left-0 top-0 -m-5 rounded-md opacity-70  ">
                                        <video
                                            className="h-full object-cover"
                                            autoPlay
                                            loop
                                            muted
                                        >
                                            <source
                                                src="/Videos/matrix-fade-green.mp4"
                                                type="video/mp4"
                                            />
                                            Your browser does not support the
                                            video tag.
                                        </video>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className=" flex w-3/4 flex-col">
                    <div className=" very-sticky flex w-full justify-between bg-dark">
                        <div className="mb-5 flex gap-5 text-white/40">
                            <button
                                className={`${
                                    !isNewFilter
                                        ? "border-b border-white text-white"
                                        : "border-b border-white border-opacity-0"
                                }`}
                                onClick={() => setIsNewFilter(false)}
                            >
                                Hot
                            </button>
                            <button
                                className={`${
                                    isNewFilter
                                        ? "border-b border-white text-white"
                                        : "border-b border-white border-opacity-0"
                                }`}
                                onClick={() => setIsNewFilter(true)}
                            >
                                New
                            </button>
                        </div>
                        <div className="flex items-center gap-16 ">
                            <div className="relative">
                                <select
                                    className=" custom-select  flex h-5 w-8 items-center rounded-lg bg-keebyGray px-2 "
                                    value={priceOrder}
                                    onChange={(e) =>
                                        setPriceOrder(e.target.value)
                                    }
                                >
                                    <option value="">none</option>
                                    <option value="asc">
                                        Price: Low to High
                                    </option>
                                    <option value="desc">
                                        Price: High to Low
                                    </option>
                                </select>
                                <span
                                    className={`select-fake flex h-5 w-8 items-center justify-center rounded-md bg-keebyGray ${
                                        priceOrder === ""
                                            ? "text-darkGray"
                                            : "text-green-500"
                                    } `}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="28px"
                                        height="28px"
                                        fill="none"
                                    >
                                        <path
                                            d="M7 10L12 15L17 10"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </span>
                            </div>

                            <button onClick={openModal}>
                                <Image
                                    src={plus}
                                    alt="create listing"
                                    width={200}
                                    height={200}
                                    className="png-dark-gray w-12 "
                                />
                            </button>
                        </div>
                    </div>
                    <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                        <CreateListingModal />
                    </ModalDialog>

                    <div>
                        {isNewFilter ? (
                            <DisplayListingPreviews
                                searchInput={searchInput}
                                switchType={switchType}
                            />
                        ) : (
                            <DisplayPopularListingPreviews
                                searchInput={searchInput}
                                switchType={switchType}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
