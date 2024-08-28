"use client";
import { api } from "~/trpc/react";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import Footer from "~/app/_components/Footer/footer";
import LoadingSpinner from "~/app/_components/Loading";
import NotFound from "~/app/not-found";
import AdminHeader from "~/app/_components/Admin/adminHeader";
import EachAdminPick from "~/app/_components/Picks/Display/Admin/eachAdminPick";
import ModalDialog from "~/app/_components/Context/Modal";
import CreatePick from "~/app/_components/Picks/Create/createPick";

export default function AdminPicks() {
    const { data: session, status } = useSession();

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] =
        useState<string>("");

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const { data: picks } = api.pick.getAll.useQuery({
        searchQuery: debouncedSearchQuery,
    });

    useEffect(() => {
        const handler = debounce(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);

        handler();
        return () => {
            handler.cancel();
        };
    }, [searchQuery]);

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
                <div className="w-full mt-28">
                    <AdminHeader />
                    <div className="mt-5 flex w-full justify-center relative">
                        <div className="w-1/5">
                            <input
                                id="searchQuery"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={` admin-search h-10 w-full rounded-md bg-black/40 p-1 text-failure outline-none hover:bg-black/50 `}
                                placeholder="Search"
                            />
                        </div>
                        <button
                            className="absolute right-20 top-0 bg-failure text-black rounded-md p-1 hover:opacity-80"
                            onClick={() => setIsModalOpen(true)}
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
                    </div>
                    <div className="mt-10 flex w-full px-3 laptop:px-16 ">
                        {picks &&
                            picks.length > 0 &&
                            picks.map((pick) => (
                                <EachAdminPick key={pick.id} pick={pick} />
                            ))}
                    </div>

                    <ModalDialog onClose={closeModal} isOpen={isModalOpen}>
                        <CreatePick closeModal={closeModal} />
                    </ModalDialog>
                    <div className="mt-96">
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
}
