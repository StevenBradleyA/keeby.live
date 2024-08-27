"use client";

import Image from "next/image";
import Link from "next/link";
import hackerman from "@public/Admin/admin-black.png";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ModalDialog from "~/app/_components/Context/Modal";
import AdminCreateRank from "~/app/_components/Admin/Ranks/Create";
import AdminCreateTag from "~/app/_components/Admin/Tags/Create";
import AdminEachDisplayTag from "~/app/_components/Admin/Tags/Display/eachDisplayTag";
import AdminEachDisplayRank from "~/app/_components/Admin/Ranks/Display/eachDisplayRank";
import Footer from "~/app/_components/Footer/footer";
import LoadingSpinner from "~/app/_components/Loading";
import NotFound from "~/app/not-found";
import AdminHeader from "~/app/_components/Admin/adminHeader";

export default function AdminRanks() {
    const { data: session, status } = useSession();

    const { data: tags } = api.tag.getAll.useQuery();
    const { data: ranks } = api.rank.getAll.useQuery();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isTagModalOpen, setIsTagModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const openTagModal = () => {
        setIsTagModalOpen(true);
    };

    const closeTagModal = () => {
        setIsTagModalOpen(false);
    };

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
                <div className="flex w-full flex-col text-failure mt-28">
                    <AdminHeader />
                    <div className="mt-10 flex justify-center">
                        <div className="flex w-2/3 items-center gap-5 ">
                            <h1 className="font-titillium text-3xl">RANKS</h1>
                            <button className="" onClick={openModal}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-14 rounded-md bg-black/25 p-[2px] text-failure hover:bg-black/30"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.44771 12.5523 6 12 6C11.4477 6 11 6.44771 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </button>

                            <ModalDialog
                                isOpen={isModalOpen}
                                onClose={closeModal}
                            >
                                <AdminCreateRank closeModal={closeModal} />
                            </ModalDialog>
                        </div>
                    </div>

                    <div className="mt-10 flex justify-center">
                        <div className=" flex w-2/3 flex-wrap gap-10">
                            {ranks &&
                                ranks.length > 0 &&
                                ranks.map((rank) => (
                                    <AdminEachDisplayRank
                                        rank={rank}
                                        key={rank.id}
                                    />
                                ))}
                        </div>
                    </div>
                    <div className="mt-10 flex justify-center">
                        <div className="flex w-2/3 items-center gap-5 ">
                            <h1 className="font-titillium text-3xl">TAGS</h1>
                            <button className="" onClick={openTagModal}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-14 rounded-md bg-black/25 p-[2px] text-failure hover:bg-black/30"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.44771 12.5523 6 12 6C11.4477 6 11 6.44771 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </button>
                            <ModalDialog
                                isOpen={isTagModalOpen}
                                onClose={closeTagModal}
                            >
                                <AdminCreateTag closeModal={closeTagModal} />
                            </ModalDialog>
                        </div>
                    </div>
                    <div className="mt-10 flex justify-center">
                        <div className=" flex w-2/3 flex-wrap gap-10">
                            {tags &&
                                tags.length > 0 &&
                                tags.map((tag) => (
                                    <AdminEachDisplayTag
                                        tag={tag}
                                        key={tag.id}
                                    />
                                ))}
                        </div>
                    </div>

                    <div className="mt-96">
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
}
