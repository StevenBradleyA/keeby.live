import NavBar from "./NavBar";
import Head from "next/head";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>Starter Clone Jutsu</title>
                <meta
                    name="description"
                    content="The one clone to rule them all"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <NavBar />
                <main className="flex  flex-col items-center justify-center">
                    {children}
                </main>
            </div>
        </>
    );
}
