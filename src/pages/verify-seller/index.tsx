import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { env } from "~/env.mjs";
import { useState } from "react";
import MainFooter from "~/components/Footer";
import { useRouter } from "next/router";
import LoadingSpinner from "~/components/Loading";
import Image from "next/image";
import KeebShopVerifyUser from "~/components/KeebShop/Verification";

export default function VerifySeller() {
    const { data: session, update } = useSession();
    const ctx = api.useContext();
    const router = useRouter();

    // WHEN LIVE INTEGRATE PAYPAL LOGIN HERE FOR SELLERS
    // BUYERS ONLY NEED PAYPAL EXPRESS
    // SELLERS WILL NEED A PAYPAL ACCOUNT FOR PAYOUTS SUPER POGS

    return (
        <>
            <div>email is already verified because we use OAUTH</div>

            <div>
                {`     We don't save or interact with your payment data its all securly
                stored via stripe`}
            </div>
            <div>going to want to verify payment via stripe</div>
            <div>
                I wanted to create a safe fun place to buy and sell keyboards
            </div>
            <button>How we prevent scams</button>
            <button>
                We take a 5% fee from the final price of the seller.
            </button>
            <div>How do I stay safe as a seller? </div>
            <div>
                --page that explains taking a video of your keyboard working
                before sale will protect you from buyers claiming non working
                keyboards. *fire idea just make short lil hackerman style video
                on youtube*
            </div>
            <p>
                {`keeby live is a market place by verifying your account we will
                use strip to securely collect payment details to verify the
                payment method's validity and charge you or pay you at a later
                time depending on if you buy or sell.`}
            </p>

            {session && session.user && !session.user.isVerified ? (
                <KeebShopVerifyUser userId={session.user.id} />
            ) : (
                <button className="mt-20 rounded-xl bg-gray-500 px-10 py-2">
                    You are already verified :D
                </button>
            )}
            <MainFooter />
        </>
    );
}
