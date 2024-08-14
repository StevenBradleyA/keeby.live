import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import keebo from "@public/Profile/keebo.png";
import EachPostCardPreview from "./eachPostPreview";

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

    const postPreviews = await api.post.getAllPreviewPosts({
        ...filterParams,
    });

    return (
        <div className="mt-56 tablet:px-5 desktop:px-16 flex  w-full  ">
            <div className="w-1/4"></div>
            <div className=" h-full z-10 w-3/4 min-h-[60rem] pl-10 flex gap-5 ">
                {postPreviews &&
                    postPreviews.posts &&
                    postPreviews.posts.length > 0 &&
                    postPreviews.posts.map((e) => (
                        <EachPostCardPreview key={e.id} post={e} />
                    ))}

                {/* 
            {postPreviews.posts.length === 0 ||
                (!postPreviews && ( */}
                <div className=" mt-5 flex items-end gap-2 text-mediumGray">
                    <h1>{`Oops, no posts match your search`}</h1>
                    <Image src={keebo} alt="keeby mascot" className="w-10" />
                </div>
                {/* ))} */}
            </div>
        </div>
    );
}
