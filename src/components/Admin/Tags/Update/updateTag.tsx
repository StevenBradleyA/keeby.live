import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function AdminUpdateTag({
    closeModal,
}: {
    closeModal: () => void;
}) {
    const { data: session } = useSession();
    const ctx = api.useContext();

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
            void ctx.tag.getAll.invalidate();
        },
    });

    const handleCreateRank = (e: React.FormEvent) => {
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
        <form className="flex w-[400px] flex-col items-center gap-10 ">
            <div className="flex w-full flex-col gap-1">
                <label htmlFor="NameInput" className="text-darkGray">
                    Name
                </label>
                <input
                    id="NameInput"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    className="h-10 w-full rounded-md bg-darkGray p-1 "
                    placeholder="Name"
                />
            </div>

            <div className="flex w-full flex-col gap-1">
                <label htmlFor="description" className="text-darkGray">
                    description
                </label>
                <textarea
                    id="description"
                    value={tagDescription}
                    onChange={(e) => setTagDescription(e.target.value)}
                    className=" w-full rounded-md bg-darkGray p-1 "
                    rows={4}
                    cols={50}
                    placeholder="description"
                />
            </div>

            <button
                className=" flex w-1/2 justify-center rounded-md border-2 border-[#ff0000] bg-keebyGray bg-opacity-60 px-6 py-2 text-failure hover:bg-failure hover:bg-opacity-100 hover:text-black"
                onClick={(e) => {
                    e.preventDefault();
                    void handleCreateRank(e);
                }}
            >
                Submit
            </button>
        </form>
    );
}
