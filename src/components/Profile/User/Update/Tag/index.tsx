import { useState } from "react";
import type { ChangeEvent } from "react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface UpdateUserTagProps {
    userId: string;
    currentTag: string;
}

export default function UpdateUserTag({
    userId,
    currentTag,
}: UpdateUserTagProps) {
    const ctx = api.useContext();
    const { update } = useSession();

    const [selectedTag, setSelectedTag] = useState<string>(currentTag);

    const { data: userTags } = api.user.getUserTags.useQuery(userId);

    const { mutate } = api.user.updateUserTag.useMutation({
        onSuccess: async () => {
            toast.success("Tag Selected", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            void ctx.user.invalidate();
            await update();
        },
    });

    const handleSelectTag = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const newSelectedTag = e.target.value;

        if (newSelectedTag !== currentTag) {
            setSelectedTag(newSelectedTag);
            mutate({
                userId: userId,
                selectedTag: newSelectedTag,
            });
        }
    };

    return (
        <select
            className="cursor-pointer bg-dark pr-6"
            value={selectedTag}
            onChange={handleSelectTag}
        >
            {userTags &&
                userTags.tags.length > 0 &&
                userTags.tags.map((e) => (
                    <option key={e.id} value={e.name}>
                        {e.name}
                    </option>
                ))}
        </select>
    );
}
