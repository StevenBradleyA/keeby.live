"use client";
import { api } from "~/trpc/react";
import { useState } from "react";
import ModalDialog from "~/app/_components/Context/Modal";
import CreateReview from "../Create/createReview";
import EachReceivedReviewCard from "./eachReceivedReviewCard";
import EachSentReviewCard from "./eachSentReviewCard";
import LoadingSpinner from "../../Loading";
import { motion } from "framer-motion";

export default function DisplayProfileReviews({ userId }: { userId: string }) {
    const { data: allReviews, isLoading } =
        api.review.getAllReceivedAndSentByUserId.useQuery(userId);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const createButton = {
        hover: {
            scale: 1.1,
            transition: {
                type: "spring",
                stiffness: 250,
                damping: 8,
            },
        },
        tap: { scale: 0.9 },
    };

    if (isLoading) {
        return (
            <div className="ml-10 mt-10 text-green-500">
                <LoadingSpinner size="20px" />
            </div>
        );
    }

    return (
        <div className="mt-5 w-full font-poppins">
            <div className="flex w-full items-center justify-between">
                <h2 className="mb-2">
                    Reviews Received ({" "}
                    {allReviews ? allReviews.receivedReviews.length : 0} )
                </h2>
                <motion.button
                    className=" bg-green-500 rounded-lg p-1 ease-in text-black"
                    onClick={openModal}
                    whileTap="tap"
                    whileHover="hover"
                    variants={createButton}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M6 12H18M12 6V18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </motion.button>
            </div>
            <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                <CreateReview userId={userId} closeModal={closeModal} />
            </ModalDialog>
            {allReviews &&
                allReviews.receivedReviews.map((review) => (
                    <div key={review.id}>
                        <EachReceivedReviewCard review={review} />
                    </div>
                ))}
            <h2 className="mb-2 mt-5">
                My Reviews ( {allReviews ? allReviews.myReviews.length : 0} )
            </h2>
            {allReviews &&
                allReviews.myReviews.map((review) => (
                    <div key={review.id}>
                        <EachSentReviewCard review={review} />
                    </div>
                ))}
        </div>
    );
}
