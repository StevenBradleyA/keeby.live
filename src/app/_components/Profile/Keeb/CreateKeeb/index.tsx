import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import defaultProfile from "@public/Profile/profile-default.png";
import keebo from "@public/Profile/keebo.png";
import toast from "react-hot-toast";

interface CreateKeebProps {
    closeModal: () => void;
    userId: string;
}
interface ErrorsObj {
    keyboard?: string;
    switches?: string;
    keycaps?: string;
}
interface KeebData {
    name: string;
    switches: string;
    keycaps: string;
    userId: string;
}

export default function CreateKeeb({ closeModal, userId }: CreateKeebProps) {
    const [keyboard, setKeyboard] = useState("");
    const [switches, setSwitches] = useState("");
    const [keycaps, setKeycaps] = useState("");
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);

    const utils = api.useUtils();
    const { data: sessionData } = useSession();

    const { mutate } = api.keeb.create.useMutation({
        onSuccess: () => {
            void utils.keeb.getAllByUserId.invalidate();
            toast.success("New Keed Created!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });

            closeModal();
        },
    });

    useEffect(() => {
        const errorsObj: ErrorsObj = {};

        if (!keyboard.length) {
            errorsObj.keyboard = "Please provide your keyboard";
        }
        if (!switches.length) {
            errorsObj.switches = "Please provide your switches";
        }
        if (!keycaps.length) {
            errorsObj.keycaps = "Please provide your keycaps";
        }

        setErrors(errorsObj);
    }, [keyboard, switches, keycaps]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setEnableErrorDisplay(true);

        if (!Object.values(errors).length) {
            setIsSubmitting(true);
            const keebData: KeebData = {
                name: keyboard,
                switches,
                keycaps,
                userId,
            };

            mutate(keebData);
        }
    };

    return (
        <>
            <form className="flex w-96 flex-col  ">
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
                        className="h-20 w-20 rounded-md border-2 border-[#616161] object-cover "
                    />
                    <div className="relative flex  w-full items-center border-b-2 border-t-2 border-[#616161] p-2 ">
                        <div className="ml-2 flex items-center gap-2">
                            <h1 className="text-2xl text-green-500">
                                Create a Keeb
                            </h1>
                            <Image
                                alt="keebo"
                                src={keebo}
                                className="h-6 w-6"
                            />
                        </div>
                        <h3 className="absolute -top-5 right-0 text-xs text-darkGray">
                            {sessionData?.user.username}
                        </h3>
                    </div>
                </div>

                <input
                    value={keyboard}
                    onChange={(e) => setKeyboard(e.target.value)}
                    className="mt-5 h-10 w-full rounded-md bg-darkGray p-1 "
                    placeholder="Name"
                ></input>
                {enableErrorDisplay && errors.keyboard && (
                    <p className="text-sm text-red-400">{errors.keyboard}</p>
                )}
                <input
                    value={switches}
                    onChange={(e) => setSwitches(e.target.value)}
                    className="mt-5 h-10 w-full rounded-md bg-darkGray p-1 "
                    placeholder="Switches"
                ></input>
                {enableErrorDisplay && errors.switches && (
                    <p className="text-sm text-red-400">{errors.switches}</p>
                )}
                <input
                    value={keycaps}
                    onChange={(e) => setKeycaps(e.target.value)}
                    className="mt-5 h-10 w-full rounded-md bg-darkGray p-1 "
                    placeholder="Keycaps"
                ></input>
                {enableErrorDisplay && errors.keycaps && (
                    <p className="text-sm text-red-400">{errors.keycaps}</p>
                )}
                <div className="flex justify-center">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            void submit(e);
                        }}
                        disabled={isSubmitting}
                        className={`mt-5 rounded-md border-2 border-green-500 bg-keebyGray px-6 py-1 text-green-500 hover:bg-green-500 hover:text-black
                    ${
                        isSubmitting ? "text-green-500" : ""
                    } transition-all duration-300 ease-in-out`}
                    >
                        {isSubmitting ? "Uploading..." : "Submit"}
                    </button>
                </div>
            </form>
        </>
    );
}
