import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function Custom404() {
    // TODO create flashing 404 gif of computer at the top here
    const { data: sessionData } = useSession();

    return (
        <div className="font-mono">
            <div className="matrix-full-screen fixed left-0 top-0  ">
                <video className="w-full" autoPlay loop muted>
                    <source
                        src="/Videos/matrix-fade-green.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className=" lost-index fixed left-0 rounded-xl border-2 border-green-500 bg-black bg-opacity-70 p-10 text-green-500  ">
                <div className="rounded-md p-4  text-lg leading-relaxed text-green-500 shadow-xl">
                    <h2 className="mb-3 text-xl font-bold">
                        The Choice Is Yours
                    </h2>
                    <p>
                        {` ${
                            sessionData &&
                            sessionData.user &&
                            sessionData.user.username
                                ? sessionData.user.username
                                : "Neo"
                        }, you stand at a crossroads in the Matrix. The blue
                        pill offers a return to the world as you've known it, a
                        path back to the comfort of the known. The red pill, a
                        journey into the unknown depths of our site, a promise
                        to reveal unseen truths. The decision is yours, but
                        remember, the Matrix is full of surprises. Whichever
                        pill you choose, it will guide you back to where it all
                        began: the homepage.`}
                    </p>
                </div>

                <div className="mt-10 flex justify-evenly">
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className=" border-2 border-green-500 bg-black px-6 py-2 text-green-500   hover:border-blue-500 hover:bg-blue-500 hover:text-black"
                        >
                            Blue Pill
                        </motion.button>
                    </Link>
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className=" border-2 border-green-500 bg-black px-6 py-2 text-green-500  hover:border-red-500 hover:bg-red-500 hover:text-black"
                        >
                            Red Pill
                        </motion.button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
