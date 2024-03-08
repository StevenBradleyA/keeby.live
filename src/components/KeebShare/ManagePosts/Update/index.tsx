import { useState } from "react";
import type { Images, Post } from "@prisma/client";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface UpdatePostProps {
    post: EachPost;
    closeModal: () => void;
}

interface EachPost extends Post {
    images: Images[];
    _count: { comments: number };
    previewIndex: number;
}

export default function UpdatePost({ post, closeModal }: UpdatePostProps) {
    const [toggle, setToggle] = useState<string>("MENU");

    const { data: session } = useSession();
    const ctx = api.useContext();

    const { mutate } = api.post.delete.useMutation({
        onSuccess: () => {
            toast.success("Post Deleted!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            void ctx.post.getAllByUserId.invalidate();
            closeModal();
        },
    });

    // const { mutate: updatePost } = api.post.update.useMutation({
    //     onSuccess: () => {
    //         toast.success("Post Updated!", {
    //             style: {
    //                 borderRadius: "10px",
    //                 background: "#333",
    //                 color: "#fff",
    //             },
    //         });
    //         void ctx.post.getAllByUserId.invalidate();
    //         closeModal();
    //     },
    // });

    const handleDeletePost = () => {
        if (session?.user.id === post.userId) {
            const data = {
                id: post.id,
                userId: post.userId,
            };

            mutate(data);
        }
    };

    return (
        <div className=" font-poppins text-darkGray">
            {toggle === "MENU" && (
                <div className="flex  flex-col gap-2 p-5">
                    <button
                        className="hover:text-green-500 "
                        onClick={() => setToggle("UPDATE")}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => setToggle("DELETE")}
                        className="hover:text-green-500 "
                    >
                        Delete
                    </button>
                </div>
            )}{" "}
            {toggle === "DELETE" && (
                <div className="w-[35rem]">
                    <h1 className="text-center text-xl text-green-500">
                        Are you sure you want to delete
                        <span className="ml-1 text-darkGray">
                            ${post.title}
                        </span>
                        ?
                    </h1>
                    <div className="mt-5 flex justify-center gap-10 ">
                        <button
                            onClick={handleDeletePost}
                            className={`rounded-md border-2 border-[#ff0000] bg-keebyGray bg-opacity-60 px-8 py-2 text-failure transition-all duration-300 ease-in-out  hover:bg-failure hover:bg-opacity-100 hover:text-black`}
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => setToggle("MENU")}
                            className={`rounded-md border-2 border-green-500 bg-keebyGray bg-opacity-60 px-8 py-2 text-green-500 transition-all duration-300 ease-in-out  hover:bg-green-500 hover:bg-opacity-100 hover:text-black`}
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
