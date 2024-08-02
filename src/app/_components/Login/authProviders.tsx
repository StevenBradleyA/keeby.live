"use client";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { authSvg } from "~/app/_components/Svgs/auth";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";

type Providers = Record<LiteralUnion<string>, ClientSafeProvider> | null;

export default function AuthProviders() {
    const [providers, setProviders] = useState<Providers>(null);

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        };

        void fetchProviders();
    }, []);

    return (
        <div className="flex w-full justify-evenly">
            {providers &&
                Object.values(providers).map((provider) => (
                    <div
                        key={provider.name}
                        className=" rounded-xl overflow-hidden shadow-xl bg-black hover:text-mediumGray text-green-400 "
                    >
                        <button
                            className="w-16 h-12  flex items-center justify-center p-2 "
                            onClick={() => void signIn(provider.id)}
                        >
                            {authSvg(provider.name)}
                        </button>
                    </div>
                ))}
        </div>
    );
}
