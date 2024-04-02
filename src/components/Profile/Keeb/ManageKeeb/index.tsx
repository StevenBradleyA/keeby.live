import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import type { Keeb } from "@prisma/client";
import { deleteCookie, hasCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import defaultProfile from "@public/Profile/profile-default.png";
import keebo from "@public/Profile/keebo.png";
import toast from "react-hot-toast";

interface ManageKeebProps {
    closeModal: () => void;
    userId: string;
    keeb: Keeb;
    length: number;
}

interface ErrorsObj {
    keyboard?: string;
    switches?: string;
    keycaps?: string;
}

export default function ManageKeeb({
    closeModal,
    keeb,
    length,
    userId,
}: ManageKeebProps) {
    const ctx = api.useContext();
    const [toggle, setToggle] = useState<string>("MENU");

    // update
    const [keyboard, setKeyboard] = useState(keeb.name);
    const [switches, setSwitches] = useState(keeb.switches);
    const [keycaps, setKeycaps] = useState(keeb.keycaps);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { data: sessionData } = useSession();

    const { mutate: deleteKeeb } = api.keeb.delete.useMutation({
        onSuccess: () => {
            void ctx.keeb.getAllByUserId.invalidate();
            toast.success("Keed Deleted!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            closeModal();
        },
    });

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        if (length > 0) {
            const keebData = {
                id: keeb.id,
                userId: keeb.userId,
            };
            const keebCookie = hasCookie("keeb");

            if (keebCookie) {
                deleteCookie("keeb", {
                    path: "/",
                    //todo domain: ".keeb.live", will need to update when live
                });
            }

            deleteKeeb(keebData);
        }
    };

    const { mutate: updateKeeb } = api.keeb.update.useMutation({
        onSuccess: () => {
            void ctx.keeb.getAllByUserId.invalidate();
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
        <div className=" font-poppins text-darkGray">
            {toggle === "MENU" && (
                <div className="flex  flex-col gap-2 p-5">
                    <button
                        className="hover:text-green-500 "
                        onClick={() => setToggle("UPDATE")}
                    >
                        Edit
                    </button>
                    {length > 1 && (
                        <button
                            onClick={() => setToggle("DELETE")}
                            className="hover:text-green-500 "
                        >
                            Delete
                        </button>
                    )}
                </div>
            )}
            {toggle === "DELETE" && (
                <div className="w-[35rem]">
                    <h1 className="text-center text-xl text-green-500">
                        Are you sure you want to delete
                        <span className="ml-1 text-darkGray">{keeb.name}</span>?
                    </h1>
                    <div className="mt-5 flex justify-center gap-10 ">
                        <button
                            onClick={handleDelete}
                            className={`rounded-md border-2 border-[#ff0000] bg-keebyGray bg-opacity-60 px-8 py-2 text-failure transition-all duration-300 ease-in-out  hover:bg-failure hover:bg-opacity-100 hover:text-black`}
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => setToggle("MENU")}
                            className={`rounded-md border-2 border-green-500 bg-keebyGray bg-opacity-60 px-8 py-2 text-green-500 transition-all duration-300 ease-in-out  hover:bg-green-500 hover:bg-opacity-100 hover:text-black`}
                        >
                            No
                        </button>
                    </div>
                </div>
            )}

            {toggle === "UPDATE" && (
                <form className="flex w-96 flex-col gap-5 text-green-500 ">
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
                            className="h-20 w-20 border-2 border-[#616161] object-cover "
                        />
                        <div className="relative flex  w-full items-center border-b-2 border-t-2 border-[#616161] p-2 ">
                            <div className="ml-2 flex items-center gap-2">
                                <h1 className="text-2xl text-green-500">
                                    Edit Keeb
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
                        className="h-10 w-full rounded-md bg-darkGray p-1 "
                        placeholder="Name"
                    ></input>
                    <input
                        value={switches}
                        onChange={(e) => setSwitches(e.target.value)}
                        className="h-10 w-full rounded-md bg-darkGray p-1 "
                        placeholder="Switches"
                    ></input>
                    <input
                        value={keycaps}
                        onChange={(e) => setKeycaps(e.target.value)}
                        className="h-10 w-full rounded-md bg-darkGray p-1 "
                        placeholder="Keycaps"
                    ></input>
                    <div className="flex justify-center">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                void submit(e);
                            }}
                            disabled={isSubmitting}
                            className={`rounded-md border-2 border-green-500 bg-keebyGray px-6 py-1 text-green-500 hover:bg-green-500 hover:text-black
    ${
        isSubmitting ? "text-green-500" : ""
    } transition-all duration-300 ease-in-out`}
                        >
                            {isSubmitting ? "Uploading..." : "Update"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
