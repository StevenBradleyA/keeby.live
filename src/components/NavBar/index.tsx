import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Image from "next/image";
import menuBurger from "../../../public/Nav/menu.png";
import menuBurgerGif from "../../../public/Gifs/menu-glitch.gif";
import menuBurgerRotate from "../../../public/Gifs/menu-glitch.gif";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isMenuGif, setIsMenuGif] = useState<boolean>(false);
    const [isClosingMenu, setIsClosingMenu] = useState<boolean>(false);

    const menuRef = useRef<HTMLDivElement | null>(null);
    const menuButtonRef = useRef<HTMLButtonElement | null>(null);

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
            rounded-b-3xl  bg-black bg-opacity-40 py-4 text-white backdrop-blur-md"
            aria-label="Main Navigation"
        >
            <h1 className="rounded-md border-r-2 px-10 py-6 text-3xl">
                <Link href="/" aria-label="Home">
                    Starter Clone Jutsu
                </Link>
            </h1>
            <ul className="flex flex-grow justify-around text-2xl">
                <li>
                    <Link href="/posts" aria-label="Posts">
                        Market
                    </Link>
                </li>
                <li>
                    <Link href="/bookings" aria-label="Bookings">
                        My Profile
                    </Link>
                </li>
                <li>
                    <Link href="/images" aria-label="Images">
                        My Listings
                    </Link>
                </li>
            </ul>
            {/* <AuthController /> */}

            <motion.button
                onClick={toggleMenu}
                ref={menuButtonRef}
                className="mr-5 w-36 rounded-3xl px-6 py-2"
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
                        className="absolute right-5 top-40 bg-red-600 p-10"
                    >
                        <Link href="/" aria-label="Home" onClick={handleClose}>
                            <motion.button className="flex justify-start">
                                HOME
                            </motion.button>
                        </Link>
                        <Link
                            href="/about-us"
                            aria-label="projects"
                            onClick={handleClose}
                        >
                            <motion.button className="flex justify-start">
                                ABOUT US
                            </motion.button>
                        </Link>
                        <Link
                            href="/projects"
                            aria-label="projects"
                            onClick={handleClose}
                        >
                            <motion.button className="flex justify-start">
                                PROJECTS
                            </motion.button>
                        </Link>
                        <Link
                            href="/contact"
                            aria-label="contact"
                            onClick={handleClose}
                        >
                            <motion.button className="flex justify-start">
                                CONTACT
                            </motion.button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

function AuthController() {
    const { data: sessionData } = useSession();

    return (
        <div className="flex flex-col items-center justify-center gap-1 rounded-md border-l-2 px-10 py-2 text-base">
            <p className="text-center">
                {sessionData && <span>Hello {sessionData.user?.name}!</span>}
            </p>
            <button
                aria-label={sessionData ? "Sign out" : "Sign in"}
                className="rounded-full bg-white/10 px-4 py-2 font-semibold no-underline transition hover:bg-white/20"
                onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                }
            >
                {sessionData ? "Sign out" : "Sign in"}
            </button>
        </div>
    );
}
