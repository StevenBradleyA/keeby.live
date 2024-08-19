import React, { useState } from "react";
import ModalDialog from "~/app/_components/Context/Modal";
import AdminUpdateTag from "../Update/updateTag";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface AdminEachDisplayTagProps {
    tag: { id: string; name: string; description: string };
}
export default function AdminEachDisplayTag({ tag }: AdminEachDisplayTagProps) {
    const utils = api.useUtils();
    const { data: session } = useSession();

    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { mutate } = api.tag.delete.useMutation({
        onSuccess: () => {
            toast.success("Tag Eliminated!", {
                icon: "☠️",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#ff0000",
                },
            });
            void utils.tag.getAll.invalidate();
        },
    });

    const handleDeleteTag = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (session?.user.isAdmin) {
            const data = tag.id;

            mutate(data);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative">
            <div className="w-96 rounded-xl bg-black/25 p-5 text-sm text-failure shadow-xl hover:bg-black/30  ">
                <h1 className="font-titillium text-3xl">{tag.name}</h1>

                <p className="h-20 w-full overflow-y-auto text-mediumGray">
                    {tag.description}
                </p>
            </div>

            <div className="absolute -top-8 right-0 flex gap-5">
                <button onClick={openModal}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 text-failure hover:text-red-400"
                        viewBox="0 -0.5 21 21"
                        version="1.1"
                    >
                        <g
                            id="Page-1"
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                        >
                            <g
                                transform="translate(-419.000000, -359.000000)"
                                fill="currentColor"
                            >
                                <g
                                    id="icons"
                                    transform="translate(56.000000, 160.000000)"
                                >
                                    <path
                                        d="M384,209.210475 L384,219 L363,219 L363,199.42095 L373.5,199.42095 L373.5,201.378855 L365.1,201.378855 L365.1,217.042095 L381.9,217.042095 L381.9,209.210475 L384,209.210475 Z M370.35,209.51395 L378.7731,201.64513 L380.4048,203.643172 L371.88195,212.147332 L370.35,212.147332 L370.35,209.51395 Z M368.25,214.105237 L372.7818,214.105237 L383.18415,203.64513 L378.8298,199 L368.25,208.687714 L368.25,214.105237 Z"
                                        id="edit_cover-[#1481]"
                                    ></path>
                                </g>
                            </g>
                        </g>
                    </svg>
                </button>

                {confirmDelete ? (
                    <div className="flex gap-2">
                        <button
                            onClick={handleDeleteTag}
                            className="text-failure hover:text-red-400"
                        >{`XXXX`}</button>
                        <button
                            onClick={() => setConfirmDelete(false)}
                            className="text-failure hover:text-red-400"
                        >
                            {`Cancel`}
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setConfirmDelete(true)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 text-failure hover:text-red-400"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                )}
            </div>

            <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                <AdminUpdateTag tag={tag} closeModal={closeModal} />
            </ModalDialog>
        </div>
    );
}
