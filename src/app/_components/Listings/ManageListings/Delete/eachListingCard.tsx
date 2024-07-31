import { api } from "~/utils/api";
import type { Images, Listing } from "@prisma/client";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";
import { useState } from "react";
import Link from "next/link";
import ModalDialog from "~/app/_components/Modal";
import UpdateListing from "../Update/updateListing";

interface EachManageListingCardProps {
    listing: EachListing;
}

interface EachListing extends Listing {
    images: Images[];
    _count: { comments: number };
    previewIndex: number;
}

export default function EachManageListingCard({
    listing,
}: EachManageListingCardProps) {
    const [isPhotoHover, setIsPhotoHover] = useState<boolean>(false);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className="keebshop-listing-preview-container relative flex w-full flex-col">
            <Link
                href={{
                    pathname: "/keebshop/[listingId]",
                    query: { listingId: listing.id },
                }}
            >
                {listing.images &&
                    listing.previewIndex !== undefined &&
                    listing.images[listing.previewIndex] && (
                        <div
                            className="listing-preview-hover-effect relative h-52 w-full cursor-pointer overflow-hidden rounded-2xl "
                            onMouseEnter={() => setIsPhotoHover(true)}
                            onMouseLeave={() => setIsPhotoHover(false)}
                        >
                            <Image
                                alt="preview"
                                src={
                                    listing.images[listing.previewIndex]
                                        ?.link || keebo
                                }
                                width={600}
                                height={600}
                                className={`h-full w-full object-cover`}
                                priority
                            />
                            <div></div>

                            <h1
                                className={`${
                                    isPhotoHover
                                        ? "show-listing-hover-content"
                                        : "hide-listing-hover-content"
                                }   absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform`}
                            >
                                {listing.title}
                            </h1>

                            <div className=" keebshop-listing-preview absolute bottom-2 right-2 flex gap-5 rounded-md bg-white bg-opacity-20 px-4 py-2 text-xs text-green-500 ">
                                <h2>{`$${listing.price / 100}`}</h2>
                                <div className="flex gap-1">
                                    <svg
                                        className="w-4 "
                                        viewBox="0 0 24 24"
                                        fill="rgb(34 197 94)"
                                    >
                                        <path d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"></path>
                                    </svg>

                                    <h2>{listing._count.comments}</h2>
                                </div>
                            </div>
                        </div>
                    )}
            </Link>
            <button
                className="flex w-full items-start  justify-end pr-3 text-sm "
                onClick={openModal}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white-500 relative bottom-1 w-8 text-green-500 transition-colors duration-400 ease-custom-cubic hover:text-white "
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z" />
                    <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" />
                    <path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" />
                </svg>
            </button>
            <ModalDialog isOpen={isOpen} onClose={closeModal}>
                <UpdateListing listing={listing} closeModal={closeModal} />
            </ModalDialog>
        </div>
    );
}
