import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { motion } from "framer-motion";
import ModalDialog from "~/components/Modal";
import CreateListingModal from "~/components/KeebShop/CreateListing/CreateModal";
import EachListingCardPreview from "~/components/KeebShop/DisplayListing/DisplayListingsPreview";
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

    const { data: keebData, isLoading } = api.listing.getAll.useQuery();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const [filter, setFilter] = useState<string>("hot");
    const [searchFilter, setSearchFilter] = useState<string>("search");

    if (isLoading) {
        return (
            <div className="mt-44">
                <LoadingSpinner size="40px"/>
            </div>
        );
    }

    return (
        <div className="mt-10 flex w-full gap-10">
            <div className="ml-16 flex w-1/4 flex-col ">
                <div className="mb-5 flex gap-5 text-white/40">
                    <button
                        className={`${
                            searchFilter === "search"
                                ? "border-b border-white text-white"
                                : ""
                        }`}
                        onClick={() => setSearchFilter("search")}
                    >
                        Search
                    </button>
                    <button
                        className={`${
                            searchFilter === "switch"
                                ? "border-b border-white text-white"
                                : ""
                        }`}
                        onClick={() => setSearchFilter("switch")}
                    >
                        Switch
                    </button>
                </div>

                {searchFilter === "switch" && (
                    <div className="flex flex-col items-start gap-5">
                        <button>tactile</button>
                        <button>linear</button>
                        <button>clicky</button>
                        <button>other</button>
                    </div>
                )}
                <div className="w-full bg-keebyGray h-96 rounded-xl"></div>



            </div>

            <div className="mr-16 flex w-3/4 flex-col">
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
