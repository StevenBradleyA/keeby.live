import MainFooter from "~/components/Footer/mainFooter";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PreventingScams() {
    const script = ["WOW!", "AMAZING!", "POGGERS!"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % script.length);
    };
    return (
        <>
            <div className="h-full w-full ">
                <div
                    className="keebdex-grid-background"
                    style={{ zIndex: 1 }}
                ></div>

                <div
                    style={{ zIndex: 2 }}
                    className="relative flex w-full gap-96 px-40  "
                >
                    <div className="relative mt-20 flex w-1/3 flex-shrink-0 ">
                        <div
                            className="h-96 w-full overflow-hidden rounded-2xl border-2 border-black bg-[#F7F7EA] "
                            style={{
                                boxShadow:
                                    "3px 3px 0px black, 6px 6px 0px black",
                            }}
                        >
                            <div className="flex h-8 w-full items-center justify-between border-b-2 border-black bg-fuchsia-300 p-2 ">
                                <div className="h-3 w-2/3 rounded-2xl border-[1px] border-black bg-yellow-300 "></div>

                                <div className="flex items-center gap-1 text-xl text-black ">
                                    -{" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3 w-3"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <rect
                                            x="4"
                                            y="4"
                                            width="16"
                                            height="16"
                                            rx="2"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#000000"
                                        className="h-4 w-4"
                                        viewBox="0 0 1024 1024"
                                    >
                                        <path d="M697.4 759.2l61.8-61.8L573.8 512l185.4-185.4-61.8-61.8L512 450.2 326.6 264.8l-61.8 61.8L450.2 512 264.8 697.4l61.8 61.8L512 573.8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div
                            className="absolute left-10 top-16 flex h-96 w-full flex-col items-center  rounded-2xl border-2 border-black bg-[#F7F7EA] "
                            style={{
                                boxShadow:
                                    "3px 3px 0px black, 6px 6px 0px black",
                            }}
                        >
                            <div className="flex h-8 w-full items-center justify-between rounded-t-xl border-b-2 border-black bg-fuchsia-300 p-2">
                                <div className="h-3 w-2/3 rounded-2xl border-[1px] border-black bg-yellow-300 "></div>
                                <div className="flex items-center gap-1 text-xl text-black ">
                                    -{" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3 w-3"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <rect
                                            x="4"
                                            y="4"
                                            width="16"
                                            height="16"
                                            rx="2"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#000000"
                                        className="h-4 w-4"
                                        viewBox="0 0 1024 1024"
                                    >
                                        <path d="M697.4 759.2l61.8-61.8L573.8 512l185.4-185.4-61.8-61.8L512 450.2 326.6 264.8l-61.8 61.8L450.2 512 264.8 697.4l61.8 61.8L512 573.8z" />
                                    </svg>
                                </div>
                            </div>
                            <h1
                                className="mt-20 flex px-8 text-center font-titillium text-6xl text-[#FFE033] "
                                style={{
                                    WebkitTextStrokeWidth: "1px",
                                    WebkitTextStrokeColor: "black",
                                }}
                            >
                                HOW TO PREVENT SCAMS
                            </h1>
                            <h2 className="relative mt-10 text-2xl text-darkGray ">
                                {`10/10 Wouldn't get scammed again!`}
                                <button
                                    className="scam-prevention-button absolute -bottom-28 left-1/2 flex h-20 -translate-x-1/2  items-center rounded-2xl bg-fuchsia-500 px-12 font-titillium text-3xl text-black"
                                    style={{
                                        boxShadow:
                                            "3px 3px 0px black, 6px 6px 0px black",
                                    }}
                                    onClick={handleClick}
                                >
                                    {script[currentIndex]}
                                </button>
                            </h2>
                        </div>
                    </div>
                    <div className="h-96 w-full overflow-hidden rounded-2xl bg-violet-400">
                        <div className="flex h-8 w-full items-center justify-between bg-green-300 p-2 "></div>
                    </div>
                    {/* <div>all disputes are handled via paypal</div>
                    <div>
                        keeby does not handle disputes, we only refund buyer if
                        seller does not ship in time.{" "}
                    </div>
                    <div>
                        This is a community site so Please read seller reviews
                        and understand that there is a higher risk for new
                        sellers or sellers that have poor reviews.{" "}
                    </div>
                    <div>
                        Disputes are handled via paypal. To prevent scams for
                        sellers please record a video of your working keyboard /
                        packaging. Buyers record a short video of unboxing in
                        case sellers send you something different or non
                        functional.{" "}
                    </div>
                    <div>
                        Understand that by listing a keyboard on keeby you are
                        agreeing to be honest in your representation of your
                        keyboard. And scams by either buyers or sellers will not
                        be tolerated here.{" "}
                    </div> */}
                </div>
            </div>
            <div className="mt-96 w-full" style={{ zIndex: 2 }}>
                <MainFooter />
            </div>
        </>
    );
}
