import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
    return (
        <nav
            className="sticky top-0 z-10 mb-10 flex items-center justify-between 
            rounded-b-3xl  bg-black bg-opacity-40 py-4 text-white backdrop-blur-md"
            aria-label="Main Navigation"
        >
            <h1 className="rounded-md border-r-2 px-10 py-6 text-3xl">
                <Link href="/" aria-label="Home">
                    Starter Clone Jutsu
                </Link>
            </h1>
            <ul className="flex flex-grow justify-around text-2xl">
                <li>
                    <Link href="/posts" aria-label="Posts">
                        Posts
                    </Link>
                </li>
                <li>
                    <Link href="/bookings" aria-label="Bookings">
                        Bookings
                    </Link>
                </li>
                <li>
                    <Link href="/images" aria-label="Images">
                        Images
                    </Link>
                </li>
            </ul>
            <AuthController />
        </nav>
    );
}

function AuthController() {
    const { data: sessionData } = useSession();

    return (
        <div className="flex flex-col items-center justify-center gap-1 rounded-md border-l-2 px-10 py-2 text-base">
            <p className="text-center">
                {sessionData && <span>Hello {sessionData.user?.name}!</span>}
            </p>
            <button
                aria-label={sessionData ? "Sign out" : "Sign in"}
                className="rounded-full bg-white/10 px-4 py-2 font-semibold no-underline transition hover:bg-white/20"
                onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                }
            >
                {sessionData ? "Sign out" : "Sign in"}
            </button>
        </div>
    );
}
