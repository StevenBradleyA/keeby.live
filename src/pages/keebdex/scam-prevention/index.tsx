import MainFooter from "~/components/Footer/mainFooter";

export default function PreventingScams() {
    return (
        <>
            <div className="h-full w-full ">
                <div
                    className="keebdex-grid-background"
                    style={{ zIndex: 1 }}
                ></div>

                <div
                    style={{ zIndex: 2 }}
                    className="relative flex w-full px-40 gap-96  "
                >
                    <div className="relative flex w-1/3 flex-shrink-0 mt-20 ">
                        <div className="h-96 w-full overflow-hidden rounded-2xl bg-[#F7F7EA]">
                            <div className="flex h-8 w-full items-center justify-between bg-fuchsia-300 p-2 ">
                                <div className="h-2 w-2/3 rounded-2xl bg-yellow-300"></div>
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
                        <div className="absolute left-10 top-16 h-96 w-full overflow-hidden rounded-2xl bg-[#F7F7EA]">
                            <div className="flex h-8 w-full items-center justify-between bg-fuchsia-300 p-2 ">
                                <div className="h-2 w-2/3 rounded-2xl bg-yellow-300"></div>
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
                            <h1 className="mt-10 h-full w-full text-center font-titillium text-6xl text-yellow-300">
                                SCAM PREVENTION
                            </h1>
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
            <div className="mt-32 w-full">
                <MainFooter />
            </div>
        </>
    );
}
