import { api } from "~/utils/api";

interface CreateLikeProps {
    userId: string;
    type: string;
    typeId: string;
}

export default function CreateLike({ userId, type, typeId }: CreateLikeProps) {
    const ctx = api.useContext();

    const { data: isLiked } = api.like.checkisLiked.useQuery({
        userId: userId,
        type: type,
        typeId: typeId,
    });

    const { mutate: createLike } = api.like.create.useMutation({
        onSuccess: () => {
            void ctx.like.getAmountByTypeId.invalidate();
        },
    });
    const { mutate: deleteLike } = api.like.create.useMutation({
        onSuccess: () => {
            void ctx.like.getAmountByTypeId.invalidate();
        },
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            userId: userId,
            type: type,
            typeId: typeId,
        };
        if (isLiked) {
            deleteLike(data);
        } else {
            createLike(data);
        }
    };

    return (
        <>
            <button onClick={submit}>like</button>
        </>
    );
}
