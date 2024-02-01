import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

import toast from "react-hot-toast";

export default function VerifyUser() {
    //  I wanted to create a safe fun place to buy and sell keyboards

    const { data: session, update } = useSession();
    const ctx = api.useContext();

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

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (
            session &&
            session.user &&
            session.user.id &&
            !session.user.isVerified
        ) {
            mutate(session.user.id);
        }
    };

    return (
        <>
            <div>email is already verified because we use OAUTH</div>

            <div>
                We don't save or interact with your payment data its all securly
                stored via stripe
            </div>
            <div>going to want to verify payment via stripe</div>
            <div>Before Listing a keeb you must know...</div>
            <button>How we prevent scams</button>
            <button>
                We take a 5%
                fee from the final price of the seller.
            </button>
            <div>How do I stay safe as a seller? </div>
            <div>
                --page that explains taking a video of your keyboard working
                before sale will protect you from buyers claiming non working
                keyboards. *fire idea just make short lil hackerman style video on youtube* 
            </div>
            {session && session.user && !session.user.isVerified ? (
                <button
                    className="mt-20 rounded-xl bg-red-500 px-10 py-2"
                    onClick={handleVerify}
                >
                    Verify
                </button>
            ) : (
                <button
                    className="mt-20 rounded-xl bg-gray-500 px-10 py-2"
                    onClick={handleVerify}
                >
                    You are already verified :D
                </button>
            )}
        </>
    );
}
