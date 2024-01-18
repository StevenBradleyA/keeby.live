import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { motion } from "framer-motion";
import ModalDialog from "~/components/Modal";
import CreateListingModal from "~/components/KeebShop/CreateModal";
import EachListingCardPreview from "~/components/KeebShop/DisplayListing/DisplayListingsPreview";
import plus from "@public/Vectors/plus-plus.png";
import Image from "next/image";

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

    // todo lets move tactile linear clicky 

    return (
        <div className="mt-10 flex w-full gap-5">
            <div className="ml-16 flex w-1/3 flex-col ">
                <div>Search Here</div>
                <div>Filter selection here</div>
                <div>Tactile, linear, clicky, topre, other</div>
            </div>

            <div className="mr-16 flex w-full flex-col">
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
                    {keebData ? (
                        <div className={`flex w-full flex-wrap gap-5 pr-20`}>
                            {keebData.map((keeb, i) => (
                                <EachListingCardPreview
                                    key={i}
                                    keeb={keeb}
                                    index={i}
                                />
                            ))}
                        </div>
                    ) : (
                        <>
                            <div>{`There are currently no listings`}</div>
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
