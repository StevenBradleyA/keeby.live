"use client";
import { Canvas } from "@react-three/fiber";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RotatingSphere from "~/app/_components/Profile/ThreeScenes/RotatingSphere";
import { getCookies, setCookie } from "cookies-next";
import defaultProfile from "@public/Images/defaultProfile.png";
import keebyLiveTitle from "@public/Profile/keebylive-title.png";
import gridFunnel from "@public/Profile/profile-idea.png";
import HackermanConsoleCommands from "~/app/_components/Profile/Hackerman/hackermanConsoleCommands";
import computerShare from "@public/Profile/computer-share.png";
import computerShop from "@public/Profile/computer-shop.png";
import computerType from "@public/Profile/computer-type.png";
import hacktime from "@public/Vectors/hacktime.png";
import ManageListings from "~/app/_components/Listings/ManageListings";
import ManagePosts from "~/app/_components/Posts/ManagePosts";
import DisplayFavoriteListings from "~/app/_components/Listings/DisplayFavoriteListings";
import DisplayFavoritePosts from "~/app/_components/Posts/DisplayFavoritePosts";
import DisplayProfileKeebs from "~/app/_components/Profile/Keeb/DisplayKeebs";
import DisplayAllGameStatsCheck from "~/app/_components/Games/GameStats/displayAllGameStatsCheck";
import UpdateUserTag from "~/app/_components/Profile/User/Update/Tag";
import ModalDialog from "~/app/_components/Modal";
import UpdateProfile from "~/app/_components/Profile/User/Update/updateProfile";
import HackermanTypeBinary from "~/app/_components/Profile/Hackerman/hackermanTypeBinary";
import MatrixRain from "~/app/_components/Profile/Hackerman/matrix";
import AsciiArt from "~/app/_components/Profile/ThreeScenes/asciiArt";
import DisplayOffers from "~/app/_components/Offers/Display/displayOffers";
import DisplayTransactions from "~/app/_components/Transactions/Display";
import keebo from "@public/Profile/keebo.png";
import LoadingSpinner from "~/app/_components/Loading";
import DisplayProfileNotifications from "~/app/_components/Notifications/Display/displayProfileNotifications";
import DisplayProfileReviews from "~/app/_components/Reviews/Display/displayProfileReviews";
import Footer from "../_components/Footer/footer";
import { useMobile } from "../_components/Context/Mobile";
import TitleScripts from "../_components/TitleScripts";

