"use client";

import Image from "next/image";
import { useGlobalState } from "../../Context/GlobalState/globalState";
import type { Images } from "@prisma/client";
import { useState } from "react";
import ModalDialog from "~/app/_components/Context/Modal";
import ModalDialogueNoStyling from "../../Context/Modal/noStylingModal";

interface ListingPageImageProps {
    images: Images[];
}

export default function ListingPageImage({ images }: ListingPageImageProps) {
    const { listingPageImageIndex, setListingPageImageIndex } =
        useGlobalState();

    const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsImageModalOpen(true);
    };

    const closeModal = () => {
        setIsImageModalOpen(false);
    };

    // modal plus we need arrows to be hidden when not hovered...

    return (
        images &&
        images[listingPageImageIndex] && (
            <>
                <div className="w-full h-full relative text-white">
                    <Image
                        src={images[listingPageImageIndex].link}
                        alt="listing preview"
                        width={1000}
                        height={1000}
                        className="h-full w-full rounded-xl object-cover"
                        priority
                        onClick={() => {
                            setIsImageModalOpen(true);
                        }}
                    />
                    <button
                        className={`absolute left-3 top-1/2 -translate-y-1/2 bg-darkGray/80 rounded-full p-2 hover:opacity-80 ${listingPageImageIndex === 0 ? "ease-in hover:text-keebyPurple" : "ease-in hover:text-green-500"}`}
                        onClick={() => {
                            if (listingPageImageIndex >= 1) {
                                setListingPageImageIndex(
                                    (prev) => (prev - 1) % (images.length - 1),
                                );
                            }
                            if (listingPageImageIndex === 0) {
                                setListingPageImageIndex(images.length - 1);
                            }
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="w-5 h-5 -rotate-90"
                        >
                            <path
                                fill="currentColor"
                                d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
                            />
                        </svg>
                    </button>

                    <button
                        className={`absolute right-3 top-1/2 -translate-y-1/2 bg-darkGray/80 rounded-full p-2 hover:opacity-80 ${listingPageImageIndex === images.length - 1 ? "ease-in hover:text-keebyPurple" : "hover:text-green-500 ease-in"}`}
                        onClick={() => {
                            setListingPageImageIndex(
                                (prev) => (prev + 1) % images.length,
                            );
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="w-5 h-5 rotate-90"
                        >
                            <path
                                fill="currentColor"
                                d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
                            />
                        </svg>
                    </button>
                </div>
                <ModalDialogueNoStyling
                    isOpen={isImageModalOpen}
                    onClose={closeModal}
                >
                    <div className=" w-[95vh] h-[90wh] laptop:w-[85vw] laptop:h-[80vh] flex items-center justify-center relative rounded-2xl overflow-hidden rotate-90 laptop:rotate-0">
                        <Image
                            src={images[listingPageImageIndex].link}
                            alt="listing preview"
                            width={1000}
                            height={1000}
                            className="h-full w-full object-cover"
                            priority
                            onClick={() => {
                                setIsImageModalOpen(true);
                            }}
                        />

                        <button
                            className={`absolute left-3 top-1/2 -translate-y-1/2 bg-darkGray/80 rounded-full p-3 hover:opacity-80 ${listingPageImageIndex === 0 ? "ease-in hover:text-keebyPurple" : "ease-in hover:text-green-500"}`}
                            onClick={() => {
                                if (listingPageImageIndex >= 1) {
                                    setListingPageImageIndex(
                                        (prev) =>
                                            (prev - 1) % (images.length - 1),
                                    );
                                }
                                if (listingPageImageIndex === 0) {
                                    setListingPageImageIndex(images.length - 1);
                                }
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="w-5 h-5 -rotate-90"
                            >
                                <path
                                    fill="currentColor"
                                    d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
                                />
                            </svg>
                        </button>

                        <button
                            className={`absolute right-3 top-1/2 -translate-y-1/2 bg-darkGray/80 rounded-full p-3 hover:opacity-80 ${listingPageImageIndex === images.length - 1 ? "ease-in hover:text-keebyPurple" : "hover:text-green-500 ease-in"}`}
                            onClick={() => {
                                setListingPageImageIndex(
                                    (prev) => (prev + 1) % images.length,
                                );
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="w-5 h-5 rotate-90"
                            >
                                <path
                                    fill="currentColor"
                                    d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
                                />
                            </svg>
                        </button>
                        <button
                            className="absolute top-3 right-3 bg-darkGray/80 p-1 rounded-full hover:rotate-90 hover:opacity-80 hover:scale-105 duration-300 ease-custom-cubic "
                            onClick={closeModal}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M16 8L8 16M8.00001 8L16 16"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        <div className="absolute left-1/2 -translate-x-1/2 bottom-3 px-4 py-2 bg-darkGray/80 rounded-3xl flex items-center gap-2">
                            {images.map((image, i) => (
                                <button
                                    className={`hover:opacity-70 ease-in ${i === listingPageImageIndex ? "" : "opacity-50"}`}
                                    onClick={() => setListingPageImageIndex(i)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-3 h-3"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                </ModalDialogueNoStyling>
            </>
        )
    );
}
