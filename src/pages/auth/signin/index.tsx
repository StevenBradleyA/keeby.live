import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { authSvg } from "~/components/Svgs/auth";
import { motion } from "framer-motion";
import TitleScripts from "~/components/TitleScripts";

export default function SignIn({
    providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <div className="text-3xl text-green-500">
                <TitleScripts page={"signin"} />
            </div>
            <div className="z-30 mt-10  rounded-3xl bg-keebyGray px-20 py-10">
                {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <motion.button
                            onClick={() => void signIn(provider.id)}
                            className="button-hover-effect mb-5 rounded-2xl bg-black px-6 py-2 text-green-500"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-10">
                                    {authSvg(provider.name)}
                                </div>
                                <div>Sign in with {provider.name}</div>
                            </div>
                        </motion.button>
                    </div>
                ))}
            </div>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    // If the user is already logged in, redirect.
    // Note: Make sure not to redirect to the same page
    // To avoid an infinite loop!
    if (session) {
        return { redirect: { destination: "/" } };
    }

    const providers = await getProviders();

    return {
        props: { providers: providers ?? [] },
    };
}
