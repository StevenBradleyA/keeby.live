"use client";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ModalDialog from "~/app/_components/Context/Modal";
import AdminCreateTag from "~/app/_components/Admin/Tags/Create";
import AdminEachDisplayTag from "~/app/_components/Admin/Tags/Display/eachDisplayTag";
import AdminEachDisplayRank from "~/app/_components/Admin/Ranks/Display/eachDisplayRank";
import Footer from "~/app/_components/Footer/footer";
import LoadingSpinner from "~/app/_components/Loading";
import NotFound from "~/app/not-found";
import AdminHeader from "~/app/_components/Admin/adminHeader";
import AdminCreateRank from "~/app/_components/Admin/Ranks/Create/createRank";

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
                <div className="flex w-full flex-col text-white mt-28">
                    <AdminHeader />

                    <div className="mt-10 px-3 laptop:px-16 flex justify-between relative items-center">
                        <h2 className="text-xl flex items-center gap-2 bg-black/80 text-white rounded-md px-4 py-2">
                            Tags{" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M4.74791 7.64502L4.41669 11.2885C4.36763 11.8281 4.34289 12.1001 4.3878 12.3584C4.42792 12.5892 4.50806 12.8112 4.62496 13.0142C4.7563 13.2422 4.95043 13.4363 5.33647 13.8224L10.512 18.9979C11.299 19.7849 11.6927 20.1786 12.148 20.3265C12.5496 20.4571 12.983 20.4573 13.3847 20.3268C13.8414 20.1785 14.2382 19.7821 15.0302 18.9901L18.99 15.0303C19.7821 14.2382 20.1774 13.8424 20.3258 13.3857C20.4563 12.9841 20.4555 12.5511 20.325 12.1495C20.1766 11.6928 19.7819 11.297 18.9898 10.505L13.8271 5.34229C13.4375 4.95272 13.2427 4.75792 13.0136 4.62598C12.8107 4.50908 12.5886 4.4286 12.3579 4.38848C12.0974 4.3432 11.823 4.36809 11.2743 4.41797L7.64449 4.74796C6.69973 4.83384 6.22705 4.87698 5.85738 5.08255C5.53145 5.26379 5.26277 5.53248 5.08152 5.8584C4.87698 6.22623 4.83432 6.69555 4.74929 7.63092L4.74791 7.64502Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9.71259 9.71297C10.1031 9.32244 10.1031 8.68928 9.71259 8.29876C9.32206 7.90823 8.68845 7.90823 8.29792 8.29876C7.9074 8.68928 7.90702 9.32229 8.29755 9.71282C8.68807 10.1033 9.32206 10.1035 9.71259 9.71297Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="text-sm">
                                ( {tags ? tags.length : 0} )
                            </span>
                        </h2>
                        <div className="bg-black/20 px-4 py-2 rounded-md  text-darkGray  text-xs">
                            Novice, PraiseTheSun
                        </div>
                        <button
                            className=" bg-failure text-black rounded-md p-1 hover:opacity-80 "
                            onClick={openTagModal}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M6 12H18M12 6V18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
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

                    <div className="laptop:px-16 px-3 w-full flex flex-wrap gap-5 mt-10">
                        {tags &&
                            tags.length > 0 &&
                            tags.map((tag) => (
                                <AdminEachDisplayTag tag={tag} key={tag.id} />
                            ))}
                    </div>

                    <div className="mt-10 px-3 laptop:px-16 flex justify-between relative items-center">
                        <h2 className="text-xl flex items-center gap-2 bg-black/80 text-white rounded-md px-4 py-2 ">
                            Ranks{" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                version="1.1"
                            >
                                <g stroke="none" fill="none" fillRule="evenodd">
                                    <g fill="currentColor" fillRule="nonzero">
                                        <path d="M13.25,2.98001 C14.4926,2.98001 15.5,3.98737 15.5,5.23001 L15.5,7.00001 L18.75,7.00001 C19.9926,7.00001 21,8.00737 21,9.25001 L21,20.25 C21,20.6642 20.6642,21 20.25,21 L3.75,21 C3.33579,21 3,20.6642 3,20.25 L3,12.25 C3,11.0074 4.00736,10 5.25,10 L8.5,10 L8.5,5.23001 C8.5,3.98737 9.50736,2.98001 10.75,2.98001 L13.25,2.98001 Z M18.75,8.50001 L15.5,8.50001 L15.5,19.50001 L19.5,19.50001 L19.5,9.25001 C19.5,8.83579 19.1642,8.50001 18.75,8.50001 L18.75,8.50001 Z M13.25,4.48001 L10.75,4.48001 C10.3358,4.48001 10,4.8158 10,5.23001 L10,19.5 L14,19.5 L14,5.23001 C14,4.8158 13.6642,4.48001 13.25,4.48001 Z M8.5,11.5 L5.25,11.5 C4.83579,11.5 4.5,11.8358 4.5,12.25 L4.5,19.5 L8.5,19.5 L8.5,11.5 Z"></path>
                                    </g>
                                </g>
                            </svg>
                            <span className="text-sm">
                                ( {ranks ? ranks.length : 0} )
                            </span>
                        </h2>
                        <div className="bg-black/20 px-4 py-2 rounded-md  text-darkGray  text-xs">
                            Unranked, Bronze, Silver, Gold, Platinum, Clack
                            King, Linear Legend, Hackerman
                        </div>
                        <button
                            className=" bg-failure text-black rounded-md p-1 hover:opacity-80 "
                            onClick={openModal}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M6 12H18M12 6V18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                            <AdminCreateRank closeModal={closeModal} />
                        </ModalDialog>
                    </div>

                    <div className="laptop:px-16 px-3 w-full flex flex-wrap gap-5 mt-10">
                        {ranks &&
                            ranks.length > 0 &&
                            ranks.map((rank) => (
                                <AdminEachDisplayRank
                                    rank={rank}
                                    key={rank.id}
                                />
                            ))}
                    </div>

                    <div className="mt-96">
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
}
