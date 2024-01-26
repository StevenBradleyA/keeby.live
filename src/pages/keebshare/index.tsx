import ModalDialog from "~/components/Modal";
import { api } from "~/utils/api";
import { motion } from "framer-motion";
import { useState } from "react";
import EachPostCard from "~/components/KeebShare/DisplayPosts";
import ChevronRound from "~/components/Svgs/chevron";

export default function KeebShare() {
    const { data: postData } = api.post.getAll.useQuery();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>("hot");
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
                    {/* <CreateListingModal /> */}
                    hallo
                </ModalDialog>

                <div>
                    <div>hey</div>
                    <div className="w-10">
                    <ChevronRound/>

                    </div>
                </div>
            </div>
        </div>
    );
}
