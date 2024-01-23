import { useSession } from "next-auth/react";
import NavBar from "./NavBar";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const router = useRouter();
    const hasProfile = session?.user.hasProfile;

    // console.log(router.asPath);
    useEffect(() => {
        const isProfilePlus = router.asPath === "/profile-plus";
        if (session && hasProfile === false && !isProfilePlus) {
            void router.push("/profile-plus");
        }
    }, [hasProfile, router.asPath, session]);

    return (
        <>
            <Head>
                <title>Keeby Live</title>
                <meta name="description" content="keeby" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="-z-30 min-h-screen bg-dark font-poppins text-white   ">
                <NavBar />
                <main className="flex  flex-col items-center justify-center">
                    {children}
                </main>
            </div>
        </>
    );
}
