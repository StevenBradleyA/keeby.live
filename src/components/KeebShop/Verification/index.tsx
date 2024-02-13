import {
    useStripe,
    useElements,
    AddressElement,
    PaymentElement,
} from "@stripe/react-stripe-js";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface KeebShopVerifyUserProps {
    clientSecret: string;
}

export default function KeebShopVerifyUser({
    clientSecret,
}: KeebShopVerifyUserProps) {
    const ctx = api.useContext();
    const stripe = useStripe();
    const elements = useElements();

    const { data: session, update } = useSession();

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Make sure Stripe.js has loaded
            console.log("Stripe has not loaded yet.");
            return;
        }

        // First, submit the PaymentElement to collect payment details and handle authentication
        const submissionResult = await elements.submit();

        if (submissionResult && session) {
            // Handle errors from the submission if necessary
            if (submissionResult.error) {
                console.log(
                    "Submission Error:",
                    submissionResult.error.message
                );
                // Display the error to the user
                return;
            }

            // After a successful submission, proceed to confirm the setup
            const { error } = await stripe.confirmSetup({
                elements,
                clientSecret, // Make sure this clientSecret is up-to-date
                confirmParams: {
                    return_url: "http://localhost:3000/verification",
                },
            });

            if (error) {
                console.log("Error:", error.message);
                // Display the error to the user
            } else {
                mutate(session.user.id);
            }
        } else {
            // Handle the case where the submissionResult is undefined or not successful
            console.log("Error submitting PaymentElement.");
        }
    };

    return (
        <form
            onSubmit={(e) => void handleSubmit(e)}
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
