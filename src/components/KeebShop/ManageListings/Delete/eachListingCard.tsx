import { api } from "~/utils/api";
import type { Images, Listing } from "@prisma/client";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";

interface EachManageListingCardProps {
    listing: EachListing;
    userId: string;
}

interface EachListing extends Listing {
    images: Images[];
}

export default function EachManageListingCard({
    listing,
}: EachManageListingCardProps) {
    return (
        <div className="manage-listing-card relative flex h-96 w-64 flex-col overflow-hidden rounded-lg bg-darkGray bg-opacity-30 font-poppins text-white">
            <div className="manage-listing-name absolute top-0 w-full bg-black bg-opacity-80 p-5 text-center text-lg ">
                {listing.title}
            </div>
            <Image
                className="h-[80%] w-full object-cover"
                alt="listing preview"
                src={listing.images[0] ? listing.images[0].link : keebo}
                width={400}
                height={400}
            />

            <div className="mt-5 flex w-full justify-around text-darkGray">
                <button className="hover:text-green-500">Update</button>
                <button className="hover:text-green-500">Delete</button>
            </div>
        </div>
    );
}
