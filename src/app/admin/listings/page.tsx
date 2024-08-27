"use client";
import { api } from "~/trpc/react";
import EachAdminListing from "~/app/_components/Admin/Listings";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import Footer from "~/app/_components/Footer/footer";
import LoadingSpinner from "~/app/_components/Loading";
import NotFound from "~/app/not-found";
import AdminHeader from "~/app/_components/Admin/adminHeader";

export default function AdminListings() {
    const { data: session, status } = useSession();

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] =
        useState<string>("");

    const { data: listings } = api.listing.getAll.useQuery({
        searchQuery: debouncedSearchQuery,
    });

    useEffect(() => {
        const handler = debounce(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);

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
                                className={` admin-search h-10 w-full rounded-md bg-black/40 p-1 text-failure outline-none hover:bg-black/50 `}
                                placeholder="Search"
                            />
                        </div>
                    </div>
                    <div className="mt-10  flex justify-center">
                        <div className="flex h-10 w-2/3 gap-10">
                            {listings &&
                                listings.length > 0 &&
                                listings.map((listing) => (
                                    <EachAdminListing
                                        listing={listing}
                                        key={listing.id}
                                    />
                                ))}
                        </div>
                    </div>
                    <div className="mt-96">
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
}
