import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";
import profilePlay from "../../../public/Gifs/profile-page.gif";

interface KeebPlayProps {
    page: string;
}

export default function KeebPlay({ page }: KeebPlayProps) {
    const router = useRouter();
    const { data: session } = useSession();

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
        <>{page === "profile" && <Image alt="profile" src={profilePlay} />}</>
    );
}
