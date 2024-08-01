import { getProviders } from "next-auth/react";
import { authSvg } from "~/app/_components/Svgs/auth";

export default async function AuthProviders() {
    const providers = await getProviders();

    return (
        <div className="flex w-full justify-evenly">
            {providers &&
                Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <button
                        // onClick={() => void signIn(provider.id)}
                        // className="button-hover-effect mb-5 rounded-2xl bg-black px-6 py-2 text-green-500"
                        // whileHover={{ scale: 1.1 }}
                        // whileTap={{ scale: 0.95 }}
                        >
                            <div className="w-16 h-12 bg-black flex items-center justify-center p-2 rounded-xl shadow-xl">
                                {authSvg(provider.name)}
                            </div>
                        </button>
                    </div>
                ))}
        </div>
    );
}
