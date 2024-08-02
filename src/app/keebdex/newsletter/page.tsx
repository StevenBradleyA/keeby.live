import { signIn, useSession } from "next-auth/react";

import Footer from "~/app/_components/Footer/mainFooter";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";

export default function Newsletter() {
    const { data: sessionData, status, update } = useSession();
    const utils = api.useUtils();

    const { mutate } = api.user.updateNewsletter.useMutation({
        onSuccess: async (data) => {
            try {
                if (data?.isNewsletter === true) {
                    toast.success("Newsletter Joined!", {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#fff",
                        },
                    });
                }
                if (data?.isNewsletter === false) {
                    toast.success("Newsletter Left!", {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#fff",
                        },
                    });
                }

                await update();
                void utils.user.invalidate();
            } catch (error) {
                console.error("Error while navigating:", error);
            }
        },
    });

    const handleNewsletterUpdate = (
        e: React.FormEvent,
        newsletter: boolean,
    ) => {
        e.preventDefault();

        if (
            newsletter !== sessionData?.user.isNewsletter &&
            sessionData?.user.id
        ) {
            const data = {
                userId: sessionData.user.id,
                isNewsletter: newsletter,
            };
            mutate(data);
        }
    };

    return (
        <>
            <div
                className="fixed bottom-0 left-0 right-0 top-0  "
                style={{
                    background:
                        "linear-gradient(to bottom, #87CEEB,#A0DFFD,#B0E0E6 , #ADD8E6, #C3B1E1, #D6A6D6, #FBC1CC)",
                }}
            ></div>
            <div className="relative z-10 h-[88vh] w-full overflow-hidden">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2"
                    viewBox="-1 -1 34 34"
                >
                    <defs>
                        <linearGradient
                            id="sunsetGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop offset="0%" stopColor="#FFF9B0" />
                            <stop offset="25%" stopColor="#FFF2A1" />
                            <stop offset="50%" stopColor="#FFD59E" />
                            <stop offset="75%" stopColor="#FFA07A" />
                            <stop offset="100%" stopColor="#FF6F61" />
                        </linearGradient>
                    </defs>
                    <circle
                        cx="16"
                        cy="16"
                        r="16"
                        fill="url(#sunsetGradient)"
                    />
                </svg>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="textWhite absolute right-[25%] top-32 z-20  h-[300px] w-[300px]"
                    viewBox="0 -0.5 17 17"
                    version="1.1"
                    fill="currentCOlor"
                >
                    <defs></defs>
                    <g fillRule="evenodd">
                        <path d="M13.797,7.445 C13.547,7.445 13.31,7.513 13.084,7.613 C12.39,6.577 11.252,5.899 9.965,5.899 C9.759,5.899 9.558,5.921 9.36,5.955 C8.678,4.826 7.491,4.075 6.135,4.075 C4.225,4.075 2.645,5.566 2.356,7.513 C2.338,7.513 2.322,7.509 2.305,7.509 C1.024,7.509 -0.013,8.613 -0.013,9.976 L15.987,9.976 C15.848,8.551 14.926,7.445 13.797,7.445 L13.797,7.445 Z"></path>
                    </g>
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="textWhite absolute left-[25%] top-0 z-20  h-[300px] w-[300px]"
                    viewBox="0 -0.5 17 17"
                    version="1.1"
                    fill="currentCOlor"
                >
                    <defs></defs>
                    <g fillRule="evenodd">
                        <path d="M13.797,7.445 C13.547,7.445 13.31,7.513 13.084,7.613 C12.39,6.577 11.252,5.899 9.965,5.899 C9.759,5.899 9.558,5.921 9.36,5.955 C8.678,4.826 7.491,4.075 6.135,4.075 C4.225,4.075 2.645,5.566 2.356,7.513 C2.338,7.513 2.322,7.509 2.305,7.509 C1.024,7.509 -0.013,8.613 -0.013,9.976 L15.987,9.976 C15.848,8.551 14.926,7.445 13.797,7.445 L13.797,7.445 Z"></path>
                    </g>
                </svg>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    className="absolute right-[32%] top-[500px] z-30 h-40 w-40 text-black "
                    viewBox="0 0 64 40"
                    stroke="currentColor"
                    fill="#F3E5AB"
                >
                    <g>
                        <g transform="translate(1.000000, 1.000000)">
                            <path
                                strokeWidth=".5"
                                d="M0,36c0,1.104,0.896,2,2,2h58    c1.104,0,2-0.896,2-2V2c0-1.104-0.896-2-2-2H2C0.896,0,0,0.896,0,2V36L0,36z"
                            />
                            <path
                                strokeWidth=".5"
                                d="M62,2    c0-1.104-31,22.032-31,22.032S0,1.144,0,2"
                            />
                            <path strokeWidth=".5" d="M61,37L37,20" />
                            <path strokeWidth=".5" d="M1,37l24-17" />
                        </g>
                    </g>
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    className="absolute right-[31%] top-[485px] z-30 h-40 w-40 text-black "
                    viewBox="0 0 64 40"
                    stroke="currentColor"
                    fill="#F3E5AB"
                >
                    <g>
                        <g transform="translate(1.000000, 1.000000)">
                            <path
                                strokeWidth=".5"
                                d="M0,36c0,1.104,0.896,2,2,2h58    c1.104,0,2-0.896,2-2V2c0-1.104-0.896-2-2-2H2C0.896,0,0,0.896,0,2V36L0,36z"
                            />
                            <path
                                strokeWidth=".5"
                                d="M62,2    c0-1.104-31,22.032-31,22.032S0,1.144,0,2"
                            />
                            <path strokeWidth=".5" d="M61,37L37,20" />
                            <path strokeWidth=".5" d="M1,37l24-17" />
                        </g>
                    </g>
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    className="absolute right-[30%] top-[470px] z-30 h-40 w-40 text-black "
                    viewBox="0 0 64 40"
                    stroke="currentColor"
                    fill="#F3E5AB"
                >
                    <g>
                        <g transform="translate(1.000000, 1.000000)">
                            <path
                                strokeWidth=".5"
                                d="M0,36c0,1.104,0.896,2,2,2h58    c1.104,0,2-0.896,2-2V2c0-1.104-0.896-2-2-2H2C0.896,0,0,0.896,0,2V36L0,36z"
                            />
                            <path
                                strokeWidth=".5"
                                d="M62,2    c0-1.104-31,22.032-31,22.032S0,1.144,0,2"
                            />
                            <path strokeWidth=".5" d="M61,37L37,20" />
                            <path strokeWidth=".5" d="M1,37l24-17" />
                        </g>
                    </g>
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    className="absolute right-[29%] top-[455px] z-30 h-40 w-40 text-black "
                    viewBox="0 0 64 40"
                    stroke="currentColor"
                    fill="#F3E5AB"
                >
                    <g>
                        <g transform="translate(1.000000, 1.000000)">
                            <path
                                strokeWidth=".5"
                                d="M0,36c0,1.104,0.896,2,2,2h58    c1.104,0,2-0.896,2-2V2c0-1.104-0.896-2-2-2H2C0.896,0,0,0.896,0,2V36L0,36z"
                            />
                            <path
                                strokeWidth=".5"
                                d="M62,2    c0-1.104-31,22.032-31,22.032S0,1.144,0,2"
                            />
                            <path strokeWidth=".5" d="M61,37L37,20" />
                            <path strokeWidth=".5" d="M1,37l24-17" />
                        </g>
                    </g>
                </svg>
                <div className="absolute right-10 top-[200px] flex flex-col items-center font-retro text-black">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        className="-mb-2 w-28"
                        version="1.1"
                        stroke="black"
                    >
                        <path
                            d="M853.333333 256H469.333333l-85.333333-85.333333H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v170.666667h853.333334v-85.333334c0-46.933333-38.4-85.333333-85.333334-85.333333z"
                            fill="#E1D295"
                            strokeWidth="2px"
                        />
                        <path
                            d="M853.333333 256H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v426.666667c0 46.933333 38.4 85.333333 85.333334 85.333333h682.666666c46.933333 0 85.333333-38.4 85.333334-85.333333V341.333333c0-46.933333-38.4-85.333333-85.333334-85.333333z"
                            strokeWidth="2px"
                            fill="#F3E5AB"
                        />
                    </svg>
                    <div>My Keebs</div>
                </div>
                <div className="absolute right-10 top-[50px] flex flex-col items-center font-retro text-black">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        className="-mb-2 w-28"
                        version="1.1"
                        stroke="black"
                    >
                        <path
                            d="M853.333333 256H469.333333l-85.333333-85.333333H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v170.666667h853.333334v-85.333334c0-46.933333-38.4-85.333333-85.333334-85.333333z"
                            fill="#E1D295"
                            strokeWidth="2px"
                        />
                        <path
                            d="M853.333333 256H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v426.666667c0 46.933333 38.4 85.333333 85.333334 85.333333h682.666666c46.933333 0 85.333333-38.4 85.333334-85.333333V341.333333c0-46.933333-38.4-85.333333-85.333334-85.333333z"
                            strokeWidth="2px"
                            fill="#F3E5AB"
                        />
                    </svg>
                    <div>New Folder</div>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-1/3 top-5  h-16 w-16 text-yellow-200"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 3L13.4302 8.31181C13.6047 8.96 13.692 9.28409 13.8642 9.54905C14.0166 9.78349 14.2165 9.98336 14.451 10.1358C14.7159 10.308 15.04 10.3953 15.6882 10.5698L21 12L15.6882 13.4302C15.04 13.6047 14.7159 13.692 14.451 13.8642C14.2165 14.0166 14.0166 14.2165 13.8642 14.451C13.692 14.7159 13.6047 15.04 13.4302 15.6882L12 21L10.5698 15.6882C10.3953 15.04 10.308 14.7159 10.1358 14.451C9.98336 14.2165 9.78349 14.0166 9.54905 13.8642C9.28409 13.692 8.96 13.6047 8.31181 13.4302L3 12L8.31181 10.5698C8.96 10.3953 9.28409 10.308 9.54905 10.1358C9.78349 9.98336 9.98336 9.78349 10.1358 9.54905C10.308 9.28409 10.3953 8.96 10.5698 8.31181L12 3Z" />
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-[10%] top-[250px]  h-12 w-12 text-yellow-200"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 3L13.4302 8.31181C13.6047 8.96 13.692 9.28409 13.8642 9.54905C14.0166 9.78349 14.2165 9.98336 14.451 10.1358C14.7159 10.308 15.04 10.3953 15.6882 10.5698L21 12L15.6882 13.4302C15.04 13.6047 14.7159 13.692 14.451 13.8642C14.2165 14.0166 14.0166 14.2165 13.8642 14.451C13.692 14.7159 13.6047 15.04 13.4302 15.6882L12 21L10.5698 15.6882C10.3953 15.04 10.308 14.7159 10.1358 14.451C9.98336 14.2165 9.78349 14.0166 9.54905 13.8642C9.28409 13.692 8.96 13.6047 8.31181 13.4302L3 12L8.31181 10.5698C8.96 10.3953 9.28409 10.308 9.54905 10.1358C9.78349 9.98336 9.98336 9.78349 10.1358 9.54905C10.308 9.28409 10.3953 8.96 10.5698 8.31181L12 3Z" />
                </svg>
                <div className="mid-grid absolute z-20"></div>

                <div className="absolute left-[25%] top-[300px] z-50 w-[500px]  overflow-hidden rounded-xl border-[1px] border-black font-retro text-black">
                    <div className="flex h-10 w-full justify-between rounded-t-xl border-b-[1px] border-black bg-[#FBC1CC] px-4 py-2">
                        <div>
                            Status:{" "}
                            {sessionData?.user.isNewsletter
                                ? sessionData.user.isNewsletter === true
                                    ? "On the mailing list"
                                    : "Off the mailing list"
                                : "Off the mailing list"}
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="h-5 w-5 border-[1px] border-black bg-gray-100 p-[3px] text-black "
                            viewBox="0 0 16 16"
                        >
                            <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" />
                        </svg>
                    </div>
                    <div className="bg-gray-100 p-10 ">
                        <div className="flex items-center justify-center gap-5">
                            {sessionData?.user.isNewsletter === true ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="w-16 rounded-full bg-[#FBC1CC] p-3 text-gray-100"
                                    viewBox="0 0 32 32"
                                >
                                    <path d="M5 16.577l2.194-2.195 5.486 5.484L24.804 7.743 27 9.937l-14.32 14.32z" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="w-16 rounded-full bg-[#FBC1CC] p-3 text-gray-100"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" />
                                </svg>
                            )}

                            <h1 className="text-lg">
                                Newsletter - Get keebs for sale delivered to
                                your inbox
                            </h1>
                        </div>
                        <div className="mt-5 flex justify-center gap-10">
                            <button
                                className="border border-gray-400 border-l-gray-100 border-t-gray-100 bg-gray-200 px-4 py-2 text-black shadow-inner active:border-b-gray-400 active:border-l-gray-200 active:border-r-gray-400 active:border-t-gray-200"
                                onClick={(e) => {
                                    if (sessionData === null) {
                                        void signIn();
                                    } else handleNewsletterUpdate(e, true);
                                }}
                            >
                                Yes, Please
                            </button>
                            <button
                                className="border border-gray-400 border-l-gray-100 border-t-gray-100 bg-gray-200 px-4 py-2 text-black shadow-inner active:border-b-gray-400 active:border-l-gray-200 active:border-r-gray-400 active:border-t-gray-200"
                                onClick={(e) => {
                                    if (sessionData === null) {
                                        void signIn();
                                    } else handleNewsletterUpdate(e, false);
                                }}
                            >
                                No, Thank You
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" z-10 w-full">
                <Footer />
            </div>
        </>
    );
}
