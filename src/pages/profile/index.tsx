import { api } from "~/utils/api";
import { Canvas } from "@react-three/fiber";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import TitleScripts from "~/components/TitleScripts";
import RotatingSphere from "~/components/Profile/ThreeScenes/RotatingSphere";
import DisplayKeebs from "~/components/Profile/Keeb/DisplayKeeb";
import ModalDialog from "~/components/Modal";
import CreateKeeb from "~/components/Profile/Keeb/CreateKeeb";
import ManageKeeb from "~/components/Profile/Keeb/ManageKeeb";
import RotatingKeeb from "~/components/Profile/ThreeScenes/RotatingKeeb";
import { getCookies, setCookie } from "cookies-next";
import { motion } from "framer-motion";
import Link from "next/link";
import DisplayReviews from "~/components/Reviews/DisplayReviews";
import keebo from "@public/Nav/bmo-test.jpg";
import keebyLiveTitle from "@public/Profile/keebylive-title.png";
import futureComputer from "@public/Profile/future-future.png";
import errorComputer from "@public/Profile/error-error-error.png";
import gridFunnel from "@public/Profile/profile-idea.png";
import Custom404 from "../404";

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

    const { data: sessionData } = useSession();
    const { data: keebData } = api.keeb.getAll.useQuery();

    const cookies = getCookies();

    const [isRetro, setIsRetro] = useState<boolean>(true);
    const [toggle, setToggle] = useState<string>("KeebType");

    const [isCreateKeebModalOpen, setIsCreateKeebModalOpen] =
        useState<boolean>(false);

    const [isManageKeebModalOpen, setIsManageKeebModalOpen] =
        useState<boolean>(false);

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

    // className=" mt-5 p-5 outline outline-1 outline-green-500"

    //     <svg
    //     width="20"
    //     height="20"
    //     viewBox="0 0 100 100"
    //     xmlns="http://www.w3.org/2000/svg"
    //     fill="white"
    // >
    //     <circle cx="50" cy="50" r="40"  />
    // </svg>

    return (
        sessionData &&
        sessionData.user && (
            <div className="flex w-3/4 flex-col font-retro text-green-500 ">
                {isRetro && <div className="retro-scanlines"></div>}
                <div className="flex justify-center">
                    <TitleScripts page="profile" />
                </div>
                {/* <div className="flex justify-end">
                <button
                    className="rounded-2xl bg-black px-6 py-2"
                    onClick={handleRetroMode}
                >
                    {`${isRetro ? "to the future" : "hack me back in time"} `}
                </button>
            </div> */}
                <div className="flex gap-20">
                    <div className="flex w-1/2 flex-col">
                        <h1 className="font-titillium text-3xl ">
                            {sessionData.user.username}
                        </h1>
                        <div className=" mt-2 border-b-2 border-white "></div>
                        <div className="my-2 flex justify-between">
                            <h1>profile tittle</h1>
                            <div>graphic here</div>
                        </div>
                        <Image
                            alt="profile matrix"
                            src={gridFunnel}
                            className=" h-40 border-2 border-white object-cover "
                        />
                        <div className="my-5 flex justify-between">
                            <h1>profile tittle</h1>
                            <div>graphic here</div>
                        </div>

                        <Image
                            alt="profile matrix"
                            src={keebyLiveTitle}
                            className="png-green mb-5 w-[80%] "
                        />

                        <div className="h-80  border-2 border-white ">
                            <Canvas
                                className="h-full w-full cursor-pointer"
                                // camera={{ position: [0, 400, 200] }}
                                camera={{ position: [4, 0, 1] }}
                            >
                                <ambientLight intensity={0.5} />
                                <pointLight position={[10, 10, 10]} />
                                <RotatingSphere />
                                {/* <RotatingKeeb /> */}
                            </Canvas>
                        </div>
                    </div>
                    <div className="flex w-1/2 flex-col">
                        <button
                            className="flex items-center justify-end gap-2"
                            onClick={handleRetroMode}
                        >
                            {/* <button onClick={handleRetroMode}>
                                <Image
                                    alt="style button"
                                    src={
                                        isRetro ? futureComputer : errorComputer
                                    }
                                    className="png-green w-14  "
                                />
                            </button> */}

                            <div className="flex gap-1 ">
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 100 100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="white"
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
                                    stroke="white"
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
                                    stroke="white"
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
                                fill="white"
                            >
                                <path d="m34,256l26.2,26.2c108,108 283.7,108 391.7,0l26.1-26.2-26.2-26.2c-108-108-283.7-108-391.7,0l-26.1,26.2zm222,126.2c-75.8,0-151.6-28.9-209.3-86.6l-32.9-32.9c-3.7-3.7-3.7-9.7 0-13.5l32.9-32.9c115.4-115.4 303.2-115.4 418.6,0l32.9,32.9c3.7,3.7 3.7,9.7 0,13.5l-32.9,32.9c-57.7,57.7-133.5,86.6-209.3,86.6z" />
                                <path d="m256,183.5c-40,0-72.5,32.5-72.5,72.5s32.5,72.5 72.5,72.5c40,0 72.5-32.5 72.5-72.5s-32.5-72.5-72.5-72.5zm0,164c-50.5,0-91.5-41.1-91.5-91.5 0-50.5 41.1-91.5 91.5-91.5s91.5,41.1 91.5,91.5c0,50.5-41,91.5-91.5,91.5z" />
                            </svg>
                            {isRetro ? (
                                <div className="flex flex-col text-xs">
                                    <h1>Future</h1>
                                    <h1>to the</h1>
                                    <h1>Future</h1>
                                </div>
                            ) : (
                                <div className="flex flex-col text-xs">
                                    <h1>Retro</h1>
                                    <h1>Retro</h1>
                                    <h1>Retro</h1>
                                </div>
                            )}
                        </button>

                        <Image
                            alt="profile"
                            src={
                                sessionData.user.profile
                                    ? sessionData.user.profile
                                    : keebo
                            }
                            width={800}
                            height={800}
                            priority={true}
                            className=" mt-2 h-[400px] w-[800px] border-2 border-white object-cover"
                        />

                        <h1 className=" font-titillium text-9xl">PROFILE</h1>
                    </div>
                </div>

                <div className=" mb-10 mt-96 flex w-full justify-center gap-10">
                    <div className="flex flex-col">
                        {sessionData.user.profile ? (
                            <Image
                                alt="profile"
                                src={sessionData.user.profile}
                                width={300}
                                height={300}
                                priority={true}
                            />
                        ) : (
                            <Image
                                alt="profile"
                                src={keebo}
                                width={300}
                                height={300}
                                priority={true}
                            />
                        )}
                        <div>tag selection dropdown here</div>
                    </div>
                </div>

                <div className="flex justify-center gap-5">
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
