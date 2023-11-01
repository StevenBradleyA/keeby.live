import { useSession } from "next-auth/react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import ModalDialog from "~/components/Modal";
import CreateListingModal from "~/components/KeebShop/CreateModal";
export default function KeebShop() {
    // big cards like bring a trailer  or like this
    // https://codepen.io/TurkAysenur/pen/BavLzPj
    // svg logos next to filters
    // search by linear or tactile tags
    // budget or ballin  under or above 250
    // filters and search need to be sticky
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

                <div className="mt-36 flex flex-col">
                    <div>cool listing cards here</div>
                </div>
            </div>
        </div>
    );
}
