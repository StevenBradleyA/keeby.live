import { Canvas } from "@react-three/fiber";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RotatingSphere from "~/components/Profile/ThreeScenes/RotatingSphere";
import { getCookies, setCookie } from "cookies-next";
import defaultProfile from "@public/Profile/profile-default.png";
import keebyLiveTitle from "@public/Profile/keebylive-title.png";
import gridFunnel from "@public/Profile/profile-idea.png";
import HackermanConsoleCommands from "~/components/Profile/Hackerman";
import computerShare from "@public/Profile/computer-share.png";
import computerShop from "@public/Profile/computer-shop.png";
import computerType from "@public/Profile/computer-type.png";
import MainFooter from "~/components/Footer";
import ManageListings from "~/components/KeebShop/ManageListings";
import ManagePosts from "~/components/KeebShare/ManagePosts";
import DisplayFavoriteListings from "~/components/KeebShop/DisplayFavoriteListings";
import DisplayFavoritePosts from "~/components/KeebShare/DisplayFavoritePosts";
import DisplayProfileKeebs from "~/components/Profile/Keeb/DisplayKeebs";
import DisplayAllGameStats from "~/components/KeebType/GameStats/displayAllGameStatsCheck";
import DisplayAllGameStatsCheck from "~/components/KeebType/GameStats/displayAllGameStatsCheck";
import UpdateUserTag from "~/components/Profile/User/Update/Tag";
import ModalDialog from "~/components/Modal";
import UpdateProfile from "~/components/Profile/User/Update/updateProfile";

export default function UserProfile() {
    // mdn digest() -- might be useful for us here
    // npm install three @types/three @react-three/fiber

    // todo add notifcations here for comments, offers, likes etc...

    const { data: sessionData } = useSession();

    const cookies = getCookies();

    const [isRetro, setIsRetro] = useState<boolean>(false);
    const [toggle, setToggle] = useState<string>("KEEBSHOP");
    const [isOpen, setIsOpen] = useState<boolean>(false);

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

    const [title, setTitle] = useState("");

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
            <div className="flex w-full flex-col px-10 font-retro text-green-500 desktop:w-3/4 desktop:px-0 ">
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
                            <button
                                className="flex flex-col leading-none"
                                onClick={openModal}
                            >
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

                        <ModalDialog isOpen={isOpen} onClose={closeModal}>
                            <UpdateProfile userId={sessionData.user.id} />
                        </ModalDialog>

                        <Image
                            alt="profile matrix"
                            src={keebyLiveTitle}
                            className="png-green my-10 w-[80%] "
                        />
                        <div className="mb-2 flex items-center justify-between">
                            <UpdateUserTag
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
                    <div className="mt-10 flex  w-full justify-evenly border-2 border-[#616161] p-5">
                        <button
                            className={`border-2 ${
                                keebShopCategory === "FAVORITES"
                                    ? "border-green-500"
                                    : "border-[#616161]"
                            } rounded-lg bg-darkGray  px-6 py-2 text-green-500 hover:border-green-500 `}
                            onClick={() => setKeebShopCategory("FAVORITES")}
                        >
                            Favorites
                        </button>
                        <button
                            className={`border-2 ${
                                keebShopCategory === "LISTINGS"
                                    ? "border-green-500"
                                    : "border-[#616161]"
                            } rounded-lg bg-darkGray  px-6 py-2 text-green-500 hover:border-green-500 `}
                            onClick={() => setKeebShopCategory("LISTINGS")}
                        >
                            My Listings
                        </button>
                        <button
                            className={`border-2 ${
                                keebShopCategory === "OFFERS"
                                    ? "border-green-500"
                                    : "border-[#616161]"
                            } rounded-lg bg-darkGray  px-6 py-2 text-green-500 hover:border-green-500 `}
                            onClick={() => setKeebShopCategory("OFFERS")}
                        >
                            Offers
                        </button>
                        <button
                            className={`border-2 ${
                                keebShopCategory === "REVIEWS"
                                    ? "border-green-500"
                                    : "border-[#616161]"
                            } rounded-lg bg-darkGray  px-6 py-2 text-green-500 hover:border-green-500 `}
                            onClick={() => setKeebShopCategory("REVIEWS")}
                        >
                            Reviews
                        </button>
                    </div>
                )}
                {toggle === "KEEBSHARE" && (
                    <div className="mt-10 flex  w-full justify-evenly border-2 border-[#616161] p-5">
                        <button
                            className={`border-2 ${
                                keebShareCategory === "FAVORITES"
                                    ? "border-green-500"
                                    : "border-[#616161]"
                            } rounded-lg bg-darkGray  px-6 py-2 text-green-500 hover:border-green-500 `}
                            onClick={() => setKeebShareCategory("FAVORITES")}
                        >
                            Favorites
                        </button>
                        <button
                            className={`border-2 ${
                                keebShareCategory === "POSTS"
                                    ? "border-green-500"
                                    : "border-[#616161]"
                            } rounded-lg bg-darkGray  px-6 py-2 text-green-500 hover:border-green-500 `}
                            onClick={() => setKeebShareCategory("POSTS")}
                        >
                            My Posts
                        </button>
                    </div>
                )}
                {toggle === "KEEBTYPE" && (
                    <div className="mt-10 flex  w-full justify-evenly border-2 border-[#616161] p-5">
                        <button
                            className={`border-2 ${
                                keebTypeCategory === "STATS"
                                    ? "border-green-500"
                                    : "border-[#616161]"
                            } rounded-lg bg-darkGray  px-6 py-2 text-green-500 hover:border-green-500 `}
                            onClick={() => setKeebTypeCategory("STATS")}
                        >
                            Stats
                        </button>

                        <button
                            className={`border-2 ${
                                keebTypeCategory === "KEEBS"
                                    ? "border-green-500"
                                    : "border-[#616161]"
                            } rounded-lg bg-darkGray  px-6 py-2 text-green-500 hover:border-green-500 `}
                            onClick={() => setKeebTypeCategory("KEEBS")}
                        >
                            My Keebs
                        </button>
                    </div>
                )}

                {toggle === "KEEBSHOP" && keebShopCategory === "LISTINGS" && (
                    <ManageListings userId={sessionData.user.id} />
                )}
                {toggle === "KEEBSHOP" && keebShopCategory === "FAVORITES" && (
                    <DisplayFavoriteListings userId={sessionData.user.id} />
                )}

                {toggle === "KEEBSHARE" && keebShareCategory === "POSTS" && (
                    <ManagePosts userId={sessionData.user.id} />
                )}

                {toggle === "KEEBSHARE" &&
                    keebShareCategory === "FAVORITES" && (
                        <DisplayFavoritePosts userId={sessionData.user.id} />
                    )}

                {toggle === "KEEBTYPE" && keebTypeCategory === "STATS" && (
                    // display all wpm for each game mode
                    // be able to switch keebs and game modes to track progress...
                    // user re chart to display all games with a trend line
                    // total games played rank info etc
                    <DisplayAllGameStatsCheck userId={sessionData.user.id} />
                )}
                {toggle === "KEEBTYPE" && keebTypeCategory === "KEEBS" && (
                    // <div className="flex flex-wrap gap-10">
                    //     {keebData?.map((keeb, i) => (
                    //         <DisplayKeebs key={i} keeb={keeb} />
                    //     ))}
                    // </div>
                    <DisplayProfileKeebs userId={sessionData.user.id} />
                )}

                <MainFooter />
            </div>
        )
    );
}
