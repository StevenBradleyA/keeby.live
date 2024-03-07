import { api } from "~/utils/api";
import { Canvas } from "@react-three/fiber";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RotatingSphere from "~/components/Profile/ThreeScenes/RotatingSphere";
import DisplayKeebs from "~/components/Profile/Keeb/DisplayKeeb";
import ModalDialog from "~/components/Modal";
import CreateKeeb from "~/components/Profile/Keeb/CreateKeeb";
import ManageKeeb from "~/components/Profile/Keeb/ManageKeeb";
import { getCookies, setCookie } from "cookies-next";
import { motion } from "framer-motion";
import DisplayReviews from "~/components/Reviews/DisplayReviews";
import defaultProfile from "@public/Profile/profile-default.png";
import keebyLiveTitle from "@public/Profile/keebylive-title.png";
import futureComputer from "@public/Profile/future-future.png";
import errorComputer from "@public/Profile/error-error-error.png";
import gridFunnel from "@public/Profile/profile-idea.png";
import HackermanConsoleCommands from "~/components/Profile/Hackerman";
import computerShare from "@public/Profile/computer-share.png";
import computerShop from "@public/Profile/computer-shop.png";
import computerType from "@public/Profile/computer-type.png";
import MainFooter from "~/components/Footer";
import DisplayFavoriteListings from "~/components/Profile/Favorites";
import ChevronRound from "~/components/Svgs/chevron";

