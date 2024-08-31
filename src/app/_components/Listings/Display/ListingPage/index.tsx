import type { Images, Listing } from "@prisma/client";
import ListingPageFavorite from "./listingPageFavorite";
import CreateComment from "~/app/_components/Comments/Create";
import DisplayComments from "../../../Comments/Display/displayComments";
import ListingPagePhotoSideBar from "./listingPagePhotoSideBar";
import ListingPageImage from "./listingPageImage";
import { getServerAuthSession } from "~/server/auth";
import Footer from "../../../Footer/footer";
import BuyListingButtons from "./buyListingButtons";
import Image from "next/image";
import defaultProfile from "@public/Images/defaultProfile.png";
import { formatDistance } from "date-fns";
import SellerStarRating from "./sellerStarRating";
import Link from "next/link";
import ListingPagePreviews from "./listingPagePreviews";
import dynamic from "next/dynamic";
import LoadingSpinner from "~/app/_components/Loading";
import ListingPageTitle from "./listingPageTitle";

const ListingSoundTest = dynamic(() => import("./SoundTest"), {
    loading: () => (
        <div className="mt-60 flex w-full justify-center text-green-500">
            <LoadingSpinner size="20px" />
        </div>
    ),
    ssr: false,
});

interface DisplayListingPageProps {
    listing: ListingWithImagesAndCount;
}

interface ListingWithImagesAndCount extends Listing {
    images: Images[];
    _count: {
        comments: number;
        favorites: number;
    };
    seller: {
        id: string;
        username: string | null;
        selectedTag: string | null;
        profile: string | null;
        avgRating?: number | null;
        totalRatings?: number | null;
    };
    isFavorited?: boolean;
    favoriteId?: string;
}

