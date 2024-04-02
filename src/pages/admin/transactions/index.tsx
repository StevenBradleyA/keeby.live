import Image from "next/image";
import Link from "next/link";
import hackerman from "@public/Admin/admin-black.png";
import { api } from "~/utils/api";
import Custom404 from "~/pages/404";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AdminTransactions() {
    const { data: session } = useSession();
    const accessDenied = !session || !session.user.isAdmin;

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
                        TRANSACTIONS
                    </div>

                    <div className=" absolute bottom-0 left-0 right-0 top-0  ">
                        {/* <video className="-z-10 w-full" autoPlay loop muted>
                            <source
                                src="/Videos/matrix-fade-red.mp4"
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video> */}
                    </div>
                </div>
            </div>
            <div className="mt-10 flex w-full justify-center">
                <p>
                    Monitor all sold listings -- maybe autosave to google sheets
                    or something
                </p>
            </div>
        </div>
    );
}
