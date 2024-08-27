"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoadingSpinner from "../_components/Loading";
import NotFound from "../not-found";
import AdminHeader from "../_components/Admin/adminHeader";
import Footer from "../_components/Footer/footer";

export default function Admin() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="mt-40 flex w-full justify-center text-red-500">
                <LoadingSpinner size="20px" />
            </div>
        );
    }

    if (!session || !session.user.isAdmin) {
        return <NotFound />;
    }

    return (
        <>
            {session && session.user.isAdmin && (
                <>
                    <div className="mt-28 w-full text-3xl text-failure px-3 laptop:px-16">
                        <AdminHeader />
                        <div className="w-full flex justify-center flex-wrap">
                            <div className="mt-10 flex gap-3 flex-wrap">
                                <Link
                                    href="/admin/listings"
                                    className="w-96 h-80 bg-black/50 rounded-3xl shadow-lg flex relative flex-col p-3 text-white hover:bg-black/40"
                                >
                                    <h3 className=" text-base ">Listings</h3>
                                    <p className="mt-10">
                                        Monitor marketplace listings{" "}
                                    </p>
                                    <div className="bg-white/50 w-full rounded-full  mt-10 flex justify-end">
                                        <div className="bg-black text-failure rounded-full p-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6 "
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M7 17L17 7M17 7H8M17 7V16"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                                <div className="w-96 h-80 flex flex-col gap-3">
                                    <Link
                                        href="/admin/posts"
                                        className="w-full h-1/2 bg-white/50 rounded-3xl shadow-lg flex relative flex-col p-3 text-white hover:bg-white/40"
                                    >
                                        <h3 className="absolute bottom-5 left-1/2 -translate-x-1/2 ">
                                            Posts
                                        </h3>

                                        <div className="absolute top-3 right-3">
                                            <div className="bg-black text-failure rounded-full p-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-6 h-6 "
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M7 17L17 7M17 7H8M17 7V16"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="flex gap-3 h-1/2 w-full ">
                                        <Link
                                            href="/admin/picks"
                                            className="w-1/2 h-full bg-red-500/50 rounded-3xl shadow-lg flex relative flex-col p-3 text-white hover:bg-red-500/40"
                                        >
                                            <h3 className="absolute bottom-5 left-1/2 -translate-x-1/2 ">
                                                Picks
                                            </h3>

                                            <div className="absolute top-3 right-3">
                                                <div className="bg-black text-failure rounded-full p-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-6 h-6 "
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M7 17L17 7M17 7H8M17 7V16"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/admin/tickets"
                                            className="w-1/2 h-full bg-white/90 text-black rounded-3xl shadow-lg flex relative flex-col p-3 hover:bg-white/80"
                                        >
                                            <h3 className="absolute bottom-5 left-1/2 -translate-x-1/2 ">
                                                Tickets
                                            </h3>

                                            <div className="absolute top-3 right-3">
                                                <div className="bg-black text-failure rounded-full p-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-6 h-6 "
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M7 17L17 7M17 7H8M17 7V16"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="w-96 h-80 flex flex-col gap-3">
                                    <Link
                                        href="/admin/ranks"
                                        className="w-full h-1/2 bg-white/90 rounded-3xl shadow-lg flex relative flex-col p-3 text-black hover:bg-white/80"
                                    >
                                        <h3 className="absolute bottom-5 left-1/2 -translate-x-1/2 ">
                                            Ranks-Tags
                                        </h3>

                                        <div className="absolute top-3 right-3">
                                            <div className="bg-black text-failure rounded-full p-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-6 h-6 "
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M7 17L17 7M17 7H8M17 7V16"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link
                                        href="/admin/users"
                                        className="w-full h-1/2 bg-black/50 rounded-3xl shadow-lg flex relative flex-col p-3 text-white hover:bg-black/40"
                                    >
                                        <h3 className="absolute bottom-5 left-1/2 -translate-x-1/2 ">
                                            Users
                                        </h3>

                                        <div className="absolute top-3 right-3">
                                            <div className="bg-black text-failure rounded-full p-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-6 h-6 "
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M7 17L17 7M17 7H8M17 7V16"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-96">
                        <Footer />
                    </div>
                </>
            )}
        </>
    );
}
