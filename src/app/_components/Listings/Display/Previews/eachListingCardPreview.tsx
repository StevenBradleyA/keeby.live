import Link from "next/link";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";

interface EachListingCardProps {
    listing: EachListing;
}

interface EachListing {
    id: string;
    title: string;
    price: number;
    switchType: string;
    images: EachPreviewImage[];
    _count: { comments: number; favorites: number };
    seller: {
        id: string;
        profile: string | null;
        username: string | null;
    };
}

interface EachPreviewImage {
    id: string;
    link: string;
}

export default function EachListingCardPreview({
    listing,
}: EachListingCardProps) {
    return (
        <Link
            href={`/marketplace/${listing.id}`}
            aria-label="Check out this listing"
        >
            <div className="keebshop-listing-preview-container relative flex h-64 w-96 flex-col  overflow-hidden rounded-2xl">
                {listing.images && listing.images[0] && (
                    <div className="listing-preview-hover-effect w-full h-full z-20 relative bg-black/30 ">
                        <Image
                            alt="preview"
                            src={
                                listing.images[0].link
                                    ? listing.images[0].link
                                    : keebo
                            }
                            width={600}
                            height={600}
                            className="h-full w-full object-cover"
                            priority
                        />
                        <div></div>

                        <h2 className="text-green-500 absolute left-2 top-2 keebshop-listing-preview  flex gap-5 rounded-md bg-darkGray/80 shadow-lg px-4 py-2 text-xs ">
                            {listing.title}
                        </h2>

                        <div className=" keebshop-listing-preview absolute bottom-2 right-2 flex gap-3 rounded-md bg-darkGray/80 shadow-lg px-4 py-2 text-xs text-green-500 ">
                            <p>{`$${listing.price}`}</p>
                            <div className="flex gap-1">
                                <svg
                                    className="w-4 "
                                    viewBox="0 0 24 24"
                                    fill="rgb(34 197 94)"
                                >
                                    <path d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"></path>
                                </svg>

                                <p>{listing._count.comments}</p>
                            </div>
                            <div className="flex gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4  "
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                <p>{listing._count.favorites}</p>
                            </div>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-green-500 bg-black/50 py-2 rounded-md keebshop-preview-arrow z-30 px-4 text-sm">
                            {`Continue`}
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
}
