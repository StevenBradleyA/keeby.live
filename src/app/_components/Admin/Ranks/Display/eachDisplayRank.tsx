import Image from "next/image";
import React, { useState } from "react";
import ModalDialogueEdit from "~/app/_components/Context/Modal/editModal";
import ManageRankModal from "../Manage/manageRankModal";

interface AdminEachDisplayRankProps {
    rank: {
        id: string;
        name: string;
        image: string;
        minWpm: number;
        maxWpm: number;
        standing: number;
    };
}
export default function AdminEachDisplayRank({
    rank,
}: AdminEachDisplayRankProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    

    return (
        <div className=" w-80 h-60 rounded-3xl bg-black p-3 text-sm text-white shadow-xl relative">
            <Image
                alt="rank"
                src={rank.image}
                width={200}
                height={200}
                className="h-32 w-full rounded-md object-cover"
            />
            <h1 className="text-xl">{rank.name}</h1>
            <p className="text-mediumGray">{`min wpm ${rank.minWpm}`}</p>
            <p className="text-mediumGray">{`max wpm ${rank.maxWpm}`}</p>
            <p className="mb-1 text-mediumGray">{`standing top ${rank.standing}%`}</p>

            <div className="absolute -bottom-8 right-0">
                <div className="relative">
                    <button
                        className=" text-mediumGray hover:text-failure"
                        onClick={openModal}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M4 8C4 9.10457 3.10457 10 2 10C0.895431 10 0 9.10457 0 8C0 6.89543 0.895431 6 2 6C3.10457 6 4 6.89543 4 8Z"
                                fill="currentColor"
                            />
                            <path
                                d="M10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8Z"
                                fill="currentColor"
                            />
                            <path
                                d="M14 10C15.1046 10 16 9.10457 16 8C16 6.89543 15.1046 6 14 6C12.8954 6 12 6.89543 12 8C12 9.10457 12.8954 10 14 10Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>

                    <ModalDialogueEdit isOpen={isOpen} onClose={closeModal}>
                        <ManageRankModal rank={rank} closeModal={closeModal} />
                    </ModalDialogueEdit>
                </div>
            </div>
        </div>
    );
}
{
    /* <div className="absolute -top-8 right-0 flex gap-5">
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
    </button> */
}

{
    /* {confirmDelete ? (
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
        <button className="" onClick={() => setConfirmDelete(true)}>
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
    )} */
}

{
    /* <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
    <AdminUpdateRank rank={rank} closeModal={closeModal} />
</ModalDialog> */
}
