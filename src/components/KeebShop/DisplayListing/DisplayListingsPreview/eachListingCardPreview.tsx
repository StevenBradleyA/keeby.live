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
    _count: { comments: number };
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

                <div className="text-md flex w-full items-center justify-between text-green-500">
                    {`$${keeb.price / 100}`}

                    <div className="flex items-center gap-1 text-sm">
                        <svg
                            className="w-4 "
                            viewBox="0 0 24 24"
                            fill="rgb(34 197 94)"
                        >
                            <path d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"></path>
                        </svg>

                        <h2>{keeb._count.comments}</h2>
                    </div>
                </div>
            </Link>
        </div>
    );
}
