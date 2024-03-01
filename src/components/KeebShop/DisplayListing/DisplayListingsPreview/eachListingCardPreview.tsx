import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";

interface EachListingCardProps {
    keeb: EachKeeb;
    index: number;
}

interface EachKeeb {
    id: string;
    title: string;
    price: number;
    switchType: string;
    images: EachPreviewImage[];
    commentCount?: number;
}

interface EachPreviewImage {
    id: string;
    link: string;
}

export default function EachListingCardPreview({ keeb }: EachListingCardProps) {
    const [isPhotoHover, setIsPhotoHover] = useState<boolean>(false);

    return (
        <div className="flex w-96 flex-col">
            <Link
                href={{
                    pathname: "/keebshop/[listingId]",
                    query: { listingId: keeb.id },
                }}
            >
                {keeb.images && keeb.images[0] && (
                    <div
                        className="listing-preview-hover-effect relative h-72 w-96  cursor-pointer overflow-hidden rounded-2xl "
                        onMouseEnter={() => setIsPhotoHover(true)}
                        onMouseLeave={() => setIsPhotoHover(false)}
                    >
                        <Image
                            alt="preview"
                            src={
                                keeb.images[0].link
                                    ? keeb.images[0].link
                                    : keebo
                            }
                            width={600}
                            height={600}
                            className={`h-full w-full object-cover`}
                            priority
                        />
                        <div></div>

                        <div
                            className={`${
                                isPhotoHover
                                    ? "show-listing-hover-content"
                                    : "hide-listing-hover-content"
                            }   absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform`}
                        >
                            <div className="text-green-500  ">{`Check it out`}</div>
                        </div>
                    </div>
                )}
                <div className="text-darkGray">{keeb.title}</div>
                <div className="text-green-500">{`$${keeb.price / 100}`}</div>
            </Link>
        </div>
    );
}
