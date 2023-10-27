import type { Keeb } from "@prisma/client";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

interface UpdateKeebProps {
    keeb: Keeb;
    closeModal: () => void;
}
interface ErrorsObj {
    keyboard?: string;
    switches?: string;
    keycaps?: string;
}
interface KeebData {
    id: string;
    name: string;
    switches: string;
    keycaps: string;
    userId: string;
}

export default function UpdateKeeb({ keeb, closeModal }: UpdateKeebProps) {
    const [keyboard, setKeyboard] = useState(keeb.name);
    const [switches, setSwitches] = useState(keeb.switches);
    const [keycaps, setKeycaps] = useState(keeb.keycaps);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const ctx = api.useContext();

    const { mutate } = api.keeb.update.useMutation({
        onSuccess: () => {
            void ctx.keeb.getAll.invalidate();
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

        if (!Object.values(errors).length) {
            setIsSubmitting(true);
            const keebData: KeebData = {
                id: keeb.id,
                name: keyboard,
                switches,
                keycaps,
                userId: keeb.userId,
            };

            mutate(keebData);
        }
    };

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
                        void submit(e);
                    }}
                    disabled={isSubmitting}
                    className={`rounded-2xl bg-black px-6 py-2 `}
                >
                    {isSubmitting ? "Uploading..." : "Submit"}
                </button>
            </form>
        </>
    );
}
