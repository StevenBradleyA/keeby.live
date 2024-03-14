import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface KeebShopVerifyUserProps {
    userId: string;
}

export default function KeebShopVerifyUser({
    userId,
}: KeebShopVerifyUserProps) {
    const ctx = api.useContext();

    const { data: session, update } = useSession();

    const { mutate } = api.user.verifyUser.useMutation({
        onSuccess: async () => {
            try {
                toast.success("Seller Verified!", {
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

    const handleVerify = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mutate(userId);
    };

    return (
        <button className="my-32" onClick={handleVerify}>
            <Image
                alt="paypal button"
                src="https://www.paypalobjects.com/devdoc/log-in-with-paypal-button.png"
                width={200}
                height={200}
            />
        </button>
    );
}
