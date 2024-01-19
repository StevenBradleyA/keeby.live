import { api } from "~/utils/api";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { uploadFileToS3 } from "~/utils/aws";
import { useSession } from "next-auth/react";
import Image from "next/image";
import toast from "react-hot-toast";
import TitleScripts from "~/components/TitleScripts";
import { useRouter } from "next/router";
import Custom404 from "../404";
import CreateListing from "~/components/KeebShop/CreateListing/Create";

interface ErrorsObj {
    image?: string;
    imageExcess?: string;
    imageShortage?: string;
    imageLarge?: string;
    text?: string;
    title?: string;
    priceNone?: string;
    priceExcess?: string;
}

interface Image {
    link: string;
}

interface ListingData {
    userId: string;
    title: string;
    price: number;
    text: string;
    preview: number;
    images: Image[];
}

export default function CreateListingAgreement() {
    // instead of directing to page it might be nice to have pricing/scams in modals so they don't have to navigate back to page
    //todo what about filters and tags when creating a listing... Maybe an array with tags?
    // todo change redirect to my listings page??? or shoppp??
    // todo admin ability to delete other listings
    // todo maybe listings needs an isActive boolean so when when sold the photos can be auto deleted or kept for a lil bit idk
    //todo  price going to have to save in pennies i think but we can do that later with stripe

    const { data: session } = useSession();
    const ctx = api.useContext();
    const router = useRouter();

    const accessDenied = !session || !session.user.isVerified;

    const [rulesAgreed, setRulesAgreed] = useState(false);
    const [preventScamsAgreed, setPreventScamsAgreed] = useState(false);
    const [showCreate, setShowCreate] = useState(false);

    if (accessDenied) {
        return <Custom404 />;
    }
    // create model for pricing and how to prevent scams that just displays the page that already exists
    return (
        <>
            <TitleScripts page={"createListing"} />
            {showCreate ? (
                <CreateListing />
            ) : (
                <div className="mb-32 mt-10 w-2/3 rounded-2xl bg-keebyGray p-10 ">
                    <div className="flex justify-center text-2xl text-green-500">
                        Please review and agree to our guidelines and scam
                        prevention tips before listing
                    </div>
                    <div className="mt-10 flex justify-center gap-10">
                        <div className="flex flex-col items-center gap-5 ">
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
                                onClick={() => setRulesAgreed(!rulesAgreed)}
                            />
                        </div>

                        <div className="flex flex-col items-center gap-5 ">
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
                                    setPreventScamsAgreed(!preventScamsAgreed)
                                }
                            />
                        </div>
                    </div>
                    {preventScamsAgreed && rulesAgreed ? (
                        <div className="mt-10 flex justify-center">
                            <motion.button
                                className=" rounded-xl border-2 border-black bg-black px-6 py-2 text-green-500 hover:border-green-500 hover:bg-keebyGray"
                                onClick={() => setShowCreate(true)}
                            >
                                Access Granted
                            </motion.button>
                        </div>
                    ) : (
                        <div className="mt-10 flex justify-center">
                            <div className=" rounded-xl border-2 border-[#616161] bg-darkGray px-6 py-2 text-blackAlternative hover:bg-darkGray">
                                Access Denied
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
