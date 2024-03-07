import Image from "next/image";
import Link from "next/link";
import hackerman from "@public/Admin/admin-black.png";
import { api } from "~/utils/api";
import Custom404 from "~/pages/404";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ModalDialog from "~/components/Modal";
import AdminCreateRank from "~/components/Admin/Ranks/Create";
import AdminCreateTag from "~/components/Admin/Tags/Create";
import AdminEachDisplayTag from "~/components/Admin/Tags/Display/eachDisplayTag";
import AdminEachDisplayRank from "~/components/Admin/Ranks/Display/eachDisplayRank";

export default function AdminRanks() {
    const { data: session } = useSession();
    const accessDenied = !session || !session.user.isAdmin;
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

    if (accessDenied) {
        return <Custom404 />;
    }

    return (
        <div className="flex w-full flex-col text-failure">
            <div className="flex justify-center">
                <div className=" relative flex w-1/2 justify-center overflow-hidden rounded-xl bg-black bg-opacity-50 p-5">
                    <Link href="/admin" className="z-10 ">
                        <Image
                            src={hackerman}
                            alt="admin-logo"
                            className="png-red w-32 "
                        />
                    </Link>
                    <div className="absolute right-2 top-0 z-10 font-titillium text-2xl text-failure">
                        RANKS
                    </div>

                    <div className=" absolute bottom-0 left-0 right-0 top-0  ">
                        <video className="-z-10 w-full" autoPlay loop muted>
                            <source
                                src="/Videos/matrix-fade-red.mp4"
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
            <div className="mt-10 flex justify-center">
                <div className="flex w-2/3 items-center gap-5 ">
                    <h1 className="font-titillium text-3xl">RANKS</h1>
                    <button
                        className="flex h-6 w-12 items-center justify-center rounded-full bg-black text-2xl "
                        onClick={openModal}
                    >
                        {`+`}
                    </button>

                    <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                        <AdminCreateRank closeModal={closeModal} />
                    </ModalDialog>
                </div>
            </div>

            <div className="mt-10 flex justify-center">
                <div className=" flex w-2/3 flex-wrap gap-10">
                    {ranks &&
                        ranks.length > 0 &&
                        ranks.map((rank) => (
                            <AdminEachDisplayRank rank={rank} key={rank.id} />
                        ))}
                </div>
            </div>
            <div className="mt-10 flex justify-center">
                <div className="flex w-2/3 items-center gap-5 ">
                    <h1 className="font-titillium text-3xl">TAGS</h1>
                    <button
                        className="flex h-6 w-12 items-center justify-center rounded-full bg-black text-2xl "
                        onClick={openTagModal}
                    >
                        {`+`}
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
                            <AdminEachDisplayTag tag={tag} key={tag.id} />
                        ))}
                </div>
            </div>
        </div>
    );
}
