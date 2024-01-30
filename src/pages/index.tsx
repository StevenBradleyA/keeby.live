import { useState } from "react";
import { api } from "~/utils/api";
import ModalDialog from "~/components/Modal";
import CreateListingModal from "~/components/KeebShop/CreateListing/CreateModal";
import plus from "@public/Vectors/plus-plus.png";
import Image from "next/image";
import DisplayListingPreviews from "~/components/KeebShop/DisplayListing/DisplayListingsPreview";
import DisplayPopularListingPreviews from "~/components/KeebShop/DisplayListing/DisplayListingsPreview/displayPopularListingPreviews";

export default function Home() {
    // this is a premium keyboard auction site so make it really cool you can do it!

    // TODO onFocus search should show the matrix
    // svg logos next to filters
    // budget or ballin  under or above 250
    // todo add cookies for search filters
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

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isNewFilter, setIsNewFilter] = useState<boolean>(false);
    const [isSpecify, setIsSpecify] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");

    // specify
    const [switchType, setSwitchType] = useState<string>("");
    const [selectedPriceFilter, setSelectedPriceFilter] = useState<string>("");
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [isUsingCustomRange, setIsUsingCustomRange] =
        useState<boolean>(false);

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
                    </div>

                    <div className=" h-[70vh] w-full rounded-xl bg-keebyGray p-5 text-darkGray">
                        {isSpecify ? (
                            <div className="flex flex-col items-start gap-5">
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
