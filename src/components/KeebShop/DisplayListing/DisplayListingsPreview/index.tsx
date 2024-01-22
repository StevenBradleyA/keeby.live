import { api } from "~/utils/api";
import type { Listing } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "~/components/Loading";

interface EachListingCardProps {
    keeb: Listing;
    index: number;
}

export default function EachListingCardPreview({ keeb }: EachListingCardProps) {
    const { data: previewImage, isLoading } =
        api.image.getAllByResourceId.useQuery({
            resourceType: "LISTINGPREVIEW",
            resourceId: keeb.id,
        });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="flex w-[30%] flex-col">
            <Link
                href={{
                    pathname: "/keebshop/[listingId]",
                    query: { listingId: keeb.id },
                }}
            >
                {previewImage && previewImage[0] && previewImage[0].link && (
                    <div className="cursor-pointer">
                        <Image
                            alt="preview"
                            src={previewImage[0].link}
                            width={600}
                            height={600}
                            className={`h-[250px] w-full rounded-3xl object-cover`}
                        />
                    </div>
                )}
                <div>{keeb.title}</div>
                <div className="text-green-500">{`$${keeb.price}`}</div>
            </Link>
        </div>
    );
}
