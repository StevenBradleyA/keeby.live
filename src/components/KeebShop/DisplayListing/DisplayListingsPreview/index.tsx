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
        return <LoadingSpinner size="40px" />;
    }

    return (
        <div className="flex w-96 flex-col">
            <Link
                href={{
                    pathname: "/keebshop/[listingId]",
                    query: { listingId: keeb.id },
                }}
            >
                {previewImage && previewImage[0] && previewImage[0].link && (
                    <div className=" image-container h-72 w-96  cursor-pointer rounded-2xl ">
                        <Image
                            alt="preview"
                            src={previewImage[0].link}
                            width={600}
                            height={600}
                            className={`h-full w-full object-cover`}
                        />
                        <div></div>
                    </div>
                )}
                <div className="text-darkGray">{keeb.title}</div>
                <div className="text-green-500">{`$${keeb.price / 100}`}</div>
            </Link>
        </div>
    );
}
