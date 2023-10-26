import { useEffect, useState } from "react";

interface CreateKeebProps {
    closeModal: (isCreateKeebModalOpen: boolean) => void;
    userId: string;
}
interface ErrorsObj {
    keyboard?: string;
    switches?: string;
    keycaps?: string;
}

export default function CreateKeeb({ closeModal, userId }: CreateKeebProps) {
    const [keyboard, setKeyboard] = useState("");
    const [switches, setSwitches] = useState("");
    const [keycaps, setKeycaps] = useState("");
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

    return (
        <>
            <form>
                <input
                    value={keyboard}
                    onChange={(e) => setKeyboard(e.target.value)}
                    className=" rounded-md p-2 text-xl text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                    placeholder="Keyboard"
                ></input>
                <input
                    value={switches}
                    onChange={(e) => setSwitches(e.target.value)}
                    className=" rounded-md p-2 text-xl text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                    placeholder="Switches"
                ></input>
                <input
                    value={keycaps}
                    onChange={(e) => setKeycaps(e.target.value)}
                    className=" rounded-md p-2 text-xl text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                    placeholder="Keycaps"
                ></input>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        // void submit(e);
                    }}
                    // disabled={isSubmitting}
                    className={`rounded-2xl bg-black px-6 py-2 ${
                        isSubmitting ? "text-red-500" : ""
                    }`}
                >
                    {isSubmitting ? "Uploading..." : "Submit"}
                </button>
            </form>
        </>
    );
}
