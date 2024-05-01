import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import menuBurger from "../../../public/Nav/menu.png";
import menuBurgerGif from "../../../public/Gifs/menu-glitch.gif";
import homeButton from "../../../public/Nav/home.png";
import homeButtonBlack from "../../../public/Nav/home-black.png";
import defaultProfile from "@public/Profile/profile-default.png";
import keebo from "@public/Profile/keebo.png";
import { useRouter } from "next/router";
import { themeStyles } from "../KeebType/Theme/themeStyles";
import type { ThemeName } from "../KeebType/Theme/themeStyles";
import { useTheme } from "../Context/Theme";
import DisplayNotifications from "../Notifications/Display/displayNotifications";
import DisplayNotificationCount from "../Notifications/Display/displayCount";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isNotificationOpen, setIsNotificationOpen] =
        useState<boolean>(false);

    const [isMenuGif, setIsMenuGif] = useState<boolean>(false);
    const [isClosingMenu, setIsClosingMenu] = useState<boolean>(false);

    const menuRef = useRef<HTMLDivElement | null>(null);
    const notificationRef = useRef<HTMLDivElement | null>(null);

    const menuButtonRef = useRef<HTMLButtonElement | null>(null);
    const router = useRouter();

    const { data: sessionData } = useSession();
    const { theme } = useTheme();
    const styles = themeStyles[theme as ThemeName] || themeStyles["KEEBY"];

    const handleClose = useCallback(() => {
        setIsMenuOpen(false);
        setIsNotificationOpen(false);
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
                (notificationRef.current === null ||
                    (notificationRef.current &&
                        !notificationRef.current.contains(e.target as Node))) &&
                menuButtonRef.current &&
                !menuButtonRef.current.contains(e.target as Node)
            ) {
                handleClose();
            }
        },
        [isMenuOpen, handleClose]
    );
    console.log("helloooo", notificationRef);

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
            className={`sticky top-0 z-10 flex items-center justify-between 
              ${
                  router.asPath === "/" || router.asPath === "/keebshare"
                      ? "bg-dark"
                      : "bg-none"
              }  menu-index py-4 pl-2 text-white desktop:pl-14`}
            aria-label="Main Navigation"
        >
            <Link href="/" aria-label="Home">
                {router.asPath === "/keebtype" ? (
                    <Image
                        src={theme === "KEEBY" ? homeButton : homeButtonBlack}
                        alt="home"
                        width={homeButton.width}
                        height={homeButton.height}
                        className={`w-72 ${styles.title}`}
                        priority
                    />
                ) : (
                    <Image
                        src={homeButton}
                        alt="home"
                        width={homeButton.width}
                        height={homeButton.height}
                        className="w-72"
                        priority
                    />
                )}
            </Link>
            <div className="flex items-center gap-14 text-darkGray desktop:gap-32">
                {router.asPath === "/keebshare" ? (
                    <Link href="/" aria-label="shop">
                        <button className=" keeb-share-preview-button flex items-center gap-2 pr-2  ">
                            <svg
                                className="keeb-share-preview-button-arrow w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                                ></path>
                            </svg>
                            <span className="keeb-share-preview-button-text">
                                KEEB SHOP
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="keeb-share-preview-button-circle w-[6px]"
                                viewBox="0 0 32 32"
                            >
                                <circle cx="16" cy="16" r="16" />
                            </svg>
                        </button>
                    </Link>
                ) : router.asPath.startsWith("/keebshare/") ||
                  router.asPath === "/" ? (
                    <Link href="/keebshare" aria-label="share">
                        <button className=" keeb-share-preview-button flex items-center gap-2   ">
                            <svg
                                className="keeb-share-preview-button-arrow w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                                ></path>
                            </svg>
                            <span className="keeb-share-preview-button-text">
                                KEEB SHARE
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="keeb-share-preview-button-circle w-[6px]"
                                viewBox="0 0 32 32"
                            >
                                <circle cx="16" cy="16" r="16" />
                            </svg>
                        </button>
                    </Link>
                ) : router.asPath === "/keebtype" ? (
                    <Link
                        href="/"
                        aria-label="type"
                        className={`${styles.textColor}`}
                    >
                        <button className=" keeb-share-preview-button flex items-center gap-2 pr-2  ">
                            <svg
                                className="keeb-share-preview-button-arrow w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                                ></path>
                            </svg>
                            <span className="keeb-share-preview-button-text">
                                KEEB SHOP
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="keeb-share-preview-button-circle w-[6px]"
                                viewBox="0 0 32 32"
                            >
                                <circle cx="16" cy="16" r="16" />
                            </svg>
                        </button>
                    </Link>
                ) : (
                    <Link href="/" aria-label="shop">
                        <button className=" keeb-share-preview-button flex items-center gap-2 pr-2  ">
                            <svg
                                className="keeb-share-preview-button-arrow w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                                ></path>
                            </svg>
                            <span className="keeb-share-preview-button-text">
                                KEEB SHOP
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="keeb-share-preview-button-circle w-[6px]"
                                viewBox="0 0 32 32"
                            >
                                <circle cx="16" cy="16" r="16" />
                            </svg>
                        </button>
                    </Link>
                )}

                <motion.button
                    onClick={toggleMenu}
                    ref={menuButtonRef}
                    className="mr-5 w-36 rounded-3xl px-6 py-2 desktop:mr-10"
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
                        <>
                            <motion.div
                                animate={{
                                    scale: [0, 1],
                                    y: [-150, 0],
                                    x: [90, 0],
                                }}
                                exit={{ scale: 0, y: -170, x: 60 }}
                                transition={{
                                    delay: 0.5,
                                    duration: 0.5,
                                    type: "easeIn",
                                }}
                                ref={menuRef}
                                className="dropdown-menu-gif absolute right-5 top-40 flex w-80 justify-between rounded-lg px-5 py-5 text-white"
                            >
                                <div className="flex flex-col justify-between">
                                    <Link
                                        href="/"
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
                                        href="/keebtype"
                                        aria-label="contact"
                                        onClick={handleClose}
                                    >
                                        <motion.button
                                            className="flex w-32 justify-center rounded-md bg-white/10 px-4 py-1 transition-colorBackground duration-200 ease-custom-cubic hover:bg-black/50 hover:text-green-500"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            KEEB TYPE
                                        </motion.button>
                                    </Link>
                                    <Link
                                        href="/keebshare"
                                        aria-label="keeb share"
                                        onClick={handleClose}
                                    >
                                        <motion.button
                                            className="flex w-32 justify-center rounded-md bg-white/10 px-4 py-1 transition-colorBackground duration-200 ease-custom-cubic hover:bg-black/50 hover:text-green-500"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            KEEB SHARE
                                        </motion.button>
                                    </Link>

                                    <div className="flex w-32 justify-between">
                                        <Link
                                            href="/keebdex"
                                            aria-label="keebdex"
                                            onClick={handleClose}
                                        >
                                            <motion.button
                                                className="rounded-md bg-white/10 p-1  transition-colorBackground duration-200 ease-custom-cubic hover:bg-black/50 hover:text-green-500"
                                                whileHover={{ scale: 1.15 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Image
                                                    src={keebo}
                                                    alt="keebo"
                                                    className="h-6 w-6 "
                                                />
                                            </motion.button>
                                        </Link>
                                        <Link
                                            href="/profile/messages"
                                            aria-label="messages"
                                            onClick={() => {
                                                if (sessionData === null) {
                                                    void signIn();
                                                } else handleClose();
                                            }}
                                        >
                                            <motion.button
                                                className="rounded-md bg-white/10 p-1 transition-colorBackground duration-200 ease-custom-cubic hover:bg-black/50 hover:text-green-500"
                                                whileHover={{ scale: 1.15 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 "
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M7 9H17M7 13H12M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </motion.button>
                                        </Link>
                                        <motion.button
                                            className="relative rounded-md bg-white/10 p-1 transition-colorBackground duration-200 ease-custom-cubic hover:bg-black/50 hover:text-green-500"
                                            whileHover={{ scale: 1.15 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                if (sessionData === null) {
                                                    void signIn();
                                                } else
                                                    setIsNotificationOpen(
                                                        !isNotificationOpen
                                                    );
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6  "
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
                                        </motion.button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {sessionData === null ? (
                                        <motion.button
                                            className="flex justify-start"
                                            whileHover={{
                                                scale: 1.05,
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => void signIn()}
                                        >
                                            <Image
                                                alt="profile"
                                                src={defaultProfile}
                                                width={400}
                                                height={400}
                                                className="h-28 w-28 rounded-md object-cover"
                                            />
                                        </motion.button>
                                    ) : (
                                        <Link
                                            href="/play/profile"
                                            aria-label="projects"
                                            onClick={handleClose}
                                        >
                                            <motion.button
                                                className="flex justify-start"
                                                whileHover={{
                                                    scale: 1.05,
                                                }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Image
                                                    alt="profile"
                                                    src={
                                                        sessionData.user.profile
                                                            ? sessionData.user
                                                                  .profile
                                                            : defaultProfile
                                                    }
                                                    width={400}
                                                    height={400}
                                                    className="h-28 w-28 rounded-md object-cover"
                                                />
                                            </motion.button>
                                        </Link>
                                    )}

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
                            {isNotificationOpen === true && (
                                <motion.div
                                    ref={notificationRef}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{
                                        opacity: {
                                            duration: 0.3,
                                            ease: "easeInOut",
                                        },
                                        y: { duration: 0.3, ease: "easeInOut" },
                                    }}
                                    className=" absolute right-5 top-96 flex h-96 w-80 justify-between overflow-y-auto rounded-lg bg-black/50 p-2 "
                                >
                                    {sessionData ? (
                                        <DisplayNotifications
                                            userId={sessionData.user.id}
                                        />
                                    ) : (
                                        <div
                                            className=" mb-2 flex w-full gap-2 rounded-md bg-white/5 p-2 text-xs text-darkGray transition-background duration-400 ease-custom-cubic hover:bg-white/10 "
                                            aria-label="notification"
                                        >
                                            <div className="flex w-full flex-col items-start">
                                                <div className="flex w-full">
                                                    No new notifications
                                                </div>

                                                <h1 className="mt-2 text-green-500 ">
                                                    All caught up!
                                                </h1>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
