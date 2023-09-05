import NavBar from "./NavBar";
import Head from "next/head";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>Keeby Live</title>
                <meta
                    name="description"
                    content="keeby"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="min-h-screen bg-dark text-white -z-30">
                <NavBar />
                <main className="flex  flex-col items-center justify-center">
                    {children}
                </main>
            </div>
        </>
    );
}
