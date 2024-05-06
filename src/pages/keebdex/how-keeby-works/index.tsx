import Image from "next/image";
import keebo from "@public/profile/keebo.png";
import MainFooter from "~/components/Footer/mainFooter";

export default function HowKeebyWorks() {
    return (
        <>
            <div className="h-full w-full px-40 ">
                <div
                    className="fixed left-0 right-0 top-0 min-h-full bg-green-300"
                    style={{ zIndex: 1 }}
                ></div>
                <div
                    className="absolute right-40 top-[200px] h-[400px] w-[750px] bg-[#FFE033]"
                    style={{ zIndex: 2 }}
                ></div>
                <div
                    className="absolute left-40 top-[600px] h-[400px] w-[750px] bg-[#FFE033]"
                    style={{ zIndex: 2 }}
                ></div>
                <div
                    className="absolute left-[400px] top-[450px] flex h-[400px] w-[750px] items-end justify-center bg-violet-300"
                    style={{
                        zIndex: 2,
                        boxShadow: "3px 3px 0px black, 6px 6px 0px black",
                    }}
                >
                    <Image alt="keeby mascot" src={keebo} className="w-80" />
                </div>
                <div
                    className="absolute left-0 top-[1200px] h-[2000px] w-[700px] bg-[#FFE033]"
                    style={{ zIndex: 2 }}
                ></div>

                {/* first page */}
                <div className=" relative flex" style={{ zIndex: 3 }}>
                    <div className="h-full w-1/2">
                        <h1
                            className="relative mt-10 flex flex-col font-titillium text-9xl text-[#FFE033]"
                            style={{
                                zIndex: 3,
                                textShadow:
                                    "6px 6px 0px black, 6px 6px 0px black",
                            }}
                        >
                            <div className="-mb-5">HOW KEEBY</div>
                            <div>WORKS</div>
                        </h1>
                        <div className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute left-[4px] top-[8px] -z-10 h-40 w-40 text-black  "
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M2.31212 9L1 10.5094L4.77355 13.7897L6.28297 15.1018L7.59509 13.5924L9.13456 11.8214L11.3988 13.7897L12.9082 15.1018L14.2203 13.5924L15.7584 11.823L18.0209 13.7897L19.5303 15.1018L20.8424 13.5924L22.8106 11.3283L21.3012 10.0162L19.333 12.2803L15.5594 9L14.2473 10.5094L14.249 10.5109L12.7109 12.2803L8.93736 9L8.05395 10.0163L6.08567 12.2803L2.31212 9Z"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="z-20 h-40 w-40  text-white "
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M2.31212 9L1 10.5094L4.77355 13.7897L6.28297 15.1018L7.59509 13.5924L9.13456 11.8214L11.3988 13.7897L12.9082 15.1018L14.2203 13.5924L15.7584 11.823L18.0209 13.7897L19.5303 15.1018L20.8424 13.5924L22.8106 11.3283L21.3012 10.0162L19.333 12.2803L15.5594 9L14.2473 10.5094L14.249 10.5109L12.7109 12.2803L8.93736 9L8.05395 10.0163L6.08567 12.2803L2.31212 9Z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="h-full w-1/2 pl-72">
                        <h2
                            className="relative  mt-40 flex flex-col font-titillium text-8xl text-white"
                            style={{
                                textShadow:
                                    "6px 6px 0px black, 5px 5px 0px black",
                            }}
                        >
                            <div className="-mb-4">BUY</div>
                            <div className="-mb-4">SELL</div>
                            <div className="-mb-4">SHARE</div>
                            <div>TYPE!</div>
                        </h2>
                        <div className=" mt-10 flex flex-col items-start gap-2 text-2xl text-black">
                            <button className="flex items-center gap-5  transition-colors duration-300 ease-custom-cubic hover:text-white ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12 rotate-180  "
                                    viewBox="-10 -20 140 140"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <g id="Layer_2" data-name="Layer 2">
                                        <g id="Layer_1-2" data-name="Layer 1">
                                            <path
                                                strokeWidth="10px"
                                                d="M60.3,78.46c-.31,5-.39,9-.82,12.91-.86,7.85-7.86,11.57-14.92,7.85A63.53,63.53,0,0,1,34.4,92.84Q19.67,81,5.29,68.78C-.35,64-1.3,58.65,1.58,51.82a30.86,30.86,0,0,1,2.19-4.65A302.23,302.23,0,0,1,31.91,9.31a48.7,48.7,0,0,1,7.64-6.84C46-2.3,51.84,0,53.52,7.92a65.45,65.45,0,0,1,.78,7.69c.14,1.66.24,3.33.4,5.53a32.54,32.54,0,0,0,4.39.14c7.11-.83,14.18-2.09,21.3-2.57a246.17,246.17,0,0,1,24.89-.54c7.68.26,11.38,3.91,12.77,11.46a112.58,112.58,0,0,1,1.63,24.8c-.05,1.42-.31,2.84-.49,4.25-1,8.35-5.08,13.81-14,14.64a17.63,17.63,0,0,0-4.09,1.24A65.73,65.73,0,0,1,78.3,78.24C72.6,78.16,66.9,78.37,60.3,78.46Z"
                                            />
                                        </g>
                                    </g>
                                </svg>
                                <button>Keeb Shop</button>
                            </button>
                            <button className="flex items-center gap-5  transition-colors duration-300 ease-custom-cubic hover:text-white ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12 rotate-180  "
                                    viewBox="-10 -20 140 140"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <g id="Layer_2" data-name="Layer 2">
                                        <g id="Layer_1-2" data-name="Layer 1">
                                            <path
                                                strokeWidth="10px"
                                                d="M60.3,78.46c-.31,5-.39,9-.82,12.91-.86,7.85-7.86,11.57-14.92,7.85A63.53,63.53,0,0,1,34.4,92.84Q19.67,81,5.29,68.78C-.35,64-1.3,58.65,1.58,51.82a30.86,30.86,0,0,1,2.19-4.65A302.23,302.23,0,0,1,31.91,9.31a48.7,48.7,0,0,1,7.64-6.84C46-2.3,51.84,0,53.52,7.92a65.45,65.45,0,0,1,.78,7.69c.14,1.66.24,3.33.4,5.53a32.54,32.54,0,0,0,4.39.14c7.11-.83,14.18-2.09,21.3-2.57a246.17,246.17,0,0,1,24.89-.54c7.68.26,11.38,3.91,12.77,11.46a112.58,112.58,0,0,1,1.63,24.8c-.05,1.42-.31,2.84-.49,4.25-1,8.35-5.08,13.81-14,14.64a17.63,17.63,0,0,0-4.09,1.24A65.73,65.73,0,0,1,78.3,78.24C72.6,78.16,66.9,78.37,60.3,78.46Z"
                                            />
                                        </g>
                                    </g>
                                </svg>
                                <button>Keeb Share</button>
                            </button>
                            <button className="z-20 flex items-center  gap-5 transition-colors duration-300 ease-custom-cubic hover:text-white ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12 rotate-180  "
                                    viewBox="-10 -20 140 140"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <g id="Layer_2" data-name="Layer 2">
                                        <g id="Layer_1-2" data-name="Layer 1">
                                            <path
                                                strokeWidth="10px"
                                                d="M60.3,78.46c-.31,5-.39,9-.82,12.91-.86,7.85-7.86,11.57-14.92,7.85A63.53,63.53,0,0,1,34.4,92.84Q19.67,81,5.29,68.78C-.35,64-1.3,58.65,1.58,51.82a30.86,30.86,0,0,1,2.19-4.65A302.23,302.23,0,0,1,31.91,9.31a48.7,48.7,0,0,1,7.64-6.84C46-2.3,51.84,0,53.52,7.92a65.45,65.45,0,0,1,.78,7.69c.14,1.66.24,3.33.4,5.53a32.54,32.54,0,0,0,4.39.14c7.11-.83,14.18-2.09,21.3-2.57a246.17,246.17,0,0,1,24.89-.54c7.68.26,11.38,3.91,12.77,11.46a112.58,112.58,0,0,1,1.63,24.8c-.05,1.42-.31,2.84-.49,4.25-1,8.35-5.08,13.81-14,14.64a17.63,17.63,0,0,0-4.09,1.24A65.73,65.73,0,0,1,78.3,78.24C72.6,78.16,66.9,78.37,60.3,78.46Z"
                                            />
                                        </g>
                                    </g>
                                </svg>
                                <button>Keeb Type</button>
                            </button>
                        </div>
                        <div className="relative bottom-10 mb-5 flex w-full justify-end ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute -right-[4px] top-[8px] -z-10 h-40 w-40 text-black  "
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M2.31212 9L1 10.5094L4.77355 13.7897L6.28297 15.1018L7.59509 13.5924L9.13456 11.8214L11.3988 13.7897L12.9082 15.1018L14.2203 13.5924L15.7584 11.823L18.0209 13.7897L19.5303 15.1018L20.8424 13.5924L22.8106 11.3283L21.3012 10.0162L19.333 12.2803L15.5594 9L14.2473 10.5094L14.249 10.5109L12.7109 12.2803L8.93736 9L8.05395 10.0163L6.08567 12.2803L2.31212 9Z"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="z-20 h-40 w-40  text-violet-500 "
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M2.31212 9L1 10.5094L4.77355 13.7897L6.28297 15.1018L7.59509 13.5924L9.13456 11.8214L11.3988 13.7897L12.9082 15.1018L14.2203 13.5924L15.7584 11.823L18.0209 13.7897L19.5303 15.1018L20.8424 13.5924L22.8106 11.3283L21.3012 10.0162L19.333 12.2803L15.5594 9L14.2473 10.5094L14.249 10.5109L12.7109 12.2803L8.93736 9L8.05395 10.0163L6.08567 12.2803L2.31212 9Z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* second page temp */}

                <h1 className="z-20 mt-96">this is how keeby works</h1>
                <h1 className="z-10 mt-96">this is how keeby works</h1>
                <h1 className="z-10 mt-96">this is how keeby works</h1>
                <h1 className="z-10 mt-96">this is how keeby works</h1>
                <h1 className="z-10 mt-96">this is how keeby works</h1>
            </div>
            <div className="z-20 w-full">
                <MainFooter />
            </div>
        </>
    );
}
