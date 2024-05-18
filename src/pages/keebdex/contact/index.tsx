import { signIn, useSession } from "next-auth/react";

import MainFooter from "~/components/Footer/mainFooter";
import { api } from "~/utils/api";
import toast from "react-hot-toast";

export default function ContactUs() {
    const { data: sessionData, status, update } = useSession();
    const ctx = api.useContext();

    const { mutate } = api.user.updateNewsletter.useMutation({
        onSuccess: async (data) => {
            try {
                if (data?.isNewsletter === true) {
                    toast.success("Newsletter Joined!", {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#fff",
                        },
                    });
                }
                if (data?.isNewsletter === false) {
                    toast.success("Newsletter Left!", {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#fff",
                        },
                    });
                }

                await update();
                void ctx.user.invalidate();
            } catch (error) {
                console.error("Error while navigating:", error);
            }
        },
    });

    const handleNewsletterUpdate = (
        e: React.FormEvent,
        newsletter: boolean
    ) => {
        e.preventDefault();

        if (
            newsletter !== sessionData?.user.isNewsletter &&
            sessionData?.user.id
        ) {
            const data = {
                userId: sessionData.user.id,
                isNewsletter: newsletter,
            };
            mutate(data);
        }
    };

    return (
        <>
            <div
                className="fixed bottom-0 left-0 right-0 top-0 z-10 "
                // style={{
                //     background:
                //         "linear-gradient(to bottom, #000000, #050505, #0A0A0A, #0F0F0F, #141414, #191919, #1E1E1E, #232323, #1B3833, #237544, #2B8E4F, #34A05A, #3AB35C)",
                // }}
            ></div>
            <div className="relative z-10 h-[88vh] w-full overflow-hidden">
                <div className="contact-grid absolute z-20"></div>
                <div className="contact-grid-mirror absolute z-20 "></div>

                <div className="absolute left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-green-500 bg-black/20 p-10 text-green-500">
                    <h1>Need Help? Submit a ticket below to contact us!</h1>
                </div>
            </div>

            <div className=" z-10 w-full">
                <MainFooter />
            </div>
        </>
    );
}
