import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import { Toaster } from "react-hot-toast";
import "~/styles/globals.css";
import Layout from "../components/layout";
import MobileProvider from "~/components/Context/Mobile";
import ThemeProvider from "~/components/Context/Theme";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <SessionProvider session={session}>
            <Toaster />
            <MobileProvider>
                <ThemeProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </MobileProvider>
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
