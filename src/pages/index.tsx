import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { motion } from "framer-motion";
import ModalDialog from "~/components/Modal";
import CreateListingModal from "~/components/KeebShop/CreateListing/CreateModal";
import EachListingCardPreview from "~/components/KeebShop/DisplayListing/DisplayListingsPreview/eachListingCardPreview";
import plus from "@public/Vectors/plus-plus.png";
import Image from "next/image";
import LoadingSpinner from "~/components/Loading";

export default function Home() {
    // big cards like bring a trailer  or like this
    // https://codepen.io/TurkAysenur/pen/BavLzPj
    // svg logos next to filters
    // search by linear or tactile tags
    // budget or ballin  under or above 250
    // filters and search need to be sticky
    // maybe break up in groups of six?
    // todo implement pagination where listings only load when you scroll to the bottom

    const { data: keebData, isLoading } =
        api.listing.getAllWithFilters.useQuery({});

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const [filter, setFilter] = useState<string>("hot");
    const [searchFilter, setSearchFilter] = useState<string>("search");

    const [isPopularFilter, setIsPopularFilter] = useState<boolean>(false);
    const [isSwitchFilter, setIsSwitchFilter] = useState<boolean>(false);

    const [switchType, setSwitchType] = useState<string>("");
    const [searchInput, setSearchInput] = useState<string>("");

    const handleSearchClick = () => {
        setIsSwitchFilter(false);
        setSwitchType("");
    };

    const handleSwitchClick = () => {
        setIsSwitchFilter(true);
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

    if (isLoading) {
        return (
            <div className="mt-44">
                <LoadingSpinner size="40px" />
            </div>
        );
    }
    // todo search and switch to be sticky

    console.log("uhhhh", switchType);

    return (
        <div className="mt-10 flex w-full gap-10 px-16">
            <div className=" flex w-1/4 flex-col ">
                <div className="mb-5 flex gap-5 text-darkGray">
                    <button
                        onClick={handleSearchClick}
                        className={`${
                            !isSwitchFilter
                                ? "border-b border-white text-white"
                                : ""
                        }`}
                    >
                        Search
                    </button>
                    <button
                        onClick={handleSwitchClick}
                        className={`${
                            isSwitchFilter
                                ? "border-b border-white text-white"
                                : ""
                        }`}
                    >
                        Switch
                    </button>
                </div>

                <div className=" h-[70vh] w-full rounded-xl bg-keebyGray p-5 text-darkGray">
                    {isSwitchFilter ? (
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
                                onClick={() => handleSwitchTypeSelect("linear")}
                                className={`${
                                    switchType === "linear"
                                        ? "border-b border-white text-white"
                                        : ""
                                }`}
                            >
                                linear
                            </button>
                            <button
                                onClick={() => handleSwitchTypeSelect("clicky")}
                                className={`${
                                    switchType === "clicky"
                                        ? "border-b border-white text-white"
                                        : ""
                                }`}
                            >
                                clicky
                            </button>
                            <button
                                onClick={() => handleSwitchTypeSelect("other")}
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
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="h-10 w-full rounded-md bg-black p-1 "
                                placeholder="Search"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className=" flex w-3/4 flex-col">
                <div className=" flex w-full justify-between">
                    <div className="mb-5 flex gap-5 text-white/40">
                        <button
                            className={`${
                                filter === "hot"
                                    ? "border-b border-white text-white"
                                    : ""
                            }`}
                            onClick={() => setFilter("hot")}
                        >
                            Hot
                        </button>
                        <button
                            className={`${
                                filter === "new"
                                    ? "border-b border-white text-white"
                                    : ""
                            }`}
                            onClick={() => setFilter("new")}
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
                    {keebData && keebData.length > 0 ? (
                        <div className={`flex w-full flex-wrap gap-5  `}>
                            {keebData.map((keeb, i) => (
                                <EachListingCardPreview
                                    key={i}
                                    keeb={keeb}
                                    index={i}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-10 text-darkGray">{`Woah, all sold out. There are currently no listings for sale `}</div>
                    )}
                </div>
            </div>
        </div>
    );
}
