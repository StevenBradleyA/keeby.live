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
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);

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
        <div className=" font-poppins text-darkGray">
            {toggle === "MENU" && (
                <div className="flex  flex-col items-start gap-2 p-5">
                    <div className="flex gap-2">
                        <h1 className="mb-2 text-xl">Manage Keeb</h1>
                        <Image
                            alt="keebo"
                            src={keebo}
                            className="h-6 w-6 object-contain"
                        />
                    </div>
                    <button
                        className="text-md profile-manage-button flex items-center gap-2 rounded-md  border-2 py-2 pr-4 text-white "
                        onClick={() => setToggle("UPDATE")}
                    >
                        <svg
                            className="profile-manage-button-arrow w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                            ></path>
                        </svg>
                        <span className="profile-manage-button-text">Edit</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="profile-manage-button-circle w-2"
                            viewBox="0 0 32 32"
                        >
                            <circle cx="16" cy="16" r="16" />
                        </svg>
                    </button>
                    {length > 1 && (
                        <button
                            className="text-md profile-manage-button flex items-center gap-2 rounded-md  border-2 py-2 pr-4 text-white "
                            onClick={() => setToggle("DELETE")}
                        >
                            <svg
                                className="profile-manage-button-arrow w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                                ></path>
                            </svg>
                            <span className="profile-manage-button-text">
                                Delete
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="profile-manage-button-circle w-2"
                                viewBox="0 0 32 32"
                            >
                                <circle cx="16" cy="16" r="16" />
                            </svg>
                        </button>
                    )}
                </div>
            )}
            {toggle === "DELETE" && (
                <div className="text-darkGray">
                    <h1 className="text-center">
                        Are you sure you want to{" "}
                        <span className="text-red-500"> delete</span>{" "}
                        {keeb.name}?
                    </h1>
                    <div className="flex justify-center gap-10 ">
                        <button
                            className=" text-md keeb-shop-offer-button mt-5 flex items-center gap-2 rounded-md bg-darkGray py-2 pr-4 text-black "
                            onClick={handleDelete}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="keeb-shop-offer-button-arrow w-3"
                                viewBox="0 0 25 25"
                                version="1.1"
                            >
                                <g
                                    stroke="none"
                                    stroke-width="1"
                                    fill="none"
                                    fill-rule="evenodd"
                                >
                                    <g
                                        transform="translate(-469.000000, -1041.000000)"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M487.148,1053.48 L492.813,1047.82 C494.376,1046.26 494.376,1043.72 492.813,1042.16 C491.248,1040.59 488.712,1040.59 487.148,1042.16 L481.484,1047.82 L475.82,1042.16 C474.257,1040.59 471.721,1040.59 470.156,1042.16 C468.593,1043.72 468.593,1046.26 470.156,1047.82 L475.82,1053.48 L470.156,1059.15 C468.593,1060.71 468.593,1063.25 470.156,1064.81 C471.721,1066.38 474.257,1066.38 475.82,1064.81 L481.484,1059.15 L487.148,1064.81 C488.712,1066.38 491.248,1066.38 492.813,1064.81 C494.376,1063.25 494.376,1060.71 492.813,1059.15 L487.148,1053.48"
                                            id="cross"
                                        ></path>
                                    </g>
                                </g>
                            </svg>
                            <span className="keeb-shop-offer-button-text">
                                {`Yes I'm Sure `}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="keeb-shop-offer-button-circle w-5"
                                fill="currentColor"
                                viewBox="0 0 32 32"
                            >
                                <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048zM9.76 20.256q0 0.832 0.576 1.408t1.44 0.608 1.408-0.608l2.816-2.816 2.816 2.816q0.576 0.608 1.408 0.608t1.44-0.608 0.576-1.408-0.576-1.408l-2.848-2.848 2.848-2.816q0.576-0.576 0.576-1.408t-0.576-1.408-1.44-0.608-1.408 0.608l-2.816 2.816-2.816-2.816q-0.576-0.608-1.408-0.608t-1.44 0.608-0.576 1.408 0.576 1.408l2.848 2.816-2.848 2.848q-0.576 0.576-0.576 1.408z" />
                            </svg>
                        </button>
                        <button
                            className=" text-md keeb-shop-offer-button mt-5 flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                            onClick={() => setToggle("MENU")}
                        >
                            <svg
                                className="keeb-shop-offer-button-arrow w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                                ></path>
                            </svg>
                            <span className="keeb-shop-offer-button-text">
                                {`No `}
                            </span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="keeb-shop-offer-button-circle w-2"
                                viewBox="0 0 32 32"
                            >
                                <circle cx="16" cy="16" r="16" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {toggle === "UPDATE" && (
                <form className="flex w-96 flex-col text-green-500 ">
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
                        className="mt-5 h-10 w-full rounded-md bg-darkGray p-1 "
                        placeholder="Name"
                    ></input>
                    {enableErrorDisplay && errors.keyboard && (
                        <p className="text-sm text-red-400">
                            {errors.keyboard}
                        </p>
                    )}
                    <input
                        value={switches}
                        onChange={(e) => setSwitches(e.target.value)}
                        className="mt-5 h-10 w-full rounded-md bg-darkGray p-1 "
                        placeholder="Switches"
                    ></input>
                    {enableErrorDisplay && errors.switches && (
                        <p className="text-sm text-red-400">
                            {errors.switches}
                        </p>
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
                            {isSubmitting ? "Uploading..." : "Update"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
