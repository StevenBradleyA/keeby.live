import { useState } from "react";
import { api } from "~/utils/api";
import ModalDialog from "~/components/Modal";
import CreateListingModal from "~/components/KeebShop/CreateListing/CreateModal";
import plus from "@public/Vectors/plus-plus.png";
import Image from "next/image";
import DisplayListingPreviews from "~/components/KeebShop/DisplayListing/DisplayListingsPreview";
import DisplayPopularListingPreviews from "~/components/KeebShop/DisplayListing/DisplayListingsPreview/displayPopularListingPreviews";
import ResetArrowSvg from "~/components/Svgs/reset";

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

    // specify
    const [switchType, setSwitchType] = useState<string>("");
    const [soundType, setSoundType] = useState<string>("");
    const [isBudget, setIsBudget] = useState<boolean>(false);
    const [isBallin, setIsBallin] = useState<boolean>(false);
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [layout, setLayout] = useState<string>("");
    const [assembly, setAssembly] = useState<string>("");

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
        setAssembly("");
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

    const handleMinPrice = () => {};

    const handleMaxPrice = () => {};

    return (
        <div className="mt-10 flex w-full flex-col px-16">
            <div className=" flex w-full  gap-10 ">
                <div className=" very-sticky flex w-1/4 flex-col">
                    <div className="mb-5 flex gap-5 text-darkGray">
                        <button
                            onClick={handleSearchClick}
                            className={`${
                                !isSpecify
                                    ? "border-b border-white text-white"
                                    : ""
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
                                        : ""
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
                                assembly) && (
                                <div className="absolute -right-5 bottom-3 h-5 w-5 text-green-500  ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M19.4845 7C17.8699 4.58803 15.1204 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C14.6655 21 17.0604 19.8412 18.7083 18M16 12.2857L17.8 14L22 10M12 8V13M12 16H12.01"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className=" h-[70vh] w-full rounded-xl bg-keebyGray p-5 text-darkGray">
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
                                                : ""
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
                                                : ""
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
                                                : ""
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
                                                : ""
                                        }`}
                                    >
                                        other
                                    </button>
                                </div>

                                <div className="flex flex-col items-start ">
                                    <h1 className="text-green-500">Sound:</h1>
                                    <button
                                        onClick={() =>
                                            handleSwitchTypeSelect("tactile")
                                        }
                                        className={`${
                                            switchType === "tactile"
                                                ? "border-b border-white text-white"
                                                : ""
                                        }`}
                                    >
                                        thock
                                    </button>
                                    <button
                                    // onClick={() =>
                                    //     handleSwitchTypeSelect("linear")
                                    // }
                                    // className={`${
                                    //     switchType === "linear"
                                    //         ? "border-b border-white text-white"
                                    //         : ""
                                    // }`}
                                    >
                                        clack
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleSwitchTypeSelect("clicky")
                                        }
                                        className={`${
                                            switchType === "clicky"
                                                ? "border-b border-white text-white"
                                                : ""
                                        }`}
                                    >
                                        click
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleSwitchTypeSelect("other")
                                        }
                                        className={`${
                                            switchType === "other"
                                                ? "border-b border-white text-white"
                                                : ""
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
                                            />
                                        </label>

                                        <label>
                                            {`ballin > $200`}

                                            <input
                                                type="checkbox"
                                                name="Preventing Scams"
                                                className=" h-5 w-5 cursor-pointer rounded-md border-2 border-green-500 hover:bg-black hover:bg-opacity-30"
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <div className="mt-2 flex gap-5">
                                            <input
                                                id="priceInput"
                                                type="number"
                                                min={0}
                                                // value={price === 0 ? "" : price}
                                                // onChange={(e) => setPrice(+e.target.value)}
                                                // onChange={(e) =>
                                                //     setPrice(
                                                //         Math.floor(+e.target.value)
                                                //     )
                                                // }
                                                className="h-8 w-1/3 rounded-md bg-darkGray p-1"
                                                placeholder="$ Min"
                                            />
                                            <input
                                                id="priceInput"
                                                type="number"
                                                min={0}
                                                // value={price === 0 ? "" : price}
                                                // onChange={(e) => setPrice(+e.target.value)}
                                                // onChange={(e) =>
                                                //     setPrice(
                                                //         Math.floor(+e.target.value)
                                                //     )
                                                // }
                                                className="h-8 w-1/3 rounded-md bg-darkGray p-1"
                                                placeholder="$ Max"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-start ">
                                    <h1 className="text-green-500">
                                        Assembly:
                                    </h1>
                                    <button
                                    // onClick={() =>
                                    //     handleSwitchTypeSelect("tactile")
                                    // }
                                    // className={`${
                                    //     switchType === "tactile"
                                    //         ? "border-b border-white text-white"
                                    //         : ""
                                    // }`}
                                    >
                                        Assembled
                                    </button>
                                    <button
                                    // onClick={() =>
                                    //     handleSwitchTypeSelect("linear")
                                    // }
                                    // className={`${
                                    //     switchType === "linear"
                                    //         ? "border-b border-white text-white"
                                    //         : ""
                                    // }`}
                                    >
                                        None
                                    </button>
                                </div>
                                <div className="flex flex-col items-start ">
                                    <h1 className="text-green-500">Layout:</h1>
                                    <button
                                    // onClick={() =>
                                    //     handleSwitchTypeSelect("tactile")
                                    // }
                                    // className={`${
                                    //     switchType === "tactile"
                                    //         ? "border-b border-white text-white"
                                    //         : ""
                                    // }`}
                                    >
                                        100%
                                    </button>
                                    <button
                                    // onClick={() =>
                                    //     handleSwitchTypeSelect("linear")
                                    // }
                                    // className={`${
                                    //     switchType === "linear"
                                    //         ? "border-b border-white text-white"
                                    //         : ""
                                    // }`}
                                    >
                                        75%
                                    </button>
                                    <button
                                    // onClick={() =>
                                    //     handleSwitchTypeSelect("linear")
                                    // }
                                    // className={`${
                                    //     switchType === "linear"
                                    //         ? "border-b border-white text-white"
                                    //         : ""
                                    // }`}
                                    >
                                        65%
                                    </button>
                                    <button
                                    // onClick={() =>
                                    //     handleSwitchTypeSelect("linear")
                                    // }
                                    // className={`${
                                    //     switchType === "linear"
                                    //         ? "border-b border-white text-white"
                                    //         : ""
                                    // }`}
                                    >
                                        60%
                                    </button>
                                    <button
                                    // onClick={() =>
                                    //     handleSwitchTypeSelect("linear")
                                    // }
                                    // className={`${
                                    //     switchType === "linear"
                                    //         ? "border-b border-white text-white"
                                    //         : ""
                                    // }`}
                                    >
                                        40%
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full ">
                                <input
                                    id="searchInput"
                                    value={searchInput}
                                    onChange={(e) =>
                                        setSearchInput(e.target.value)
                                    }
                                    className="h-10 w-full rounded-md bg-black p-1 text-green-500 "
                                    placeholder="Search"
                                />
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
                                        : ""
                                }`}
                                onClick={() => setIsNewFilter(false)}
                            >
                                Hot
                            </button>
                            <button
                                className={`${
                                    isNewFilter
                                        ? "border-b border-white text-white"
                                        : ""
                                }`}
                                onClick={() => setIsNewFilter(true)}
                            >
                                New
                            </button>
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
