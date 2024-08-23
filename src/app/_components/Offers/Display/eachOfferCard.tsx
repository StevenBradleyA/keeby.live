"use client";
import type { Listing, ListingOffer } from "@prisma/client";
import { formatDistance } from "date-fns";
import { useState } from "react";
import ModalDialog from "~/app/_components/Context/Modal";
import AcceptDeclineOffer from "../AcceptDeclineModal/acceptDeclineOffer";

interface EachOfferCardProps {
    listing: Listing & {
        listingOffer: ListingOfferWithBuyer[];
    };
}

interface ListingOfferWithBuyer extends ListingOffer {
    buyer: {
        username: string | null;
    };
}

export default function EachOfferCard({ listing }: EachOfferCardProps) {
    const now = new Date();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalToggle, setModalToggle] = useState<string>("");

    const openAcceptModal = () => {
        setModalToggle("ACCEPT");
        setIsModalOpen(true);
    };
    const openDeclineModal = () => {
        setModalToggle("DECLINE");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {listing.listingOffer.map((offer, index) => (
                <div
                    key={index}
                    className="flex w-96 flex-col justify-between overflow-hidden rounded-2xl bg-darkGray p-3 font-poppins text-mediumGray tablet:h-[30vh] desktop:h-[25vh] "
                >
                    <div className="flex justify-between ">
                        <h1 className="bg-mediumGray px-4 py-2 text-green-500 rounded-xl text-sm ">
                            {listing.title}
                        </h1>
                        <p className=" text-mediumGray text-sm py-2 px-4 ">
                            PENDING
                        </p>
                    </div>
                    <div className=" w-full ">
                        <div className="w-full flex flex-col gap-5">
                            <p className="flex justify-center text-4xl text-green-500">
                                ${offer.price}
                            </p>
                            <div className="flex justify-center gap-10 w-full items-center">
                                <button
                                    className=" text-md keeb-shop-offer-button flex items-center gap-2 rounded-md bg-mediumGray py-2 pr-4 text-black "
                                    onClick={openDeclineModal}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        className="keeb-shop-offer-button-arrow w-3"
                                        viewBox="0 0 25 25"
                                        version="1.1"
                                    >
                                        <g
                                            stroke="none"
                                            strokeWidth="1"
                                            fill="none"
                                            fillRule="evenodd"
                                        >
                                            <g
                                                transform="translate(-469.000000, -1041.000000)"
                                                fill="currentColor"
                                            >
                                                <path
                                                    d="M487.148,1053.48 L492.813,1047.82 C494.376,1046.26 494.376,1043.72 492.813,1042.16 C491.248,1040.59 488.712,1040.59 487.148,1042.16 L481.484,1047.82 L475.82,1042.16 C474.257,1040.59 471.721,1040.59 470.156,1042.16 C468.593,1043.72 468.593,1046.26 470.156,1047.82 L475.82,1053.48 L470.156,1059.15 C468.593,1060.71 468.593,1063.25 470.156,1064.81 C471.721,1066.38 474.257,1066.38 475.82,1064.81 L481.484,1059.15 L487.148,1064.81 C488.712,1066.38 491.248,1066.38 492.813,1064.81 C494.376,1063.25 494.376,1060.71 492.813,1059.15 L487.148,1053.48"
                                                    id="cross"
                                                ></path>
                                            </g>
                                        </g>
                                    </svg>
                                    <span className="keeb-shop-offer-button-text">
                                        {`Decline `}
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="keeb-shop-offer-button-circle w-5"
                                        fill="currentColor"
                                        viewBox="0 0 32 32"
                                    >
                                        <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048zM9.76 20.256q0 0.832 0.576 1.408t1.44 0.608 1.408-0.608l2.816-2.816 2.816 2.816q0.576 0.608 1.408 0.608t1.44-0.608 0.576-1.408-0.576-1.408l-2.848-2.848 2.848-2.816q0.576-0.576 0.576-1.408t-0.576-1.408-1.44-0.608-1.408 0.608l-2.816 2.816-2.816-2.816q-0.576-0.608-1.408-0.608t-1.44 0.608-0.576 1.408 0.576 1.408l2.848 2.816-2.848 2.848q-0.576 0.576-0.576 1.408z" />
                                    </svg>
                                </button>
                                <button
                                    className=" text-md keeb-shop-offer-button flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                                    onClick={() => {
                                        if (listing.status !== "SOLD")
                                            openAcceptModal();
                                    }}
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
                                        {`Accept `}
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
                        </div>
                    </div>
                    <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                        <AcceptDeclineOffer
                            closeModal={closeModal}
                            listing={listing}
                            offer={offer}
                            modalToggle={modalToggle}
                        />
                    </ModalDialog>
                    <div className="flex items-center gap-5 self-start bg-mediumGray px-4 py-2 rounded-xl text-green-500 text-sm">
                        <p>
                            {formatDistance(new Date(offer.createdAt), now, {
                                addSuffix: true,
                            })}
                        </p>
                        <p className="flex items-center gap-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="w-4 h-4"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8Z"
                                    fill="currentColor"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5.43094 16.9025C7.05587 16.2213 9.2233 16 12 16C14.771 16 16.9351 16.2204 18.5586 16.8981C20.3012 17.6255 21.3708 18.8613 21.941 20.6587C22.1528 21.3267 21.6518 22 20.9592 22H3.03459C2.34482 22 1.84679 21.3297 2.0569 20.6654C2.62537 18.8681 3.69119 17.6318 5.43094 16.9025Z"
                                    fill="currentColor"
                                />
                            </svg>
                            {offer.buyer.username}
                        </p>
                    </div>
                </div>
            ))}
        </>
    );
}
