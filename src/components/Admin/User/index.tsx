import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import defaultProfile from "@public/Profile/profile-default.png";

interface EachUser {
    id: string;
    username: string;
    email: string;
    selectedTag: string;
    internetPoints: number;
    profile: string;
}
interface EachAdminUserProps {
    user: EachUser;
}

export default function EachAdminUser({ user }: EachAdminUserProps) {
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const [confirmDeleteProfile, setConfirmDeleteProfile] =
        useState<boolean>(false);

    const { data: session } = useSession();
    const ctx = api.useContext();

    // const { mutate } = api.user.delete.useMutation({
    //     onSuccess: () => {
    //         toast.success("Listing Eliminated!", {
    //             icon: "☠️",
    //             style: {
    //                 borderRadius: "10px",
    //                 background: "#333",
    //                 color: "#ff0000",
    //             },
    //         });
    //         void ctx.user.getAll.invalidate();
    //     },
    // });

    const handleDeleteUser = () => {
        if (session?.user.isAdmin) {
            const data = {
                id: user.id,
            };

            // mutate(data);
        }
    };

    const handleDeleteProfile = () => {
        if (session?.user.isAdmin) {
            const data = {
                id: user.id,
            };

            // mutate(data);
        }
    };

    // ability to update user and remove profile photo if using inapropriate photos

    return (
        <div className=" h-[40vh] w-1/3 text-failure">
            <div className="relative h-full w-full rounded-xl bg-black">
                <div className="absolute right-2 top-2 flex items-center justify-center rounded-md bg-failure px-4 py-1 text-black">
                    {user.internetPoints}
                </div>

                <div className="flex h-1/4 flex-col items-center justify-center p-5 text-lg text-failure">
                    <h1>{user.username}</h1>
                    <h1 className="text-sm text-darkGray">{user.email}</h1>
                    <h1 className="text-sm text-darkGray">
                        {user.selectedTag}
                    </h1>
                </div>

                <div className="relative flex h-1/2 w-full justify-center">
                    <Image
                        alt="user preview"
                        src={user.profile ? user.profile : defaultProfile}
                        width={500}
                        height={500}
                        className="h-full w-1/2 object-cover"
                    />
                    {confirmDeleteProfile ? (
                        <div className="absolute -top-6 right-[10%] flex gap-3 text-sm">
                            <button onClick={handleDeleteProfile}>
                                {`XXXX`}
                            </button>
                            <button
                                onClick={() => setConfirmDeleteProfile(false)}
                            >
                                {`Cancel`}
                            </button>
                        </div>
                    ) : (
                        <button
                            className="absolute -top-6 right-[18%]"
                            onClick={() => setConfirmDeleteProfile(true)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 "
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

                <div className="relative h-1/4 w-full text-black  ">
                    {!confirmDelete ? (
                        <button
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-failure px-4 py-2 "
                            onClick={() => setConfirmDelete(true)}
                        >
                            {`C:\\\\> Delete`}
                        </button>
                    ) : (
                        <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform justify-center gap-5 ">
                            <button
                                className=" rounded-md bg-failure px-2 py-2 "
                                onClick={handleDeleteUser}
                            >
                                {`C:\\\\> XXXX`}
                            </button>
                            <button
                                className=" rounded-md bg-green-500 px-2 py-2 "
                                onClick={() => setConfirmDelete(false)}
                            >
                                {`C:\\\\> Abort`}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
