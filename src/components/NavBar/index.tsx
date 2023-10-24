import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Image from "next/image";
import menuBurger from "../../../public/Nav/menu.png";
import menuBurgerGif from "../../../public/Gifs/menu-glitch.gif";
import homeButton from "../../../public/Nav/home-test.png";
import keebo from "../../../public/Nav/bmo-test.jpg";

import homeGreenButton from "../../../public/Nav/home-green-test.png";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isMenuGif, setIsMenuGif] = useState<boolean>(false);
    const [isClosingMenu, setIsClosingMenu] = useState<boolean>(false);

    const menuRef = useRef<HTMLDivElement | null>(null);
    const menuButtonRef = useRef<HTMLButtonElement | null>(null);

    const { data: sessionData } = useSession();

    // todo maybe add scrip to add different nav gifs and box-shadows
    // todo maybe do a pixel neon town for dropdown and the options are neon signs

    // todo maybe want a different nav for typing game to keep things clean
    // const router = useRouter();

    // const [isHome, setIsHome] = useState(false);
    // const [isAboutUs, setIsAboutUs] = useState(false);
    // const [isProjects, setIsProjects] = useState(false);
    // const [isContactUs, setIsContactUs] = useState(false);
    // const [isSteven, setIsSteven] = useState(false);
    // const [isZaviar, setIsZaviar] = useState(false);

    // useEffect(() => {
    //   setIsHome(router.pathname === "/");
    //   setIsAboutUs(router.pathname === "/about-us");
    //   setIsProjects(router.pathname === "/projects");
    //   setIsContactUs(router.pathname === "/contact");
    //   setIsSteven(router.pathname === "/steven");
    //   setIsZaviar(router.pathname === "/zaviar");

    //   const handleRouteChange = (url: string) => {
    //     setIsHome(url === "/");
    //     setIsAboutUs(url === "/about-us");
    //     setIsProjects(url === "/projects");
    //     setIsContactUs(url === "/contact");
    //     setIsSteven(url === "/steven");
    //     setIsZaviar(url === "/zaviar");
    //   };

    //   router.events.on("routeChangeComplete", handleRouteChange);

    //   return () => {
    //     router.events.off("routeChangeComplete", handleRouteChange);
    //   };
    // }, [router.pathname]);

    // const toggleMenu = () => {
    //     setIsMenuOpen(!isMenuOpen);
    // };
    console.log(isClosingMenu);

    const handleClose = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
    }, []);

    const handleOutsideClick = useCallback(
        (e: MouseEvent) => {
            if (
                isMenuOpen &&
                menuRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                menuButtonRef.current &&
                !menuButtonRef.current.contains(e.target as Node)
            ) {
                handleClose();
            }
        },
        [isMenuOpen, handleClose]
    );

    useEffect(() => {
        window.addEventListener("mousedown", handleOutsideClick);
        if (isMenuOpen) {
            setIsClosingMenu(false);
            const timer = setTimeout(() => {
                setIsMenuGif(true);
            }, 500);

            return () => {
                clearTimeout(timer);
            };
        } else {
            if (isMenuGif) {
                setIsClosingMenu(true);
            }
            setIsMenuGif(false);
        }

        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isMenuOpen, handleClose, handleOutsideClick, isMenuGif]);

    return (
        <nav
            className="sticky top-0 z-10 mb-10 flex items-center justify-between 
              bg-dark  py-4 text-white"
            aria-label="Main Navigation"
        >
            <Link href="/" aria-label="Home">
                <Image
                    src={homeButton}
                    alt="home"
                    width={homeButton.width}
                    height={homeButton.height}
                    className="ml-10 w-72"
                />
            </Link>
            <div className="flex items-center gap-32">
                <Link href="/shop" aria-label="shop">
                    KEEB SHOP
                </Link>

                <motion.button
                    onClick={toggleMenu}
                    ref={menuButtonRef}
                    className="mr-10 w-36 rounded-3xl px-6 py-2"
                    animate={
                        isMenuOpen
                            ? { rotate: [0, 5, 10, isMenuGif ? 0 : 90] }
                            : { rotate: isClosingMenu ? [90, 85, 80, 0] : 0 }
                    }
                    transition={{ duration: isMenuGif ? 0 : 0.5 }}
                >
                    <Image
                        alt="menu-burger"
                        src={isMenuGif ? menuBurgerGif : menuBurger}
                        width={menuBurger.width}
                        height={menuBurger.height}
                    />
                </motion.button>
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            animate={{ scale: [0, 1], y: [-150, 0] }}
                            exit={{ scale: 0, y: -150 }}
                            transition={{
                                delay: 0.5,
                                duration: 0.5,
                                type: "easeIn",
                            }}
                            ref={menuRef}
                            className="dropdown-menu-gif absolute right-5 top-40 flex w-80 justify-between rounded-lg px-5 py-5"
                        >
                            <div className="flex flex-col justify-between">
                                <Link
                                    href="/shop"
                                    aria-label="projects"
                                    onClick={handleClose}
                                >
                                    <motion.button
                                        className="flex w-32 justify-center rounded-md bg-white/10 px-4 py-1 hover:bg-black/50 hover:text-green-500"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        KEEB SHOP
                                    </motion.button>
                                </Link>
                                <Link
                                    href="/"
                                    aria-label="contact"
                                    onClick={handleClose}
                                >
                                    <motion.button
                                        className="flex w-32 justify-center rounded-md bg-white/10 px-4 py-1 hover:bg-black/50 hover:text-green-500"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        KEEB TYPE
                                    </motion.button>
                                </Link>
                                <Link
                                    href="/share"
                                    aria-label="keeb share"
                                    onClick={handleClose}
                                >
                                    <motion.button
                                        className="flex w-32 justify-center rounded-md bg-white/10 px-4 py-1 hover:bg-black/50 hover:text-green-500"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        KEEB SHARE
                                    </motion.button>
                                </Link>
                                <Link
                                    href="/keebdex"
                                    aria-label="keebdex"
                                    onClick={handleClose}
                                >
                                    <motion.button
                                        className="flex w-32 justify-center rounded-md bg-white/10 px-4 py-1 hover:bg-black/50 hover:text-green-500"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        KEEBDEX
                                    </motion.button>
                                </Link>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Link
                                    href="/profile"
                                    aria-label="projects"
                                    onClick={handleClose}
                                >
                                    <motion.button
                                        className="flex justify-start"
                                        whileHover={{
                                            scale: 1.1,
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Image
                                            alt="profile"
                                            src={keebo}
                                            className="w-28"
                                        />
                                    </motion.button>
                                </Link>

                                <motion.button
                                    aria-label={
                                        sessionData ? "Sign out" : "Sign in"
                                    }
                                    className=" w-28 rounded-md bg-white/10 px-4 py-1 hover:bg-black/50 hover:text-green-500 "
                                    onClick={
                                        sessionData
                                            ? () => void signOut()
                                            : () => void signIn()
                                    }
                                    whileHover={{
                                        scale: 1.1,
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {sessionData ? "Sign out" : "Sign in"}
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
