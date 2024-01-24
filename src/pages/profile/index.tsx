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
import Custom404 from "../404";
import HackermanConsoleCommands from "~/components/Profile/Hackerman";

export default function UserProfile() {
    // todo consider hashing or some simple change that doesn't display the correct userID
    // todo does it really matter if this source code is avail...
    // todo could make a simple button to turn off scanlines
    // mdn digest() -- might be useful for us here
    // npm install three @types/three @react-three/fiber
    // todo don't want the userId in the url personal can just grab from session and we will have a separate profile for viewing other users.
    // TODO Listing might need a purchased by userId category
    // that way it is easy to see who has purchased and query for that
    //todo set cookies for retro theme plus make separate button

    // todo ssr or static generation so refresh doesnt show 404 page? we need to show 404 if not signed in

    const { data: sessionData } = useSession();
    const { data: keebData } = api.keeb.getAll.useQuery();

    const cookies = getCookies();

    const [isRetro, setIsRetro] = useState<boolean>(true);
    const [toggle, setToggle] = useState<string>("KeebType");

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
            <div className="flex w-3/4 flex-col  font-retro text-green-500 ">
                {isRetro && <div className="retro-scanlines"></div>}

                <div className="flex gap-20">
                    <div className="flex w-1/2 flex-col">
                        <h1 className="font-titillium text-3xl ">
                            {sessionData.user.username}
                        </h1>
                        <div className=" mt-2 border-b-2 border-[#616161] "></div>
                        <div className="my-2 flex justify-between">
                            <h1 className="moving-title">{title}</h1>
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

                        <div className="h-80  border-2 border-[#616161] overflow-hidden ">
                            <HackermanConsoleCommands/>
                        </div>
                        {/* this needs to be cool moving text */}
                    </div>
                    <div className="flex w-1/2 flex-col">
                        <button
                            className="flex items-center justify-end gap-2"
                            onClick={handleRetroMode}
                        >
                            {/* <button onClick={handleRetroMode}>
                               
                            </button> */}

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
                                <div className="flex flex-col text-xs ">
                                    <h3 className="leading-none">Future</h3>
                                    <h3 className="leading-none">to the</h3>
                                    <h3 className="leading-none">Future</h3>
                                </div>
                            ) : (
                                <div className="flex flex-col text-xs ">
                                    <h3 className="leading-none">Retro</h3>
                                    <h3 className="leading-none">Retro</h3>
                                    <h3 className="leading-none">Retro</h3>
                                </div>
                            )}
                        </button>

                        <div className="h-[400px] border-2 border-[#616161] ">
                            <Canvas
                                className="h-full w-full cursor-pointer"
                                // camera={{ position: [0, 400, 200] }}
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

                        <p className="mt-10 text-2xl">
                            THOCK{" "}
                            <span className="relative bottom-3">
                                _____________________
                            </span>{" "}
                            CLACK{" "}
                            <span className="relative bottom-3">________</span>{" "}
                            POP
                        </p>
                        <p className="mt-2 text-2xl">
                            THOCK{" "}
                            <span className="relative bottom-3">_________</span>{" "}
                            CLACK{" "}
                            <span className="relative bottom-3">_________</span>{" "}
                            POP{" "}
                            <span className="relative bottom-3">
                                __________
                            </span>
                        </p>
                        <p className=" mt-4 text-2xl">
                            THOCK{" "}
                            <span className="relative bottom-3">___ </span>{" "}
                            CLACK{" "}
                            <span className="relative bottom-3">
                                __________________________
                            </span>{" "}
                            POP
                        </p>

                        <div className="flex ">
                            <div className="mt-6 flex items-center gap-5">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 100 100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="#616161"
                                    strokeWidth="10"
                                >
                                    <circle cx="50" cy="50" r="40" />
                                </svg>
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 100 100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#616161"
                                >
                                    <circle cx="50" cy="50" r="40" />
                                </svg>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 100 100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="#616161"
                                    strokeWidth="10"
                                >
                                    <circle cx="50" cy="50" r="40" />
                                </svg>
                                <p className="relative bottom-2">
                                    _____________________________
                                </p>
                                <div className="flex flex-col text-[10px]">
                                    <h3>Its not about the cost of a board</h3>
                                    <h3> its about how it makes you feel</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-44 flex justify-center gap-10 border-2 ">
                    <Image
                        src={errorComputer}
                        alt="computer"
                        width={200}
                        height={200}
                        className="png-green"
                    />
                    <Image
                        src={futureComputer}
                        alt="computer"
                        width={200}
                        height={200}
                        className="png-green"
                    />
                    <Image
                        src={errorComputer}
                        alt="computer"
                        width={200}
                        height={200}
                        className="png-green"
                    />
                </div>
                <div className=" flex justify-center gap-5">
                    <motion.button
                        onClick={() => setToggle("KeebType")}
                        className="rounded-2xl bg-black px-6 py-2"
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        KeebType
                    </motion.button>
                    <motion.button
                        onClick={() => setToggle("KeebShop")}
                        className="rounded-2xl bg-black px-6 py-2"
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        KeebShop
                    </motion.button>
                    <motion.button
                        onClick={() => setToggle("KeebShare")}
                        className="rounded-2xl bg-black px-6 py-2"
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        KeebShare
                    </motion.button>
                </div>
                {toggle === "KeebType" && (
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
                )}

                {toggle === "KeebShop" && (
                    <div className="mb-20 mt-10 flex flex-col items-center">
                        {sessionData.user.isVerified ? (
                            <div>You are verified :D</div>
                        ) : (
                            <>
                                <div>
                                    To list a keeb you need to get verified as a
                                    seller
                                </div>
                                <motion.button
                                    whileHover={{
                                        scale: 1.1,
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="rounded-2xl bg-black px-6 py-2"
                                >
                                    <Link
                                        href="/verification"
                                        aria-label="verification"
                                    >
                                        {`Let's go`}
                                    </Link>
                                </motion.button>
                            </>
                        )}
                        <motion.button
                            whileHover={{
                                scale: 1.1,
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-10 rounded-2xl bg-black px-6 py-2"
                        >
                            <Link
                                href="/manage-listings"
                                aria-label="manage listings"
                            >
                                {`My Listings`}
                            </Link>
                        </motion.button>
                        <div className="mt-10">
                            MY Seller Reputation aka reviews with average star
                            rating
                        </div>
                        <div> Lets add purchase history here</div>
                        <div>ability to leave reviews on these purchases</div>
                        <DisplayReviews userId={sessionData.user.id} />
                        Ability to leave reviews
                    </div>
                )}

                {toggle === "KeebShare" && (
                    <div className="mb-20 mt-10 flex flex-col items-center">
                        <div>Internet Points counter --total likes</div>

                        <motion.button
                            whileHover={{
                                scale: 1.1,
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-10 rounded-2xl bg-black px-6 py-2"
                        >
                            <Link
                                href="/manage-posts"
                                aria-label="manage posts"
                            >
                                {`Manage my posts`}
                            </Link>
                        </motion.button>
                    </div>
                )}
            </div>
        )
    );
}
