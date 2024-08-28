import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import keebo from "@public/Profile/keebo.png";
import EachPostPreview from "./eachPostPreview";

interface GetAllPreviewPostsProps {
    searchParams?: SearchParams;
}

interface SearchParams {
    filter?: string;
    tag?: string;
    search?: string;
    page?: string;
}

interface Filters {
    search?: string;
    tag?: string;
    filter?: string;
    userId?: string;
    page?: string;
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
    if (searchParams && searchParams.page) {
        filterParams.page = searchParams.page;
    }
    if (session && session.user) {
        filterParams.userId = session.user.id;
    }

    const postPreviews = await api.post.getAllPreviewPosts({
        ...filterParams,
    });

    return (
        <div className="mt-56 tablet:px-5 desktop:px-16 flex  w-full min-h-[60rem] ">
            <div className="w-1/4"></div>
            <div className=" h-full z-10 w-3/4 pl-10 flex gap-5 flex-wrap">
                {postPreviews &&
                postPreviews.posts &&
                postPreviews.posts.length > 0 ? (
                    postPreviews.posts.map((e) => (
                        <EachPostPreview key={e.id} post={e} session={session}/>
                    ))
                ) : (
                    <div className="flex gap-2 text-mediumGray">
                        <div className="flex items-end h-12 w-full">
                            <h1>{`Oops, no posts match your search`}</h1>
                            <Image
                                src={keebo}
                                alt="keeby mascot"
                                className="w-10 h-10 object-contain"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
