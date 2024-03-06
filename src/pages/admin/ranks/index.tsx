import Image from "next/image";
import Link from "next/link";
import hackerman from "@public/Admin/admin-black.png";
import { api } from "~/utils/api";
import Custom404 from "~/pages/404";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AdminRanks() {
    const { data: session } = useSession();
    const accessDenied = !session || !session.user.isAdmin;

    const { data: tags } = api.tag.getAll.useQuery();
    const { data: ranks } = api.rank.getAll.useQuery();

    if (accessDenied) {
        return <Custom404 />;
    }

    return (
        <div className="w-full text-failure">
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
                        RANKS
                    </div>

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
            <div className="mt-10 flex justify-center">
                <div className="flex w-1/2 items-center gap-5 ">
                    <h1 className="font-titillium text-3xl">RANKS</h1>
                    <button className="flex h-6 w-12 items-center justify-center rounded-full bg-black text-2xl ">
                        {`+`}
                    </button>
                    {ranks &&
                        ranks.length > 0 &&
                        ranks.map((rank) => (
                            <div className="bg-black p-10" key={rank.id}>
                                <h1>{rank.name}</h1>
                                <p>{`max wpm ${rank.maxWpm}`}</p>
                                <p>{`min wpm ${rank.minWpm}`}</p>
                            </div>
                        ))}
                </div>
            </div>
            <div className="mt-10 flex justify-center">
                <div className="flex w-1/2 items-center gap-5 ">
                    <h1 className="font-titillium text-3xl">TAGS</h1>
                    <button className="flex h-6 w-12 items-center justify-center rounded-full bg-black text-2xl ">
                        {`+`}
                    </button>
                    {tags &&
                        tags.length > 0 &&
                        tags.map((tag) => (
                            <div className="bg-black p-2" key={tag.id}>
                                <h1>{tag.name}</h1>
                                <p>{tag.description}</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
