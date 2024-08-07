import Image from "next/image";
import Footer from "../_components/Footer/footer";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import keebo from "@public/Profile/keebo.png";

export default function FrequentlyAskedQuestions() {
    const commonBuyerRef = useRef<HTMLDivElement | null>(null);
    const commonSellerRef = useRef<HTMLDivElement | null>(null);
    const generalRef = useRef<HTMLDivElement | null>(null);
    const typeRef = useRef<HTMLDivElement | null>(null);

    const [openToggle, setOpenToggle] = useState("");

    return (
        <>
            <div className="h-full w-full px-40 ">
                <div
                    className="fixed left-0 right-0 top-0 min-h-full bg-green-300"
                    style={{ zIndex: 1 }}
                ></div>
                <div
                    className="absolute right-40 top-[200px] h-[400px] w-[750px] bg-[#FFE033]"
                    style={{ zIndex: 2 }}
                ></div>
                <div
                    className="absolute left-40 top-[600px] h-[400px] w-[750px] bg-[#FFE033]"
                    style={{ zIndex: 2 }}
                ></div>
                <div
                    className="absolute left-[400px] top-[450px] flex h-[400px] w-[750px] items-end justify-center bg-violet-300"
                    style={{
                        zIndex: 2,
                        boxShadow: "3px 3px 0px black, 6px 6px 0px black",
                    }}
                >
                    <Image alt="keeby mascot" src={keebo} className="w-80" />
                </div>

                <div className=" relative flex" style={{ zIndex: 3 }}>
                    <div className="h-full w-1/2">
                        <h1
                            className="relative mt-10 flex flex-col font-titillium text-9xl text-[#FFE033]"
                            style={{
                                zIndex: 3,
                                textShadow:
                                    "6px 6px 0px black, 6px 6px 0px black",
                            }}
                        >
                            <div className="-mb-5">FIND YOUR</div>
                            <div>ANSWERS</div>
                        </h1>
                        <div className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute left-[4px] top-[8px] -z-10 h-40 w-40 text-black  "
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M2.31212 9L1 10.5094L4.77355 13.7897L6.28297 15.1018L7.59509 13.5924L9.13456 11.8214L11.3988 13.7897L12.9082 15.1018L14.2203 13.5924L15.7584 11.823L18.0209 13.7897L19.5303 15.1018L20.8424 13.5924L22.8106 11.3283L21.3012 10.0162L19.333 12.2803L15.5594 9L14.2473 10.5094L14.249 10.5109L12.7109 12.2803L8.93736 9L8.05395 10.0163L6.08567 12.2803L2.31212 9Z"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="z-20 h-40 w-40  text-white "
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M2.31212 9L1 10.5094L4.77355 13.7897L6.28297 15.1018L7.59509 13.5924L9.13456 11.8214L11.3988 13.7897L12.9082 15.1018L14.2203 13.5924L15.7584 11.823L18.0209 13.7897L19.5303 15.1018L20.8424 13.5924L22.8106 11.3283L21.3012 10.0162L19.333 12.2803L15.5594 9L14.2473 10.5094L14.249 10.5109L12.7109 12.2803L8.93736 9L8.05395 10.0163L6.08567 12.2803L2.31212 9Z"
                                />
                            </svg>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="ml-10 mt-52 h-32 w-32 text-hotPink"
                                viewBox="0 0 32 32"
                                version="1.1"
                                fill="currentColor"
                                stroke="black"
                            >
                                <path
                                    d="M23.5 13.187h-7.5v-12.187l-7.5 17.813h7.5v12.187l7.5-17.813z"
                                    strokeWidth="1px"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <div className="h-full w-1/2 pl-72">
                        <h2
                            className="relative   mt-40 flex flex-col font-titillium text-8xl text-white"
                            style={{
                                textShadow:
                                    "6px 6px 0px black, 5px 5px 0px black",
                            }}
                        >
                            <div className="z-20 -mb-4">FREQUENTLY</div>
                            <div className="z-20 -mb-4">ASKED</div>
                            <div className="z-20">QUESTIONS</div>

                            <div className="faq-grid absolute -right-20 -top-10 z-10"></div>
                        </h2>

                        <div className=" relative mt-20 flex flex-col items-start gap-2 text-xl text-white">
                            {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute -right-12 -top-20 h-20 w-20 text-vibrantPurple"
                        fill="currentColor"
                        stroke="black"
                        viewBox="-1 -1 36 36"
                        version="1.1"
                    >
                        <path
                            strokeWidth="1px"
                            d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048z"
                        />
                    </svg> */}

                            <button
                                className="flex items-center gap-3  transition-colors duration-300 ease-custom-cubic hover:text-violet-300 "
                                onClick={() => {
                                    if (commonBuyerRef.current) {
                                        commonBuyerRef.current.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
                                </svg>
                                Common Buyer Questions
                            </button>
                            <button
                                className="flex items-center gap-3  transition-colors duration-300 ease-custom-cubic hover:text-violet-300 "
                                onClick={() => {
                                    if (commonSellerRef.current) {
                                        commonSellerRef.current.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
                                </svg>
                                Common Seller Questions
                            </button>

                            <button
                                className="flex items-center gap-3  transition-colors duration-300 ease-custom-cubic hover:text-violet-300 "
                                onClick={() => {
                                    if (commonBuyerRef.current) {
                                        commonBuyerRef.current.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
                                </svg>
                                General Questions
                            </button>

                            <button
                                className="flex items-center gap-3  transition-colors duration-300 ease-custom-cubic hover:text-violet-300 "
                                onClick={() => {
                                    if (commonBuyerRef.current) {
                                        commonBuyerRef.current.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
                                </svg>
                                Keeb Type Questions
                            </button>

                            {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute right-10 top-[200px] z-20 h-16 w-16 text-vibrantGreen"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    d="M12 3L13.4302 8.31181C13.6047 8.96 13.692 9.28409 13.8642 9.54905C14.0166 9.78349 14.2165 9.98336 14.451 10.1358C14.7159 10.308 15.04 10.3953 15.6882 10.5698L21 12L15.6882 13.4302C15.04 13.6047 14.7159 13.692 14.451 13.8642C14.2165 14.0166 14.0166 14.2165 13.8642 14.451C13.692 14.7159 13.6047 15.04 13.4302 15.6882L12 21L10.5698 15.6882C10.3953 15.04 10.308 14.7159 10.1358 14.451C9.98336 14.2165 9.78349 14.0166 9.54905 13.8642C9.28409 13.692 8.96 13.6047 8.31181 13.4302L3 12L8.31181 10.5698C8.96 10.3953 9.28409 10.308 9.54905 10.1358C9.78349 9.98336 9.98336 9.78349 10.1358 9.54905C10.308 9.28409 10.3953 8.96 10.5698 8.31181L12 3Z"
                                    stroke="#000000"
                                    strokeWidth=".3px"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg> */}
                        </div>
                        <div className="relative mt-10 flex w-full justify-end ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute -right-[4px] top-[8px] -z-10 h-40 w-40 text-black  "
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M2.31212 9L1 10.5094L4.77355 13.7897L6.28297 15.1018L7.59509 13.5924L9.13456 11.8214L11.3988 13.7897L12.9082 15.1018L14.2203 13.5924L15.7584 11.823L18.0209 13.7897L19.5303 15.1018L20.8424 13.5924L22.8106 11.3283L21.3012 10.0162L19.333 12.2803L15.5594 9L14.2473 10.5094L14.249 10.5109L12.7109 12.2803L8.93736 9L8.05395 10.0163L6.08567 12.2803L2.31212 9Z"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="z-20 h-40 w-40  text-violet-500 "
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M2.31212 9L1 10.5094L4.77355 13.7897L6.28297 15.1018L7.59509 13.5924L9.13456 11.8214L11.3988 13.7897L12.9082 15.1018L14.2203 13.5924L15.7584 11.823L18.0209 13.7897L19.5303 15.1018L20.8424 13.5924L22.8106 11.3283L21.3012 10.0162L19.333 12.2803L15.5594 9L14.2473 10.5094L14.249 10.5109L12.7109 12.2803L8.93736 9L8.05395 10.0163L6.08567 12.2803L2.31212 9Z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <div
                    className="relative z-20 mt-20  w-full text-white "
                    ref={commonBuyerRef}
                >
                    <div
                        className="absolute -left-40 top-0 h-full w-[700px] bg-[#FFE033]"
                        style={{ zIndex: 2 }}
                    ></div>
                    <div className="flex w-full gap-60">
                        <div className="relative z-30 flex flex-col">
                            <h2
                                className="relative   mt-40 flex flex-col font-titillium text-8xl text-white"
                                style={{
                                    textShadow:
                                        "6px 6px 0px black, 5px 5px 0px black",
                                }}
                            >
                                {" "}
                                <div className="z-20 -mb-4">COMMON</div>
                                <div className="z-20 -mb-4">BUYER</div>
                                <div className="z-20">QUESTIONS</div>
                                <div className="faq-grid absolute -left-40 -top-10"></div>
                            </h2>
                        </div>
                        <div className="mt-20 flex w-full flex-col gap-2 text-black">
                            <div>
                                <button
                                    className={`${
                                        openToggle === "q1"
                                            ? "rounded-b-none"
                                            : "rounded-b-md"
                                    } flex w-full justify-between rounded-t-md border-2 border-black bg-violet-300 p-3 text-black`}
                                    onClick={() => {
                                        if (openToggle === "q1")
                                            setOpenToggle("");
                                        else {
                                            setOpenToggle("q1");
                                        }
                                    }}
                                >
                                    Can I buy if im not in the US?
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={` h-6 w-6 ${
                                            openToggle === "q1"
                                                ? "rotate-180"
                                                : ""
                                        } transform transition-transform duration-400 ease-in-out`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M6 9L12 15L18 9"
                                            stroke="#000000"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                                <AnimatePresence>
                                    {openToggle === "q1" && (
                                        <motion.div
                                            className="w-full rounded-b-md border-x-2 border-b-2 border-black bg-white/40 p-5 "
                                            initial={{
                                                opacity: 0,
                                                scale: 0.95,
                                            }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {` Yes, however seller's pay for shipping so I would check with the seller in the comments before buying or making an offer.`}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div>
                                <button
                                    className={`${
                                        openToggle === "q2"
                                            ? "rounded-b-none"
                                            : "rounded-b-md"
                                    } flex w-full justify-between rounded-t-md border-2 border-black bg-violet-300 p-3 text-black`}
                                    onClick={() => {
                                        if (openToggle === "q2")
                                            setOpenToggle("");
                                        else {
                                            setOpenToggle("q2");
                                        }
                                    }}
                                >
                                    hey idk ?
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={` h-6 w-6 ${
                                            openToggle === "q2"
                                                ? "rotate-180"
                                                : ""
                                        } transform transition-transform duration-400 ease-in-out`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M6 9L12 15L18 9"
                                            stroke="#000000"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                                <AnimatePresence>
                                    {openToggle === "q2" && (
                                        <motion.div
                                            className="w-full rounded-b-md border-x-2 border-b-2 border-black bg-white/40 p-5 "
                                            initial={{
                                                opacity: 0,
                                                scale: 0.95,
                                            }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            NO
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    <div
                        className="mt-20 flex w-full gap-60"
                        ref={commonSellerRef}
                    >
                        <div className="relative z-30 flex flex-col">
                            <h2
                                className="relative   mt-40 flex flex-col font-titillium text-8xl text-white"
                                style={{
                                    textShadow:
                                        "6px 6px 0px black, 5px 5px 0px black",
                                }}
                            >
                                {" "}
                                <div className="z-20 -mb-4">COMMON</div>
                                <div className="z-20 -mb-4">SELLER</div>
                                <div className="z-20">QUESTIONS</div>
                                <div className="faq-grid absolute -left-40 -top-10"></div>
                            </h2>
                        </div>
                        <div className="mt-20 flex w-full flex-col gap-2 text-black">
                            <div>
                                <button
                                    className={`${
                                        openToggle === "q1"
                                            ? "rounded-b-none"
                                            : "rounded-b-md"
                                    } flex w-full justify-between rounded-t-md border-2 border-black bg-violet-300 p-3 text-black`}
                                    onClick={() => {
                                        if (openToggle === "q1")
                                            setOpenToggle("");
                                        else {
                                            setOpenToggle("q1");
                                        }
                                    }}
                                >
                                    Can I cancel my listing?
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={` h-6 w-6 ${
                                            openToggle === "q1"
                                                ? "rotate-180"
                                                : ""
                                        } transform transition-transform duration-400 ease-in-out`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M6 9L12 15L18 9"
                                            stroke="#000000"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                                <AnimatePresence>
                                    {openToggle === "q1" && (
                                        <motion.div
                                            className="w-full rounded-b-md border-x-2 border-b-2 border-black bg-white/40 p-5 "
                                            initial={{
                                                opacity: 0,
                                                scale: 0.95,
                                            }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {` Yes, however seller's pay for shipping so I would check with the seller in the comments before buying or making an offer.`}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div>
                                <button
                                    className={`${
                                        openToggle === "q2"
                                            ? "rounded-b-none"
                                            : "rounded-b-md"
                                    } flex w-full justify-between rounded-t-md border-2 border-black bg-violet-300 p-3 text-black`}
                                    onClick={() => {
                                        if (openToggle === "q2")
                                            setOpenToggle("");
                                        else {
                                            setOpenToggle("q2");
                                        }
                                    }}
                                >
                                    hey idk ?
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={` h-6 w-6 ${
                                            openToggle === "q2"
                                                ? "rotate-180"
                                                : ""
                                        } transform transition-transform duration-400 ease-in-out`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M6 9L12 15L18 9"
                                            stroke="#000000"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                                <AnimatePresence>
                                    {openToggle === "q2" && (
                                        <motion.div
                                            className="w-full rounded-b-md border-x-2 border-b-2 border-black bg-white/40 p-5 "
                                            initial={{
                                                opacity: 0,
                                                scale: 0.95,
                                            }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            NO
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="z-20 mt-96 w-full">
                <Footer />
            </div>
        </>
    );
}
