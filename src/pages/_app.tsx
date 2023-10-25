import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import { Toaster } from "react-hot-toast";
import "~/styles/globals.css";
import Layout from "../components/layout";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <SessionProvider session={session}>
            <Toaster />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
