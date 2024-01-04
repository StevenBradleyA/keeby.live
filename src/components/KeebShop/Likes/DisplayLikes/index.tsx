import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import CreateLike from "../Create";

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

    return (
        <div className="flex gap-2">
            <div>{totalLikes}</div>
            {session && session.user && session.user.id ? (
                <CreateLike
                    userId={session.user.id}
                    type={type}
                    typeId={typeId}
                />
            ) : (
                <button>like</button>
            )}
        </div>
    );
}
