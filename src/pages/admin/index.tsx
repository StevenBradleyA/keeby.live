import { useSession } from "next-auth/react";
import Custom404 from "../404";
import Image from "next/image";
import hackerman from "@public/Admin/admin-black.png";
import errorComputer from "@public/Profile/error-error-error.png";
import Link from "next/link";
export default function Admin() {
    const { data: session } = useSession();
    const accessDenied = !session || !session.user.isAdmin;

    return !accessDenied ? (
        <div className="h-full  w-1/2  ">
            <div className="relative flex justify-center ">
                <div className="relative flex w-full justify-center overflow-hidden rounded-xl bg-black bg-opacity-50 p-5">
                    <Image
                        src={hackerman}
                        alt="admin-logo"
                        className="png-red z-10 w-32 "
                    />

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
            <div className="mt-20 flex w-full justify-evenly">
                <Link
                    href="/admin/listings"
                    className="flex flex-col items-center"
                >
                    <Image
                        src={errorComputer}
                        alt="admin-logo"
                        className="png-red w-24 "
                    />
                    <h3 className="font-titillium text-xl text-failure">
                        LISTINGS
                    </h3>
                </Link>
                <Link
                    href="/admin/posts"
                    className="flex flex-col items-center"
                >
                    <Image
                        src={errorComputer}
                        alt="admin-logo"
                        className="png-red w-24 "
                    />
                    <h3 className="font-titillium text-xl text-failure">
                        POSTS
                    </h3>
                </Link>
                <Link
                    href="/admin/ranks"
                    className="flex flex-col items-center"
                >
                    <Image
                        src={errorComputer}
                        alt="admin-logo"
                        className="png-red w-24 "
                    />
                    <h3 className="font-titillium text-xl text-failure">
                        RANKS
                    </h3>
                </Link>
                <Link
                    href="/admin/users"
                    className="flex flex-col items-center"
                >
                    <Image
                        src={errorComputer}
                        alt="admin-logo"
                        className="png-red w-24 "
                    />
                    <h3 className="font-titillium text-xl text-failure">
                        USERS
                    </h3>
                </Link>
            </div>
        </div>
    ) : (
        <Custom404 />
    );
}
