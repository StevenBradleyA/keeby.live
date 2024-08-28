"use client";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface AdminUpdateTagProps {
    tag: EachTag;
    closeModal: () => void;
}

interface EachTag {
    id: string;
    name: string;
    description: string;
}

export default function AdminUpdateTag({
    tag,
    closeModal,
}: AdminUpdateTagProps) {
    const { data: session } = useSession();
    const utils = api.useUtils();

    const [tagName, setTagName] = useState<string>(tag.name);
    const [tagDescription, setTagDescription] = useState<string>(
        tag.description,
    );

    const { mutate: updateTag } = api.tag.update.useMutation({
        onSuccess: () => {
            toast.success("Tag Updated!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#ff0000",
                },
            });
            closeModal();
            void utils.tag.getAll.invalidate();
        },
    });

    const handleUpdateTag = (e: React.FormEvent) => {
        e.preventDefault();
        if (
            session?.user.isAdmin &&
            tagName.length > 0 &&
            tagDescription.length > 0
        ) {
            const data = {
                id: tag.id,
                name: tagName,
                description: tagDescription,
            };

            updateTag(data);
        }
    };

    return (
        <form className="flex w-[400px] flex-col items-center gap-10 text-white">
            <div className="flex w-full flex-col gap-1">
                <label htmlFor="NameInput" className="text-mediumGray">
                    Name
                </label>
                <input
                    id="NameInput"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    className="h-10 w-full rounded-md bg-mediumGray p-1 "
                    placeholder="Name"
                />
            </div>

            <div className="flex w-full flex-col gap-1">
                <label htmlFor="description" className="text-mediumGray">
                    description
                </label>
                <textarea
                    id="description"
                    value={tagDescription}
                    onChange={(e) => setTagDescription(e.target.value)}
                    className=" w-full rounded-md bg-mediumGray p-1 "
                    rows={4}
                    cols={50}
                    placeholder="description"
                />
            </div>

            <button
                className=" flex  justify-center rounded-md border-2 border-[#ff0000] bg-darkGray bg-opacity-60 px-6 py-2 text-failure hover:bg-failure hover:bg-opacity-100 hover:text-black"
                onClick={(e) => {
                    e.preventDefault();
                    void handleUpdateTag(e);
                }}
            >
                Submit
            </button>
        </form>
    );
}
