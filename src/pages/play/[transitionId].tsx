import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";
import profilePlay from "../../../public/Gifs/profile-page.gif";

export default function KeebPlay() {
    const router = useRouter();
    const { data: session } = useSession();

    // const page = router.query.transitionId;

    // useEffect(() => {
    //     const pogPlay = setTimeout(() => {
    //         if (page === "profile" && session) {
    //             void router.push(`/profile`);
    //         }
    //     }, 3000);

    //     return () => {
    //         clearTimeout(pogPlay);
    //     };
    // }, [page]);
    useEffect(() => {
        if (!router.isReady) return;

        const page = router.query.transitionId;
        const timeoutId = setTimeout(() => {
            if (page === "profile" && session) {
                void router.push("/profile");
            }
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, [router.isReady, router.query, session]); // Depend on router.isReady and router.query

    return (
        <>
            {/* {page === "profile" && ( */}
            {router.query.transitionId === "profile" && (
                <Image
                    alt="profile"
                    src={profilePlay}
                    className="fixed inset-0 z-50 h-full w-full object-cover"
                />
            )}
        </>
    );
}
