import { api } from "~/utils/api";
import plus from "@public/Vectors/plus-plus.png";
import Image from "next/image";
import { useState } from "react";
import ModalDialog from "~/components/Modal";
import CreateReview from "../Create/createReview";

export default function DisplayProfileReviews({ userId }: { userId: string }) {
    const { data: allOffers } = api.offer.getAllByUserId.useQuery(userId);

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
                    {allOffers ? allOffers.offersReceived.length : 0} )
                </h2>
                <button onClick={openModal}>
                    <Image
                        src={plus}
                        alt="create keeb"
                        width={200}
                        height={200}
                        className="shop-create-listing w-12  transition duration-150 ease-in-out "
                    />
                </button>
            </div>
            <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                <CreateReview userId={userId} closeModal={closeModal} />
            </ModalDialog>
            {/* <div className="flex gap-10">
                {allOffers?.offersReceived.map((listing) => (
                    <div key={listing.id}>
                        <EachOfferCard listing={listing} />
                    </div>
                ))}
            </div> */}
            <h2 className="mb-2 mt-5">
                Reviews Sent ( {allOffers ? allOffers.offersSent.length : 0} )
            </h2>
            {/* <div className="flex gap-10">
                {allOffers?.offersSent.map((offer) => (
                    <div key={offer.id}>
                        <EachOfferViewCard offer={offer} />
                    </div>
                ))}
            </div> */}
        </div>
    );
}
