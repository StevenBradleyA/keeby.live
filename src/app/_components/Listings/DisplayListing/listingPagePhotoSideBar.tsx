"use client";

import type { Images } from "@prisma/client";
import ChevronRound from "../../Svgs/chevron";
import Image from "next/image";
import { useGlobalState } from "../../Context/GlobalState/globalState";

interface ListingPagePhotoSideBarProps {
    images: Images[];
}

export default function ListingPagePhotoSideBar({
    images,
}: ListingPagePhotoSideBarProps) {
    // going to need context state here...

    const { listingPageImageIndex, setListingPageImageIndex } =
        useGlobalState();

    // const nextImage = () => {
    //     setCurrentIndex((prevIndex) =>
    //         prevIndex < maxIndex ? prevIndex + 1 : prevIndex,
    //     );
    // };

    // const prevImage = () => {
    //     setCurrentIndex((prevIndex) =>
    //         prevIndex > 0 ? prevIndex - 1 : prevIndex,
    //     );
    // };

    // const [displayImage, setDisplayImage] = useState(listing.images[0]);

    // const [listingPageImageIndex, setCurrentIndex] = useState<number>(0);
    // todo fix image sizes...

    return (
        <div className=" relative h-full w-full overflow-hidden rounded-xl bg-darkGray p-10 ">
            <div className=" h-full w-full overflow-hidden ">
                <button
                    className={`absolute left-1/2 top-2 w-7 -translate-x-1/2 transform ${
                        listingPageImageIndex === 0
                            ? "hover:text-keebyPurple ease-in"
                            : "text-white hover:text-green-500 ease-in"
                    }`}
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
                    <ChevronRound />
                </button>
                <button
                    className={`absolute bottom-2 left-1/2 w-7 -translate-x-1/2 rotate-180 transform ${
                        listingPageImageIndex === images.length - 1
                            ? "hover:text-keebyPurple ease-in"
                            : "text-white hover:text-green-500 ease-in"
                    }`}
                    onClick={() => {
                        setListingPageImageIndex(
                            (prev) => (prev + 1) % images.length,
                        );
                    }}
                >
                    <ChevronRound />
                </button>

                <div
                    className=" flex h-full w-full flex-col items-center gap-5 "
                    style={{
                        transform: `translateY(-${listingPageImageIndex * 13}%)`,
                        transition: "transform 0.3s ease-in-out",
                    }}
                >
                    {images.map((e, i) => {
                        return (
                            <button
                                className="h-40 flex-shrink-0 w-full listing-page-image rounded-xl overflow-hidden"
                                key={i}
                            >
                                <Image
                                    src={e.link}
                                    alt="keeb"
                                    width={1000}
                                    height={1000}
                                    onClick={() => {
                                        setListingPageImageIndex(i);
                                    }}
                                    className={`${listingPageImageIndex === i ? "opacity-50" : ""} h-full w-full object-cover`}
                                    priority
                                />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
