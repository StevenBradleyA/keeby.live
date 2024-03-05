import Image from "next/image";
import Link from "next/link";
import hackerman from "@public/Admin/admin-black.png";
import { api } from "~/utils/api";
import EachAdminListing from "~/components/Admin/Listings";
import Custom404 from "~/pages/404";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AdminListings() {
    const { data: session } = useSession();
    const accessDenied = !session || !session.user.isAdmin;

    const [searchQuery, setSearchQuery] = useState<string>("");

    const { data: listings } = api.listing.getAll.useQuery({
        searchQuery: searchQuery,
    });

    if (accessDenied) {
        return <Custom404 />;
    }

    // implement search

    return (
        <div className="w-full">
            <div className="flex justify-center">
                <div className=" relative flex w-1/2 justify-center overflow-hidden rounded-xl bg-black bg-opacity-50 p-5">
                    <Link href="/admin" className="z-10 ">
                        <Image
                            src={hackerman}
                            alt="admin-logo"
                            className="png-red w-32 "
                        />
                    </Link>

                    <div className=" absolute bottom-0 left-0 right-0 top-0  ">
                        <video className="-z-10 w-full" autoPlay loop muted>
                            <source
                                src="/Videos/matrix-fade-red.mp4"
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex w-full justify-center">
                <div className="w-1/5">
                    <input
                        id="searchQuery"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={` admin-search h-10 w-full rounded-md bg-black p-1 text-failure outline-none `}
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
        </div>
    );
}
