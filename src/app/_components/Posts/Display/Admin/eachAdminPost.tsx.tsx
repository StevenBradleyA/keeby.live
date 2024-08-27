"use client";
import type { Images } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import keebo from "@public/Profile/keebo.png";

interface EachPost {
    id: string;
    title: string;
    userId: string;
    text: string | null;
    images: Images[];
}
interface EachAdminPostProps {
    post: EachPost;
}

export default function EachAdminPost({ post }: EachAdminPostProps) {
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const { data: session } = useSession();
    const utils = api.useUtils();

    const { mutate } = api.post.delete.useMutation({
        onSuccess: () => {
            toast.success("Post eliminated ggez", {
                icon: "🧹",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#ff0000",
                },
            });
            void utils.post.getAll.invalidate();
        },
    });

    const handlePostDelete = () => {
        if (session && session.user.isAdmin) {
            const data = {
                id: post.id,
                userId: post.userId,
            };

            mutate(data);
        }
    };

    return (
        <div className=" w-96 h-72 bg-black/30 rounded-xl p-2 flex flex-col text-sm justify-end">
            <div className="flex h-[60%] w-full bg-darkGray rounded-xl overflow-hidden flex-shrink-0">
                {post && post.images[0] ? (
                    <div className="h-full w-full">
                        <Image
                            alt="post preview"
                            src={post.images[0].link}
                            width={500}
                            height={500}
                            className="h-full w-full object-cover"
                        />
                    </div>
                ) : post.text ? (
                    <div className="p-3 text-white">
                        <div>{post.text}</div>
                    </div>
                ) : (
                    <div className="p-3 text-white w-full h-full relative">
                        <Image
                            alt="keebo"
                            src={keebo}
                            className="absolute left-1/2 bottom-0 -translate-x-1/2 w-20 h-20 object-contain"
                        />
                    </div>
                )}
            </div>
            <h2 className="mt-2">{post.title}</h2>

            <div className="relative h-full w-full text-black items-end justify-end flex">
                {!confirmDelete ? (
                    <button
                        className=" rounded-md bg-failure px-4 py-2 hover:bg-red-500 "
                        onClick={() => setConfirmDelete(true)}
                    >
                        {`C:\\\\> Delete`}
                    </button>
                ) : (
                    <div className=" flex gap-5 ">
                        <button
                            className=" rounded-md bg-failure p-2 hover:bg-red-500 "
                            onClick={handlePostDelete}
                        >
                            Delete forever
                        </button>
                        <button
                            className=" rounded-md bg-green-500 p-2 hover:bg-green-400 "
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
