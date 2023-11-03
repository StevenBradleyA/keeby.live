import { api } from "~/utils/api";
import { Canvas } from "@react-three/fiber";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import TitleScripts from "~/components/TitleScripts";
import keebo from "../../../public/Nav/bmo-test.jpg";
import RotatingSphere from "~/components/Profile/ThreeScenes/RotatingSphere";
import DisplayKeebs from "~/components/Profile/Keeb/DisplayKeeb";
import ModalDialog from "~/components/Modal";
import CreateKeeb from "~/components/Profile/Keeb/CreateKeeb";
import ManageKeeb from "~/components/Profile/Keeb/ManageKeeb";
import RotatingKeeb from "~/components/Profile/ThreeScenes/RotatingKeeb";
import { getCookies, setCookie } from "cookies-next";
import { motion } from "framer-motion";
import Link from "next/link";

export default function UserProfile() {
    // todo consider hashing or some simple change that doesn't display the correct userID
    // todo does it really matter if this source code is avail...
    // todo could make a simple button to turn off scanlines
    // mdn digest() -- might be useful for us here
    // npm install three @types/three @react-three/fiber
    // todo don't want the userId in the url personal can just grab from session and we will have a separate profile for viewing other users.

    //todo set cookies for retro theme plus make separate button

    const { data: sessionData } = useSession();
    const { data: keebData, isLoading } = api.keeb.getAll.useQuery();
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

    return (
        sessionData && (
            <div className="flex w-3/4 flex-col font-retro text-green-500">
                {isRetro && <div className="retro-scanlines"></div>}
                <div className="flex justify-center">
                    <TitleScripts page="profile" />
                </div>
                <div className="flex justify-end">
                    <button
                        className="rounded-2xl bg-black px-6 py-2"
                        onClick={handleRetroMode}
                    >
                        {`${
                            isRetro ? "to the future" : "hack me back in time"
                        } `}
                    </button>
                </div>

                <div className="mb-10 flex w-full justify-center gap-10">
                    <div className="flex flex-col">
                        {sessionData && sessionData.user.profile ? (
                            <Image
                                alt="profile"
                                src={sessionData?.user.profile}
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
                        <div className=" mt-5 p-5 outline outline-1 outline-green-500">
                            {sessionData?.user.username}
                        </div>
                        <div>tag selection dropdown here</div>
                    </div>

                    <div className="flex w-1/3 flex-col">
                        <div className="h-72 outline outline-1 outline-green-500 ">
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
                        <div className=" p-10 outline outline-1 outline-green-500">
                            hello moving text
                        </div>
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
