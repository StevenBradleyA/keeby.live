import { motion } from "framer-motion";
import TitleScripts from "~/components/TitleScripts";
import Link from "next/link";
import MainFooter from "~/components/Footer";

export default function KeebDex() {
    return (
        <>
            <div className="text-4xl">
                <TitleScripts page={"keebdex"} />
            </div>

            <div className="z-30 mt-10 flex flex-col gap-5  rounded-xl bg-keebyGray px-28 py-12 text-green-500 ">
                <Link
                    className=" keebdex-button flex justify-center gap-2 rounded-md bg-black px-6 py-4"
                    href={`/keebdex/rules`}
                    aria-label="typing tips"
                >
                    <span style={{ zIndex: "10" }}>KEEBY Rules</span>
                    <svg
                        className="keebdex-button-arrow w-6 rounded-full bg-none p-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="3"
                            d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                        ></path>
                    </svg>
                </Link>
                <Link
                    className=" keebdex-button flex justify-center gap-2 rounded-md bg-black px-6 py-4"
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="3"
                            d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                        ></path>
                    </svg>
                </Link>
                <Link
                    className=" keebdex-button flex justify-center gap-2 rounded-md bg-black px-6 py-4"
                    href={`/keebdex/share-guidelines`}
                    aria-label="typing tips"
                >
                    <span style={{ zIndex: "10" }}>Keeb Share Guidlines</span>
                    <svg
                        className="keebdex-button-arrow w-6 rounded-full bg-none p-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="3"
                            d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                        ></path>
                    </svg>
                </Link>
                <Link
                    className=" keebdex-button flex justify-center gap-2 rounded-md bg-black px-6 py-4"
                    href={`/keebdex/about`}
                    aria-label="typing tips"
                >
                    <span style={{ zIndex: "10" }}>What Is KEEBY?</span>
                    <svg
                        className="keebdex-button-arrow w-6 rounded-full bg-none p-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="3"
                            d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                        ></path>
                    </svg>
                </Link>
                <Link
                    className=" keebdex-button flex justify-center gap-2 rounded-md bg-black px-6 py-4"
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="3"
                            d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                        ></path>
                    </svg>
                </Link>
                <Link
                    className=" keebdex-button flex justify-center gap-2 rounded-md bg-black px-6 py-4"
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="3"
                            d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                        ></path>
                    </svg>
                </Link>
                <Link
                    className=" keebdex-button flex justify-center gap-2 rounded-md bg-black px-6 py-4"
                    href={`/keebdex/typing-tips`}
                    aria-label="typing tips"
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="3"
                            d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                        ></path>
                    </svg>
                </Link>
            </div>
            <div className="mt-56 w-full ">
                <MainFooter />
            </div>
        </>
    );
}
