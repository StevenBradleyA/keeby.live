import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

interface DisplayLikesProps {
    typeId: string;
    type: string;
}

export default function DisplayLikes({ typeId, type }: DisplayLikesProps) {
    // run a get all likes for a specific comment then display it

    // also going to have to add create and delete like logic here
    // TODO add invalidate for total internetpoints
    const ctx = api.useContext();
    const { data: session } = useSession();

    const { data: totalLikes } = api.like.getAmountByTypeId.useQuery({
        type: type,
        typeId: typeId,
    });

    const { mutate } = api.like.create.useMutation({
        onSuccess: () => {
            void ctx.comment.getAllByTypeId.invalidate();
        },
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (session && session.user && session.user.id) {
            const data = {
                userId: session.user.id,
                type: type,
                typeId: typeId,
            };
            mutate(data);
        }
    };

    // if the comment is unliked we want to create
    // if the comment is liked we want to delete

    return (
        <div className="flex gap-2">
            <div>{totalLikes}</div>
            <button onClick={submit}>like</button>
        </div>
    );
}
