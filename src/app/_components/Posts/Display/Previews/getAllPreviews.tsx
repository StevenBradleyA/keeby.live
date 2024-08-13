import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

interface GetAllPreviewPostsProps {
    searchParams?: SearchParams;
}

interface SearchParams {
    filter?: string;
    tag?: string;
    search?: string;
}

interface Filters {
    search?: string;
    tag?: string;
    filter?: string;
    userId?: string;
}

export default async function GetAllPreviewPosts({
    searchParams,
}: GetAllPreviewPostsProps) {
    const session = await getServerAuthSession();

    const filterParams: Filters = {};

    if (searchParams && searchParams.search) {
        filterParams.search = searchParams.search;
    }
    if (searchParams && searchParams.tag) {
        filterParams.tag = searchParams.tag;
    }
    if (searchParams && searchParams.filter) {
        filterParams.filter = searchParams.filter;
    }
    if (session && session.user) {
        filterParams.userId = session.user.id;
    }

    console.log(filterParams);

    // const posts = await api.post.getAllPreviewPosts.prefetch({
    //     ...filterParams,
    // });
    const posts = await api.post.getAllPreviewPosts({
        ...filterParams,
    });

    console.log(posts);

    return (
        <>
            <h1>post</h1>
            {/* {postPreviews &&
                postPreviews.length > 0 &&
                postPreviews.map((e, i) => <div key={i}>{e.title}</div>)} */}
        </>
    );
}
