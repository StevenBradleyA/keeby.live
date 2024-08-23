"use client";
import { signIn, useSession } from "next-auth/react";
import Footer from "../_components/Footer/footer";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import keebo from "@public/Profile/keebo.png";
import Image from "next/image";

interface ErrorsObj {
    text?: string;
    email?: string;
}

export default function ContactUs() {
    const { data: sessionData, status, update } = useSession();
    const utils = api.useUtils();

    const [text, setText] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [type, setType] = useState<string>("help");

    const [errors, setErrors] = useState<ErrorsObj>({});
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);

    const { mutate } = api.ticket.create.useMutation({
        onSuccess: async () => {
            try {
                toast.success("Ticket Submitted!", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
                setText("");
                setEmail("");
                setEnableErrorDisplay(false);
                setIsFinished(true);
                await update();
                void utils.user.invalidate();
            } catch (error) {
                console.error("Error while navigating:", error);
            }
        },
    });

    const handleSubmitTicket = (e: React.FormEvent) => {
        e.preventDefault();

        setEnableErrorDisplay(true);

        if (
            !Object.values(errors).length &&
            sessionData &&
            sessionData.user.id
        ) {
            const data = {
                userId: sessionData.user.id,
                text: text,
                email: email,
                type: type,
            };
            mutate(data);
        }
    };
    useEffect(() => {
        const errorsObj: ErrorsObj = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!text.length) {
            errorsObj.text = "Please tell us about your issue";
        }

        if (!email.length) {
            errorsObj.email = "Please provide your preferred email";
        } else if (!emailRegex.test(email)) {
            errorsObj.email = "Invalid email format";
        }

        setErrors(errorsObj);
    }, [text, email]);

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 top-0 z-10 "></div>
            <div className="relative z-10 h-[90vh] w-full overflow-hidden">
                <div className="contact-grid absolute z-20"></div>
                <div className="contact-grid-mirror absolute z-20 "></div>

                <div className="absolute left-1/2 top-1/2 z-20 w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border-2 border-green-500 bg-black/50 p-10 text-green-500">
                    {isFinished === false ? (
                        <>
                            <div className="w-full flex justify-center">
                                <h1 className="text-2xl">Contact</h1>
                            </div>

                            <form className=" flex flex-col">
                                <div className="w-full justify-end flex">
                                    <select
                                        id="layoutTypeInput"
                                        className=" h-10 w-1/3 rounded-md bg-green-500 p-1 px-2 py-1 text-black hover:opacity-80 ease-in"
                                        value={type}
                                        onChange={(e) =>
                                            setType(e.target.value)
                                        }
                                    >
                                        <option value="help">Help</option>
                                        <option value="bug">Bug Report</option>
                                        <option value="feature">
                                            Feature Request
                                        </option>
                                        <option value="praise">
                                            I love Keeby
                                        </option>
                                    </select>
                                </div>

                                <input
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className=" mt-2 h-10 w-full rounded-md bg-dark p-1 text-green-500 hover:opacity-80 ease-in"
                                    placeholder="Email"
                                />
                                {enableErrorDisplay && errors.email && (
                                    <p className="text-sm text-red-400">
                                        {errors.email}
                                    </p>
                                )}

                                <textarea
                                    id="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className=" mt-2 h-32 w-full rounded-md bg-dark p-1 text-green-500 hover:opacity-80 ease-in resize-none"
                                    placeholder="Describe your issue"
                                    style={{ resize: "none" }}
                                />
                                {enableErrorDisplay && errors.text && (
                                    <p className="text-sm text-red-400">
                                        {errors.text}
                                    </p>
                                )}

                                <div className="flex justify-center">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (sessionData === null)
                                                void signIn();
                                            void handleSubmitTicket(e);
                                        }}
                                        disabled={isSubmitting}
                                        className={`mt-5 rounded-md border-2 border-green-500 bg-darkGray px-6 py-1 text-green-500 hover:bg-green-500 hover:text-black
                    ${
                        isSubmitting ? "text-green-500" : ""
                    } transition-all duration-300 ease-in-out`}
                                    >
                                        {isSubmitting
                                            ? "Uploading..."
                                            : "Submit"}
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <>
                            <div className="flex  flex-col items-center w-full">
                                {type !== "praise" ? (
                                    <>
                                        <h2 className="text-2xl">Thank You</h2>
                                        <p>
                                            We will get back to you as soon as
                                            possible!
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-2xl">
                                            Thank you for the love!
                                        </h2>
                                        <p>
                                            Your kind words mean the world! I
                                            made keeby to share my passion with
                                            others, so I'm very happy you're
                                            enjoying the site.
                                        </p>
                                    </>
                                )}

                                <Image
                                    alt="keeby mascot"
                                    src={keebo}
                                    className="h-20 w-20 mt-2"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className=" z-30 relative w-full">
                <Footer />
            </div>
        </>
    );
}
