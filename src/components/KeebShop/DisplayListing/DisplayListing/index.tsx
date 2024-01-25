import type { Listing } from "@prisma/client";
import type { Images } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

interface DisplayListingPageProps {
    listing: Listing;
    commentCount: number;
    allListingImages: Images[];
}

export default function DisplayListingPage({
    listing,
    commentCount,
    allListingImages,
}: DisplayListingPageProps) {
    const { data: session } = useSession();

    const [displayImage, setDisplayImage] = useState(allListingImages[0]);

    const currentListingNameArr = listing.title.split(" ");
    const smallTitle = currentListingNameArr.pop();
    const bigTitle = currentListingNameArr.join(" ");
    //   if more than 5 images lets make an expand or something
    return (
        <div className="flex w-full">
            <div className="flex w-1/4 flex-col items-center px-5 ">
                <div className="w-full rounded-xl bg-white p-10 ">
                    {displayImage && (
                        <div className=" flex w-full flex-col items-center gap-5 ">
                            {allListingImages.map((e, i) => {
                                return (
                                    <button className="h-40 w-full" key={i}>
                                        <Image
                                            src={e.link}
                                            alt="keeb"
                                            width={1000}
                                            height={1000}
                                            onClick={() => setDisplayImage(e)}
                                            className="h-full w-full rounded-xl object-cover"
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex w-1/2 flex-col items-center gap-10 px-5">
                <div className="flex w-full justify-center rounded-xl bg-white ">
                    <h1 className=" listing-page-title-big  px-5 font-titillium text-5xl ">
                        {bigTitle}
                    </h1>
                    <h1 className="listing-page-title-small relative right-6 top-5 font-yellowTail text-4xl">
                        {smallTitle}
                    </h1>
                </div>
                <div className="flex w-full justify-center rounded-xl ">
                    {displayImage && (
                        <Image
                            src={displayImage.link}
                            alt="listing preview"
                            width={1000}
                            height={1000}
                            className="h-full w-full rounded-xl object-cover"
                        />
                    )}
                </div>
            </div>
            <div className="flex w-1/4 flex-col items-center gap-10 px-5">
                <div className="z-10 w-full rounded-xl bg-white  p-10 ">
                    <h1>keeb Stats</h1>
                    <h3>{listing.title}</h3>
                    <h3>{listing.keycaps}</h3>
                    <h3>{listing.switches}</h3>
                    <h3>{listing.switchType}</h3>
                </div>
                <div className="w-full rounded-xl bg-white p-10 ">
                    <h1>Description</h1>
                    <p className=" break-words">{listing.text}</p>
                </div>
            </div>
        </div>
    );
}
