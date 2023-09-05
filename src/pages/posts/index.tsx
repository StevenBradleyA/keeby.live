import { api } from "~/utils/api";
import type { Post } from "@prisma/client";
// import PostCard from "../components/Posts/WithComments";
import PostCard from "../../components/Posts/WithReviews";

export default function AllPosts() {
    const { data: posts, isLoading } = api.post.getAll.useQuery();

    if (isLoading) return <div>Loading All Posts...</div>;

    if (!posts) return <div>Oops</div>;

    return (
        <>
            {posts.map((post: Post, i: number) => {
                return <PostCard key={i} post={post} />;
            })}
        </>
    );
}
