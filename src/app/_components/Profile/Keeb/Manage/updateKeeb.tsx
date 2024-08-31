"use client";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import type { Keeb } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import defaultProfile from "@public/Images/defaultProfile.png";
import keebo from "@public/Profile/keebo.png";
import toast from "react-hot-toast";

interface ManageKeebProps {
    closeModal: () => void;
    userId: string;
    keeb: Keeb;
}

interface ErrorsObj {
    keyboard?: string;
    switches?: string;
    keycaps?: string;
    keyboardExcess?: string;
}

export default function UpdateKeeb({
    closeModal,
    keeb,
    userId,
}: ManageKeebProps) {
    const utils = api.useUtils();
    const { data: sessionData } = useSession();

    // form state
    const [keyboard, setKeyboard] = useState(keeb.name);
    const [switches, setSwitches] = useState(keeb.switches);
    const [keycaps, setKeycaps] = useState(keeb.keycaps);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);

    // server interactions
    const { mutate: updateKeeb } = api.keeb.update.useMutation({
        onSuccess: () => {
            void utils.keeb.getAllByUserId.invalidate();
            toast.success("Keed Updated!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            closeModal();
        },
    });

    // monitoring
    useEffect(() => {
        const errorsObj: ErrorsObj = {};

        if (!keyboard.length) {
            errorsObj.keyboard = "Please provide your keyboard";
        }

        if (keyboard.length > 30) {
            errorsObj.keyboardExcess =
                "Keyboard name cannot exceed 30 characters";
        }

        if (!switches.length) {
            errorsObj.switches = "Please provide your switches";
        }
        if (!keycaps.length) {
            errorsObj.keycaps = "Please provide your keycaps";
        }

        setErrors(errorsObj);
    }, [keyboard, switches, keycaps]);

    // helpers
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setEnableErrorDisplay(true);

        if (!Object.values(errors).length) {
            setIsSubmitting(true);
            const keebData = {
                id: keeb.id,
                name: keyboard,
                switches,
                keycaps,
                userId,
            };

            updateKeeb(keebData);
        }
    };

    return (
        <form className="flex w-[400px] flex-col text-white ">
            <div className="flex items-center">
                <Image
                    alt="keeb"
                    src={
                        sessionData?.user.profile
                            ? sessionData.user.profile
                            : defaultProfile
                    }
                    width={300}
                    height={300}
                    className="h-20 w-20 rounded-md border-2 border-mediumGray object-cover "
                />
                <div className="relative flex  w-full items-center border-b-2 border-t-2 border-mediumGray p-2 ">
                    <div className="ml-2 flex items-center gap-2">
                        <h1 className="text-2xl text-green-500">Edit Keeb</h1>
                        <Image alt="keebo" src={keebo} className="h-6 w-6" />
                    </div>
                    <h3 className="absolute -top-5 right-0 text-xs text-mediumGray">
                        {sessionData?.user.username}
                    </h3>
                </div>
            </div>

            <input
                value={keyboard}
                onChange={(e) => setKeyboard(e.target.value)}
                className="mt-5 h-10 w-full rounded-md bg-mediumGray p-1 hover:opacity-80"
                placeholder="Name"
            ></input>
            {enableErrorDisplay && errors.keyboard && (
                <p className="text-xs text-red-400">{errors.keyboard}</p>
            )}
            {enableErrorDisplay && errors.keyboardExcess && (
                <p className="text-xs text-red-400">{errors.keyboardExcess}</p>
            )}
            <input
                value={switches}
                onChange={(e) => setSwitches(e.target.value)}
                className="mt-5 h-10 w-full rounded-md bg-mediumGray p-1 hover:opacity-80"
                placeholder="Switches"
            ></input>
            {enableErrorDisplay && errors.switches && (
                <p className="text-xs text-red-400">{errors.switches}</p>
            )}
            <input
                value={keycaps}
                onChange={(e) => setKeycaps(e.target.value)}
                className="mt-5 h-10 w-full rounded-md bg-mediumGray p-1 hover:opacity-80"
                placeholder="Keycaps"
            ></input>
            {enableErrorDisplay && errors.keycaps && (
                <p className="text-xs text-red-400">{errors.keycaps}</p>
            )}
            <div className="flex justify-center">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        void submit(e);
                    }}
                    disabled={isSubmitting}
                    className={`mt-5 rounded-md border-2 border-green-500 bg-darkGray px-6 py-1 text-green-500 hover:bg-green-500 hover:text-black
    ${
        isSubmitting ? "text-green-500" : ""
    } transition-all duration-300 ease-in-out`}
                >
                    {isSubmitting ? "Uploading..." : "Update"}
                </button>
            </div>
        </form>
    );
}
