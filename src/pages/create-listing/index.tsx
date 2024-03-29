import { motion } from "framer-motion";
import { useState } from "react";
import { useSession } from "next-auth/react";
import TitleScripts from "~/components/TitleScripts";
import Custom404 from "../404";
import CreateListing from "~/components/KeebShop/CreateListing/Create";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";

export default function CreateListingAgreement() {
    const { data: session } = useSession();

    const accessDenied = !session || !session.user.isVerified;

    const [rulesAgreed, setRulesAgreed] = useState(false);
    const [preventScamsAgreed, setPreventScamsAgreed] = useState(false);
    const [showCreate, setShowCreate] = useState(false);

    const handleShowCreate = () => {
        setShowCreate(true);
        setPreventScamsAgreed(false);
        setRulesAgreed(false);
    };

    if (accessDenied) {
        return <Custom404 />;
    }

    // TODO Setup modals for rules, scam prevention -- create keeby rules pool themed and we will link them

    return (
        <>
            <div className="matrix-full-screen fixed left-0 right-0 bottom-0 top-0 opacity-50  ">
                <video className="-z-10 w-full" autoPlay loop muted>
                    <source
                        src="/Videos/matrix-fade-green.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="z-10 flex w-full flex-col items-center justify-center">
                {showCreate ? (
                    <CreateListing setShowCreate={setShowCreate} />
                ) : (
                    <>
                        <div className="z-10 flex justify-center text-5xl">
                            <TitleScripts page={"createListing"} />
                        </div>
                        <div className="z-10 mt-10 flex w-1/2 flex-col gap-10 rounded-2xl bg-keebyGray bg-opacity-90 p-10">
                            <div className="flex items-end text-2xl text-green-500 gap-10">
                                <Image
                                    alt="keebo"
                                    src={keebo}
                                    className="h-16 w-16"
                                />
                                <h1>
                                    Please read and accept our guidelines along
                                    with scam prevention tips before listing
                                </h1>

                            </div>

                            <div className=" flex  w-full justify-evenly  gap-10">
                                <div className="flex items-center gap-5 ">
                                    <motion.button
                                        whileHover={{
                                            scale: 1.1,
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        className=" rounded-xl border-2 border-black bg-black px-6 py-2 text-green-500 hover:border-green-500 hover:bg-keebyGray"
                                    >
                                        Keeby Rules
                                    </motion.button>

                                    <input
                                        type="checkbox"
                                        className=" h-7 w-7 cursor-pointer rounded-md border-2 border-green-500 hover:bg-black hover:bg-opacity-30"
                                        onClick={() =>
                                            setRulesAgreed(!rulesAgreed)
                                        }
                                    />
                                </div>

                                <div className="flex items-center gap-5 ">
                                    <motion.button
                                        whileHover={{
                                            scale: 1.1,
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        className=" rounded-xl border-2 border-black bg-black px-6 py-2 text-green-500 hover:border-green-500 hover:bg-keebyGray"
                                    >
                                        Preventing Scams
                                    </motion.button>
                                    <input
                                        type="checkbox"
                                        name="Preventing Scams"
                                        className=" h-7 w-7 cursor-pointer rounded-md border-2 border-green-500 hover:bg-black hover:bg-opacity-30"
                                        onClick={() =>
                                            setPreventScamsAgreed(
                                                !preventScamsAgreed
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            {preventScamsAgreed && rulesAgreed ? (
                                <div className=" flex justify-center">
                                    <motion.button
                                        className=" rounded-xl border-2 border-black bg-black px-6 py-2 text-green-500 hover:border-green-500 hover:bg-keebyGray"
                                        onClick={handleShowCreate}
                                    >
                                        Access Granted
                                    </motion.button>
                                </div>
                            ) : (
                                <div className=" flex justify-center">
                                    <div className=" rounded-xl border-2 border-[#616161] bg-darkGray px-6 py-2 text-blackAlternative hover:bg-darkGray">
                                        Access Denied
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
