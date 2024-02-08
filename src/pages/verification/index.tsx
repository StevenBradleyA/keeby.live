import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import {
    CardElement,
    Elements,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { env } from "~/env.mjs";
import { useState } from "react";
import KeebShopVerifyUser from "~/components/KeebShop/Verification";
import MainFooter from "~/components/Footer";

// npm install @stripe/stripe-js @stripe/react-stripe-js
// npm install stripe

// Charge Buyers: When a transaction occurs, use a Payment Intent to charge the buyer's saved payment method.

// Payout to Sellers: Use Stripe Connect to manage transferring funds to sellers. You might create Express or Custom accounts for your sellers to handle payouts.

export default function VerifyUser() {
    const { data: session, update } = useSession();
    const ctx = api.useContext();
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    const [clientSecret, setClientSecret] = useState<string | null>("");

    const stripeApi = env.NEXT_PUBLIC_STRIPE_API;
    const stripePromise = loadStripe(stripeApi);

    const { mutate } = api.user.verifyUser.useMutation({
        onSuccess: async () => {
            try {
                toast.success("Profile Verified!", {
                    icon: "👏",
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });

                void ctx.user.invalidate();
                await update();
            } catch (error) {
                console.error("Error while navigating:", error);
            }
        },
    });

    const { mutate: createStripeCustomer } =
        api.user.createStripeIntent.useMutation({
            onSuccess: async (data) => {
                try {
                    setClientSecret(data.clientSecret);
                    void ctx.user.invalidate();
                    await update();
                } catch (error) {
                    console.error("Error while navigating:", error);
                }
            },

            onError: (error) => {
                toast.error(`Failed to verify profile: ${error.message}`, {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
            },
        });

    const handleCreateStripeCustomer = (e: React.FormEvent) => {
        e.preventDefault();

        if (session && session.user && session.user.email) {
            const data = {
                userId: session.user.id,
                email: session.user.email,
            };

            createStripeCustomer(data);
        }
    };
    const appearance = {
        variables: {
            colorPrimary: "#22C55E",
            colorBackground: "#616161",
            colorText: '#FFFFFF'
        },
    };

    return (
        <>
            <div>email is already verified because we use OAUTH</div>

            <div>
                We don't save or interact with your payment data its all securly
                stored via stripe
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
                keeby live is a market place by verifying your account we will
                use strip to securely collect payment details to verify the
                payment method's validity and charge you or pay you at a later
                time depending on if you buy or sell.{" "}
            </p>
            <button
                onClick={handleCreateStripeCustomer}
                className="my-32 bg-red-500 p-20"
            >
                Verify Payment Method
            </button>
            {clientSecret && (
                <Elements
                    stripe={stripePromise}
                    options={{ clientSecret, appearance }}
                >
                    <KeebShopVerifyUser clientSecret={clientSecret} />
                </Elements>
            )}

            <MainFooter />

            {/* {session && session.user && !session.user.isVerified ? (
                <button className="mt-20 rounded-xl bg-red-500 px-10 py-2">
                    Verify
                </button>
            ) : (
                <button className="mt-20 rounded-xl bg-gray-500 px-10 py-2">
                    You are already verified :D
                </button>
            )} */}
        </>
    );
}

// const handleVerify = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (
//         session &&
//         session.user &&
//         session.user.id &&
//         !session.user.isVerified
//     ) {
//         mutate(session.user.id);
//     }
// };
