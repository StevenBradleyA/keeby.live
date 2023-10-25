import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";
import profilePlay from "../../../public/Gifs/profile-page.gif";

export default function KeebPlay() {
    const router = useRouter();
    const { data: session } = useSession();

    const page = router.query.transitionId;

    useEffect(() => {
        const pogPlay = setTimeout(() => {
            if (page === "profile" && session) {
                void router.push(`/profile/${session.user.id}`);
            }
        }, 3500);

        return () => {
            clearTimeout(pogPlay);
        };
    }, [page]);

    return (
        <>
            {page === "profile" && (
                <Image
                    alt="profile"
                    src={profilePlay}
                    className="fixed inset-0 z-50 h-full w-full object-cover"
                />
            )}
        </>
    );
}
