import { motion } from "framer-motion";
import TitleScripts from "~/app/_components/TitleScripts";
import Link from "next/link";
import Footer from "~/app/_components/Footer/mainFooter";
import { useState } from "react";
import ModalDialog from "~/app/_components/Modal";
import SupportMe from "~/app/_components/Footer/supportModal";

export default function KeebDex() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    //

    return (
        <>
            <div className="text-4xl text-green-500">
                <TitleScripts page={"keebdex"} />
            </div>

            <div className="z-30 mt-10 flex flex-col gap-5  rounded-3xl bg-darkGray px-20 py-10 text-green-500 ">
                <Link
                    className=" keebdex-button flex justify-center gap-2 rounded-2xl bg-black px-6 py-4"
                    href={`/keebdex/how-keeby-works`}
                    aria-label="typing tips"
                >
                    <span style={{ zIndex: "10" }}>How Keeby Works</span>
                    <svg
                        className="keebdex-button-arrow w-6 rounded-full bg-none p-1"
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
                </Link>
                <Link
                    className=" keebdex-button flex justify-center gap-2 rounded-2xl bg-black px-6 py-4"
                    href={`/keebdex/frequently-asked-questions`}
                    aria-label="typing tips"
                >
                    <span style={{ zIndex: "10" }}>FAQ</span>
                    <svg
                        className="keebdex-button-arrow w-6 rounded-full bg-none p-1"
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
                </Link>

                <Link
                    className=" keebdex-button flex justify-center gap-2 rounded-2xl bg-black px-6 py-4"
                    href={`/keebdex/scam-prevention`}
                    aria-label="typing tips"
                >
                    <span style={{ zIndex: "10" }}>
                        How Do I Prevent Scams?
                    </span>
                    <svg
                        className="keebdex-button-arrow w-6 rounded-full bg-none p-1"
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
                </Link>

                <Link
                    className=" keebdex-button flex justify-center gap-2 rounded-2xl bg-black px-6 py-4"
                    href={`/keebdex/typing-tips`}
                    aria-label="typing tips"
                >
                    <span style={{ zIndex: "10" }}>Typing Stats Explained</span>
                    <svg
                        className="keebdex-button-arrow w-6 rounded-full bg-none p-1"
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
                </Link>
                <Link
                    className=" keebdex-button flex justify-center gap-2 rounded-2xl bg-black px-6 py-4"
                    href={`/keebdex/typing-tips`}
                    aria-label="typing tips"
                >
                    <span style={{ zIndex: "10" }}>
                        How Do I Get Better At Typing?
                    </span>
                    <svg
                        className="keebdex-button-arrow w-6 rounded-full bg-none p-1"
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
                </Link>
                <button
                    className=" keebdex-button flex justify-center gap-2 rounded-2xl bg-black px-6 py-4"
                    onClick={openModal}
                >
                    <span style={{ zIndex: "10" }}>Can I Support Keeby?</span>
                    <svg
                        className="keebdex-button-arrow w-6 rounded-full bg-none p-1"
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
                </button>

                <Link
                    className=" keebdex-button flex justify-center gap-2 rounded-2xl bg-black px-6 py-4"
                    href={`/keebdex/about`}
                    aria-label="about keeby"
                >
                    <span style={{ zIndex: "10" }}>About</span>
                    <svg
                        className="keebdex-button-arrow w-6 rounded-full bg-none p-1"
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
                </Link>
                <Link
                    className=" keebdex-button flex justify-center gap-2 rounded-2xl bg-black px-6 py-4"
                    href={`/keebdex/contact`}
                    aria-label="contact"
                >
                    <span style={{ zIndex: "10" }}>Contact</span>
                    <svg
                        className="keebdex-button-arrow w-6 rounded-full bg-none p-1"
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
                </Link>
            </div>
            <div className="text-mediumGray">
                <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                    <SupportMe />
                </ModalDialog>
            </div>
            <div className="mt-56 w-full ">
                <Footer />
            </div>
        </>
    );
}
