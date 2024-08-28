"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
import { hash } from "bcryptjs";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import hacktime from "@public/Gifs/hackerman-gif.gif";
import BinaryRain from "~/app/_components/Matrix/binaryRain";
import toast from "react-hot-toast";

export default function SuperSpecialSecretAdminLogin() {
    const [pass, setPass] = useState<string>("");
    const router = useRouter();
    const { data: sessionData, update } = useSession();

    const isAdmin = sessionData && sessionData.user.isAdmin;
    const handleSignIn = async () => {
        await signIn();
    };
    const handleGoogleSignOut = async () => {
        await signOut();
    };

    const { mutate } = api.user.grantAdmin.useMutation({
        onSuccess: async (res) => {
            await update();
            toast.success("I'm In", {
                icon: "👻🔓",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#ff0000",
                },
            });

            if (res === "Success") void router.push("/admin");
            if (res === "Incorrect") return;
            if (res === "Error") return;
        },
    });

    const hackerHash = async () => {
        const hashPass = await hash(pass, 6);
        mutate(hashPass);
    };

    return (
        <>
            <div className="fixed z-10 top-0 bottom-0 left-0 right-0">
                <BinaryRain
                    textColor="#22c55e"
                    fontSize={16}
                    letters="010110"
                />
            </div>
            <div className="w-full flex justify-center mt-40  relative z-20">
                <div className="flex flex-col items-center justify-center rounded-2xl bg-black/80 p-20 ">
                    {sessionData === null ? (
                        <Image
                            src={hacktime}
                            alt="hacking time"
                            className="z-50 cursor-pointer "
                            onClick={() => void handleSignIn()}
                        />
                    ) : (
                        <Image
                            src={hacktime}
                            alt="hacking time"
                            className="z-50"
                        />
                    )}

                    {sessionData && !isAdmin && (
                        <>
                            <input
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                className="z-10 mb-5 rounded-md border border-green-500 bg-black px-4 py-2 text-green-500 placeholder-green-500 focus:border-green-700 focus:outline-none"
                                placeholder="It's Hacking Time"
                            />
                            <button
                                onClick={() => void hackerHash()}
                                className="hover:bg-keeby z-10 rounded-md bg-green-500 px-6 py-1  text-black hover:opacity-80 "
                            >
                                {`C:\\\\> Hack`}
                            </button>
                        </>
                    )}
                    {sessionData && isAdmin && (
                        <button
                            onClick={() => void handleGoogleSignOut()}
                            className="hover:bg-keeby z-10 mt-5 rounded-md bg-green-500 px-6 py-1  text-black hover:opacity-80"
                        >
                            {`C:\\\\> Log out`}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
