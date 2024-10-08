"use client";
import Image from "next/image";
import hacktime from "@public/Vectors/hacktime.png";
import keebo from "@public/Profile/keebo.png";
import title from "@public/Nav/home.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import ModalDialog from "../Context/Modal";
import SupportMe from "./supportModal";
import { useGlobalState } from "../Context/GlobalState/globalState";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Footer() {
    const { data: session } = useSession();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { footerInViewRef, setPageNumber } = useGlobalState();
    const pathname = usePathname();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (pathname.includes("/share") || pathname.includes("/marketplace")) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setPageNumber((prev: number) => prev + 1);
                        }
                    });
                },
                { threshold: 0.1 },
            );

            if (footerInViewRef.current) {
                observer.observe(footerInViewRef.current);
            }

            return () => {
                if (footerInViewRef.current) {
                    observer.unobserve(footerInViewRef.current);
                }
            };
        }
    }, [footerInViewRef, pathname, setPageNumber]);

    useEffect(() => {
        if (pathname.includes("/share") || pathname.includes("/marketplace")) {
            setPageNumber(1);
        }
    }, [pathname, setPageNumber]);

    return (
        <div
            className=" w-full bg-darkGray p-2 laptop:px-20  laptop:pt-10 text-mediumGray text-xs tablet:text-sm laptop:text-base"
            ref={footerInViewRef}
        >
            <div className="flex w-full justify-between ">
                <div className="flex w-full laptop:w-96 laptop:flex-col laptop:items-start items-center justify-between flex-wrap gap-3">
                    <div className="w-full">
                        <Link
                            className="flex items-center hover:opacity-75 w-full "
                            href={"/"}
                            aria-label="Go to the homepage"
                        >
                            <Image
                                alt="homepage logo"
                                src={title}
                                width={200}
                                height={200}
                                className=" w-auto h-8 laptop:h-12 object-contain"
                            />
                            <Image
                                alt="keeby mascot"
                                src={keebo}
                                width={200}
                                height={200}
                                className=" h-6 w-6 laptop:h-9 laptop:w-9 object-contain"
                            />
                        </Link>
                        <p className="mt-3 w-full">
                            Keeby is the one place for everything mechanical
                            keyboard.
                        </p>
                    </div>
                    <div className="laptop:mt-3 flex items-center gap-3 ">
                        <a
                            href="https://www.youtube.com/@KeebyLive?sub_confirmation=1"
                            target="_blank"
                            rel="noopener noreferrer"
                            role="button"
                            aria-label="Subscribe on YouTube"
                            onClick={(e) => {
                                e.preventDefault();
                                window.open(
                                    "https://www.youtube.com/@KeebyLive?sub_confirmation=1",
                                    "_blank",
                                );
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                id="Layer_1"
                                viewBox="0 0 461.001 461.001"
                                className="w-5 cursor-pointer ease-in hover:text-green-500"
                            >
                                <g>
                                    <path
                                        fill="currentColor"
                                        d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728   c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137   C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607   c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"
                                    />
                                </g>
                            </svg>
                        </a>
                        <a
                            href="https://www.instagram.com/keeby.live/?hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            role="button"
                            aria-label="Follow on Instagram"
                            onClick={(e) => {
                                e.preventDefault();
                                window.open(
                                    "https://www.instagram.com/keeby.live/?hl=en",
                                    "_blank",
                                );
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 ease-in hover:text-green-500"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                                    fill="currentColor"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/stevenanderson-dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            role="button"
                            aria-label="Follow on LinkedIn"
                            onClick={(e) => {
                                e.preventDefault();
                                window.open(
                                    "https://www.linkedin.com/in/stevenanderson-dev/",
                                    "_blank",
                                );
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className=" w-4 ease-in hover:text-green-500"
                                viewBox="0 0 552.77 552.77"
                            >
                                <g>
                                    <g>
                                        <path d="M17.95,528.854h71.861c9.914,0,17.95-8.037,17.95-17.951V196.8c0-9.915-8.036-17.95-17.95-17.95H17.95    C8.035,178.85,0,186.885,0,196.8v314.103C0,520.816,8.035,528.854,17.95,528.854z" />
                                        <path d="M17.95,123.629h71.861c9.914,0,17.95-8.036,17.95-17.95V41.866c0-9.914-8.036-17.95-17.95-17.95H17.95    C8.035,23.916,0,31.952,0,41.866v63.813C0,115.593,8.035,123.629,17.95,123.629z" />
                                        <path d="M525.732,215.282c-10.098-13.292-24.988-24.223-44.676-32.791c-19.688-8.562-41.42-12.846-65.197-12.846    c-48.268,0-89.168,18.421-122.699,55.27c-6.672,7.332-11.523,5.729-11.523-4.186V196.8c0-9.915-8.037-17.95-17.951-17.95h-64.192    c-9.915,0-17.95,8.035-17.95,17.95v314.103c0,9.914,8.036,17.951,17.95,17.951h71.861c9.915,0,17.95-8.037,17.95-17.951V401.666    c0-45.508,2.748-76.701,8.244-93.574c5.494-16.873,15.66-30.422,30.488-40.649c14.83-10.227,31.574-15.343,50.24-15.343    c14.572,0,27.037,3.58,37.393,10.741c10.355,7.16,17.834,17.19,22.436,30.104c4.604,12.912,6.904,41.354,6.904,85.33v132.627    c0,9.914,8.035,17.951,17.949,17.951h71.861c9.914,0,17.949-8.037,17.949-17.951V333.02c0-31.445-1.982-55.607-5.941-72.48    S535.836,228.581,525.732,215.282z" />
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="hidden laptop:flex gap-12 ">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-green-500">Explore</h2>

                        <Link
                            href="/shop"
                            aria-label="shop keyboard products"
                            className="ease-in hover:text-green-500"
                        >
                            Keeb Shop
                        </Link>
                        <Link
                            href="/share"
                            aria-label="share your keyboards with others"
                            className="ease-in hover:text-green-500"
                        >
                            Keeb Share
                        </Link>
                        <Link
                            href="/"
                            aria-label="Play keeb type!"
                            className="ease-in hover:text-green-500"
                        >
                            Keeb Type
                        </Link>
                        <Link
                            href="/marketplace"
                            aria-label="look at mechanical keyboard listings"
                            className="ease-in hover:text-green-500"
                        >
                            Marketplace
                        </Link>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-green-500">Keeby Users</h2>
                        <Link
                            href="/profile"
                            aria-label="profile"
                            className="ease-in hover:text-green-500"
                        >
                            Profile
                        </Link>
                        <Link
                            href="/how-keeby-works"
                            aria-label="learn how keeby works"
                            className="ease-in hover:text-green-500"
                        >
                            How Keeby works
                        </Link>
                        <Link
                            href="/scam-prevention"
                            aria-label="prevent marketplace scams"
                            className="ease-in hover:text-green-500"
                        >
                            Scam Prevention
                        </Link>
                        <Link
                            href="/profile/messages"
                            aria-label="See your messages"
                            className="ease-in hover:text-green-500"
                        >
                            Messages
                        </Link>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-green-500">Help</h2>
                        <Link
                            href="/contact"
                            aria-label="contact us for support"
                            className="ease-in hover:text-green-500"
                        >
                            Contact Us
                        </Link>
                        {session && (
                            <div>
                                <button
                                    onClick={() => void signOut()}
                                    className="ease-in hover:text-green-500 p-0 m-0"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                        <Link
                            href="/frequently-asked-questions"
                            aria-label="frequently asked questions"
                            className="ease-in hover:text-green-500"
                        >
                            FAQ
                        </Link>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-green-500">Company</h2>
                        <Link
                            href="/about"
                            aria-label="Learn about Keeby!"
                            className="ease-in hover:text-green-500"
                        >
                            About
                        </Link>
                        <Link
                            href="/newsletter"
                            aria-label="Want to join our Newsletter?"
                            className="ease-in hover:text-green-500"
                        >
                            Newsletter
                        </Link>
                        <button
                            onClick={openModal}
                            className="ease-in hover:text-green-500"
                            aria-label="Want to Support Keeby?"
                        >
                            Support Keeby
                        </button>

                        <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                            <SupportMe />
                        </ModalDialog>
                    </div>
                </div>
            </div>

            <div className="flex w-full laptop:hidden justify-between gap-10 mt-5 flex-wrap ">
                <div className="flex flex-col gap-1 ">
                    <h2 className="text-green-500">Explore</h2>

                    <Link
                        href="/shop"
                        aria-label="shop keyboard products"
                        className="ease-in hover:text-green-500"
                    >
                        Keeb Shop
                    </Link>
                    <Link
                        href="/share"
                        aria-label="share your keyboards with others"
                        className="ease-in hover:text-green-500"
                    >
                        Keeb Share
                    </Link>
                    <Link
                        href="/"
                        aria-label="Play keeb type!"
                        className="ease-in hover:text-green-500"
                    >
                        Keeb Type
                    </Link>
                    <Link
                        href="/marketplace"
                        aria-label="look at mechanical keyboard listings"
                        className="ease-in hover:text-green-500"
                    >
                        Marketplace
                    </Link>
                </div>
                <div className="flex flex-col gap-1 ">
                    <h2 className="text-green-500">Keeby Users</h2>
                    <Link
                        href="/profile"
                        aria-label="profile"
                        className="ease-in hover:text-green-500"
                    >
                        Profile
                    </Link>
                    <Link
                        href="/how-keeby-works"
                        aria-label="learn how keeby works"
                        className="ease-in hover:text-green-500"
                    >
                        How Keeby works
                    </Link>
                    <Link
                        href="/scam-prevention"
                        aria-label="prevent marketplace scams"
                        className="ease-in hover:text-green-500"
                    >
                        Scam Prevention
                    </Link>
                    <Link
                        href="/profile/messages"
                        aria-label="See your messages"
                        className="ease-in hover:text-green-500"
                    >
                        Messages
                    </Link>
                </div>
                <div className="flex flex-col gap-1 ">
                    <h2 className="text-green-500">Help</h2>
                    <Link
                        href="/contact"
                        aria-label="contact us for support"
                        className="ease-in hover:text-green-500"
                    >
                        Contact Us
                    </Link>
                    {session && (
                        <div>
                            <button
                                onClick={() => void signOut()}
                                aria-label="Sign out of your account"
                                className="ease-in hover:text-green-500 p-0 m-0"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                    <Link
                        href="/frequently-asked-questions"
                        aria-label="frequently asked questions"
                        className="ease-in hover:text-green-500"
                    >
                        FAQ
                    </Link>
                </div>
                <div className="flex flex-col gap-1 ">
                    <h2 className="text-green-500">Company</h2>
                    <Link
                        href="/about"
                        aria-label="Learn about Keeby!"
                        className="ease-in hover:text-green-500"
                    >
                        About
                    </Link>
                    <Link
                        href="/newsletter"
                        aria-label="Want to join our Newsletter?"
                        className="ease-in hover:text-green-500"
                    >
                        Newsletter
                    </Link>
                    <button
                        onClick={openModal}
                        className="ease-in hover:text-green-500"
                        aria-label="Want to Support Keeby?"
                    >
                        Support Keeby
                    </button>

                    <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                        <SupportMe />
                    </ModalDialog>
                </div>
            </div>

            <div className="mt-5  justify-between border-t-2 border-mediumGray py-5 hidden laptop:flex">
                <div className="flex  items-center gap-2">
                    <div>Built for enthusiasts |</div>

                    <a
                        href="https://www.steven-anderson.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        role="button"
                        aria-label="Follow on LinkedIn"
                        onClick={(e) => {
                            e.preventDefault();
                            window.open(
                                "https://www.steven-anderson.com",
                                "_blank",
                            );
                        }}
                        className="powered-by flex items-center gap-2 transition-colors duration-400 ease-custom-cubic hover:text-green-500"
                    >
                        powered by Hacktime
                        <Image
                            alt="hacktime logo"
                            src={hacktime}
                            width={200}
                            height={200}
                            className="png-green powered-by-logo h-6 w-6 "
                        />
                    </a>
                </div>
                <div className="flex gap-5">
                    {session && session.user.isAdmin && (
                        <Link
                            href="/admin"
                            aria-label="admin"
                            className="ease-in hover:text-green-500"
                        >
                            Admin
                        </Link>
                    )}
                    <Link
                        href="/terms-of-service"
                        aria-label="privacy"
                        className="ease-in hover:text-green-500"
                    >
                        Terms
                    </Link>
                    <Link
                        href="/privacy-policy"
                        aria-label="privacy"
                        className="ease-in hover:text-green-500"
                    >
                        Privacy
                    </Link>
                    <Link
                        href="/cookie-policy"
                        aria-label="privacy"
                        className="ease-in hover:text-green-500"
                    >
                        Cookie
                    </Link>
                </div>
            </div>

            <div className="mt-3 justify-between border-t-2 border-mediumGray py-3 flex flex-col laptop:hidden">
                <div className="flex gap-2">
                    {session && session.user.isAdmin && (
                        <Link
                            href="/admin"
                            aria-label="admin"
                            className="ease-in hover:text-green-500"
                        >
                            Admin
                        </Link>
                    )}
                    <Link
                        href="/terms-of-service"
                        aria-label="Read our terms"
                        className="ease-in hover:text-green-500"
                    >
                        Terms
                    </Link>
                    <Link
                        href="/privacy-policy"
                        aria-label="Learn about your privacy"
                        className="ease-in hover:text-green-500"
                    >
                        Privacy
                    </Link>
                    <Link
                        href="/cookie-policy"
                        aria-label="Learn about our cookies"
                        className="ease-in hover:text-green-500"
                    >
                        Cookie
                    </Link>
                </div>
                <div className="flex  items-center gap-2 mt-3">
                    <div>Built for enthusiasts |</div>

                    <a
                        href="https://www.steven-anderson.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        role="button"
                        aria-label="Follow on LinkedIn"
                        onClick={(e) => {
                            e.preventDefault();
                            window.open(
                                "https://www.steven-anderson.com",
                                "_blank",
                            );
                        }}
                        className="powered-by flex items-center gap-2 transition-colors duration-400 ease-custom-cubic hover:text-green-500"
                    >
                        powered by Hacktime
                        <Image
                            alt="hacktime logo"
                            src={hacktime}
                            width={200}
                            height={200}
                            className="png-green powered-by-logo w-4 h-4 laptop:h-6 laptop:w-6 "
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}
