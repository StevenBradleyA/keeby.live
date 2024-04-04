import { useSession } from "next-auth/react";
import MainFooter from "~/components/Footer";
import defaultProfile from "@public/Profile/profile-default.png";
import Image from "next/image";
import { env } from "~/env.mjs";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import PayPalLogin from "~/components/KeebShop/VerifySeller";

export default function VerifySeller() {
    // npm i @paypal/react-paypal-js not sure if going to use quite yet or at all tbh... currently installed
    // we will use your paypal email to send you payouts when your keyboard sells.
    const { data: sessionData, update } = useSession();

    const ctx = api.useContext();
    const router = useRouter();
    const { code } = router.query;

    useEffect(() => {
        if (code) {
            if (code && typeof code === "string") {
                handleAccessToken(code);
            }
        }
    }, [code]);

    const handleAccessToken = (authCode: string) => {
        const userId = getCookie("verify");
        if (authCode && userId) {
            getPayPalAccessToken({
                userId: userId,
                authorizationCode: authCode,
            });
        }
    };

    const { mutate: getPayPalAccessToken } =
        api.user.getPayPalAccessToken.useMutation({
            onSuccess: async (data) => {
                try {
                    toast.success("Profile Verified!", {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#fff",
                        },
                    });
                    console.log(data)
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

    // const { mutate } = api.user.verifyUser.useMutation({
    //     onSuccess: async () => {
    //         try {
    //             toast.success("Seller Verified!", {
    //                 style: {
    //                     borderRadius: "10px",
    //                     background: "#333",
    //                     color: "#fff",
    //                 },
    //             });

    //             void ctx.user.invalidate();
    //             await update();
    //         } catch (error) {
    //             console.error("Error while navigating:", error);
    //         }
    //     },
    //     onError: (error) => {
    //         console.error("Mutation failed with error:", error);
    //     },
    // });

    // const paypalLoginUrl = `https://www.paypal.com/signin/authorize?client_id=${env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&response_type=code&scope=email&redirect_uri=https://www.keeby.live/verify-seller`;
    // const paypalLoginUrl = `https://sandbox.paypal.com/signin/authorize?client_id=${env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&response_type=code&scope=email&redirect_uri=https://www.keeby.live/verify-seller`;

    // const handleVerifySellerClick = () => {
    //     if (sessionData && sessionData.user && sessionData.user.id) {
    //         setCookie("verify", sessionData.user.id.toString(), {
    //             maxAge: 60 * 60 * 24 * 365,
    //             path: "/",
    //         });
    //         window.location.href = paypalLoginUrl;
    //     }
    // };

    return (
        <>
            {sessionData && sessionData.user && (
                <div className="mb-40 h-[60vh] text-white/30 laptop:w-3/4  desktop:w-1/2">
                    <div className="flex h-full w-full gap-10">
                        <div className="h-full w-2/3">
                            <h1 className="text-5xl text-green-500 ">
                                Sell Your Keeb
                            </h1>
                            <p className="mt-2">
                                {`I wanted to create a fun and safe place to buy and sell keyboards, which is how keeby started!  To sell a mechanical keyboard on keeby you have
                                to register your paypal account.`}
                            </p>

                            <PayPalLogin />
                        </div>
                        <div className=" w-1/3">
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
                                <button>How does selling work?</button>
                                <button>Are there Fees?</button>
                            </div>
                        </div>
                    </div>
                    {/* <div>email is already verified because we use OAUTH</div>
  <p>
                                    {" "}
                                    {`Keeby uses
                                paypal to protect buyers and sellers from
                                getting scammed. Just a reminder keeby takes a
                                5% fee from your sale and seller's are
                                responsible for shipping so price accordingly.
                                you can check out the rules here.`}
                                </p>
                    <div>
                        {`     We don't save or interact with your payment data its all securly
                stored via stripe`}
                    </div>
                    <div>going to want to verify payment via stripe</div>
                    <div>
                        I wanted to create a safe fun place to buy and sell
                        keyboards
                    </div>
                    <button>How we prevent scams</button>
                    <button>
                        We take a 5% fee from the final price of the seller.
                    </button>
                    <div>How do I stay safe as a seller? </div>
                    <div>
                        --page that explains taking a video of your keyboard
                        working before sale will protect you from buyers
                        claiming non working keyboards. *fire idea just make
                        short lil hackerman style video on youtube*
                    </div>
                    <p>
                        {`keeby live is a market place by verifying your account we will
                use strip to securely collect payment details to verify the
                payment method's validity and charge you or pay you at a later
                time depending on if you buy or sell.`}
                    </p>
   <Image
                alt="paypal button"
                src="https://www.paypalobjects.com/devdoc/log-in-with-paypal-button.png"
                width={200}
                height={200}
            />
                    {sessionData &&
                    sessionData.user &&
                    !sessionData.user.isVerified ? (
                        <KeebShopVerifyUser userId={sessionData.user.id} />
                    ) : (
                        <button className="mt-20 rounded-xl bg-gray-500 px-10 py-2">
                            You are already verified :D
                        </button>
                    )} */}
                </div>
            )}
            <MainFooter />
        </>
    );
}
