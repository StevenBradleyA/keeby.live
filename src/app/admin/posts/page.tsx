"use client";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import Footer from "~/app/_components/Footer/footer";
import LoadingSpinner from "~/app/_components/Loading";
import NotFound from "~/app/not-found";
import AdminHeader from "~/app/_components/Admin/adminHeader";
import EachAdminPost from "~/app/_components/Posts/Display/Admin/eachAdminPost.tsx";

export default function AdminPosts() {
    const { data: session, status } = useSession();

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] =
        useState<string>("");

    const { data: posts } = api.post.getAll.useQuery({
        searchQuery: debouncedSearchQuery,
    });

    useEffect(() => {
        const handler = debounce(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 1000);

        handler();
        return () => {
            handler.cancel();
        };
    }, [searchQuery]);

    if (status === "loading") {
        return (
            <div className="mt-40 flex w-full justify-center text-red-500">
                <LoadingSpinner size="20px" />
            </div>
        );
    }

    if (!session || !session.user.isAdmin) {
        return <NotFound />;
    }

    return (
        <>
            {session && session.user.isAdmin && (
                <div className="w-full mt-28">
                    <AdminHeader />
                    <div className="mt-5 flex w-full justify-center">
                        <div className="w-1/5">
                            <input
                                id="searchQuery"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={` admin-search h-10 w-full rounded-md bg-black/40 hover:bg-black/50 p-1 text-failure outline-none `}
                                placeholder="Search"
                            />
                        </div>
                    </div>
                    <div className="flex w-full flex-wrap gap-5 px-3 laptop:px-16">
                        {posts &&
                            posts.length > 0 &&
                            posts.map((post) => (
                                <EachAdminPost post={post} key={post.id} />
                            ))}
                    </div>
                    <div className="mt-96">
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
}
