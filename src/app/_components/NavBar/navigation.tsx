"use client";
import Image from "next/image";
import home from "@public/Nav/home.png";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navigation() {
    // const navSquare = {
    //     initial: { opacity: 1 },
    //     hover: { opacity: 0, transition: { delay: 0.5 } },
    // };
    const leftSquare = {
        initial: { x: 0 },
        hover: { x: -20 },
    };
    // const circleArrow = {
    //     initial: { opacity: [0, 1, 1] },
    //     hover: { opacity: 1, transition: { delay: 0.2 } },
    // };
    const circleArrow = {
        initial: { opacity: 0, scale: 0.8, rotate: 180 },
        hover: {
            opacity: 1,
            scale: [0, 1.2, 1],
            rotate: [180, 180, 180],
            transition: {
                delay: 0.1,
                type: "spring",
                stiffness: 300,
                damping: 15,
            },
        },
    };

    return (
        <nav className="fixed top-0 left-0 right-0 p-8  flex justify-between items-center">
            <Link
                href={"/"}
                aria-label="home button"
                className="hover:opacity-75 ease-in"
            >
                <Image alt="home" className="w-72" src={home} />
            </Link>
            <motion.button
                className=" flex items-center relative h-10 w-20 "
                whileHover="hover"
                initial="initial"
            >
                {/* <motion.div
                    className="bg-white/30 text-green-500 absolute  right-4  rounded-full p-1 "
                    variants={circleArrow}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 rotate-180 "
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M7 17L17 7M17 7H8M17 7V16"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </motion.div> */}
                <motion.svg
                    variants={circleArrow}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8  absolute rotate-180 right-4 text-green-500 "
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M7 17L17 7M17 7H8M17 7V16"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </motion.svg>
                {/* <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 "
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
                            fill="currentColor"
                        />
                    </motion.svg> */}
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-24 h-24 text-darkGray absolute -right-3 "
                    viewBox="-24 0 50 24"
                    version="1.1"
                    // variants={navSquare}
                >
                    <g
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fillRule="evenodd"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <g stroke="currentColor" strokeWidth="2">
                            <motion.path
                                d="M9,21 L3,21 L3,15 M3,9 L3,3 L9,3"
                                variants={leftSquare}
                            />
                            <motion.path d="M21,15 L21,21 L15,21 M15,3 L21,3 L21,9" />
                        </g>
                    </g>
                </motion.svg>
            </motion.button>
        </nav>
    );
}
{
    /* <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-20 h-20 text-darkGray absolute -bottom-2 -right-1"
                    viewBox="0 0 32 32"
                    version="1.1"
                    fill="currentColor"
                    variants={keyboardNav}
                >
                    <path
                        d="M20.122 7.774c-1.18 1.337-2.631 2.006-4.356 2.006-1.339 0-3.634-0.628-3.634-0.628-0.932-0.226-1.597-0.338-1.993-0.338-0.953 0-1.771 0.407-2.451 1.223s-1.021 1.475-1.021 2.6c0 0-1.486-0.063-1.055-0.056 0-1.629 0.496-2.625 1.488-3.734s2.222-1.665 3.692-1.665c0.697 0 1.47 0.118 2.317 0.354 0 0 1.842 0.612 3.121 0.612 1.951 0 3.283-0.855 3.99-2.566 0.332-0.823 0.67-1.235 1.014-1.235 0.492 0 0.74 0.23 0.74 0.689 0 0.813-0.439 1.712-1.318 2.696z"
                        fill=""
                        id="cable"
                    />
                    <path
                        d="M27.967 27.984h-23.935c-1.102 0-1.994-0.894-1.994-1.995v-10.969c0-1.103 0.893-1.995 1.994-1.995h23.935c1.102 0 1.996 0.893 1.996 1.995v10.969c0 1.101-0.895 1.994-1.996 1.994zM28.965 15.020c0-0.552-0.447-0.998-0.998-0.998h-23.935c-0.551 0-0.997 0.446-0.997 0.998v10.97c0 0.551 0.446 0.998 0.997 0.998h23.935c0.551 0 0.998-0.447 0.998-0.998v-10.97z"
                        // fill="blue"
                        id="case"
                    />
                    <path
                        d="M16 10V22M16 22L11 17M16 22L21 17"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="scale(0.6) translate(11, 18)"
                        stroke="#22C55E"
                        id="arrow"
                    />
                </motion.svg> */
}
