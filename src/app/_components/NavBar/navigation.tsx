

import Image from "next/image";
import home from "@public/Nav/home.png";
import Link from "next/link";

export default function Navigation() {
    return (
        <nav className="fixed top-0 left-0 right-0 p-5 bg-black/20 flex justify-between items-center px-10">
            <Link
                href={"/"}
                aria-label="home button"
                className="hover:opacity-75 ease-in"
            >
                <Image alt="home" className="w-72" src={home} />
            </Link>
            <div className="w-10 h-10 bg-white rounded-full "></div>
        </nav>
    );
}