export default async function DisplayListingPage({
    listing,
}: DisplayListingPageProps) {
    const session = await getServerAuthSession();

    const postDate = new Date(listing.createdAt);
    const now = new Date();
    const timeAgo = formatDistance(postDate, now, { addSuffix: true });

    return (
        <>
            <div className="flex flex-col text-white mt-40 w-full">
                <div className="flex h-[80vh] w-full px-3 laptop:px-5 desktop:px-16 gap-3 desktop:gap-10  ">
                    <div className="hidden laptop:flex w-1/4 laptop:flex-shrink-0 h-full   ">
                        <ListingPagePhotoSideBar images={listing.images} />
                    </div>
                    <div className="flex h-full w-full flex-col items-center  gap-5 laptop:gap-10">
                        <div className="flex w-full justify-center rounded-xl bg-darkGray shadow-lg relative py-2">
                            <h1 className="text-5xl font-titillium opacity-0">
                                {listing.title}
                            </h1>
                            <ListingPageTitle title={listing.title} />
                        </div>

                        <div className="relative flex h-[58%] flex-shrink-0 w-full justify-center rounded-xl bg-black/30 shadow-lg  ">
                            <ListingPageImage images={listing.images} />
                            <ListingPageFavorite
                                listing={listing}
                                session={session}
                            />
                        </div>
                        <div className="h-full w-full overflow-hidden rounded-xl bg-darkGray shadow-lg flex justify-between p-3 desktop:p-10 text-sm">
                            <Image
                                alt="seller profile"
                                className="w-28 h-28 rounded-xl object-cover"
                                src={
                                    listing.seller.profile
                                        ? listing.seller.profile
                                        : defaultProfile
                                }
                                width={400}
                                height={400}
                                priority
                            />

                            <div className="flex flex-col  w-full justify-between pl-5">
                                <div className="flex items-start gap-1 pl-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 text-mediumGray"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M5.43094 16.9025C7.05587 16.2213 9.2233 16 12 16C14.771 16 16.9351 16.2204 18.5586 16.8981C20.3012 17.6255 21.3708 18.8613 21.941 20.6587C22.1528 21.3267 21.6518 22 20.9592 22H3.03459C2.34482 22 1.84679 21.3297 2.0569 20.6654C2.62537 18.8681 3.69119 17.6318 5.43094 16.9025Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <Link
                                        aria-label="check out this user's profile"
                                        href={`/profile/public/${listing.seller.username}`}
                                        className="text-keebyPurple hover:opacity-75 ease-in"
                                    >
                                        {listing.seller.username}
                                    </Link>
                                </div>
                                <SellerStarRating
                                    avgRating={listing.seller.avgRating}
                                    totalRatings={listing.seller.totalRatings}
                                />
                                <div className="bg-mediumGray  mt-2 px-4 py-2 rounded-xl flex gap-3 items-center self-start text-green-500 ">
                                    <div className="flex gap-1 items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4"
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
                                    <div className="flex gap-1 items-center">
                                        <svg
                                            className="w-4 h-4"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"></path>
                                        </svg>

                                        <p>{listing._count.comments}</p>
                                    </div>
                                    <p>{timeAgo}</p>
                                </div>
                            </div>
                            <div className="flex flex-col  items-end w-full justify-between">
                                <BuyListingButtons
                                    listing={listing}
                                    session={session}
                                />
                                <div className="text-keebyPurple flex text-3xl gap-1 items-end">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-10 h-10"
                                        viewBox="-2 0 19 19"
                                        fill="currentColor"
                                    >
                                        <path d="m13.842 11.52-4.389 4.388a1.112 1.112 0 0 1-1.567 0l-6.28-6.28a3.027 3.027 0 0 1-.771-1.892l.043-3.681A1.141 1.141 0 0 1 2 2.935L5.67 2.9a3.04 3.04 0 0 1 1.892.773l6.28 6.28a1.112 1.112 0 0 1 0 1.567zM3.826 5.133a.792.792 0 1 0-.792.792.792.792 0 0 0 .792-.792zm6.594 7.348a.554.554 0 0 0 0-.784l-.401-.401a2.53 2.53 0 0 0 .35-.83 1.565 1.565 0 0 0-.397-1.503 1.59 1.59 0 0 0-1.017-.46 2.14 2.14 0 0 0-.75.085h-.002a2.444 2.444 0 0 0-.59.277H7.61a2.677 2.677 0 0 0-.438.357 2.043 2.043 0 0 1-.259.22 1.29 1.29 0 0 1-.329.17h-.002a.835.835 0 0 1-.338.038h-.002a.53.53 0 0 1-.314-.136.539.539 0 0 1-.106-.534 1.54 1.54 0 0 1 .41-.71 1.632 1.632 0 0 1 .23-.165l.03-.019a1.783 1.783 0 0 1 .322-.155.942.942 0 0 1 .325-.06.554.554 0 0 0 0-1.108h-.001a2.058 2.058 0 0 0-.717.132 2.846 2.846 0 0 0-.529.26l-.01.006-.398-.4a.554.554 0 1 0-.784.785l.388.387a2.513 2.513 0 0 0-.347.803 1.644 1.644 0 0 0 .404 1.561 1.622 1.622 0 0 0 .983.456 1.922 1.922 0 0 0 .805-.089 2.372 2.372 0 0 0 .624-.319 3.142 3.142 0 0 0 .398-.339 1.569 1.569 0 0 1 .256-.208 1.381 1.381 0 0 1 .32-.151 1.023 1.023 0 0 1 .348-.038.485.485 0 0 1 .308.139c.05.049.165.165.097.488a1.558 1.558 0 0 1-.413.729 2.476 2.476 0 0 1-.28.219 1.727 1.727 0 0 1-.306.157.687.687 0 0 1-.32.042.554.554 0 1 0-.08 1.106c.052.004.103.005.152.005a1.723 1.723 0 0 0 .685-.134 2.678 2.678 0 0 0 .507-.27l.01-.007.397.398a.555.555 0 0 0 .783 0z" />
                                    </svg>

                                    <p>${listing.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex h-full w-1/4 flex-col items-center gap-5 laptop:gap-10  flex-shrink-0  ">
                        <div className=" h-1/3 w-full overflow-hidden rounded-xl bg-darkGray tablet:p-4 desktop:p-10 shadow-lg  ">
                            <h2 className=" text-xl desktop:text-2xl ">
                                Keeb Specs
                            </h2>
                            <div className="h-full overflow-auto pb-5 mt-2 desktop:pb-0 text-sm laptop:text-base">
                                <p className="flex gap-2">
                                    <span className="text-mediumGray">{`Switches `}</span>
                                    <span className="break-all">
                                        {listing.switches}
                                    </span>
                                </p>
                                <p className="flex gap-2">
                                    <span className="text-mediumGray">{`Switch type `}</span>
                                    <span className="break-all">
                                        {listing.switchType}
                                    </span>
                                </p>
                                <p className="flex w-full gap-2 ">
                                    <span className=" text-mediumGray">{`Keycaps `}</span>
                                    <span className="break-all">
                                        {listing.keycaps}
                                    </span>
                                </p>
                                <p className="flex w-full gap-2 ">
                                    <span className=" text-mediumGray">{`Layout `}</span>
                                    <span className="break-all">
                                        {listing.layoutType}
                                    </span>
                                </p>
                                <p className="flex gap-2">
                                    <span className="text-mediumGray">{`Sound type `}</span>
                                    <span className="break-all">
                                        {listing.soundType}
                                    </span>
                                </p>
                                <p className="flex gap-2">
                                    <span className="text-mediumGray">{`PCB `}</span>
                                    <span className="break-all">
                                        {listing.pcbType}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="h-2/3 w-full overflow-hidden rounded-xl bg-darkGray tablet:p-4 desktop:p-10 shadow-lg ">
                            <h2 className="mb-2 text-xl desktop:text-2xl text-keebyPurple">
                                Description
                            </h2>
                            <div className="h-full overflow-auto pb-20 text-sm laptop:text-base">
                                <p className=" break-words">{listing.text}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex w-full px-3 laptop:px-5 desktop:px-16 gap-10 mt-10 ">
                    <div className="flex w-full laptop:w-3/4 flex-col ">
                        {listing.soundTest && (
                            <div className="mb-10 flex h-[35rem] w-full  ">
                                <ListingSoundTest
                                    soundTest={listing.soundTest}
                                />
                            </div>
                        )}

                        <div className=" w-full">
                            <div className=" mb-1 flex gap-1 items-center">
                                <h1 className="text-lg text-green-500">
                                    {`${
                                        listing._count.comments
                                            ? listing._count.comments
                                            : 0
                                    } ${
                                        listing._count.comments === 1
                                            ? "COMMENT"
                                            : "COMMENTS"
                                    }`}
                                </h1>
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="rgb(34 197 94)"
                                >
                                    <path d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"></path>
                                </svg>
                            </div>
                            <CreateComment typeId={listing.id} type="listing" />
                            <DisplayComments
                                typeId={listing.id}
                                type="listing"
                                userId={
                                    session && session.user.id
                                        ? session.user.id
                                        : undefined
                                }
                            />
                        </div>
                    </div>
                    <div className="w-1/4 py-10 self-start flex-col items-center justify-center bg-darkGray rounded-xl laptop:flex-col hidden laptop:flex flex-shrink-0 overflow-hidden">
                        <ListingPagePreviews listingId={listing.id} />
                    </div>
                </div>
            </div>

            <div className="mt-60 w-full">
                <Footer />
            </div>
        </>
    );
}
