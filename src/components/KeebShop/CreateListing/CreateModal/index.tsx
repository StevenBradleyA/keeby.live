import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";

export default function CreateListingModal() {
    const { data: sessionData } = useSession();
    const isVerifiedSeller = sessionData?.user.isVerified === true;

    return (
        <>
            {sessionData === null ? (
                <div className="p-2">
                    <div className="flex items-end gap-2">
                        <h1 className="text-2xl text-green-500">
                            Sign in to list your keeb
                        </h1>
                        <Image alt="keebo" src={keebo} className="h-12 w-12" />
                    </div>
                    <div className=" flex justify-center">
                        <button
                            className="text-md keeb-share-preview-button mt-5 flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                            style={{
                                boxShadow: "0 0 20px #22C55E",
                            }}
                            onClick={() => void signIn()}
                        >
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
                                {`Let's Go `}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="keeb-share-preview-button-circle w-2"
                                viewBox="0 0 32 32"
                            >
                                <circle cx="16" cy="16" r="16" />
                            </svg>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="p-2">
                    <div className="flex items-end gap-2">
                        <h1 className="text-2xl text-green-500">
                            Ready to sell your keeb?
                        </h1>
                        <Image alt="keebo" src={keebo} className="h-12 w-12" />
                    </div>
                    <div className="flex justify-center">
                        <Link
                            href={
                                isVerifiedSeller
                                    ? "/create-listing"
                                    : "/verify-seller"
                            }
                            aria-label="create listing"
                        >
                            <button
                                className="text-md keeb-share-preview-button mt-5 flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                                style={{
                                    boxShadow: "0 0 20px #22C55E",
                                }}
                            >
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
                                    {`Let's Go `}
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="keeb-share-preview-button-circle w-2"
                                    viewBox="0 0 32 32"
                                >
                                    <circle cx="16" cy="16" r="16" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
