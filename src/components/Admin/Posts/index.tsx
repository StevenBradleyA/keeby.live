import type { Images } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { api } from "~/utils/api";
import admin from "@public/Admin/admin-black.png";
import toast from "react-hot-toast";

interface EachPost {
    id: string;
    title: string;
    userId: string;
    images: Images[];
}
interface EachAdminPostProps {
    post: EachPost;
}

export default function EachAdminPost({ post }: EachAdminPostProps) {
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const { data: session } = useSession();
    const ctx = api.useContext();

    const { mutate } = api.post.delete.useMutation({
        onSuccess: () => {
            toast.success("Post Eliminated!", {
                icon: "☠️",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#ff0000",
                },
            });
            void ctx.post.getAll.invalidate();
        },
    });

    const handlePostDelete = () => {
        if (session?.user.isAdmin) {
            const data = {
                id: post.id,
                userId: post.userId,
            };

            mutate(data);
        }
    };

    return (
        <div className=" h-[40vh] w-[30%]">
            <div className="h-full w-full rounded-xl bg-black/25 hover:bg-black/30">
                <div className="flex h-1/4 items-center justify-center p-5 text-failure">
                    {post.title}
                </div>
                {post && post.images[0] && (
                    <div className="h-1/2 w-full">
                        <Image
                            alt="post preview"
                            src={post.images[0].link}
                            width={500}
                            height={500}
                            className="h-full w-full object-cover"
                        />
                    </div>
                )}
                {post && !post.images[0] && (
                    <div className="flex h-1/2 w-full justify-center">
                        <Image
                            alt="post preview"
                            src={admin}
                            width={500}
                            height={500}
                            className="png-red h-full w-1/2 object-cover"
                        />
                    </div>
                )}
                <div className="relative h-1/4 w-full text-black  ">
                    {!confirmDelete ? (
                        <button
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-failure px-4 py-2 hover:bg-red-500 "
                            onClick={() => setConfirmDelete(true)}
                        >
                            {`C:\\\\> Delete`}
                        </button>
                    ) : (
                        <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform justify-center gap-5 ">
                            <button
                                className=" rounded-md bg-green-500 px-2 py-2 hover:bg-green-400 "
                                onClick={() => setConfirmDelete(false)}
                            >
                                {`C:\\\\> Abort`}
                            </button>
                            <button
                                className=" rounded-md bg-failure px-2 py-2 hover:bg-red-500 "
                                onClick={handlePostDelete}
                            >
                                {`C:\\\\> XXXX`}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
