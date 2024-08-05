"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import profileTransition from "@public/Gifs/profileTransition.gif";

export default function KeebPlay() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (pathname === "/play/profile") {
                void router.push("/profile");
            }
        }, 2600);

        return () => clearTimeout(timeoutId);
    }, [pathname, router]);

    return (
        <>
            {pathname === "/play/profile" && (
                <Image
                    alt="profile"
                    src={profileTransition}
                    className="fixed top-0 left-0 bottom-0 right-0 z-40 h-full w-full object-cover"
                />
            )}
        </>
    );
}