export default function UserProfile() {
    // mdn digest() -- might be useful for us here
    // npm install three @types/three @react-three/fiber

    // todo add notifcations here for comments, offers, likes etc...

    // todo also we definetly want to do one query that grabs a ton of info like posts , listings, keebs, etc here that way we can access everything easily, ? or we add buttons
    const { data: sessionData } = useSession();
    const { data: keebData } = api.keeb.getAll.useQuery();

    const cookies = getCookies();

    const [isRetro, setIsRetro] = useState<boolean>(false);
    const [showFavorites, setShowFavorites] = useState<boolean>(false);
    const [showOffers, setShowOffers] = useState<boolean>(false);

    const [toggle, setToggle] = useState<string>("KEEBSHOP");

    const [isCreateKeebModalOpen, setIsCreateKeebModalOpen] =
        useState<boolean>(false);
    const [isManageKeebModalOpen, setIsManageKeebModalOpen] =
        useState<boolean>(false);
    const [title, setTitle] = useState("");

    const openCreateKeebModal = () => {
        setIsCreateKeebModalOpen(true);
    };

    const closeCreateKeebModalModal = () => {
        setIsCreateKeebModalOpen(false);
    };
    const openManageKeebModal = () => {
        setIsManageKeebModalOpen(true);
    };

    const closeManageKeebModalModal = () => {
        setIsManageKeebModalOpen(false);
    };

    const handleRetroMode = () => {
        setIsRetro(!isRetro);
        setCookie("RetroProfile", !isRetro, {
            maxAge: 60 * 60 * 24 * 365,
            path: "/profile",
        });
    };

    useEffect(() => {
        if (cookies.RetroProfile) {
            setIsRetro(cookies.RetroProfile === "true");
        }
    }, [cookies]);

    useEffect(() => {
        const phrases = [
            "Time Hack Sequence Complete",
            "checking systems",
            "deleting hard drive",
            "jk",
            "Profile",
        ];
        const delay = [0, 2000, 4000, 6000, 8000];

        const timeouts = phrases.map((phrase, i) =>
            setTimeout(() => {
                setTitle(phrase);
            }, delay[i])
        );

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, []);

    return (
        sessionData &&
        sessionData.user && (
            <div className="flex w-3/4 flex-col font-retro text-green-500 ">
                {isRetro && <div className="retro-scanlines"></div>}

                <div className="flex gap-20">
                    <div className="flex w-1/2 flex-col">
                        <h1 className="font-titillium text-3xl ">
                            {sessionData.user.username}
                        </h1>
                        <div className=" mt-2 border-b-2 border-[#616161] "></div>
                        <div className="my-2 flex justify-between">
                            <h2 className="moving-title">{title}</h2>
                            <div>add grid graphic here or hacktime logo</div>
                        </div>
                        <Image
                            alt="profile matrix"
                            src={gridFunnel}
                            className=" h-40 border-2 border-[#616161] object-cover "
                        />
                        <div className="mt-2 flex justify-between">
                            <h1>PROFILE DATA</h1>
                            <button className="flex flex-col leading-none">
                                <p className="text-xs">
                                    EDIT YOUR PROFILE EDIT YOUR PROFILE EDIT
                                    YOUR PROFILE
                                </p>
                                <p className="text-xs">
                                    EDIT YOUR PROFILE EDIT YOUR PROFILE EDIT
                                    YOUR PROFILE
                                </p>

                                <p className="text-xs">
                                    EDIT YOUR PROFILE EDIT YOUR PROFILE EDIT
                                    YOUR PROFILE
                                </p>
                            </button>
                        </div>

                        <Image
                            alt="profile matrix"
                            src={keebyLiveTitle}
                            className="png-green my-10 w-[80%] "
                        />
                        <div className="mb-2 flex items-center justify-between">
                            <div>tag select</div>
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 100 100"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#616161"
                            >
                                <circle cx="50" cy="50" r="40" />
                            </svg>
                            <Link
                                href={`profile/public/${sessionData.user.username}`}
                                aria-label="public profile"
                            >
                                VIEW PUBLIC PROFILE
                            </Link>
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 100 100"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#616161"
                            >
                                <circle cx="50" cy="50" r="40" />
                            </svg>
                            <Link
                                href={`profile/public/${sessionData.user.username}`}
                                aria-label="public profile"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="30px"
                                    width="30px"
                                    viewBox="0 0 512 512"
                                    fill="#616161"
                                >
                                    <path d="m34,256l26.2,26.2c108,108 283.7,108 391.7,0l26.1-26.2-26.2-26.2c-108-108-283.7-108-391.7,0l-26.1,26.2zm222,126.2c-75.8,0-151.6-28.9-209.3-86.6l-32.9-32.9c-3.7-3.7-3.7-9.7 0-13.5l32.9-32.9c115.4-115.4 303.2-115.4 418.6,0l32.9,32.9c3.7,3.7 3.7,9.7 0,13.5l-32.9,32.9c-57.7,57.7-133.5,86.6-209.3,86.6z" />
                                    <path d="m256,183.5c-40,0-72.5,32.5-72.5,72.5s32.5,72.5 72.5,72.5c40,0 72.5-32.5 72.5-72.5s-32.5-72.5-72.5-72.5zm0,164c-50.5,0-91.5-41.1-91.5-91.5 0-50.5 41.1-91.5 91.5-91.5s91.5,41.1 91.5,91.5c0,50.5-41,91.5-91.5,91.5z" />
                                </svg>
                            </Link>
                        </div>

                        <div className="h-80  overflow-hidden border-2 border-[#616161] ">
                            <HackermanConsoleCommands />
                        </div>
                    </div>
                    <div className="flex w-1/2 flex-col">
                        <button
                            className="flex items-center justify-end gap-2"
                            onClick={handleRetroMode}
                        >
                            <div className="flex gap-1 ">
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 100 100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="#616161"
                                    strokeWidth="10"
                                >
                                    <circle cx="50" cy="50" r="40" />
                                </svg>
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 100 100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="#616161"
                                    strokeWidth="10"
                                >
                                    <circle cx="50" cy="50" r="40" />
                                </svg>
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 100 100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="#616161"
                                    strokeWidth="10"
                                >
                                    <circle cx="50" cy="50" r="40" />
                                </svg>
                            </div>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="30px"
                                width="30px"
                                viewBox="0 0 512 512"
                                fill="#616161"
                            >
                                <path d="m34,256l26.2,26.2c108,108 283.7,108 391.7,0l26.1-26.2-26.2-26.2c-108-108-283.7-108-391.7,0l-26.1,26.2zm222,126.2c-75.8,0-151.6-28.9-209.3-86.6l-32.9-32.9c-3.7-3.7-3.7-9.7 0-13.5l32.9-32.9c115.4-115.4 303.2-115.4 418.6,0l32.9,32.9c3.7,3.7 3.7,9.7 0,13.5l-32.9,32.9c-57.7,57.7-133.5,86.6-209.3,86.6z" />
                                <path d="m256,183.5c-40,0-72.5,32.5-72.5,72.5s32.5,72.5 72.5,72.5c40,0 72.5-32.5 72.5-72.5s-32.5-72.5-72.5-72.5zm0,164c-50.5,0-91.5-41.1-91.5-91.5 0-50.5 41.1-91.5 91.5-91.5s91.5,41.1 91.5,91.5c0,50.5-41,91.5-91.5,91.5z" />
                            </svg>
                            {isRetro ? (
                                <div className="mb-2 flex flex-col text-xs ">
                                    <h3 className="leading-none">Future</h3>
                                    <h3 className="leading-none">to the</h3>
                                    <h3 className="leading-none">Future</h3>
                                </div>
                            ) : (
                                <div className="mb-2 flex flex-col text-xs ">
                                    <h3 className="leading-none">Retro</h3>
                                    <h3 className="leading-none">Retro</h3>
                                    <h3 className="leading-none">Retro</h3>
                                </div>
                            )}
                        </button>

                        <div className="h-[400px] border-2 border-[#616161] ">
                            <Canvas
                                className="h-full w-full cursor-pointer"
                                camera={{ position: [4, 0, 1] }}
                            >
                                <ambientLight intensity={0.5} />
                                <pointLight position={[10, 10, 10]} />
                                <RotatingSphere />
                            </Canvas>
                        </div>
                        <div className="flex items-center justify-between">
                            <h1 className=" font-titillium text-9xl">
                                PROFILE
                            </h1>
                            <Image
                                alt="profile"
                                src={
                                    sessionData.user.profile
                                        ? sessionData.user.profile
                                        : defaultProfile
                                }
                                width={800}
                                height={800}
                                priority={true}
                                className=" mt-2 h-24 w-24 object-cover"
                            />
                        </div>
                        <div className="mt-10 flex w-full items-center gap-2 overflow-hidden text-2xl">
                            <div>THOCK</div>
                            <div className="h-0 w-2/3 border-[1px] border-green-500"></div>
                            <div>CLACK</div>
                            <div className="h-0 w-1/3 border-[1px] border-green-500"></div>
                            <div>POP</div>
                        </div>

                        <div className="mt-2 flex w-full items-center gap-2 overflow-hidden text-2xl">
                            <div>THOCK</div>
                            <div className="h-0 w-1/3 border-[1px] border-green-500"></div>
                            <div>TAPE</div>
                            <div className="h-0 w-1/3 border-[1px] border-green-500"></div>
                            <div>MOD</div>
                            <div className="h-0 w-1/3 border-[1px] border-green-500"></div>
                        </div>
                        <div className="mt-4 flex w-full items-center gap-2 overflow-hidden text-2xl">
                            <div>THOCK</div>
                            <div className="h-0 w-1/12 border-[1px] border-green-500"></div>
                            <div>CLACK</div>
                            <div className="h-0 w-full border-[1px] border-green-500"></div>
                            <div>POP</div>
                        </div>

                        <div className="mt-6 flex w-full items-center gap-5">
                            <svg
                                className="w-8"
                                viewBox="0 0 100 100"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="#616161"
                                strokeWidth="10"
                            >
                                <circle cx="50" cy="50" r="40" />
                            </svg>
                            <svg
                                className="w-8"
                                viewBox="0 0 100 100"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#616161"
                            >
                                <circle cx="50" cy="50" r="40" />
                            </svg>
                            <svg
                                className="w-8"
                                viewBox="0 0 100 100"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="#616161"
                                strokeWidth="10"
                            >
                                <circle cx="50" cy="50" r="40" />
                            </svg>
                            <div className="h-0 w-full border-[1px] border-green-500"></div>

                            <div className="flex flex-shrink-0 flex-col text-[10px]">
                                <div>Its not about the cost of a board</div>
                                <div> its about how it makes you feel</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-10 flex w-full items-center gap-5">
                    <h1 className="text-2xl"> {toggle}</h1>
                    <div className="w-full border-[1px] border-green-500"></div>
                </div>

                <div className=" flex h-[50vh] w-full gap-20  ">
                    <div className="flex h-full w-1/2 flex-col justify-between">
                        <Image
                            alt="profile"
                            src={
                                sessionData.user.profile
                                    ? sessionData.user.profile
                                    : defaultProfile
                            }
                            width={800}
                            height={800}
                            priority={true}
                            className=" h-[92%] w-full object-cover"
                        />

                        {toggle === "KEEBSHOP" &&
                            sessionData.user.isVerified && (
                                <div className="flex w-full items-end ">
                                    <div className="flex w-full items-center justify-between gap-5 ">
                                        <p className="flex-shrink-0">
                                            {`INTERNET POINTS ${sessionData.user.internetPoints}`}
                                        </p>
                                        <div className="h-0 w-full border-[1px] border-green-500"></div>

                                        <Link
                                            href="//verify-seller"
                                            aria-label="/verify-seller"
                                            className="flex-shrink-0"
                                        >
                                            VERIFIED SELLER
                                        </Link>
                                    </div>
                                </div>
                            )}

                        {toggle === "KEEBSHOP" &&
                            !sessionData.user.isVerified && (
                                <div className=" flex w-full items-end">
                                    <div className="flex w-full items-center gap-5">
                                        <p className="flex-shrink-0">
                                            {`INTERNET POINTS ${sessionData.user.internetPoints}`}
                                        </p>
                                        <div className="h-0 w-full border-[1px] border-green-500"></div>

                                        <Link
                                            href="//verify-seller"
                                            aria-label="/verify-seller"
                                            className=" flex-shrink-0 text-darkGray"
                                        >
                                            UNVERIFIED SELLER
                                        </Link>
                                    </div>
                                </div>
                            )}

                        {toggle === "KEEBSHARE" && (
                            <div className=" flex w-full items-end">
                                <div className="mt-2 flex w-full items-center gap-5">
                                    <p className="flex flex-shrink-0">
                                        {`INTERNET POINTS ${sessionData.user.internetPoints}`}
                                    </p>
                                    <div className="w-full border-[1px] border-green-500"></div>
                                </div>
                            </div>
                        )}

                        {toggle === "KEEBTYPE" && (
                            <div className="flex w-full items-end ">
                                <div className="flex w-full items-center justify-between gap-5 ">
                                    <p className="flex-shrink-0">
                                        KEEBTYPE STATS
                                    </p>
                                    <div className="h-0 w-full border-[1px] border-green-500"></div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex h-full w-1/2  flex-col justify-between">
                        <div className=" flex w-full flex-col gap-5 border-2 border-[#616161] p-5 ">
                            <div className="flex items-center justify-center gap-10 text-xs">
                                <Image
                                    src={computerShop}
                                    alt="computer"
                                    width={200}
                                    height={200}
                                    className={`${
                                        toggle === "KEEBSHOP"
                                            ? "png-light-gray"
                                            : "png-green"
                                    } w-20 cursor-pointer object-cover`}
                                    onClick={() => setToggle("KEEBSHOP")}
                                />
                                <h2
                                    className={`${
                                        toggle === "KEEBSHOP"
                                            ? "text-darkGray"
                                            : "text-green-500"
                                    }`}
                                >
                                    check your favorite listings, manage your
                                    listings, leave reviews, with this keeb shop
                                    tab
                                </h2>
                            </div>
                            <div className="flex items-center justify-center gap-10 text-xs">
                                <Image
                                    src={computerShare}
                                    alt="computer"
                                    width={200}
                                    height={200}
                                    className={`${
                                        toggle === "KEEBSHARE"
                                            ? "png-light-gray"
                                            : "png-green"
                                    } w-20 cursor-pointer object-cover`}
                                    onClick={() => setToggle("KEEBSHARE")}
                                />
                                <h2
                                    className={`${
                                        toggle === "KEEBSHARE"
                                            ? "text-darkGray"
                                            : "text-green-500"
                                    }`}
                                >
                                    check your favorite posts, see your internet
                                    points, and manage your posts, with this
                                    keeb share tab
                                </h2>
                            </div>
                            <div className="flex items-center justify-center gap-10 text-xs">
                                <Image
                                    src={computerType}
                                    alt="computer"
                                    width={200}
                                    height={200}
                                    className={`${
                                        toggle === "KEEBTYPE"
                                            ? "png-light-gray"
                                            : "png-green"
                                    } w-20 cursor-pointer object-cover`}
                                    onClick={() => setToggle("KEEBTYPE")}
                                />
                                <h2
                                    className={`${
                                        toggle === "KEEBTYPE"
                                            ? "text-darkGray"
                                            : "text-green-500"
                                    }`}
                                >
                                    check your typing stats, manage your typing
                                    keebs, with this keeb type tab
                                </h2>
                            </div>
                        </div>

                        <h1 className="font-titillium text-6xl"> {toggle}</h1>
                        <div className=" flex w-full items-center gap-5 text-2xl">
                            {toggle === "KEEBSHOP" && <p> BUY</p>}
                            {toggle === "KEEBSHARE" && <p> SHARE</p>}
                            {toggle === "KEEBTYPE" && <p> TYPE</p>}

                            <div className="w-full border-[1px] border-green-500"></div>

                            {toggle === "KEEBSHOP" && <div> SELL</div>}
                            {toggle === "KEEBSHARE" && <div> ENJOY</div>}
                            {toggle === "KEEBTYPE" && <div> WITH</div>}

                            <div className="w-full border-[1px] border-green-500"></div>

                            <div> KEEBS</div>
                        </div>
                    </div>
                </div>

                {toggle === "KEEBSHOP" && (
                    <div className="mt-10 flex  w-full justify-between border-2 border-[#616161] p-5">
                        <button className="  border-2 border-black bg-black  px-6 py-2 text-green-500 hover:border-green-500 hover:bg-keebyGray">
                            My Listings
                        </button>
                        <button className="  border-2 border-black bg-black  px-6 py-2 text-green-500 hover:border-green-500 hover:bg-keebyGray">
                            Offers
                        </button>
                        <button className="  border-2 border-black bg-black  px-6 py-2 text-green-500 hover:border-green-500 hover:bg-keebyGray">
                            Favorites
                        </button>
                        <button className="  border-2 border-black bg-black  px-6 py-2 text-green-500 hover:border-green-500 hover:bg-keebyGray">
                            Reviews
                        </button>
                    </div>
                )}
                {toggle === "KEEBSHARE" && (
                    <div className="mt-10 flex  w-full justify-between border-2 border-[#616161] p-5">
                        <button className="  border-2 border-black bg-black  px-6 py-2 text-green-500 hover:border-green-500 hover:bg-keebyGray">
                            My Posts
                        </button>

                        <button className="  border-2 border-black bg-black  px-6 py-2 text-green-500 hover:border-green-500 hover:bg-keebyGray">
                            Favorites
                        </button>
                    </div>
                )}
                {toggle === "KEEBTYPE" && (
                    <div className="mt-10 flex  w-full justify-between border-2 border-[#616161] p-5">
                        <button className="  border-2 border-black bg-black  px-6 py-2 text-green-500 hover:border-green-500 hover:bg-keebyGray">
                            Stats
                        </button>

                        <button className="  border-2 border-black bg-black  px-6 py-2 text-green-500 hover:border-green-500 hover:bg-keebyGray">
                            My Keebs
                        </button>
                    </div>
                )}

                {/* {toggle === "KEEBSHOP" && (
                    <div className="mt-10 flex w-full gap-20">
                        <div className="w-1/2 flex-col  ">
                            <div className="mt-5 flex w-full justify-between gap-5 border-2 border-[#616161] p-5">
                                <Link
                                    href="/manage-listings"
                                    aria-label="manage listings"
                                    className="rounded border-2 border-[#616161] px-4 py-2 transition  duration-150 ease-in-out hover:border-green-500"
                                >
                                    MY LISTINGS
                                </Link>
                                <button className="rounded border-2 border-[#616161] px-4 py-2 transition  duration-150 ease-in-out hover:border-green-500">
                                    MY ORDERS
                                </button>
                            </div>

                            <h1>REVIEWS</h1>
                            <h1>leave a review</h1>
                            <Link
                                href={`profile/public/${sessionData.user.username}`}
                                aria-label="public profile"
                            >
                                reviews about me
                            </Link>
                        </div>
                        <div className="flex w-1/2 flex-col gap-5">
                            <div className=" w-full border-2 border-[#616161] p-5">
                                <button
                                    onClick={() =>
                                        setShowFavorites(!showFavorites)
                                    }
                                    className="flex items-center gap-5 text-xl "
                                >
                                    <h1>FAVORITES</h1>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-7"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                                            stroke="#616161"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            opacity="0.5"
                                            d="M12 5.50073L10.5 8.5001L14 11.0001L11 14.5001L13 16.5001L12 20.5001"
                                            stroke="#616161"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-7"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                                            stroke="#616161"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            opacity="0.5"
                                            d="M12 5.50073L10.5 8.5001L14 11.0001L11 14.5001L13 16.5001L12 20.5001"
                                            stroke="#616161"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-7"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                                            stroke="#616161"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            opacity="0.5"
                                            d="M12 5.50073L10.5 8.5001L14 11.0001L11 14.5001L13 16.5001L12 20.5001"
                                            stroke="#616161"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <div
                                        className={`w-5 ${
                                            showFavorites
                                                ? "rotate-0"
                                                : "rotate-180"
                                        } `}
                                    >
                                        <ChevronRound />
                                    </div>
                                </button>
                                {showFavorites && (
                                    <DisplayFavoriteListings
                                        userId={sessionData.user.id}
                                    />
                                )}
                            </div>
                            <div className=" w-full border-2 border-[#616161] p-5">
                                <button
                                    onClick={() => setShowOffers(!showOffers)}
                                    className="flex items-center gap-5 text-xl "
                                >
                                    <h1>OFFERS</h1>
                                    <h1>OFFERS</h1>
                                    <h1>OFFERS</h1>
                                    <h1>OFFERS</h1>
                                    <h1>OFFERS</h1>

                                    <div
                                        className={`w-5 ${
                                            showOffers
                                                ? "rotate-0"
                                                : "rotate-180"
                                        } `}
                                    >
                                        <ChevronRound />
                                    </div>
                                </button>
                                {showOffers && (
                                    <div>
                                        hello display offers with agree and
                                        delete with confirms
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )} */}

                {/* {toggle === "KEEBSHARE" && (
                    <div className="mt-1 flex w-full gap-20">
                        <div className="w-1/2 flex-col  ">
                            <div className="mt-5 flex w-full justify-between gap-5 border-2 border-[#616161] p-5">
                                <Link
                                    href="/manage-listings"
                                    aria-label="manage listings"
                                    className="rounded border-2 border-[#616161] px-4 py-2 transition  duration-150 ease-in-out hover:border-green-500"
                                >
                                    MY POSTS
                                </Link>
                                <button className="rounded border-2 border-[#616161] px-4 py-2 transition  duration-150 ease-in-out hover:border-green-500">
                                    IDK
                                </button>
                            </div>
                        </div>
                        <div className="flex w-1/2 flex-col gap-5">
                            <div className=" w-full border-2 border-[#616161] p-5">
                                <button
                                    onClick={() =>
                                        setShowFavorites(!showFavorites)
                                    }
                                    className="flex items-center gap-5 text-xl "
                                >
                                    <h1>FAVORITES</h1>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-7"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                                            stroke="#616161"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            opacity="0.5"
                                            d="M12 5.50073L10.5 8.5001L14 11.0001L11 14.5001L13 16.5001L12 20.5001"
                                            stroke="#616161"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-7"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                                            stroke="#616161"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            opacity="0.5"
                                            d="M12 5.50073L10.5 8.5001L14 11.0001L11 14.5001L13 16.5001L12 20.5001"
                                            stroke="#616161"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-7"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                                            stroke="#616161"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            opacity="0.5"
                                            d="M12 5.50073L10.5 8.5001L14 11.0001L11 14.5001L13 16.5001L12 20.5001"
                                            stroke="#616161"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <div
                                        className={`w-5 ${
                                            showFavorites
                                                ? "rotate-0"
                                                : "rotate-180"
                                        } `}
                                    >
                                        <ChevronRound />
                                    </div>
                                </button>
                                {showFavorites && (
                                    <DisplayFavoriteListings
                                        userId={sessionData.user.id}
                                    />
                                )}
                            </div>
                        </div>
                    </div> 

        
                )}*/}

                {/* {toggle === "KEEBTYPE" && (
                    <div className=" flex flex-col items-center">
                        <div>graph with wpm date and keeb etc</div>
                        <div>next to graph is a list of ten fastest wpm</div>
                        <div>
                            Rank information maybe link to a page that explains
                            ranking system
                        </div>

                        <div className="text-3xl">Keebs</div>
                        <div className="flex">
                            <button
                                className="rounded-2xl bg-green-600 px-6 py-2"
                                onClick={openCreateKeebModal}
                            >
                                add a keeb
                            </button>
                            <button
                                className="rounded-2xl bg-green-600 px-6 py-2"
                                onClick={openManageKeebModal}
                            >
                                manage
                            </button>
                        </div>

                        <ModalDialog
                            isOpen={isCreateKeebModalOpen}
                            onClose={closeCreateKeebModalModal}
                        >
                            <CreateKeeb
                                closeModal={closeCreateKeebModalModal}
                                userId={sessionData.user.id}
                            />
                        </ModalDialog>

                        <ModalDialog
                            isOpen={isManageKeebModalOpen}
                            onClose={closeManageKeebModalModal}
                        >
                            <ManageKeeb
                                closeModal={closeManageKeebModalModal}
                                userId={sessionData.user.id}
                            />
                        </ModalDialog>

                        <div className="flex flex-wrap gap-10">
                            {keebData?.map((keeb, i) => (
                                <DisplayKeebs key={i} keeb={keeb} />
                            ))}
                        </div>

                        <div>
                            clicking on a keeb will show data for that keeb{" "}
                        </div>
                    </div>
                )} */}

                <MainFooter />
            </div>
        )
    );
}
