import {
    CardElement,
    useStripe,
    useElements,
    AddressElement,
    PaymentElement,
    ExpressCheckoutElement,
} from "@stripe/react-stripe-js";

import { env } from "~/env.mjs";

interface KeebShopVerifyUserProps {
    clientSecret: string;
}

export default function KeebShopVerifyUser({
    clientSecret,
}: KeebShopVerifyUserProps) {

    
    // const stripeApi = env.NEXT_PUBLIC_STRIPE_API;

    // const stripePromise = loadStripe(stripeApi);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Make sure Stripe.js has loaded
            console.log("Stripe has not loaded yet.");
            return;
        }

        const { error } = await stripe.confirmSetup({
            elements,
            confirmParams: {
                // Return URL where the customer should be redirected after the SetupIntent is confirmed.
                return_url: "http://localhost:3000/verification",
            },
        });
        if (error) {
            // Inform the customer that there was an error.
        }
    };

    return (
        <form
            onSubmit={void handleSubmit}
            className="w-2/3 rounded-lg bg-pogGray p-20 shadow-lg "
        >
            <div className="flex justify-between">
                <AddressElement
                    options={{ mode: "shipping", allowedCountries: ["US"] }}
                />
                <div className="flex flex-col gap-10">
                    <PaymentElement />
                    <button
                        type="submit"
                        disabled={!stripe}
                        className="mt-10 rounded-xl bg-green-500 px-4 py-2 shadow-lg "
                    >
                        Save Payment Method
                    </button>
                </div>
            </div>
        </form>
    );
}
