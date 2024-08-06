"use client";
import Image from "next/image";
import portrait from "@public/About/portrait.png";
import leftKeeb from "@public/About/left.png";
import rightKeeb from "@public/About/right.png";
import template from "@public/About/template.png";
import keebo from "@public/Profile/keebo.png";
import { useState } from "react";
import ModalDialog from "~/app/_components/Modal";
import SupportMe from "~/app/_components/Footer/supportModal";
import Footer from "~/app/_components/Footer/footer";

export default function KeebyAbout() {
    // add support modal
    // external link to hacktime.dev
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="relative flex h-[80vh] w-full justify-center text-mediumGray">
                <Image
                    alt="about"
                    src={template}
                    className=" png-dark-gray absolute left-1/2 w-3/4 -translate-x-1/2 object-cover "
                />
                <div className="z-10 flex h-full w-2/3  flex-col  justify-between pb-5 pl-28 pr-32 pt-16">
                    <div className="flex h-full w-full items-center gap-5  ">
                        <div className="h-full w-40 flex-shrink-0 overflow-hidden border-2 border-mediumGray">
                            <Image
                                alt="keyboard"
                                src={leftKeeb}
                                className="relative bottom-2 h-[105%] w-full object-cover  "
                            />
                        </div>

                        <div className="flex h-full w-full flex-col  ">
                            <div className="relative flex h-1 bg-mediumGray">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute -left-4 -top-5 h-10 w-10 text-green-500"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12C7.97056 12 12 7.97056 12 3Z" />
                                </svg>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute -top-3 left-1/4 h-6 w-6 text-green-500"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute -top-3 left-[50%] h-6 w-6 text-green-500"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute -top-3 left-[45%] h-6 w-6 text-green-500"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
                                </svg>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute -right-4 -top-5 h-10 w-10 text-green-500"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12C7.97056 12 12 7.97056 12 3Z" />
                                </svg>
                            </div>
                            <p className=" mt-5">
                                I love mechanical keyboards, so I built Keeby. A
                                place where you can buy, sell, share and even
                                type with different boards. The keyboard
                                community is amazing, and I hope this
                                retro-futuristic inspired platform helps bring
                                people together.
                            </p>
                            <div className=" z-10 mt-5 h-1/2 w-full pb-5">
                                <Image
                                    alt="profile"
                                    src={portrait}
                                    className="h-full w-full  rounded-t-[80px] border-2 border-mediumGray object-cover "
                                />
                            </div>
                            <div className="relative h-full  w-full">
                                <h1
                                    className="absolute -bottom-10  font-titillium text-[230px]   "
                                    style={{
                                        transform: "scaleY(1.5)",
                                        letterSpacing: "5px",
                                    }}
                                >
                                    HELLO
                                </h1>
                            </div>
                        </div>

                        <div className="h-full w-40 flex-shrink-0 overflow-hidden border-2 border-mediumGray  ">
                            <Image
                                alt="keyboard"
                                src={rightKeeb}
                                className="relative bottom-2 h-[105%] w-full object-cover "
                            />
                        </div>
                    </div>
                    <div
                        className=" overflow-hidden whitespace-nowrap p-1 text-green-500 "
                        style={{ letterSpacing: "32px" }}
                    >
                        {` LOVE MECHANICAL KEYBOARDS`}
                    </div>
                </div>
            </div>

            <div className="mt-5 flex w-full justify-end px-10">
                <Image
                    alt="keeby mascot"
                    src={keebo}
                    className="relative bottom-12 h-40 w-40"
                />
            </div>

            <div className="flex w-[40%] items-center justify-center gap-20  ">
                <div className="flex flex-shrink-0 flex-col gap-2 text-xl">
                    <button
                        className="text-md about-button mt-5 flex items-center gap-2  rounded-md bg-black/30 px-4 py-2 text-green-500 "
                        onClick={openModal}
                    >
                        <span>Support</span>
                        <svg
                            className="about-button-arrow w-4"
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
                    <button className="text-md about-button mt-5 flex items-center gap-2  rounded-md bg-black/30 px-4 py-2 text-green-500">
                        <span>Hire me</span>
                        <svg
                            className="about-button-arrow-down w-4"
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
                </div>
                <p className="rounded-md border-2 border-mediumGray  p-10 text-lg text-green-500">
                    {` If you are a software engineer and would like to give me a
                    recommendation for a role or an interview that would mean a
                    lot. I'm a entry level dev currently looking for work so
                    please reach out. Thanks :D`}
                </p>
            </div>
            <div className="text-mediumGray">
                <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                    <SupportMe />
                </ModalDialog>
            </div>

            <div className="mt-80 w-full">
                <Footer />
            </div>
        </>
    );
}
