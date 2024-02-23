import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";

export default function CreateListingModal() {
    const { data: sessionData } = useSession();
    const isVerifiedSeller = sessionData?.user.isVerified === true;

    return (
        <>
            {sessionData === null ? (
                <div className="p-2">
                    <div className="flex items-end gap-2">
                        <h1 className="text-2xl text-green-500">
                            Sign in to list your keeb
                        </h1>
                        <Image alt="keebo" src={keebo} className="h-12 w-12" />
                    </div>
                    <div className="mt-5 flex justify-center">
                        <motion.button
                            whileHover={{
                                scale: 1.1,
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="  rounded-xl border-2 border-black bg-black px-6 py-2 text-green-500 hover:border-green-500 hover:bg-keebyGray"
                            onClick={() => void signIn()}
                        >
                            {`Let's go`}
                        </motion.button>
                    </div>
                </div>
            ) : (
                <div className="p-2">
                    <div className="flex items-end gap-2">
                        <h1 className="text-2xl text-green-500">
                            Ready to sell your keeb?
                        </h1>
                        <Image alt="keebo" src={keebo} className="h-12 w-12" />
                    </div>
                    <div className="flex justify-center">
                        <Link
                            href={
                                isVerifiedSeller
                                    ? "/create-listing"
                                    : "/seller-verify"
                            }
                            aria-label="create listing"
                        >
                            <motion.button
                                whileHover={{
                                    scale: 1.1,
                                }}
                                whileTap={{ scale: 0.95 }}
                                className=" mt-5 rounded-xl border-2 border-black bg-black px-6 py-2 text-green-500 hover:border-green-500 hover:bg-keebyGray"
                            >
                                {`Let's go`}
                            </motion.button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
