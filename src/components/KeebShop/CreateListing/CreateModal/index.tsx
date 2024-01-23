import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CreateListingModal() {
    const { data: sessionData } = useSession();
    const isVerifiedSeller = sessionData?.user.isVerified === true;

    return (
        <>
            {sessionData === null ? (
                <div>
                    <div className="text-3xl text-green-500">
                        Sign in to list your keyboard for sale!
                    </div>
                    <div className="flex justify-center">
                        <motion.button
                            whileHover={{
                                scale: 1.1,
                            }}
                            whileTap={{ scale: 0.95 }}
                            className=" mt-5 rounded-xl border-2 border-black bg-black px-6 py-2 text-green-500 hover:border-green-500 hover:bg-keebyGray"
                            onClick={() => void signIn()}
                        >
                            {`Let's go`}
                        </motion.button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className=" p-5 text-3xl  text-green-500 ">
                        Want to List Your Keyboard for Sale?
                    </div>
                    <div className="flex justify-center">
                        <Link
                            href={
                                isVerifiedSeller
                                    ? "/create-listing"
                                    : "verification"
                            }
                            aria-label="create listing"
                        >
                            <motion.button
                                whileHover={{
                                    scale: 1.1,
                                }}
                                whileTap={{ scale: 0.95 }}
                                className=" mt-2 rounded-xl border-2 border-black bg-black px-6 py-2 text-xl text-green-500 hover:border-green-500 hover:bg-keebyGray"
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
