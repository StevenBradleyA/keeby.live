import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import gif from "@public/Gifs/matrix.gif";

export default function Custom404() {
    return (
        <div className="">
            {/* <Image src={gif} alt="404" className="w-3/4" /> */}
            <div className="fixed left-0 top-0 matrix-full-screen ">
            <video className="w-full"  autoPlay loop muted>
                <source src="/Videos/matrix-fade-green.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            </div>
            <div className="bg-glass flex flex-col items-center rounded-2xl p-5 shadow-xl">
                <div className="mb-2 text-6xl">
                    Uh oh! Looks like you got lost
                </div>
                <div className="mb-5 text-4xl">
                    No worries, the homepage is just a click away.
                </div>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className=" rounded-3xl bg-blue-200 px-6 py-2 text-3xl shadow-md "
                >
                    <Link href="/">click me!</Link>
                </motion.button>
            </div>
        </div>
    );
}
