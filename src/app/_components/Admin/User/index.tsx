import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import defaultProfile from "@public/Images/defaultProfile.png";

interface EachUser {
    id: string;
    username: string | null;
    email: string | null;
    selectedTag: string | null;
    internetPoints: number;
    profile: string | null;
}
interface EachAdminUserProps {
    user: EachUser;
}

export default function EachAdminUser({ user }: EachAdminUserProps) {
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const [confirmDeleteProfile, setConfirmDeleteProfile] =
        useState<boolean>(false);

    const { data: session } = useSession();
    const utils = api.useUtils();

    const { mutate } = api.user.delete.useMutation({
        onSuccess: () => {
            toast.success("User terminated ggez", {
                icon: "🧹",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#ff0000",
                },
            });
            void utils.user.getAll.invalidate();
        },
    });
    const { mutate: deleteProfilePic } = api.user.deleteUserProfile.useMutation(
        {
            onSuccess: () => {
                toast.success("Profile image rekt ggez", {
                    icon: "🧹",
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#ff0000",
                    },
                });
                void utils.user.getAll.invalidate();
            },
        },
    );

    const handleDeleteUser = () => {
        if (session && session.user.isAdmin) {
            const data = {
                id: user.id,
                profile: user.profile ? user.profile : undefined,
            };

            mutate(data);
        }
    };

    const handleDeleteProfile = () => {
        if (session && session.user.isAdmin) {
            const data = user.id;

            deleteProfilePic(data);
        }
    };

    return (
        <div className="h-80 w-80 rounded-xl bg-darkGray shadow-lg p-3 text-xs relative flex flex-col items-center justify-end">
            <div className="absolute right-2 top-2 flex items-center justify-center rounded-md bg-black/30 px-2 p-1">
                {user.internetPoints}
            </div>

            <div className="flex flex-col items-center justify-center  mt-3">
                <h2 className="p-2 text-failure bg-black/30 rounded-md">
                    {user.username}
                </h2>
                <h3 className="mt-1">{user.email}</h3>
            </div>

            <div className="relative mt-8">
                <Image
                    alt="user preview"
                    src={user.profile ? user.profile : defaultProfile}
                    width={500}
                    height={500}
                    className=" w-36 h-36 rounded-md"
                />
                {user.profile && confirmDeleteProfile && (
                    <div className="absolute -top-7 -right-16 flex gap-3 ">
                        <button
                            onClick={handleDeleteProfile}
                            className="bg-black/30 py-1 px-2 rounded-md hover:bg-failure"
                        >{`Delete forever`}</button>
                        <button
                            onClick={() => setConfirmDeleteProfile(false)}
                            className="bg-black/30 py-1 px-2 rounded-md hover:bg-green-500"
                        >
                            {`Cancel`}
                        </button>
                    </div>
                )}
                {user.profile && !confirmDeleteProfile && (
                    <button
                        className="absolute -top-6 -right-6 bg-failure rounded-md hover:opacity-80 "
                        onClick={() => setConfirmDeleteProfile(true)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-black"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M16 8L8 16M8.00001 8L16 16"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                )}
            </div>

            <div className="relative h-full flex flex-col items-center justify-end w-full text-black  ">
                {!confirmDelete ? (
                    <button
                        className=" rounded-md bg-failure px-4 py-2 hover:bg-red-400 "
                        onClick={() => setConfirmDelete(true)}
                    >
                        {`C:\\\\> Delete`}
                    </button>
                ) : (
                    <div className="flex  gap-5 ">
                        <button
                            className=" rounded-md bg-failure px-2 py-2 hover:bg-red-400 "
                            onClick={handleDeleteUser}
                        >
                            {`Delete forever`}
                        </button>
                        <button
                            className=" rounded-md bg-green-500 px-2 py-2 hover:bg-green-400 "
                            onClick={() => setConfirmDelete(false)}
                        >
                            {`C:\\\\> Abort`}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
