import { useSession } from "next-auth/react";
import MainFooter from "~/components/Footer";
import defaultProfile from "@public/Profile/profile-default.png";
import Image from "next/image";
import { env } from "~/env.mjs";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";
import { motion } from "framer-motion";

export default function VerifySeller() {
    const { data: sessionData, update } = useSession();

    const ctx = api.useContext();
    const router = useRouter();
    const { code } = router.query;
    const appId = env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    useEffect(() => {
        if (code) {
            if (code && typeof code === "string") {
                handleAccessToken(code);
            }
        }
    }, [code]);

    const handleAccessToken = (authCode: string) => {
        if (authCode) {
            getPayPalAccessToken({
                authorizationCode: authCode,
            });
        }
    };

    const { mutate: getPayPalAccessToken } =
        api.user.getPayPalAccessToken.useMutation({
            onSuccess: (data) => {
                try {
                    toast.success("token acquired!", {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#fff",
                        },
                    });
                    console.log(data);
                    const userId = getCookie("verify");
                    if (userId && data.access_token && data.refresh_token) {
                        verifyUser({
                            userId: userId,
                            access: data.access_token,
                            refresh: data.refresh_token,
                        });
                    }
                } catch (error) {
                    console.error("Error while navigating:", error);
                }
            },
            onError: (error) => {
                console.error("Mutation failed with error:", error);
            },
        });

    const { mutate: verifyUser } = api.user.verifyUser.useMutation({
        onSuccess: async (data) => {
            try {
                toast.success("verified!", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
                console.log(data);
                await update();
                await ctx.user.invalidate();
            } catch (error) {
                console.error("Error while navigating:", error);
            }
        },
        onError: (error) => {
            console.error("Mutation failed with error:", error);
        },
    });
    const { mutate: verifyTesting } = api.user.verifyTesting.useMutation({
        onSuccess: async () => {
            try {
                toast.success("verified!", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
                await update();
                await ctx.user.invalidate();
            } catch (error) {
                console.error("Error while navigating:", error);
            }
        },
        onError: (error) => {
            console.error("Mutation failed with error:", error);
        },
    });

    const handleClick = () => {
        const scope = "openid email profile";
        const returnUrl = encodeURIComponent(
            "https://www.keeby.live/verify-seller"
        );
        if (sessionData) {
            setCookie("verify", sessionData.user.id.toString(), {
                maxAge: 60 * 60 * 24 * 365,
                path: "/",
            });
            window.open(
                `https://www.sandbox.paypal.com/signin/authorize?flowEntry=static&client_id=${appId}&scope=${scope}&redirect_uri=${returnUrl}`,
                "_blank"
            );
        }
    };

    const handleTesting = () => {
        if (sessionData?.user.id) {
            verifyTesting({ userId: sessionData.user.id });
        }
    };

    // todo show paypal if un verified
    // todo if verified show ability to edit paypal email... or ability to see it??? idk this kinda defeats the purpose of verification...
    // todo add a create listing button when verified...

    // you cannot change the email so in the input create a second input to make sure the emails match...

    return (
        <>
            {sessionData && sessionData.user && (
                <div className="mb-40 h-[60vh] text-white/30 laptop:w-3/4  desktop:w-2/3">
                    <div className="flex h-full w-full gap-20">
                        <div className="h-full w-3/4">
                            <h1 className="text-5xl text-green-500 px-10">
                                Sell Your Keeb
                            </h1>
                            <p className="mt-5 bg-keebyGray rounded-xl p-10 text-white">
                                {`I wanted to create a fun and safe place to buy and sell keyboards, which is how keeby started! To sell your board on keeby you have
                                to register your paypal account. This will be a one time only $0.02 charge to verify your account. Finally, you will provide the email associated with your paypal account. This will only be shown to the verified buyer who has payed keeby's fee to purchase your board at the agreed upon price. `}
                            </p>
                            <motion.button
                                className="relative mt-10 w-56  rounded-md bg-[#0070BA]"
                                onClick={handleTesting}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Image
                                    alt="paypal button"
                                    src="https://www.paypalobjects.com/devdoc/log-in-with-paypal-button.png"
                                    width={1200}
                                    height={1200}
                                    className="h-full w-full"
                                />
                            </motion.button>
                        </div>
                        <div className=" w-1/4">
                            <div className="flex w-full flex-col gap-5 rounded-xl bg-keebyGray p-10">
                                <Image
                                    alt="profile"
                                    src={
                                        sessionData.user.profile
                                            ? sessionData.user.profile
                                            : defaultProfile
                                    }
                                    className="h-full w-full rounded-md object-cover"
                                    width={800}
                                    height={800}
                                />
                                <div className="rounded-md bg-darkGray p-3 text-center">
                                    Status:{" "}
                                    <span
                                        className={`${
                                            sessionData.user.isVerified === true
                                                ? "text-green-500"
                                                : ""
                                        }`}
                                    >
                                        {`${
                                            sessionData.user.isVerified === true
                                                ? "Verified"
                                                : "Not Verified"
                                        }`}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-10 w-full rounded-xl bg-keebyGray p-10">
                                <button>How does keeby work?</button>
                                <button>Are there Fees?</button>
                                <button>Scam Prevention</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <MainFooter />
        </>
    );
}
