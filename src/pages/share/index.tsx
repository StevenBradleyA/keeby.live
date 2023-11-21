import ModalDialog from "~/components/Modal";
import { api } from "~/utils/api";
import { motion } from "framer-motion";
import { useState } from "react";
import EachPostCard from "~/components/KeebShare/DisplayPosts";

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
                    {postData ? (
                        <div className={`flex flex-col `}>
                            {postData.map((post, i) => (
                                <EachPostCard key={i} post={post} />
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
                                create a post
                            </motion.button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
