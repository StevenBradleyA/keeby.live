import "~/styles/globals.css";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import MobileProvider from "./_components/Context/Mobile";
import { Toaster } from "react-hot-toast";
import Navigation from "./_components/Navigation/navigation";
import SessionProviderWrapper from "./_components/Context/Session/sessionProviderWrapper";
import GlobalStateProvider from "./_components/Context/GlobalState/globalState";

export const metadata: Metadata = {
    title: "Keeby",
    description: "Keeby is the one place for mechanical keyboard",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
    authors: [{ name: "Steven", url: "https://steven-anderson.com" }],
    generator: "Next.js",
    keywords: [
        "Keeby",
        "Keeby Live",
        "Mechanical Keyboards",
        "Keyboards for sale",
        "keeb",
        "Keeb Type",
        "keeby.live",
        "KeebyLive",
    ],
    referrer: "origin",
    appleWebApp: {
        capable: true,
        title: "Keeby",
        statusBarStyle: "black-translucent",
    },
    // icons: {
    //     icon: "/favicon.ico",
    //      apple: "/apple-touch-icon.png",
    // },
    openGraph: {
        type: "website",
        url: "https://keeby.live",
        title: "Steven Anderson",
        description:
            "Keeby is the one place for everything mechanical keyboard",
        siteName: "Keeby",
        images: [
            {
                url: "https://keeby.live/og-image.png",
                width: 1200,
                height: 630,
                alt: "Keeby",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@keeby.live",
        creator: "@keeby.live",
        title: "Keeby",
        description:
            "Keeby is the one place for everything mechanical keyboard",
        images: ["https://steven-anderson.com/og-image.png"],
    },
    // verification: {
    //     google: '1234567890',
    //     yandex: '1234567890',
    // },
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="font-poppins bg-dark text-white">
                <TRPCReactProvider>
                    <Toaster />
                    <SessionProviderWrapper>
                        <MobileProvider>
                            <GlobalStateProvider>
                                <Navigation />
                                <main>{children}</main>
                            </GlobalStateProvider>
                        </MobileProvider>
                    </SessionProviderWrapper>
                </TRPCReactProvider>
            </body>
        </html>
    );
}
