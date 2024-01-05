import { api } from "~/utils/api";

interface CreateLikeProps {
    userId: string;
    type: string;
    typeId: string;
}

export default function CreateLike({ userId, type, typeId }: CreateLikeProps) {
    const ctx = api.useContext();

    const { data: likedId } = api.like.checkisLiked.useQuery({
        userId: userId,
        type: type,
        typeId: typeId,
    });

    const { mutate: createLike } = api.like.create.useMutation({
        onSuccess: () => {
            void ctx.like.getAmountByTypeId.invalidate();
            void ctx.like.checkisLiked.invalidate();
        },
    });
    const { mutate: deleteLike } = api.like.delete.useMutation({
        onSuccess: () => {
            void ctx.like.getAmountByTypeId.invalidate();
            void ctx.like.checkisLiked.invalidate();
        },
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            userId: userId,
            type: type,
            typeId: typeId,
        };
        if (likedId) {
            const deleteData = {
                id: likedId,
                userId: userId,
                type: type,
                typeId: typeId,
            };
            deleteLike(deleteData);
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
