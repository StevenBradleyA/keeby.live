import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { motion } from "framer-motion";
import ModalDialog from "~/components/Modal";
import CreateListingModal from "~/components/KeebShop/CreateModal";
import EachListingCard from "~/components/KeebShop/DisplayListings";

export default function Home() {
    // big cards like bring a trailer  or like this
    // https://codepen.io/TurkAysenur/pen/BavLzPj
    // svg logos next to filters
    // search by linear or tactile tags
    // budget or ballin  under or above 250
    // filters and search need to be sticky
    // maybe break up in groups of six?

    const { data: keebData } = api.listing.getAll.useQuery();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const [filter, setFilter] = useState<string>("hot");

    // todo if isClicked then we need completely separate parent divs
    // need a map of all indexes before 5 indexes
    // could do grid parent of 5 selected
    // then need a map of all indexes after.
    // not efficient code by any means but I want it
    // will need to save the keebs in a prev and post index to the six in question

    // cards with info like air bnb which I kinda like

    //  or big single cards

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

                <div>
                    {keebData ? (
                        <div className={`flex w-full flex-wrap gap-5 pr-20`}>
                            {keebData.map((keeb, i) => (
                                <EachListingCard
                                    key={i}
                                    keeb={keeb}
                                    index={i}
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
