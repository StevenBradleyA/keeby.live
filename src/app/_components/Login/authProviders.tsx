"use client";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { authSvg } from "~/app/_components/Svgs/auth";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import TitleScripts from "../TitleScripts";
import { api } from "~/trpc/react";
import LoadingSpinner from "../Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Providers = Record<LiteralUnion<string>, ClientSafeProvider> | null;

interface ErrorsObj {
    username?: string;
    password?: string;
    image?: string;
    email?: string;
    imageExcess?: string;
    imageLarge?: string;
    usernameExcess?: string;
    taken?: string;
    keyboard?: string;
    keyboardExcess?: string;
    switches?: string;
    keycaps?: string;
}

export default function AuthProviders() {
    const { data: session, status } = useSession();
    const hasShownToast = useRef(false);
    const router = useRouter();

    const [providers, setProviders] = useState<Providers>(null);
    const [isProviderCheck, setIsProviderCheck] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const { mutate } = api.user.providerCheck.useMutation({
        onSuccess: (data) => {
            try {
                if (Array.isArray(data)) {
                    setMessage(`Connected with ${data.join(", ")}`);
                } else {
                    setMessage(data);
                }
            } catch (error) {
                console.error("Error while processing data:", error);
            }
            setIsSubmitting(false);
        },
        onError: (error) => {
            setMessage(`Error: ${error.message}`);
            setIsSubmitting(false);
        },
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        setEnableErrorDisplay(true);

        if (!Object.values(errors).length && !isSubmitting) {
            try {
                setIsSubmitting(true);
                mutate(email);
            } catch (error) {
                console.error("Submission failed:", error);
                setIsSubmitting(false);
            }
        }
    };

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        };

        void fetchProviders();
    }, []);

    useEffect(() => {
        const errorsObj: ErrorsObj = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.length) {
            errorsObj.email = "Please provide your preferred email";
        } else if (!emailRegex.test(email)) {
            errorsObj.email = "Invalid email format";
        }

        setErrors(errorsObj);
    }, [email]);

    useEffect(() => {
        if (status === "authenticated" && !hasShownToast.current) {
            toast.success(`Welcome, ${session.user.name}!`, {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            hasShownToast.current = true;
            router.push("/");
        }
    }, [status, router, session]);

    if (status === "loading") {
        return <LoadingSpinner size="30px" />;
    }

    return (
        <>
            {isProviderCheck === false ? (
                <div className="absolute top-3 right-3 text-xs flex gap-1 text-white/50">
                    <h3>Which provider did I use before?</h3>
                    <button
                        className="text-green-500 hover:opacity-75"
                        onClick={() => setIsProviderCheck(true)}
                    >
                        help me
                    </button>
                </div>
            ) : (
                <div className="absolute top-3 right-3 text-xs flex gap-1 text-white/50">
                    <h3>I hate it here</h3>
                    <button
                        className="text-green-500 hover:opacity-75"
                        onClick={() => setIsProviderCheck(false)}
                    >
                        help me
                    </button>
                </div>
            )}

            <h1 className="text-2xl">Sign In!</h1>
            <div className="relative mt-2 h-5 w-full flex justify-center ">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center w-full">
                    <TitleScripts page="login" />
                </div>
            </div>

            {isProviderCheck === true && (
                <>
                    <form className="flex flex-col w-full mt-5">
                        <input
                            className="w-full p-3 bg-black rounded-lg placeholder:text-mediumGray hover:opacity-80 "
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {enableErrorDisplay && errors.email && (
                            <p className="text-xs text-red-400">
                                {errors.email}
                            </p>
                        )}

                        <button
                            className="w-full p-3 bg-green-500 hover:opacity-90 shadow-2xl rounded-lg mt-5 flex justify-center"
                            style={{
                                boxShadow: "0 0 20px #22C55E",
                            }}
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                void submit(e);
                            }}
                        >
                            {isSubmitting ? (
                                <LoadingSpinner size="20px" />
                            ) : (
                                "Check"
                            )}
                        </button>
                    </form>
                    <div className="mt-3 text-xs text-green-500">{message}</div>
                </>
            )}
            <div className="flex items-center w-full mt-5 gap-2 text-white/50 text-xs">
                <div className="h-[2px] bg-white/50 w-full"></div>
                <h3 className="flex-shrink-0">Get started with</h3>
                <div className="h-[2px] bg-white/50 w-full"></div>
            </div>
            <div className="flex w-full justify-evenly mt-5">
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
        </>
    );
}
