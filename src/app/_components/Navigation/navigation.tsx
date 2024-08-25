"use client";
import Image from "next/image";
import home from "@public/Nav/home.png";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import DisplayNotifications from "../Notifications/Display/displayNotifications";
import NotificationCheck from "../Notifications/Display/notificationCheck";
import DisplayNotificationCount from "../Notifications/Display/displayCount";

export default function Navigation() {
    // line indicator
    // custom keyboard case svgs for everything but profile and messages

    const { data: sessionData } = useSession();
    const pathname = usePathname();
    // console.log(sessionData);
    // console.log(status);

    const menuRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const secondaryMenuRef: MutableRefObject<HTMLDivElement | null> =
        useRef(null);
    const menuButtonRef: MutableRefObject<HTMLButtonElement | null> =
        useRef(null);
    const secondaryMenuButtonRef: MutableRefObject<HTMLButtonElement | null> =
        useRef(null);

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] =
        useState<boolean>(false);
    const [notificationCount, setNotificationCount] = useState<number>(0);

    // animations

    // nav button
    const leftSquare = {
        initial: { x: 0 },
        hover: { x: -20 },
        open: { x: -20 },
    };

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
    const circleX = {
        initial: { opacity: 0, scale: 0.8, rotate: 0 },
        hover: { opacity: 0, scale: 0, rotate: 0 },
        hoverRotate: {
            opacity: [1, 1, 1],
            scale: 1,
            rotate: 180,
            transition: {
                delay: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 15,
            },
        },

        open: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.4,
            },
        },
    };

    // menu
    const menuAppear = {
        hidden: {
            clipPath: "inset(0 0 0 100%)",
        },
        visible: {
            clipPath: "inset(0 0 0 0)",

            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
        exit: {
            clipPath: "inset(0 0 0 100%)",

            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
    };
    const secondaryMenuAppear = {
        hidden: {
            clipPath: "inset(0 0 100% 0)",
        },
        visible: {
            clipPath: "inset(0 0 0 0)",

            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
        exit: {
            clipPath: "inset(0 0 100% 0)",

            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
    };

    // hover animations
    const keebTypeHover = {
        initial: {
            opacity: 0,
        },
        hover: {
            opacity: 1,
        },
    };

    const marketHover = {
        initial: {
            opacity: 0,
        },
        hover: {
            opacity: 1,
        },
    };
    const keebShareHover = {
        initial: {
            opacity: 0,
        },
        hover: {
            opacity: 1,
        },
    };
    const keebShopHover = {
        initial: {
            opacity: 0,
        },
        hover: {
            opacity: 1,
        },
    };
    const profileHover = {
        initial: {
            opacity: 0,
        },
        hover: {
            opacity: 1,
        },
    };

    const lineHover = {
        initial: {
            opacity: 0,
        },
        hover: {
            opacity: 1,
            transition: {
                duration: 0.1,
            },
        },
    };
    //  helpers

    const handleClose = useCallback(() => {
        setIsMenuOpen(false);
        setIsSecondaryMenuOpen(false);
    }, []);

    const handleOutsideClick = useCallback(
        (e: Event) => {
            if (!isMenuOpen) return;

            const isClickInsideMainMenu =
                menuRef.current &&
                (menuRef.current.contains(e.target as Node) ||
                    (menuButtonRef.current &&
                        menuButtonRef.current.contains(e.target as Node)));

            const isClickInsideSecondaryMenu =
                secondaryMenuRef.current &&
                (secondaryMenuRef.current.contains(e.target as Node) ||
                    (secondaryMenuButtonRef.current &&
                        secondaryMenuButtonRef.current.contains(
                            e.target as Node,
                        )));

            if (!isClickInsideMainMenu && !isClickInsideSecondaryMenu) {
                handleClose();
            }
        },
        [isMenuOpen, handleClose],
    );

    // monitoring
    useEffect(() => {
        window.addEventListener("mousedown", handleOutsideClick);
        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isMenuOpen, isSecondaryMenuOpen, handleOutsideClick]);

    console.log(notificationCount);

    return (
        <nav className="fixed top-0 left-0 right-0 px-14 py-9 flex justify-between items-center z-50">
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
                whileHover={isMenuOpen ? "openHover" : "hover"}
                initial="initial"
                onClick={() => {
                    if (!isMenuOpen) setIsMenuOpen(true);

                    if (isMenuOpen) {
                        if (isSecondaryMenuOpen) setIsSecondaryMenuOpen(false);
                        setIsMenuOpen(false);
                    }
                }}
                animate={isMenuOpen ? "open" : "initial"}
            >
                <motion.div
                    className="bg-white/30 text-green-500 absolute right-5  rounded-full p-1 rotate-180 "
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

                <motion.div
                    className="bg-white/30 text-green-500 absolute right-5 rounded-full p-1"
                    variants={circleX}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6  text-red-500"
                        viewBox="2 2 20 20"
                        fill="none"
                    >
                        <path
                            d="M16 8L8 16M8.00001 8L16 16"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </motion.div>

                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-24 h-24 text-mediumGray absolute -right-2 "
                    viewBox="-24 0 50 24"
                    version="1.1"
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
                        className="fixed top-28 right-14 w-[600px] h-[100px] bottom-0 bg-black/90 rounded-lg flex justify-between items-center px-5 text-sm text-mediumGray z-50"
                        ref={menuRef}
                        variants={menuAppear}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <Link
                            href={"/"}
                            aria-label="Practice your typing skills"
                            className="h-full flex-col  "
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <motion.div
                                className="flex flex-col items-center relative h-full bg-none"
                                whileHover="hover"
                                initial="initial"
                            >
                                <div className="h-[65%] flex-col flex justify-end relative flex-shrink-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        version="1.1"
                                        viewBox="0 0 1280 769"
                                        className="h-12 w-20 z-30 text-green-500 "
                                        fill="currentColor"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeWidth="25"
                                            d="M599.7,632.8c-7.6,0-15.2-0.7-22.8-2.2l-262.3-51.2c-6-1.2-12.1-1.7-18.2-1.6l-245,3.2c-8.1,0.1-15.8-3-21.6-8.7   c-5.8-5.7-8.9-13.4-8.8-21.5L23.5,206c0.1-16.3,13.5-29.6,29.9-29.6h1162.9c16.3,0,29.5,12.8,30,29.1v0L1257,542   c0.3,8.7-2.9,16.9-8.9,23.1s-14.1,9.7-22.8,9.8l-325.9,2.4c-5.6,0-11.2,0.6-16.7,1.7l-259.9,51.5   C615.1,632.1,607.4,632.8,599.7,632.8z M297.5,547.8c7.7,0,15.3,0.7,22.8,2.2l262.3,51.2c11.4,2.2,23,2.2,34.4,0l259.9-51.5   c7.3-1.5,14.8-2.2,22.3-2.3l325.9-2.4c0.5,0,1-0.2,1.4-0.6c0.4-0.4,0.5-0.9,0.5-1.4l-10.6-336.6c0,0,0,0,0,0l-1162.8,0L50.9,551   l245-3.2C296.5,547.8,297,547.8,297.5,547.8z"
                                        />
                                    </svg>
                                    <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 absolute left-1/2 -translate-x-1/2 bottom-3 text-green-500"
                                        viewBox="0 0 16 16"
                                        version="1.1"
                                        variants={keebTypeHover}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M4.12903 3.77419C4.12903 3.34662 4.47565 3 4.90323 3H11.0968C11.5243 3 11.871 3.34662 11.871 3.77419C11.871 4.20177 11.5243 4.54839 11.0968 4.54839H8.77419V12.0323C8.77419 12.4598 8.42758 12.8065 8 12.8065C7.57242 12.8065 7.22581 12.4598 7.22581 12.0323V4.54839H4.90323C4.47565 4.54839 4.12903 4.20177 4.12903 3.77419ZM3.38615 5.29127C3.68849 5.59361 3.68849 6.08381 3.38615 6.38615L1.86907 7.90323L3.38615 9.4203C3.68849 9.72265 3.68849 10.2128 3.38615 10.5152C3.08381 10.8175 2.59361 10.8175 2.29127 10.5152L0.226756 8.45066C-0.0755853 8.14832 -0.0755853 7.65813 0.226756 7.35579L2.29127 5.29127C2.59361 4.98893 3.08381 4.98893 3.38615 5.29127ZM12.6139 5.29127C12.9162 4.98893 13.4064 4.98893 13.7087 5.29127L15.7732 7.35579C16.0756 7.65813 16.0756 8.14832 15.7732 8.45066L13.7087 10.5152C13.4064 10.8175 12.9162 10.8175 12.6139 10.5152C12.3115 10.2128 12.3115 9.72265 12.6139 9.4203L14.1309 7.90323L12.6139 6.38615C12.3115 6.08381 12.3115 5.59361 12.6139 5.29127Z"
                                            fill="currentColor"
                                        />
                                    </motion.svg>
                                </div>

                                <h2 className="h-full ">Keeb Type</h2>

                                <motion.div
                                    variants={lineHover}
                                    className="bg-green-500 w-full h-1"
                                ></motion.div>
                            </motion.div>
                        </Link>
                        <Link
                            href={"/marketplace"}
                            aria-label="Checkout out keyboard listings"
                            className=" h-full "
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <motion.div
                                className="flex flex-col items-center relative h-full"
                                whileHover="hover"
                                initial="initial"
                            >
                                <div className="h-[65%] flex-col flex justify-end relative flex-shrink-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        version="1.1"
                                        viewBox="100 100 1080 569"
                                        className="h-12 w-20 z-30 text-green-500 "
                                        fill="none"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeWidth="50"
                                            d="M727.1,236.7l8.8-46.6c0,0,2.5-4.9,10.9-3.5c8.5,1.4,348.4,52.6,348.4,52.6s7.8,1.8,7.8,10.9    s0.5,320.5,0.5,320.5s2.6,10.6-14.6,10.6c-17.2,0-902,1.4-902,1.4s-10.8,1.6-10.4-9.9c0.5-11.5,0.5-327.3,0.5-327.3    s0.6-6.6,10.9-8.1c10.4-1.5,313.6-49.3,313.6-49.3s7.2-2.4,10.4,7.1c3.2,9.4,8.5,40.7,8.5,40.7s0.8,2.4,2.4,2.4    c1.6,0,201.3-0.3,201.3-0.3S726.5,238.1,727.1,236.7z"
                                        />
                                    </svg>
                                    <motion.svg
                                        className="w-8 h-8 absolute left-1/2 -translate-x-1/2 bottom-2 text-green-500"
                                        variants={marketHover}
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="-1 0 19 19"
                                    >
                                        <path d="M16.41 7.675v7.047a.476.476 0 0 1-.475.475H1.095a.476.476 0 0 1-.476-.475V7.675a.476.476 0 0 1 .475-.475h14.84a.476.476 0 0 1 .476.475zM11.803 11.2a3.181 3.181 0 1 0-.25 1.242 3.173 3.173 0 0 0 .25-1.242zm-1.976.116a1.094 1.094 0 0 1 .27.719 1.07 1.07 0 0 1-.537.924 1.725 1.725 0 0 1-.551.227v.365a.396.396 0 1 1-.792 0v-.36a1.867 1.867 0 0 1-.363-.112 1.219 1.219 0 0 1-.468-.344.396.396 0 1 1 .598-.518.44.44 0 0 0 .164.126 1.132 1.132 0 0 0 .216.07 1.692 1.692 0 0 0 .234.028 1.027 1.027 0 0 0 .532-.147c.176-.114.176-.212.176-.26a.307.307 0 0 0-.075-.197.681.681 0 0 0-.178-.143.904.904 0 0 0-.22-.079 1.029 1.029 0 0 0-.215-.021 2.128 2.128 0 0 1-.354-.029 1.62 1.62 0 0 1-.456-.147 1.317 1.317 0 0 1-.433-.347 1.116 1.116 0 0 1-.257-.7 1.13 1.13 0 0 1 .562-.955 1.714 1.714 0 0 1 .537-.216v-.352a.396.396 0 0 1 .792 0v.363a1.938 1.938 0 0 1 .37.127 1.408 1.408 0 0 1 .411.283.396.396 0 0 1-.559.56.612.612 0 0 0-.177-.121 1.165 1.165 0 0 0-.223-.078l-.023-.005a1.125 1.125 0 0 0-.184-.031 1.028 1.028 0 0 0-.52.14.345.345 0 0 0-.194.285.338.338 0 0 0 .08.2.54.54 0 0 0 .172.14.847.847 0 0 0 .232.074 1.338 1.338 0 0 0 .224.017 1.824 1.824 0 0 1 .384.04 1.696 1.696 0 0 1 .42.152 1.46 1.46 0 0 1 .405.322z" />
                                    </motion.svg>
                                </div>

                                <h2 className="h-full">Marketplace</h2>
                                <motion.div
                                    variants={lineHover}
                                    className="bg-green-500 w-full h-1"
                                ></motion.div>
                            </motion.div>
                        </Link>
                        <Link
                            href={"/share"}
                            aria-label="Share your keyboard with others"
                            className=" h-full "
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <motion.div
                                className="flex flex-col items-center relative h-full"
                                whileHover="hover"
                                initial="initial"
                            >
                                <div className="h-[65%] flex-col flex justify-end relative flex-shrink-0 text-green-500 ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        version="1.1"
                                        viewBox="50 140 1188 625"
                                        className="h-12 w-20 z-30  "
                                        fill="none"
                                    >
                                        <g>
                                            <path
                                                name="right case"
                                                stroke="currentColor"
                                                strokeWidth="50"
                                                d="M793.1,281.1h243.8c0,0,91.8,0.9,122.4,9.9c30.6,8.9,35.8,29.6,35.8,39.1s0,242.8,0,242.8s5.2,30.1-24,30.1c-29.2,0-82.4,0-82.4,0s-30.6-1.4-36.7,21.2c-6.1,22.6-19.3,25.4-29.2,25.4c-9.9,0-175.1,0-175.1,0s-15.2-1.1-22.6,6c-7.4,7.1-32.8,24.4-44.1,20.5s-17.6-7.4-24.4-16.2s-40.2-62.1-49.4-85.4c-9.2-23.3-21.5-59.3-21.5-87.5c0-28.2,0-169.8,0-169.8s-3.2-36,26.1-36l6.7,8.7h68.8L793.1,281.1z"
                                            />
                                            <path
                                                name="left case"
                                                stroke="currentColor"
                                                strokeWidth="50"
                                                d="M486.9,281.1H243.2c0,0-91.8,0.9-122.4,9.9c-30.6,8.9-35.8,29.6-35.8,39.1s0,242.8,0,242.8s-5.2,30.1,24,30.1s82.4,0,82.4,0s30.6-1.4,36.7,21.2c6.1,22.6,19.3,25.4,29.2,25.4s175.1,0,175.1,0s15.2-1.1,22.6,6c7.4,7.1,32.8,24.4,44.1,20.5c11.3-3.9,17.6-7.4,24.4-16.2s40.2-62.1,49.4-85.4c9.2-23.3,21.5-59.3,21.5-87.5c0-28.2,0-169.8,0-169.8s3.2-36-26.1-36l-6.7,8.7h-68.8L486.9,281.1z"
                                            />
                                            <path
                                                name="usb"
                                                stroke="currentColor"
                                                strokeWidth="35"
                                                d="M724.1,244.7v-30.8h-15.9v30.8c-3.3,0.6-5.8,3.6-5.8,7.1v34.1h27.5v-34.1C729.9,248.3,727.4,245.4,724.1,244.7z"
                                            />
                                            <path
                                                name="usb"
                                                stroke="currentColor"
                                                strokeWidth="35"
                                                d="M571.6,244.7v-30.8h-15.9v30.8c-3.3,0.6-5.8,3.6-5.8,7.1v34.1h27.5v-34.1C577.4,248.3,574.9,245.4,571.6,244.7z"
                                            />

                                            <path
                                                name="loop"
                                                stroke="currentColor"
                                                strokeWidth="20"
                                                d="M721.1,228.4h-10v-28.9c0-39.3-32-71.2-71.2-71.2s-71.2,32-71.2,71.2v22.9h-10v-22.9c0-44.8,36.4-81.2,81.2-81.2    s81.2,36.4,81.2,81.2V228.4z"
                                            />
                                        </g>
                                    </svg>

                                    <motion.svg
                                        className="w-4 h-4 absolute bottom-4 right-3 "
                                        variants={keebShareHover}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </motion.svg>
                                    <motion.svg
                                        className="w-4 h-4 absolute bottom-4 left-3 "
                                        variants={keebShareHover}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </motion.svg>
                                </div>

                                <h2 className="h-full">Share</h2>
                                <motion.div
                                    variants={lineHover}
                                    className="bg-green-500 w-full h-1"
                                ></motion.div>
                            </motion.div>
                        </Link>
                        <Link
                            href={"/shop"}
                            aria-label="Shop mechanical keyboards"
                            className=" h-full "
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <motion.div
                                className="flex flex-col items-center relative h-full"
                                whileHover="hover"
                                initial="initial"
                            >
                                <div className="h-[65%] flex-col flex justify-end relative flex-shrink-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-12 w-20 z-10 text-green-500  "
                                        viewBox="100 100 1080 569"
                                        fill="none"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeWidth="50"
                                            d="M139.6,196.7l7.9,365.2c0,0-4.9,37.4,32.5,37.4s917.6,0.7,917.6,0.7s36,5.6,38.1-38.8    c1.8-36.8,4-281.6,4.7-364.8c0.1-15.2-12.2-27.6-27.4-27.6H167C151.6,168.7,139.3,181.4,139.6,196.7z"
                                        />

                                        <rect
                                            x="330"
                                            y="290"
                                            width="630"
                                            height="165"
                                            fill="currentColor"
                                            opacity="0.2"
                                        />
                                        <rect
                                            x="400"
                                            y="454"
                                            width="480"
                                            height="44"
                                            fill="currentColor"
                                            opacity="0.2"
                                        />
                                    </svg>

                                    <motion.svg
                                        className="w-6 h-6 absolute left-1/2 -translate-x-1/2 bottom-3 text-green-500 z-20"
                                        variants={keebShopHover}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M10 8H7C4.79086 8 3 9.79086 3 12V12C3 14.2091 4.79086 16 7 16H10M14 8H17C19.2091 8 21 9.79086 21 12V12C21 14.2091 19.2091 16 17 16H14M9 12H15"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </motion.svg>
                                </div>
                                <h2 className="h-full">Shop</h2>

                                <motion.div
                                    variants={lineHover}
                                    className="bg-green-500 w-full h-1"
                                ></motion.div>
                            </motion.div>
                        </Link>
                        <Link
                            href={"/profile"}
                            aria-label="share your keyboard with others"
                            className="h-full"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <motion.div
                                className="flex flex-col items-center relative h-full"
                                whileHover="hover"
                                initial="initial"
                            >
                                <div className="h-[65%] flex-col flex justify-end relative flex-shrink-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-12 w-20 z-30 text-green-500  "
                                        viewBox="-30 -60 1200 380"
                                        fill="none"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeWidth="30"
                                            strokeLinecap="round"
                                            d="M1093.56 359.4H31.4381C14.123 359.4 0 347.776 0 333.524V25.8762C0 11.6244 14.123 0 31.4381 0H1093.56C1110.88 0 1125 11.6244 1125 25.8762V333.603C1125 347.776 1110.88 359.4 1093.56 359.4ZM31.4381 23.8857C30.0838 23.8857 29.0198 24.7615 29.0198 25.8762V333.603C29.0198 334.718 30.0838 335.594 31.4381 335.594H1093.56C1094.92 335.594 1095.98 334.718 1095.98 333.603V25.8762C1095.98 24.7615 1094.92 23.8857 1093.56 23.8857H31.4381Z"
                                        />
                                    </svg>
                                    <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-7 h-7 absolute left-1/2 -translate-x-1/2 bottom-2 text-green-500"
                                        viewBox="0 0 76 76"
                                        version="1.1"
                                        variants={profileHover}
                                    >
                                        <path
                                            fill="currentColor"
                                            strokeWidth="0.2"
                                            strokeLinejoin="round"
                                            d="M 26.7728,20.5833C 29.8731,20.5833 32.3864,23.0966 32.3864,26.197C 32.3864,29.2973 29.8731,31.8106 26.7728,31.8106C 23.6724,31.8106 21.1591,29.2973 21.1591,26.197C 21.1591,23.0966 23.6724,20.5833 26.7728,20.5833 Z M 49.2273,20.5833C 52.3276,20.5833 54.8409,23.0967 54.8409,26.197C 54.8409,29.2973 52.3276,31.8106 49.2273,31.8106C 46.127,31.8106 43.6136,29.2973 43.6136,26.197C 43.6136,23.0967 46.127,20.5833 49.2273,20.5833 Z M 20.5833,39.5834L 55.4166,39.5834C 57.1655,39.5834 58.5833,41.0011 58.5833,42.75C 58.5833,44.4989 57.1655,45.9167 55.4166,45.9167L 55.4166,49.875C 55.4166,55.5589 49.2256,60.1667 43.5417,60.1667C 37.8577,60.1667 31.6667,55.5589 31.6667,49.875L 31.6667,45.9167L 20.5833,45.9167C 18.8344,45.9167 17.4167,44.4989 17.4167,42.75C 17.4167,41.0011 18.8344,39.5834 20.5833,39.5834 Z M 36.4167,45.9167L 36.4167,48.2917C 36.4167,52.2267 39.6066,55.4167 43.5417,55.4167C 47.4767,55.4167 50.6667,52.2267 50.6667,48.2917L 50.6667,45.9167L 45.9166,45.9167L 45.9166,49.875C 45.9166,51.1867 44.8533,52.25 43.5416,52.25C 42.23,52.25 41.1666,51.1867 41.1666,49.875L 41.1666,45.9167L 36.4167,45.9167 Z "
                                        />
                                    </motion.svg>
                                </div>

                                <h2 className="h-full">Profile</h2>

                                <motion.div
                                    variants={lineHover}
                                    className="bg-green-500 w-full h-1"
                                ></motion.div>
                            </motion.div>
                        </Link>

                        <motion.div className="flex flex-col gap-1 items-center">
                            <button
                                onClick={() => {
                                    if (isSecondaryMenuOpen === false) {
                                        setIsSecondaryMenuOpen(true);
                                    } else {
                                        setIsSecondaryMenuOpen(false);
                                    }
                                }}
                                className="hover:text-green-500 ease-in relative "
                                ref={secondaryMenuButtonRef}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-8 "
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M9.0003 21H15.0003M18.0003 8.6C18.0003 7.11479 17.3682 5.69041 16.2429 4.6402C15.1177 3.59 13.5916 3 12.0003 3C10.409 3 8.88288 3.59 7.75766 4.6402C6.63245 5.69041 6.0003 7.11479 6.0003 8.6C6.0003 11.2862 5.32411 13.1835 4.52776 14.4866C3.75646 15.7486 3.37082 16.3797 3.38515 16.5436C3.40126 16.7277 3.4376 16.7925 3.58633 16.9023C3.71872 17 4.34793 17 5.60636 17H18.3943C19.6527 17 20.2819 17 20.4143 16.9023C20.563 16.7925 20.5994 16.7277 20.6155 16.5436C20.6298 16.3797 20.2441 15.7486 19.4729 14.4866C18.6765 13.1835 18.0003 11.2862 18.0003 8.6Z"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>

                                {sessionData && (
                                    <DisplayNotificationCount
                                        userId={sessionData.user.id}
                                    />
                                )}
                            </button>
                            <Link
                                href={"/profile/messages"}
                                aria-label="share your keyboard with others"
                                className="hover:text-green-500 ease-in "
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-8 "
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
                            </Link>
                        </motion.div>

                        {/*    {sessionData === null ? (
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
                                    <svg viewBox="-140 -30 640 300">
                                        <circle
                                            id="sun"
                                            cx="-85"
                                            cy="20"
                                            r="37"
                                            stroke="none"
                                            fill="#251586"
                                        />
                                    </svg>
                                    <h2>Profile</h2>
                                </motion.div>
                            </motion.button>
                        ) : pathname === "/profile" ? (
                            <motion.button
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
                                    <h2>Sign out</h2>
                                </motion.div>
                            </motion.button>
                        ) : (
                            <Link
                                href={"/profile"}
                                aria-label="share your keyboard with others"
                                className="hover:text-green-500 ease-in "
                                onClick={() => setIsMenuOpen(false)}
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
                        )} */}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isSecondaryMenuOpen && (
                    <motion.div
                        className="bg-black/90 rounded-lg fixed top-60 right-14 w-[400px] h-[400px] overflow-y-auto p-3"
                        ref={secondaryMenuRef}
                        variants={secondaryMenuAppear}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <NotificationCheck
                            setIsMenuOpen={setIsMenuOpen}
                            setIsSecondaryMenuOpen={setIsSecondaryMenuOpen}
                            session={sessionData}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
