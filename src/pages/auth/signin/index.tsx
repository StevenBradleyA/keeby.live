import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { authSvg } from "~/components/Svgs/auth";

export default function SignIn({
    providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <div>Im In</div>
            <div className="rounded-2xl bg-testFour p-10">
                {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <button
                            onClick={() => void signIn(provider.id)}
                            className="mb-5 rounded-2xl bg-black px-6 py-2 text-green-500"
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-10">
                                    {authSvg(provider.name)}
                                </div>
                                <div>Sign in with {provider.name}</div>
                            </div>
                        </button>
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
