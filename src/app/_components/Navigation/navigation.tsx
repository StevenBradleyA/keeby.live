"use client";
import Image from "next/image";
import home from "@public/Nav/home.png";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import type { MouseEvent } from "react";

export default function Navigation() {
    // line indicator
    // custom keyboard case svgs for everything but profile and messages

    const { data: sessionData, status } = useSession();

    // console.log(sessionData);
    // console.log(status);

    const menuRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const menuButtonRef: MutableRefObject<HTMLButtonElement | null> =
        useRef(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const leftSquare = {
        initial: { x: 0 },
        hover: { x: -20 },
        open: { x: -20 },
    };
    // const circleArrow = {
    //     initial: { opacity: [0, 1, 1] },
    //     hover: { opacity: 1, transition: { delay: 0.2 } },
    // };
    const circleArrow = {
        initial: { opacity: 0, scale: 0.8, rotate: 180 },
        hover: {
            opacity: [1, 1, 1],
            scale: [0, 1.2, 1],
            rotate: [180, 180, 180],
            transition: {
                delay: 0.1,
                type: "spring",
                stiffness: 300,
                damping: 15,
            },
        },
        open: { opacity: 0 },
    };

    const handleClose = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    const handleOutsideClick = useCallback(
        (e: Event) => {
            if (!isMenuOpen) return;

            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                menuButtonRef.current &&
                !menuButtonRef.current.contains(e.target as Node)
            ) {
                handleClose();
            }
        },
        [isMenuOpen, handleClose],
    );

    useEffect(() => {
        window.addEventListener("mousedown", handleOutsideClick);
        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isMenuOpen, handleClose, handleOutsideClick]);

    // const handleSignIn = (e: MouseEvent<HTMLAnchorElement>) => {
    //     e.preventDefault();
    //     void signIn();
    // };

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
                ref={menuButtonRef}
                whileHover={isMenuOpen ? "open" : "hover"}
                initial="initial"
                onClick={() => {
                    isMenuOpen === false
                        ? setIsMenuOpen(true)
                        : setIsMenuOpen(false);
                }}
                animate={isMenuOpen ? "open" : "initial"}
            >
                <motion.div
                    className="bg-white/30 text-green-500 absolute  right-5  rounded-full p-1 rotate-180 "
                    variants={circleArrow}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6  "
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M7 17L17 7M17 7H8M17 7V16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </motion.div>
                {/* <motion.svg
                    variants={circleArrow}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8  absolute rotate-180 right-5 text-green-500 "
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M7 17L17 7M17 7H8M17 7V16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </motion.svg> */}
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
                    className="w-24 h-24 text-darkGray absolute -right-2 "
                    viewBox="-24 0 50 24"
                    version="1.1"
                    // variants={navSquare}
                >
                    <g
                        stroke="none"
                        strokeWidth="1"
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
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed top-28 right-8 rounded-2xl w-[500px] h-[100px] bottom-0 bg-black/30 flex justify-between items-center px-5 text-sm text-darkGray"
                        ref={menuRef}
                    >
                        <Link
                            href={"/keebshare"}
                            aria-label="share your keyboard with others"
                            className="hover:text-green-500 ease-in "
                        >
                            <motion.div className="flex flex-col items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-10 h-10"
                                    viewBox="0 0 32 32"
                                    version="1.1"
                                    fill="currentColor"
                                >
                                    <path d="M27.967 27.984h-23.935c-1.102 0-1.994-0.894-1.994-1.995v-10.969c0-1.103 0.893-1.995 1.994-1.995l1.055-0.056c0-1.629 0.496-2.625 1.488-3.734s2.222-1.665 3.692-1.665c0.697 0 1.47 0.118 2.317 0.354 0 0 1.842 0.612 3.121 0.612 1.951 0 3.283-0.855 3.99-2.566 0.332-0.823 0.67-1.235 1.014-1.235 0.492 0 0.74 0.23 0.74 0.689 0 0.813-0.439 1.712-1.318 2.696-1.18 1.337-2.631 2.006-4.356 2.006-1.339 0-3.634-0.628-3.634-0.628-0.932-0.226-1.597-0.338-1.993-0.338-0.953 0-1.771 0.407-2.451 1.223s-1.021 1.475-1.021 2.6l21.291 0.042c1.102 0 1.996 0.893 1.996 1.995v10.97c0 1.101-0.895 1.994-1.996 1.994zM28.965 15.020c0-0.552-0.447-0.998-0.998-0.998h-23.935c-0.551 0-0.997 0.446-0.997 0.998v10.97c0 0.551 0.446 0.998 0.997 0.998h23.935c0.551 0 0.998-0.447 0.998-0.998v-10.97zM24.971 20.037h-1.963v1.932h-1.994v-1.932h-1.996v1.932h-2.057v-1.932h-1.932v1.932h-1.995v-1.932h-1.994v1.932h-1.996v-1.932h-2.025v1.932h-1.994v-1.963h2.025v-1.995h-2.025v-1.963h1.994v1.932h2.025v-1.932h1.995v1.932h1.994v-1.932h1.995v1.932h1.932v-1.932h2.057v1.932h1.996v-1.932h1.994v1.932h1.963v-1.932h1.994v1.963h-1.963v1.995h1.963v1.963h-1.994v-1.932zM11.040 18.011h-2.026v1.995h2.025v-1.995zM14.998 18.011h-1.995v1.995h1.995v-1.995zM18.986 18.011h-1.994v1.995h1.994v-1.995zM22.977 18.011h-1.997v1.995h1.996v-1.995zM23.070 24.992h-14.087v-1.964h14.087v1.964z" />
                                </svg>
                                <h2>Keeb Type</h2>
                            </motion.div>
                        </Link>
                        <Link
                            href={"/keebshare"}
                            aria-label="share your keyboard with others"
                            className="hover:text-green-500 ease-in "
                        >
                            <motion.div className="flex flex-col items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-10 h-10"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M8.68439 10.6578L15.3125 7.34375M15.3156 16.6578L8.6938 13.3469M21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                                <h2>Keeb Share</h2>
                            </motion.div>
                        </Link>
                        <Link
                            href={"/keebshare"}
                            aria-label="share your keyboard with others"
                            className="hover:text-green-500 ease-in "
                        >
                            <motion.div className="flex flex-col items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-10 h-10"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M11.7255 17.1019C11.6265 16.8844 11.4215 16.7257 11.1734 16.6975C10.9633 16.6735 10.7576 16.6285 10.562 16.5636C10.4743 16.5341 10.392 16.5019 10.3158 16.4674L10.4424 16.1223C10.5318 16.1622 10.6239 16.1987 10.7182 16.2317L10.7221 16.2331L10.7261 16.2344C11.0287 16.3344 11.3265 16.3851 11.611 16.3851C11.8967 16.3851 12.1038 16.3468 12.2629 16.2647L12.2724 16.2598L12.2817 16.2544C12.5227 16.1161 12.661 15.8784 12.661 15.6021C12.661 15.2955 12.4956 15.041 12.2071 14.9035C12.062 14.8329 11.8559 14.7655 11.559 14.6917C11.2545 14.6147 10.9987 14.533 10.8003 14.4493C10.6553 14.3837 10.5295 14.279 10.4161 14.1293C10.3185 13.9957 10.2691 13.7948 10.2691 13.5319C10.2691 13.2147 10.3584 12.9529 10.5422 12.7315C10.7058 12.5375 10.9381 12.4057 11.2499 12.3318C11.4812 12.277 11.6616 12.1119 11.7427 11.8987C11.8344 12.1148 12.0295 12.2755 12.2723 12.3142C12.4751 12.3465 12.6613 12.398 12.8287 12.4677L12.7122 12.8059C12.3961 12.679 12.085 12.6149 11.7841 12.6149C10.7848 12.6149 10.7342 13.3043 10.7342 13.4425C10.7342 13.7421 10.896 13.9933 11.1781 14.1318L11.186 14.1357L11.194 14.1393C11.3365 14.2029 11.5387 14.2642 11.8305 14.3322C12.1322 14.4004 12.3838 14.4785 12.5815 14.5651L12.5856 14.5669L12.5897 14.5686C12.7365 14.6297 12.8624 14.7317 12.9746 14.8805L12.9764 14.8828L12.9782 14.8852C13.0763 15.012 13.1261 15.2081 13.1261 15.4681C13.1261 15.7682 13.0392 16.0222 12.8604 16.2447C12.7053 16.4377 12.4888 16.5713 12.1983 16.6531C11.974 16.7163 11.8 16.8878 11.7255 17.1019Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M11.9785 18H11.497C11.3893 18 11.302 17.9105 11.302 17.8V17.3985C11.302 17.2929 11.2219 17.2061 11.1195 17.1944C10.8757 17.1667 10.6399 17.115 10.412 17.0394C10.1906 16.9648 9.99879 16.8764 9.83657 16.7739C9.76202 16.7268 9.7349 16.6312 9.76572 16.5472L10.096 15.6466C10.1405 15.5254 10.284 15.479 10.3945 15.5417C10.5437 15.6262 10.7041 15.6985 10.8755 15.7585C11.131 15.8429 11.3762 15.8851 11.611 15.8851C11.8129 15.8851 11.9572 15.8628 12.0437 15.8181C12.1302 15.7684 12.1735 15.6964 12.1735 15.6021C12.1735 15.4929 12.1158 15.411 12.0004 15.3564C11.8892 15.3018 11.7037 15.2422 11.4442 15.1777C11.1104 15.0933 10.8323 15.0039 10.6098 14.9096C10.3873 14.8103 10.1936 14.6514 10.0288 14.433C9.86396 14.2096 9.78156 13.9092 9.78156 13.5319C9.78156 13.095 9.91136 12.7202 10.1709 12.4074C10.4049 12.13 10.7279 11.9424 11.1401 11.8447C11.2329 11.8227 11.302 11.7401 11.302 11.6425V11.2C11.302 11.0895 11.3893 11 11.497 11H11.9785C12.0862 11 12.1735 11.0895 12.1735 11.2V11.6172C12.1735 11.7194 12.2487 11.8045 12.3471 11.8202C12.7082 11.8777 13.0255 11.9866 13.2989 12.1469C13.3765 12.1924 13.4073 12.2892 13.3775 12.3756L13.0684 13.2725C13.0275 13.3914 12.891 13.4417 12.7812 13.3849C12.433 13.2049 12.1007 13.1149 11.7841 13.1149C11.4091 13.1149 11.2216 13.2241 11.2216 13.4425C11.2216 13.5468 11.2773 13.6262 11.3885 13.6809C11.4998 13.7305 11.6831 13.7851 11.9386 13.8447C12.2682 13.9192 12.5464 14.006 12.773 14.1053C12.9996 14.1996 13.1953 14.356 13.3602 14.5745C13.5291 14.7929 13.6136 15.0908 13.6136 15.4681C13.6136 15.8851 13.4879 16.25 13.2365 16.5628C13.0176 16.8354 12.7145 17.0262 12.3274 17.1353C12.2384 17.1604 12.1735 17.2412 12.1735 17.3358V17.8C12.1735 17.9105 12.0862 18 11.9785 18Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M9.59235 5H13.8141C14.8954 5 14.3016 6.664 13.8638 7.679L13.3656 8.843L13.2983 9C13.7702 8.97651 14.2369 9.11054 14.6282 9.382C16.0921 10.7558 17.2802 12.4098 18.1256 14.251C18.455 14.9318 18.5857 15.6958 18.5019 16.451C18.4013 18.3759 16.8956 19.9098 15.0182 20H8.38823C6.51033 19.9125 5.0024 18.3802 4.89968 16.455C4.81587 15.6998 4.94656 14.9358 5.27603 14.255C6.12242 12.412 7.31216 10.7565 8.77823 9.382C9.1696 9.11054 9.63622 8.97651 10.1081 9L10.0301 8.819L9.54263 7.679C9.1068 6.664 8.5101 5 9.59235 5Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M13.2983 9.75C13.7125 9.75 14.0483 9.41421 14.0483 9C14.0483 8.58579 13.7125 8.25 13.2983 8.25V9.75ZM10.1081 8.25C9.69391 8.25 9.35812 8.58579 9.35812 9C9.35812 9.41421 9.69391 9.75 10.1081 9.75V8.25ZM15.9776 8.64988C16.3365 8.44312 16.4599 7.98455 16.2531 7.62563C16.0463 7.26671 15.5878 7.14336 15.2289 7.35012L15.9776 8.64988ZM13.3656 8.843L13.5103 9.57891L13.5125 9.57848L13.3656 8.843ZM10.0301 8.819L10.1854 8.08521L10.1786 8.08383L10.0301 8.819ZM8.166 7.34357C7.80346 7.14322 7.34715 7.27469 7.1468 7.63722C6.94644 7.99976 7.07791 8.45607 7.44045 8.65643L8.166 7.34357ZM13.2983 8.25H10.1081V9.75H13.2983V8.25ZM15.2289 7.35012C14.6019 7.71128 13.9233 7.96683 13.2187 8.10752L13.5125 9.57848C14.3778 9.40568 15.2101 9.09203 15.9776 8.64988L15.2289 7.35012ZM13.2209 8.10709C12.2175 8.30441 11.1861 8.29699 10.1854 8.08525L9.87486 9.55275C11.0732 9.80631 12.3086 9.81521 13.5103 9.57891L13.2209 8.10709ZM10.1786 8.08383C9.47587 7.94196 8.79745 7.69255 8.166 7.34357L7.44045 8.65643C8.20526 9.0791 9.02818 9.38184 9.88169 9.55417L10.1786 8.08383Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <h2>Keeb Shop</h2>
                            </motion.div>
                        </Link>
                        <Link
                            href={"/keebshare"}
                            aria-label="share your keyboard with others"
                            className="hover:text-green-500 ease-in "
                        >
                            <motion.div className="flex flex-col items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-10 h-10"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M7 9H17M7 13H17M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <h2>Messages</h2>
                            </motion.div>
                        </Link>
                        {sessionData === null ? (
                            <motion.button
                                onClick={() => void signIn()}
                                aria-label="share your keyboard with others"
                                className="hover:text-green-500 ease-in "
                            >
                                <motion.div className="flex flex-col items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-8 h-8"
                                        viewBox="0 0 20 20"
                                        version="1.1"
                                    >
                                        <g
                                            stroke="none"
                                            strokeWidth="1"
                                            fill="none"
                                            fillRule="evenodd"
                                        >
                                            <g
                                                transform="translate(-140.000000, -2159.000000)"
                                                fill="currentColor"
                                            >
                                                <g
                                                    id="icons"
                                                    transform="translate(56.000000, 160.000000)"
                                                >
                                                    <path
                                                        d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598"
                                                        id="profile_round-[#1342]"
                                                    ></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    <h2>Profile</h2>
                                </motion.div>
                            </motion.button>
                        ) : (
                            <Link
                                href={"/#"}
                                onClick={() => void signOut()}
                                aria-label="share your keyboard with others"
                                className="hover:text-green-500 ease-in "
                            >
                                <motion.div className="flex flex-col items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-8 h-8"
                                        viewBox="0 0 20 20"
                                        version="1.1"
                                    >
                                        <g
                                            stroke="none"
                                            strokeWidth="1"
                                            fill="none"
                                            fillRule="evenodd"
                                        >
                                            <g
                                                transform="translate(-140.000000, -2159.000000)"
                                                fill="currentColor"
                                            >
                                                <g
                                                    id="icons"
                                                    transform="translate(56.000000, 160.000000)"
                                                >
                                                    <path
                                                        d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598"
                                                        id="profile_round-[#1342]"
                                                    ></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    <h2>Profile</h2>
                                </motion.div>
                            </Link>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
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
