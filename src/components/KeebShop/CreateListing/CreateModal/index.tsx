import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CreateListingModal() {
    const { data: sessionData } = useSession();
    const isVerifiedSeller = sessionData?.user.isVerified === true;

    return (
        <>
            {sessionData === null && (
                <div className="flex flex-col ">
                    SIgn in to list your keeb
                    <motion.button
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-2xl bg-black px-6 py-2"
                        onClick={() => void signIn()}
                    >
                        sign in
                    </motion.button>
                </div>
            )}

            {sessionData && isVerifiedSeller && (
                <div>
                    <div> Would you like to list a keyboard? </div>
                    <motion.button
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-2xl bg-black px-6 py-2"
                    >
                        <Link
                            href="/create-listing"
                            aria-label="create listing"
                        >
                            {`Let's go`}
                        </Link>
                    </motion.button>
                </div>
            )}
            {sessionData && !isVerifiedSeller && (
                <div className="flex flex-col items-center">
                    <div>
                        To list a keeb you need to get verified as a seller
                    </div>
                    <motion.button
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-2xl bg-black px-6 py-2"
                    >
                        <Link href="/verification" aria-label="verification">
                            {`Let's go`}
                        </Link>
                    </motion.button>
                </div>
            )}

            <div></div>
        </>
    );
}
