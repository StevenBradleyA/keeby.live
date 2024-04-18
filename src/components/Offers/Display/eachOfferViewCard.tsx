import type { ListingOffer } from "@prisma/client";
import { formatDistance } from "date-fns";
import { useState } from "react";
import ModalDialog from "~/components/Modal";
import AcceptDeclineOffer from "../AcceptDeclineModal/acceptDeclineOffer";

interface EachOfferViewCardProps {
    offer: ListingOffer & {
        listing: Listing;
    };
}

interface Listing {
    title: string;
    seller: {
        username: string | null;
    };
}

export default function EachOfferViewCard({ offer }: EachOfferViewCardProps) {
    const now = new Date();

    // todo PAY NOW BB

    // shows up depending on the offer's status ....

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openPayModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="flex w-96 flex-col items-stretch overflow-hidden rounded-2xl bg-keebyGray p-3 font-poppins text-darkGray tablet:h-[30vh] desktop:h-[25vh] ">
                <h1 className="flex h-1/6 justify-between ">
                    <div>{offer.listing.title}</div>
                    <p
                        className={`${
                            offer.status === "ACCEPTED"
                                ? "text-green-500"
                                : "text-darkGray"
                        }`}
                    >
                        {offer.status}
                    </p>
                </h1>
                <div className="flex h-4/6 w-full flex-col items-center justify-center">
                    <p
                        className={` mt-5 flex justify-center text-4xl ${
                            offer.status === "ACCEPTED"
                                ? "text-green-500"
                                : "text-purple"
                        }`}
                    >
                        ${offer.price / 100}
                    </p>
                    {offer.status === "ACCEPTED" && (
                        <div className="mt-5 flex justify-center">
                            <button
                                className=" text-md keeb-shop-offer-button mt-5 flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                                onClick={openPayModal}
                            >
                                {" "}
                                <svg
                                    className="keeb-shop-offer-button-arrow w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                        d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                                    ></path>
                                </svg>
                                <span className="keeb-shop-offer-button-text">
                                    {`Pay Now`}
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#000000"
                                    className="keeb-shop-offer-button-circle w-5"
                                    viewBox="0 0 256 256"
                                >
                                    <path d="M252,128c0,68.4-55.6,124-124,124S4,196.4,4,128S59.6,4,128,4S252,59.6,252,128z M174.3,155.6c0-26-27.8-33.4-39.8-36.8  c-22.7-6.3-24.6-14.5-24.3-18.7c0.8-10.2,12-12.7,22.4-10.5c8.2,1.8,16.6,6.6,21.3,10.3l14.9-17.4c-7.3-5-16.7-11.5-30.4-14.1V51.5  h-21.7v16.3c-21,1.6-35,14.8-35,32.9c0,17.7,12.8,26,25.6,32.2c10.7,5.1,40.5,10.4,38.8,23.9c-0.9,7.3-8.7,12.7-21.6,11.1  c-11.2-1.4-23.2-10.8-23.2-10.8l-16.4,16.3c9.9,8,20.4,13,31.8,15.3v15.9h21.7v-15.1C159.1,187.2,174.3,173.1,174.3,155.6z" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
                <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                    <div>pay now </div>
                </ModalDialog>
                <div className="flex h-1/6 w-full items-end  justify-between">
                    <p>
                        {formatDistance(new Date(offer.createdAt), now, {
                            addSuffix: true,
                        })}
                    </p>
                    <p>{offer.listing.seller.username}</p>
                </div>
            </div>
        </>
    );
}
