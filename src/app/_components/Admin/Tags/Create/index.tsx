import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function AdminCreateTag({
    closeModal,
}: {
    closeModal: () => void;
}) {
    const { data: session } = useSession();
    const utils = api.useUtils();

    const [tagName, setTagName] = useState<string>("");
    const [tagDescription, setTagDescription] = useState<string>("");

    const { mutate: createTag } = api.tag.create.useMutation({
        onSuccess: () => {
            toast.success("Tag Created!", {
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

    const handleCreateTag = (e: React.FormEvent) => {
        e.preventDefault();
        if (
            session?.user.isAdmin &&
            tagName.length > 0 &&
            tagDescription.length > 0
        ) {
            const data = {
                name: tagName,
                description: tagDescription,
            };

            createTag(data);
        }
    };

    return (
        <form className="flex w-[400px] flex-col items-center gap-10 text-white ">
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
                className=" flex justify-center rounded-md border-2 border-[#ff0000] bg-darkGray bg-opacity-60 px-6 py-2 text-failure hover:bg-failure hover:bg-opacity-100 hover:text-black"
                onClick={(e) => {
                    e.preventDefault();
                    void handleCreateTag(e);
                }}
            >
                Submit
            </button>
        </form>
    );
}
