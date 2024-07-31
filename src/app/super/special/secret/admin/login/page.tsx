import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";
import { hash } from "bcryptjs";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import hacktime from "@public/Gifs/hackerman-gif.gif";

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
        <div className="relative h-full w-full text-green-500 ">
            <div className="matrix-full-screen fixed bottom-0 left-0 right-0 top-0  ">
                <video
                    className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-full object-cover object-center"
                    autoPlay
                    loop
                    muted
                >
                    <source
                        src="https://s3.us-west-2.amazonaws.com/keeby.live/matrix-fade-green.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className=" absolute left-1/2 z-10 flex w-1/2 -translate-x-1/2   transform flex-col items-center justify-center rounded-2xl bg-black p-20 ">
                {sessionData === null ? (
                    <Image
                        src={hacktime}
                        alt="hacking time"
                        className="z-50 cursor-pointer "
                        onClick={() => void handleSignIn()}
                    />
                ) : (
                    <Image src={hacktime} alt="hacking time" className="z-50" />
                )}

                {sessionData && !isAdmin && (
                    <>
                        <input
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className="z-10 mb-5 rounded border border-green-500 bg-black px-4 py-2 text-green-500 placeholder-green-500 focus:border-green-700 focus:outline-none"
                            placeholder="It's Hacking Time"
                        />
                        <button
                            onClick={() => void hackerHash()}
                            className="hover:bg-keeby z-10 rounded-2xl bg-green-500 px-6 py-1  text-black hover:text-green-500 "
                        >
                            {`C:\\\\> Hack`}
                        </button>
                    </>
                )}
                {sessionData && isAdmin && (
                    <button
                        onClick={() => void handleGoogleSignOut()}
                        className="hover:bg-keeby z-10 mt-5 rounded-2xl bg-green-500 px-6 py-1  text-black hover:text-green-500"
                    >
                        {`C:\\\\> Log out`}
                    </button>
                )}
            </div>
        </div>
    );
}
