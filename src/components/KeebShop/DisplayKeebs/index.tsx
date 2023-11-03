import { api } from "~/utils/api";
import type { Listing } from "@prisma/client";

interface EachListingCardProps {
    keeb: Listing;
}

export default function EachListingCard({ keeb }: EachListingCardProps) {
    // const {data: images}

    return (
        <>
            <div>{keeb.title}</div>
            <div>{keeb.price}</div>
        </>
    );
}
