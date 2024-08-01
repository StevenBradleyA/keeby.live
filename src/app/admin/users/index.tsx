import Image from "next/image";
import Link from "next/link";
import hackerman from "@public/Admin/admin-black.png";
import Custom404 from "~/pages/404";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { api } from "~/utils/api";
import EachAdminUser from "~/app/_components/Admin/User";
import MainFooter from "~/app/_components/Footer/mainFooter";

export default function AdminUsers() {
    const { data: session } = useSession();
    const accessDenied = !session || !session.user.isAdmin;

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] =
        useState<string>("");

    const { data: users } = api.user.getAll.useQuery({
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

    if (accessDenied) {
        return <Custom404 />;
    }

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
                    <div className="absolute right-2 top-0 z-10 font-titillium text-2xl text-failure">
                        USERS
                    </div>

                    <div className=" absolute bottom-0 left-0 right-0 top-0  ">
                        <video className="-z-10 w-full" autoPlay loop muted>
                            <source
                                src="https://s3.us-west-2.amazonaws.com/keeby.live/matrix-red-fade.mp4"
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
                        className={` admin-search h-10 w-full rounded-md bg-black/40 p-1 text-failure outline-none hover:bg-black/50 `}
                        placeholder="Search"
                    />
                </div>
            </div>
            <div className="mt-10  flex justify-center">
                <div className="flex w-2/3 gap-10">
                    {users &&
                        users.length > 0 &&
                        users.map((user) => (
                            <EachAdminUser user={user} key={user.id} />
                        ))}
                </div>
            </div>
            <div className="mt-96">
                <MainFooter />
            </div>
        </div>
    );
}