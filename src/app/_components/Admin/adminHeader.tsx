"use client";
import hackerman from "@public/Admin/admin-black.png";
import Image from "next/image";
import BinaryRain from "../Matrix/binaryRain";
import Link from "next/link";

export default function AdminHeader() {
    return (
        <>
            <div className="relative flex w-full justify-center px-3 laptop:px-16">
                <div className=" relative flex w-full laptop:w-2/3 desktop:w-1/2 shadow-lg justify-center overflow-hidden rounded-xl bg-black bg-opacity-50 p-5 h-[150px]">
                    <Link href="/admin" aria-label="admin">
                        <Image
                            src={hackerman}
                            alt="admin-logo"
                            className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 png-red z-10 w-32 h-32 object-contain hover:opacity-80 "
                        />
                    </Link>

                    <div className=" absolute bottom-0 left-0 right-0 top-0  ">
                        <BinaryRain
                            textColor="#FF004D"
                            fontSize={12}
                            letters="blackhat"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
