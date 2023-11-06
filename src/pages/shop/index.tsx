import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import ModalDialog from "~/components/Modal";
import CreateListingModal from "~/components/KeebShop/CreateModal";
import EachListingCard from "~/components/KeebShop/DisplayListings";
export default function KeebShop() {
    // big cards like bring a trailer  or like this
    // https://codepen.io/TurkAysenur/pen/BavLzPj
    // svg logos next to filters
    // search by linear or tactile tags
    // budget or ballin  under or above 250
    // filters and search need to be sticky
    // maybe break up in groups of six?

    const { data: keebData } = api.listing.getAll.useQuery();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isClicked, setIsClicked] = useState<string>("false");
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [nextFiveIndexes, setNextFiveIndexes] = useState<number[]>([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const [filter, setFilter] = useState<string>("hot");

    return (
        <div className="mx-5 flex w-full">
            <div className="flex w-1/3 justify-center">Search here</div>

            <div className="mr-20 flex w-full flex-col">
                <div className="flex w-full justify-between">
                    <div className="flex gap-5 text-white/40">
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
                    <motion.button
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={openModal}
                    >
                        plus
                    </motion.button>
                </div>
                <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                    <CreateListingModal />
                </ModalDialog>

                <div className="mt-10 flex flex-col items-start">
                    {keebData ? (
                        <div className={`flex w-full flex-wrap gap-5 pr-20 `}>
                            {keebData.map((keeb, i) => (
                                <EachListingCard
                                    key={i}
                                    keeb={keeb}
                                    index={i}
                                    isClicked={isClicked}
                                    setIsClicked={setIsClicked}
                                    activeIndex={activeIndex}
                                    setActiveIndex={setActiveIndex}
                                    nextFiveIndexes={nextFiveIndexes}
                                    setNextFiveIndexes={setNextFiveIndexes}
                                />
                            ))}
                        </div>
                    ) : (
                        <>
                            <div>{`There are currently no listings, but you could be the first :D `}</div>
                            <motion.button
                                whileHover={{
                                    scale: 1.1,
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={openModal}
                                className="rounded-2xl bg-black px-6 py-2 text-green-500 "
                            >
                                create a listing
                            </motion.button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