export default function UserProfile() {
    // mdn digest() -- might be useful for us here
    // npm install three @types/three @react-three/fiber

    // todo add notifcations here for comments, offers, likes etc...

    const { data: sessionData, status } = useSession();
    const { isMobile } = useMobile();

    const cookies = getCookies();
    const [key, setKey] = useState(0);
    const [isRetro, setIsRetro] = useState<boolean>(false);
    const [toggle, setToggle] = useState<string>("KEEBSHOP");
    const [scriptIndex, setScriptIndex] = useState<number>(1);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isHackType, setIsHackType] = useState<boolean>(false);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const eyeScrollRef = useRef<HTMLDivElement | null>(null);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    // keebshop
    const [keebShopCategory, setKeebShopCategory] =
        useState<string>("FAVORITES");

    // keebshare
    const [keebShareCategory, setKeebShareCategory] =
        useState<string>("FAVORITES");

    // keebtype
    const [keebTypeCategory, setKeebTypeCategory] = useState<string>("STATS");

    // const { data: keebData } = api.keeb.getAll.useQuery();

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

    if (status === "loading") {
        return (
            <div className="mt-48">
                <LoadingSpinner size="40px" />
            </div>
        );
    }

    return sessionData && sessionData.user ? (
        <>
            <div className="w-full mt-40 flex justify-center px-2 tablet:px-5 font-retro text-green-500">
                <div className="flex desktop:w-3/4 w-full flex-col">
                    {isRetro && <div className="retro-scanlines"></div>}

                    <div className="flex gap-2 tablet:gap-10 desktop:gap-20 flex-wrap tablet:flex-nowrap">
                        <div className="flex w-full tablet:w-1/2 flex-col">
                            <h4 className="font-titillium text-base laptop:text-xl desktop:text-3xl ">
                                {sessionData.user.username}
                            </h4>
                            <div className=" mt-2 border-b-2 border-mediumGray "></div>
                            <div className="my-2 flex justify-between">
                                <TitleScripts page="profile" />
                                <button
                                    onClick={() => setIsHackType(!isHackType)}
                                >
                                    <Image
                                        alt="hacktime logo"
                                        src={hacktime}
                                        className=" console-switch h-6 w-6 object-cover"
                                    />
                                </button>
                            </div>
                            <div className=" h-40 w-full overflow-hidden border-2 border-mediumGray">
                                {isHackType ? (
                                    <MatrixRain />
                                ) : (
                                    <Image
                                        alt="profile matrix"
                                        src={gridFunnel}
                                        className=" h-full w-full object-cover "
                                    />
                                )}
                            </div>
                            <div className="mt-2 flex justify-between w-full">
                                <h3 className="w-1/4 text-xs tablet:text-sm laptop:text-base">
                                    PROFILE DATA
                                </h3>
                                <button
                                    className="flex flex-col items-end leading-none transition-colors duration-400 ease-custom-cubic hover:text-white overflow-hidden w-3/4 "
                                    onClick={openModal}
                                >
                                    <p className="text-xs whitespace-nowrap">
                                        EDIT YOUR PROFILE EDIT YOUR PROFILE EDIT
                                        YOUR PROFILE
                                    </p>
                                    <p className="text-xs whitespace-nowrap">
                                        EDIT YOUR PROFILE EDIT YOUR PROFILE EDIT
                                        YOUR PROFILE
                                    </p>
                                    <p className="text-xs whitespace-nowrap">
                                        EDIT YOUR PROFILE EDIT YOUR PROFILE EDIT
                                        YOUR PROFILE
                                    </p>
                                </button>
                            </div>

                            <ModalDialog isOpen={isOpen} onClose={closeModal}>
                                <UpdateProfile
                                    userId={sessionData.user.id}
                                    closeModal={closeModal}
                                    key={key}
                                    setKey={setKey}
                                />
                            </ModalDialog>

                            <Image
                                alt="profile matrix"
                                src={keebyLiveTitle}
                                className="png-green my-10 w-[80%] "
                            />
                            <div className="mb-2 flex items-center justify-between">
                                <UpdateUserTag
                                    key={key}
                                    userId={sessionData.user.id}
                                    currentTag={sessionData.user.selectedTag}
                                />
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
                                    className="transition-colors duration-400 ease-custom-cubic hover:text-white "
                                >
                                    VIEW PUBLIC PROFILE
                                </Link>
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 100 100"
                                    className="text-mediumGray"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                >
                                    <circle cx="50" cy="50" r="40" />
                                </svg>
                                <button
                                    onClick={() => {
                                        eyeScrollRef.current?.scrollIntoView({
                                            behavior: "instant",
                                        });
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-mediumGray transition-colors duration-400 ease-custom-cubic hover:text-white w-8 h-8"
                                        viewBox="0 0 512 512"
                                        fill="currentColor"
                                    >
                                        <path d="m34,256l26.2,26.2c108,108 283.7,108 391.7,0l26.1-26.2-26.2-26.2c-108-108-283.7-108-391.7,0l-26.1,26.2zm222,126.2c-75.8,0-151.6-28.9-209.3-86.6l-32.9-32.9c-3.7-3.7-3.7-9.7 0-13.5l32.9-32.9c115.4-115.4 303.2-115.4 418.6,0l32.9,32.9c3.7,3.7 3.7,9.7 0,13.5l-32.9,32.9c-57.7,57.7-133.5,86.6-209.3,86.6z" />
                                        <path d="m256,183.5c-40,0-72.5,32.5-72.5,72.5s32.5,72.5 72.5,72.5c40,0 72.5-32.5 72.5-72.5s-32.5-72.5-72.5-72.5zm0,164c-50.5,0-91.5-41.1-91.5-91.5 0-50.5 41.1-91.5 91.5-91.5s91.5,41.1 91.5,91.5c0,50.5-41,91.5-91.5,91.5z" />
                                    </svg>
                                </button>
                            </div>

                            <div className="h-80  overflow-hidden border-2 border-mediumGray ">
                                {isHackType ? (
                                    <HackermanTypeBinary />
                                ) : (
                                    <HackermanConsoleCommands />
                                )}
                            </div>
                        </div>
                        <div className="flex w-full tablet:w-1/2 flex-col">
                            <div className="flex w-full items-end justify-between">
                                {/* <DisplayProfileNotifications
                                    userId={sessionData.user.id}
                                    setToggle={setToggle}
                                    setKeebShopCategory={setKeebShopCategory}
                                    scrollRef={scrollRef}
                                /> */}

                                <button
                                    className="profile-retro-button flex items-center gap-2"
                                    onClick={handleRetroMode}
                                >
                                    <div className="flex gap-1 ">
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 100 100"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            stroke="currentColor"
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
                                            stroke="currentColor"
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
                                            stroke="currentColor"
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
                                        fill="currentColor"
                                    >
                                        <path d="m34,256l26.2,26.2c108,108 283.7,108 391.7,0l26.1-26.2-26.2-26.2c-108-108-283.7-108-391.7,0l-26.1,26.2zm222,126.2c-75.8,0-151.6-28.9-209.3-86.6l-32.9-32.9c-3.7-3.7-3.7-9.7 0-13.5l32.9-32.9c115.4-115.4 303.2-115.4 418.6,0l32.9,32.9c3.7,3.7 3.7,9.7 0,13.5l-32.9,32.9c-57.7,57.7-133.5,86.6-209.3,86.6z" />
                                        <path d="m256,183.5c-40,0-72.5,32.5-72.5,72.5s32.5,72.5 72.5,72.5c40,0 72.5-32.5 72.5-72.5s-32.5-72.5-72.5-72.5zm0,164c-50.5,0-91.5-41.1-91.5-91.5 0-50.5 41.1-91.5 91.5-91.5s91.5,41.1 91.5,91.5c0,50.5-41,91.5-91.5,91.5z" />
                                    </svg>
                                    {isRetro ? (
                                        <div className="profile-retro-button-text mb-2 flex flex-col text-xs ">
                                            <h3 className="leading-none">
                                                Future
                                            </h3>
                                            <h3 className="leading-none">
                                                to the
                                            </h3>
                                            <h3 className="leading-none">
                                                Future
                                            </h3>
                                        </div>
                                    ) : (
                                        <div className="profile-retro-button-text mb-2 flex flex-col text-xs  ">
                                            <h3 className="leading-none">
                                                Retro
                                            </h3>
                                            <h3 className="leading-none">
                                                Retro
                                            </h3>
                                            <h3 className="leading-none">
                                                Retro
                                            </h3>
                                        </div>
                                    )}
                                </button>
                            </div>

                            <div className="h-[400px] border-2 border-mediumGray ">
                                {isHackType ? (
                                    <AsciiArt />
                                ) : (
                                    <Canvas
                                        className="h-full w-full"
                                        camera={{ position: [4, 0, 1] }}
                                    >
                                        <ambientLight intensity={0.5} />
                                        <pointLight position={[10, 10, 10]} />
                                        <RotatingSphere />
                                    </Canvas>
                                )}
                            </div>
                            <div className="flex items-center justify-between gap-5 mt-2">
                                <h1 className="-mt-2 font-titillium text-4xl tablet:text-5xl laptop:text-8xl desktop:text-9xl  ">
                                    PROFILE
                                </h1>
                                <div className="tablet:w-16 tablet:h-16 w-14 h-14 laptop:h-20 laptop:w-20 desktop:h-24 desktop:w-24  overflow-hidden border-mediumGray border-2 ">
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
                                        className="h-full w-full scale-150 object-contain hover:opacity-70"
                                    />
                                </div>
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

                            <div
                                className="mt-6 flex w-full items-center gap-5 "
                                ref={eyeScrollRef}
                            >
                                <div className="flex  gap-3">
                                    <button
                                        onClick={() => setScriptIndex(0)}
                                        className="text-mediumGray hover:text-white ease-in "
                                    >
                                        <svg
                                            className="w-5 h-5 "
                                            viewBox="0 0 100 100"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill={`${scriptIndex === 0 ? "currentColor" : "none"}`}
                                            stroke={`${scriptIndex === 0 ? "none" : "currentColor"}`}
                                            strokeWidth="10"
                                        >
                                            <circle cx="50" cy="50" r="40" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setScriptIndex(1)}
                                        className="text-mediumGray hover:text-white ease-in "
                                    >
                                        <svg
                                            className="w-5 h-5 "
                                            viewBox="0 0 100 100"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill={`${scriptIndex === 1 ? "currentColor" : "none"}`}
                                            stroke={`${scriptIndex === 1 ? "none" : "currentColor"}`}
                                            strokeWidth="10"
                                        >
                                            <circle cx="50" cy="50" r="40" />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={() => setScriptIndex(2)}
                                        className="text-mediumGray hover:text-white ease-in "
                                    >
                                        <svg
                                            key={2}
                                            className="w-5 h-5 "
                                            viewBox="0 0 100 100"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill={`${scriptIndex === 2 ? "currentColor" : "none"}`}
                                            stroke={`${scriptIndex === 2 ? "none" : "currentColor"}`}
                                            strokeWidth="10"
                                        >
                                            <circle cx="50" cy="50" r="40" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="h-[2px] w-full bg-green-500"></div>

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
                                sessionData.user.isModerator && (
                                    <div className="flex w-full items-end ">
                                        <div className="flex w-full items-center justify-between gap-5 ">
                                            <p className="flex-shrink-0">
                                                {`INTERNET POINTS ${sessionData.user.internetPoints}`}
                                            </p>
                                            <div className="h-0 w-full border-[1px] border-green-500"></div>

                                            <Link
                                                href="/verify-seller"
                                                aria-label="Seller Verification"
                                                className="flex-shrink-0 transition-colors duration-400 ease-custom-cubic hover:text-white"
                                            >
                                                VERIFIED SELLER
                                            </Link>
                                        </div>
                                    </div>
                                )}

                            {toggle === "KEEBSHOP" &&
                                !sessionData.user.isModerator && (
                                    <div className=" flex w-full items-end">
                                        <div className="flex w-full items-center gap-5">
                                            <p className="flex-shrink-0">
                                                {`INTERNET POINTS ${sessionData.user.internetPoints}`}
                                            </p>
                                            <div className="h-0 w-full border-[1px] border-green-500"></div>

                                            <Link
                                                href="/verify-seller"
                                                aria-label="/verify-seller"
                                                className=" flex-shrink-0 text-mediumGray transition-colors duration-400 ease-custom-cubic hover:text-white"
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
                            <div className=" flex w-full flex-col gap-5 border-2 border-mediumGray p-5 ">
                                <div className="flex items-center justify-center gap-10 text-xs">
                                    <Image
                                        src={computerShop}
                                        alt="computer"
                                        width={200}
                                        height={200}
                                        className={`${
                                            toggle === "KEEBSHOP"
                                                ? "png-light-gray"
                                                : "png-computer"
                                        } w-20 cursor-pointer object-cover`}
                                        onClick={() => setToggle("KEEBSHOP")}
                                    />
                                    <h2
                                        className={`${
                                            toggle === "KEEBSHOP"
                                                ? "text-mediumGray"
                                                : "text-green-500"
                                        }`}
                                    >
                                        check your favorite listings, manage
                                        your listings, accept/decline offers,
                                        and leave reviews with the keeb shop tab
                                    </h2>
                                </div>
                                <div className="flex items-center justify-center gap-10 text-xs ">
                                    <Image
                                        src={computerShare}
                                        alt="computer"
                                        width={200}
                                        height={200}
                                        className={`${
                                            toggle === "KEEBSHARE"
                                                ? "png-light-gray"
                                                : "png-computer"
                                        } w-20 cursor-pointer object-cover`}
                                        onClick={() => setToggle("KEEBSHARE")}
                                    />
                                    <h2
                                        className={`${
                                            toggle === "KEEBSHARE"
                                                ? "text-mediumGray"
                                                : ""
                                        }`}
                                    >
                                        check your favorite posts, see your
                                        internet points, and manage your posts
                                        with the keeb share tab
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
                                                : "png-computer"
                                        } w-20 cursor-pointer object-cover`}
                                        onClick={() => setToggle("KEEBTYPE")}
                                    />
                                    <h2
                                        className={`${
                                            toggle === "KEEBTYPE"
                                                ? "text-mediumGray"
                                                : "text-green-500"
                                        }`}
                                    >
                                        check your typing stats, and manage your
                                        typing keeyboards with the keeb type tab
                                    </h2>
                                </div>
                            </div>

                            <h1
                                className="font-titillium text-6xl"
                                ref={scrollRef}
                            >
                                {toggle}
                            </h1>
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
                        <div className="mt-10 flex  w-full justify-evenly border-2 border-mediumGray p-5 ">
                            <button
                                className={`profile-favorites-button flex items-center gap-1 border-2 ${
                                    keebShopCategory === "FAVORITES"
                                        ? "border-green-500"
                                        : "border-mediumGray"
                                } rounded-md py-2 pl-6  `}
                                onClick={() => setKeebShopCategory("FAVORITES")}
                            >
                                <span className="profile-favorites-button-text">
                                    Favorites
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="profile-favorites-button-heart w-4"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="profile-favorites-button-circle w-2"
                                    viewBox="0 0 32 32"
                                >
                                    <circle cx="16" cy="16" r="16" />
                                </svg>
                            </button>
                            <button
                                className={`profile-select-button flex items-center gap-1   border-2 ${
                                    keebShopCategory === "LISTINGS"
                                        ? "border-green-500"
                                        : "border-mediumGray"
                                } rounded-md   py-2 pl-6 text-green-500  `}
                                onClick={() => setKeebShopCategory("LISTINGS")}
                            >
                                <span className="profile-select-button-text">
                                    My Listings
                                </span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="profile-select-button-arrow w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M15.0001 10.5001V15.0001M15.0001 15.0001H10.5001M15.0001 15.0001L9.00024 9M7.20024 20H16.8002C17.9203 20 18.4804 20 18.9082 19.782C19.2845 19.5903 19.5905 19.2843 19.7823 18.908C20.0002 18.4802 20.0002 17.9201 20.0002 16.8V7.2C20.0002 6.0799 20.0002 5.51984 19.7823 5.09202C19.5905 4.71569 19.2845 4.40973 18.9082 4.21799C18.4804 4 17.9203 4 16.8002 4H7.20024C6.08014 4 5.52009 4 5.09226 4.21799C4.71594 4.40973 4.40998 4.71569 4.21823 5.09202C4.00024 5.51984 4.00024 6.07989 4.00024 7.2V16.8C4.00024 17.9201 4.00024 18.4802 4.21823 18.908C4.40998 19.2843 4.71594 19.5903 5.09226 19.782C5.52009 20 6.08014 20 7.20024 20Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="profile-select-button-square w-2"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <rect
                                        x="4"
                                        y="4"
                                        width="16"
                                        height="16"
                                        rx="2"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <button
                                className={`profile-select-button flex items-center gap-1   border-2 ${
                                    keebShopCategory === "OFFERS"
                                        ? "border-green-500"
                                        : "border-mediumGray"
                                } rounded-md   py-2 pl-6 text-green-500  `}
                                onClick={() => setKeebShopCategory("OFFERS")}
                            >
                                <span className="profile-select-button-text">
                                    Offers
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="profile-select-button-arrow w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M15.0001 10.5001V15.0001M15.0001 15.0001H10.5001M15.0001 15.0001L9.00024 9M7.20024 20H16.8002C17.9203 20 18.4804 20 18.9082 19.782C19.2845 19.5903 19.5905 19.2843 19.7823 18.908C20.0002 18.4802 20.0002 17.9201 20.0002 16.8V7.2C20.0002 6.0799 20.0002 5.51984 19.7823 5.09202C19.5905 4.71569 19.2845 4.40973 18.9082 4.21799C18.4804 4 17.9203 4 16.8002 4H7.20024C6.08014 4 5.52009 4 5.09226 4.21799C4.71594 4.40973 4.40998 4.71569 4.21823 5.09202C4.00024 5.51984 4.00024 6.07989 4.00024 7.2V16.8C4.00024 17.9201 4.00024 18.4802 4.21823 18.908C4.40998 19.2843 4.71594 19.5903 5.09226 19.782C5.52009 20 6.08014 20 7.20024 20Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="profile-select-button-square w-2"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <rect
                                        x="4"
                                        y="4"
                                        width="16"
                                        height="16"
                                        rx="2"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            <button
                                className={`profile-select-button flex items-center gap-1   border-2 ${
                                    keebShopCategory === "REVIEWS"
                                        ? "border-green-500"
                                        : "border-mediumGray"
                                } rounded-md   py-2 pl-6 text-green-500  `}
                                onClick={() => setKeebShopCategory("REVIEWS")}
                            >
                                <span className="profile-select-button-text">
                                    Reviews
                                </span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="profile-select-button-arrow w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M15.0001 10.5001V15.0001M15.0001 15.0001H10.5001M15.0001 15.0001L9.00024 9M7.20024 20H16.8002C17.9203 20 18.4804 20 18.9082 19.782C19.2845 19.5903 19.5905 19.2843 19.7823 18.908C20.0002 18.4802 20.0002 17.9201 20.0002 16.8V7.2C20.0002 6.0799 20.0002 5.51984 19.7823 5.09202C19.5905 4.71569 19.2845 4.40973 18.9082 4.21799C18.4804 4 17.9203 4 16.8002 4H7.20024C6.08014 4 5.52009 4 5.09226 4.21799C4.71594 4.40973 4.40998 4.71569 4.21823 5.09202C4.00024 5.51984 4.00024 6.07989 4.00024 7.2V16.8C4.00024 17.9201 4.00024 18.4802 4.21823 18.908C4.40998 19.2843 4.71594 19.5903 5.09226 19.782C5.52009 20 6.08014 20 7.20024 20Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="profile-select-button-square w-2"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <rect
                                        x="4"
                                        y="4"
                                        width="16"
                                        height="16"
                                        rx="2"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <button
                                className={`profile-select-button flex items-center gap-1   border-2 ${
                                    keebShopCategory === "TRANSACTIONS"
                                        ? "border-green-500"
                                        : "border-mediumGray"
                                } rounded-md   py-2 pl-6 text-green-500  `}
                                onClick={() =>
                                    setKeebShopCategory("TRANSACTIONS")
                                }
                            >
                                <span className="profile-select-button-text">
                                    Transactions
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="profile-select-button-arrow w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M15.0001 10.5001V15.0001M15.0001 15.0001H10.5001M15.0001 15.0001L9.00024 9M7.20024 20H16.8002C17.9203 20 18.4804 20 18.9082 19.782C19.2845 19.5903 19.5905 19.2843 19.7823 18.908C20.0002 18.4802 20.0002 17.9201 20.0002 16.8V7.2C20.0002 6.0799 20.0002 5.51984 19.7823 5.09202C19.5905 4.71569 19.2845 4.40973 18.9082 4.21799C18.4804 4 17.9203 4 16.8002 4H7.20024C6.08014 4 5.52009 4 5.09226 4.21799C4.71594 4.40973 4.40998 4.71569 4.21823 5.09202C4.00024 5.51984 4.00024 6.07989 4.00024 7.2V16.8C4.00024 17.9201 4.00024 18.4802 4.21823 18.908C4.40998 19.2843 4.71594 19.5903 5.09226 19.782C5.52009 20 6.08014 20 7.20024 20Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="profile-select-button-square w-2"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <rect
                                        x="4"
                                        y="4"
                                        width="16"
                                        height="16"
                                        rx="2"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                    {toggle === "KEEBSHARE" && (
                        <div className="mt-10 flex  w-full justify-evenly border-2 border-mediumGray p-5">
                            <button
                                className={`profile-favorites-button flex items-center gap-1 border-2 ${
                                    keebShareCategory === "FAVORITES"
                                        ? "border-green-500"
                                        : "border-mediumGray"
                                } rounded-md py-2 pl-6  `}
                                onClick={() =>
                                    setKeebShareCategory("FAVORITES")
                                }
                            >
                                <span className="profile-favorites-button-text">
                                    Favorites
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="profile-favorites-button-heart w-4"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="profile-favorites-button-circle w-2"
                                    viewBox="0 0 32 32"
                                >
                                    <circle cx="16" cy="16" r="16" />
                                </svg>
                            </button>
                            <button
                                className={`profile-select-button flex items-center gap-1   border-2 ${
                                    keebShareCategory === "POSTS"
                                        ? "border-green-500"
                                        : "border-mediumGray"
                                } rounded-md   py-2 pl-6 text-green-500  `}
                                onClick={() => setKeebShareCategory("POSTS")}
                            >
                                <span className="profile-select-button-text">
                                    My Posts
                                </span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="profile-select-button-arrow w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M15.0001 10.5001V15.0001M15.0001 15.0001H10.5001M15.0001 15.0001L9.00024 9M7.20024 20H16.8002C17.9203 20 18.4804 20 18.9082 19.782C19.2845 19.5903 19.5905 19.2843 19.7823 18.908C20.0002 18.4802 20.0002 17.9201 20.0002 16.8V7.2C20.0002 6.0799 20.0002 5.51984 19.7823 5.09202C19.5905 4.71569 19.2845 4.40973 18.9082 4.21799C18.4804 4 17.9203 4 16.8002 4H7.20024C6.08014 4 5.52009 4 5.09226 4.21799C4.71594 4.40973 4.40998 4.71569 4.21823 5.09202C4.00024 5.51984 4.00024 6.07989 4.00024 7.2V16.8C4.00024 17.9201 4.00024 18.4802 4.21823 18.908C4.40998 19.2843 4.71594 19.5903 5.09226 19.782C5.52009 20 6.08014 20 7.20024 20Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="profile-select-button-square w-2"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <rect
                                        x="4"
                                        y="4"
                                        width="16"
                                        height="16"
                                        rx="2"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                    {toggle === "KEEBTYPE" && (
                        <div className="mt-10 flex  w-full justify-evenly border-2 border-mediumGray p-5">
                            <button
                                className={`profile-select-button flex items-center gap-1   border-2 ${
                                    keebTypeCategory === "STATS"
                                        ? "border-green-500"
                                        : "border-mediumGray"
                                } rounded-md   py-2 pl-6 text-green-500  `}
                                onClick={() => setKeebTypeCategory("STATS")}
                            >
                                <span className="profile-select-button-text">
                                    Stats
                                </span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="profile-select-button-arrow w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M15.0001 10.5001V15.0001M15.0001 15.0001H10.5001M15.0001 15.0001L9.00024 9M7.20024 20H16.8002C17.9203 20 18.4804 20 18.9082 19.782C19.2845 19.5903 19.5905 19.2843 19.7823 18.908C20.0002 18.4802 20.0002 17.9201 20.0002 16.8V7.2C20.0002 6.0799 20.0002 5.51984 19.7823 5.09202C19.5905 4.71569 19.2845 4.40973 18.9082 4.21799C18.4804 4 17.9203 4 16.8002 4H7.20024C6.08014 4 5.52009 4 5.09226 4.21799C4.71594 4.40973 4.40998 4.71569 4.21823 5.09202C4.00024 5.51984 4.00024 6.07989 4.00024 7.2V16.8C4.00024 17.9201 4.00024 18.4802 4.21823 18.908C4.40998 19.2843 4.71594 19.5903 5.09226 19.782C5.52009 20 6.08014 20 7.20024 20Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="profile-select-button-square w-2"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <rect
                                        x="4"
                                        y="4"
                                        width="16"
                                        height="16"
                                        rx="2"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            <button
                                className={`profile-select-button flex items-center gap-1   border-2 ${
                                    keebTypeCategory === "KEEBS"
                                        ? "border-green-500"
                                        : "border-mediumGray"
                                } rounded-md   py-2 pl-6 text-green-500  `}
                                onClick={() => setKeebTypeCategory("KEEBS")}
                            >
                                <span className="profile-select-button-text">
                                    My Keebs
                                </span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="profile-select-button-arrow w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M15.0001 10.5001V15.0001M15.0001 15.0001H10.5001M15.0001 15.0001L9.00024 9M7.20024 20H16.8002C17.9203 20 18.4804 20 18.9082 19.782C19.2845 19.5903 19.5905 19.2843 19.7823 18.908C20.0002 18.4802 20.0002 17.9201 20.0002 16.8V7.2C20.0002 6.0799 20.0002 5.51984 19.7823 5.09202C19.5905 4.71569 19.2845 4.40973 18.9082 4.21799C18.4804 4 17.9203 4 16.8002 4H7.20024C6.08014 4 5.52009 4 5.09226 4.21799C4.71594 4.40973 4.40998 4.71569 4.21823 5.09202C4.00024 5.51984 4.00024 6.07989 4.00024 7.2V16.8C4.00024 17.9201 4.00024 18.4802 4.21823 18.908C4.40998 19.2843 4.71594 19.5903 5.09226 19.782C5.52009 20 6.08014 20 7.20024 20Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="profile-select-button-square w-2"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <rect
                                        x="4"
                                        y="4"
                                        width="16"
                                        height="16"
                                        rx="2"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* {toggle === "KEEBSHOP" &&
                        keebShopCategory === "FAVORITES" && (
                            <DisplayFavoriteListings
                                userId={sessionData.user.id}
                            />
                        )}
                    {toggle === "KEEBSHOP" &&
                        keebShopCategory === "LISTINGS" && (
                            <ManageListings userId={sessionData.user.id} />
                        )}
                    {toggle === "KEEBSHOP" && keebShopCategory === "OFFERS" && (
                        <DisplayOffers userId={sessionData.user.id} />
                    )}
                    {toggle === "KEEBSHOP" &&
                        keebShopCategory === "REVIEWS" && (
                            <DisplayProfileReviews
                                userId={sessionData.user.id}
                            />
                        )}
                    {toggle === "KEEBSHOP" &&
                        keebShopCategory === "TRANSACTIONS" && (
                            <DisplayTransactions userId={sessionData.user.id} />
                        )} */}
                    {toggle === "KEEBSHARE" &&
                        keebShareCategory === "FAVORITES" && (
                            <DisplayFavoritePosts
                                userId={sessionData.user.id}
                            />
                        )}
                    {toggle === "KEEBSHARE" &&
                        keebShareCategory === "POSTS" && (
                            <ManagePosts userId={sessionData.user.id} />
                        )}

                    {toggle === "KEEBTYPE" && keebTypeCategory === "STATS" && (
                        <DisplayAllGameStatsCheck
                            userId={sessionData.user.id}
                        />
                    )}
                    {toggle === "KEEBTYPE" && keebTypeCategory === "KEEBS" && (
                        <DisplayProfileKeebs userId={sessionData.user.id} />
                    )}
                </div>
            </div>

            <div className="mt-96 w-full">
                <Footer />
            </div>
        </>
    ) : (
        <div className="mt-40 rounded-md bg-darkGray p-10">
            <div className="flex items-end gap-2">
                <h1 className="text-2xl text-green-500">
                    Sign in to use this page
                </h1>
                <Image alt="keebo" src={keebo} className="h-12 w-12" />
            </div>
            <div className=" flex justify-center">
                <button
                    className="text-md keeb-share-preview-button mt-5 flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                    style={{
                        boxShadow: "0 0 20px #22C55E",
                    }}
                    onClick={() => void signIn()}
                >
                    <svg
                        className="keeb-share-preview-button-arrow w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                        ></path>
                    </svg>
                    <span className="keeb-share-preview-button-text">
                        {`Let's Go `}
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="keeb-share-preview-button-circle w-2"
                        viewBox="0 0 32 32"
                    >
                        <circle cx="16" cy="16" r="16" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
