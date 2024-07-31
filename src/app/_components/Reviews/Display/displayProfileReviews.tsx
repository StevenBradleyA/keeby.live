import { api } from "~/utils/api";
import plus from "@public/Vectors/plus-plus.png";
import Image from "next/image";
import { useState } from "react";
import ModalDialog from "~/app/_components/Modal";
import CreateReview from "../Create/createReview";
import EachReceivedReviewCard from "./eachReceivedReviewCard";
import EachSentReviewCard from "./eachSentReviewCard";

export default function DisplayProfileReviews({ userId }: { userId: string }) {
    const { data: allReviews } =
        api.review.getAllReceivedAndSentByUserId.useQuery(userId);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="mt-5 w-full font-poppins">
            <div className="flex w-full items-center justify-between">
                <h2 className="mb-2">
                    Reviews Received ({" "}
                    {allReviews ? allReviews.receivedReviews.length : 0} )
                </h2>
                <button onClick={openModal}>
                    <Image
                        src={plus}
                        alt="create keeb"
                        width={200}
                        height={200}
                        className="shop-create-listing w-12 transition duration-150 ease-in-out "
                    />
                </button>
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
                Reviews Sent ( {allReviews ? allReviews.sentReviews.length : 0}{" "}
                )
            </h2>
            {allReviews &&
                allReviews.sentReviews.map((review) => (
                    <div key={review.id}>
                        <EachSentReviewCard review={review} />
                    </div>
                ))}
        </div>
    );
}
