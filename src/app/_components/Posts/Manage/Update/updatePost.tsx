"use client";
import { api } from "~/trpc/react";
import LoadingSpinner from "~/app/_components/Loading";
import UpdatePostForm from "./updatePostForm";

interface UpdatePostProps {
    postId: string;
    userId: string;
    closeModal: () => void;
}

export default function UpdatePost({
    postId,
    closeModal,
    userId,
}: UpdatePostProps) {
    const { data: post, isLoading } = api.post.getOneById.useQuery({
        id: postId,
        userId: userId,
    });

    if (isLoading) {
        <div className="mt-10 ml-10">
            <LoadingSpinner size="20px" />
        </div>;
    }

    return post ? <UpdatePostForm post={post} closeModal={closeModal} /> : null;
}
