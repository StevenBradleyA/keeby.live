import Link from "next/link";
import { motion } from "framer-motion";

export default function Custom404() {
    return (
        <div className="font-mono text-gray-400">
            <div className="matrix-full-screen fixed left-0 top-0  ">
                <video className="w-full" autoPlay loop muted>
                    <source src="/Videos/404.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className=" lost-index text-purple-500 absolute left-1/2 -translate-x-1/2 rounded-xl border-2 border-purple-500 bg-black bg-opacity-70 p-10  ">
                <div className="text-purple-500 rounded-md  p-3 text-lg leading-relaxed shadow-xl">
                    <h2 className="mb-3 text-xl font-bold">404</h2>
                    <p>
                        {`Oops, you seem to have gotten lost. Let's go home `}
                    </p>
                </div>

                <div className="mt-3 flex justify-center">
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className=" rounded-lg border-2 border-pink-500 bg-black px-6 py-2 text-pink-500   hover:border-pink-500 hover:bg-pink-500 hover:text-black"
                        >
                            {`K E E B Y`}
                        </motion.button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
