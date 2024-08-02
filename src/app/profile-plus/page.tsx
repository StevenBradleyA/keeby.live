"use client";
// import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { uploadFileToS3 } from "~/utils/aws";
import Image from "next/image";
import defaultProfile from "@public/Profile/profile-default.png";
import toast from "react-hot-toast";
import LoadingSpinner from "~/app/_components/Loading";
import { motion } from "framer-motion";
import Footer from "../_components/Footer/footer";
import login from "@public/Images/login.png";
import TitleScripts from "../_components/TitleScripts";
import { api } from "~/trpc/react";

interface ErrorsObj {
    image?: string;
    imageExcess?: string;
    imageLarge?: string;
    username?: string;
    usernameExcess?: string;
    taken?: string;
    keyboard?: string;
    keyboardExcess?: string;
    switches?: string;
    keycaps?: string;
}
interface Image {
    link: string;
}

interface UserData {
    userId: string;
    username: string;
    images?: Image[];
    name: string;
    switches: string;
    keycaps: string;
}

export default function ProfilePlus() {
    // todo we probably want this to look like the  sign in page so its not confusing even though it looks cool ...

    const { data: session, update } = useSession();
    const hasProfile = session?.user.hasProfile;
    const utils = api.useUtils();
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [debouncedUsername, setDebouncedUsername] = useState(username);

    const [keyboard, setKeyboard] = useState("");
    const [switches, setSwitches] = useState("");
    const [keycaps, setKeycaps] = useState("");

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // const { data: usernameCheck } = api.user.usernameCheck.useQuery(
    //     debouncedUsername,
    //     {
    //         enabled: !!debouncedUsername,
    //     },
    // );

    const { mutate } = api.user.updateNewUser.useMutation({
        onSuccess: async () => {
            try {
                toast.success("Profile complete!", {
                    icon: "👏",
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
                void utils.user.invalidate();
                await update();
                router.push("/play/profile");
            } catch (error) {
                console.error("Error while navigating:", error);
            }
        },
    });

    useEffect(() => {
        const maxFileSize = 6 * 1024 * 1024;
        const errorsObj: ErrorsObj = {};

        if (!username.length) {
            errorsObj.username = "Please provide a username";
        }
        if (username.length > 30) {
            errorsObj.usernameExcess = "Username cannot exceed 30 characters";
        }
        if (!keyboard.length) {
            errorsObj.keyboard = "Please provide your keyboard";
        }
        if (!switches.length) {
            errorsObj.switches = "Please provide your switches";
        }
        if (!keycaps.length) {
            errorsObj.keycaps = "Please provide your keycaps";
        }

        if (keyboard.length > 30) {
            errorsObj.keyboardExcess =
                "Keyboard name cannot exceed 30 characters";
        }

        if (imageFiles.length > 1) {
            errorsObj.imageExcess = "Cannot provide more than 1 photo";
        }

        for (const file of imageFiles) {
            if (file.size > maxFileSize) {
                errorsObj.imageLarge = "Image exceeds the max 6 MB file size";
                break;
            }
        }

        setErrors(errorsObj);
    }, [imageFiles, username, keyboard, switches, keycaps]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedUsername(username);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [username]);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        setEnableErrorDisplay(true);

        if (!Object.values(errors).length && !usernameCheck && !isSubmitting) {
            try {
                const sessionUserId = session?.user?.id;

                if (!sessionUserId) {
                    throw new Error("Session expired");
                }

                const data: UserData = {
                    userId: sessionUserId,
                    username,
                    name: keyboard,
                    switches: switches,
                    keycaps: keycaps,
                };

                setIsSubmitting(true);

                if (imageFiles.length > 0) {
                    const imagePromises = imageFiles.map((file) => {
                        return new Promise<string>((resolve, reject) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onloadend = () => {
                                if (typeof reader.result === "string") {
                                    const base64Data =
                                        reader.result.split(",")[1];
                                    if (base64Data) {
                                        resolve(base64Data);
                                    }
                                } else {
                                    reject(new Error("Failed to read file"));
                                }
                            };
                            reader.onerror = () => {
                                reject(new Error("Failed to read file"));
                            };
                        });
                    });

                    const base64DataArray = await Promise.all(imagePromises);
                    const imageUrlArr: string[] = [];

                    for (const base64Data of base64DataArray) {
                        const buffer = Buffer.from(base64Data, "base64");
                        const imageUrl = await uploadFileToS3(buffer);
                        imageUrlArr.push(imageUrl);
                    }

                    data.images = imageUrlArr.map((imageUrl) => ({
                        link: imageUrl || "",
                    }));
                }
                // mutate(data);
                setImageFiles([]);
                setHasSubmitted(true);
                setIsSubmitting(false);
            } catch (error) {
                console.error("Submission failed:", error);
                setIsSubmitting(false);
            }
        }
    };

    return (
        session &&
        !hasProfile && (
            <>
                {/* <div className="z-20 relative mt-40 w-full flex justify-center">
                    <form className=" flex w-1/2 flex-col text-black ">
                        <div className="flex gap-10">
                            <div className="w-40">
                                {imageFiles && imageFiles[0] ? (
                                    <div className="relative h-40 w-40">
                                        <Image
                                            className="h-full w-full rounded-md border-2 border-sky-300 object-cover"
                                            alt="profile"
                                            src={URL.createObjectURL(
                                                imageFiles[0],
                                            )}
                                            width={200}
                                            height={200}
                                        />
                                        <button
                                            className="absolute right-[-10px] top-[-32px] transform p-1 text-2xl text-gray-600 transition-transform duration-300 ease-in-out hover:rotate-45 hover:scale-110 hover:text-red-500"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setImageFiles([]);
                                            }}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ) : (
                                    <div className=" h-40 w-40 ">
                                        <Image
                                            src={defaultProfile}
                                            alt="profile"
                                            className="h-full w-full rounded-md border-2 border-sky-300 object-cover"
                                            priority
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex w-full flex-col rounded-md border-2 border-sky-300 bg-black bg-opacity-50 p-10">
                              
                            
                            </div>
                        </div>

                        <div className="mt-10 flex w-full gap-10 ">
                            <div className="flex w-1/2 flex-col gap-5 rounded-md border-2 border-sky-300 bg-black bg-opacity-50 p-10">
                                <div className="flex justify-center">
                                    <h1 className="text-pink-500">
                                        Create a Keyboard Profile
                                    </h1>
                                </div>
                                <label className="text-darkGray">
                                    Keyboard
                                    <input
                                        name="keyboard"
                                        id="keyboardInput"
                                        value={keyboard}
                                        onChange={(e) =>
                                            setKeyboard(e.target.value)
                                        }
                                        className=" h-10 w-full rounded-md bg-black  p-1 text-sky-300 "
                                        placeholder="Keyboard"
                                    ></input>
                                </label>
                                {enableErrorDisplay && errors.keyboard && (
                                    <p className="text-sm text-red-400">
                                        {errors.keyboard}
                                    </p>
                                )}
                                {enableErrorDisplay &&
                                    errors.keyboardExcess && (
                                        <p className="text-sm text-red-400">
                                            {errors.keyboardExcess}
                                        </p>
                                    )}

                                <label className="text-darkGray">
                                    Switches
                                    <input
                                        name="switches"
                                        id="keyboardSwitchesInput"
                                        value={switches}
                                        onChange={(e) =>
                                            setSwitches(e.target.value)
                                        }
                                        className=" h-10 w-full rounded-md bg-black  p-1 text-sky-300 "
                                        placeholder="Switches"
                                    ></input>
                                    {enableErrorDisplay && errors.switches && (
                                        <p className="text-sm text-red-400">
                                            {errors.switches}
                                        </p>
                                    )}
                                </label>
                                <label className="text-darkGray">
                                    Keycaps
                                    <input
                                        name="keycaps"
                                        id="keyboardKeycapsInput"
                                        value={keycaps}
                                        onChange={(e) =>
                                            setKeycaps(e.target.value)
                                        }
                                        className=" h-10 w-full rounded-md bg-black  p-1 text-sky-300 "
                                        placeholder="Keycaps"
                                    ></input>
                                </label>
                                {enableErrorDisplay && errors.keycaps && (
                                    <p className="text-sm text-red-400">
                                        {errors.keycaps}
                                    </p>
                                )}
                            </div>
                            <div className="flex w-1/2 flex-col rounded-md border-2 border-sky-300 bg-black bg-opacity-50 p-10">
                                <div className="flex flex-col items-center">
                                    <h1 className="text-pink-500">
                                        Choose a Profile Picture
                                    </h1>
                                    <h1 className="text-sky-300">{`(optional)`}</h1>
                                </div>
                                <div className="relative mt-5 flex flex-col gap-1">
                                    <label className="text-darkGray">
                                        1:1 aspect ratio recommended
                                        <input
                                            name="profileImage"
                                            id="profileImageInput"
                                            className="absolute left-0 top-7 h-32 w-full cursor-pointer rounded-md opacity-0"
                                            type="file"
                                            accept="image/png, image/jpg, image/jpeg"
                                            onChange={(e) => {
                                                if (
                                                    e.target.files &&
                                                    e.target.files.length > 0
                                                ) {
                                                    const file =
                                                        e.target.files[0];
                                                    if (file instanceof File) {
                                                        setImageFiles([file]);
                                                    }
                                                }
                                            }}
                                        />
                                    </label>
                                    <button className="h-32 w-full rounded-md bg-sky-400">
                                        <span className=" text-center">
                                            Choose Image
                                        </span>
                                    </button>
                                </div>
                                {errors.imageExcess && (
                                    <p className="text-sm text-red-400">
                                        {errors.imageExcess}
                                    </p>
                                )}
                                {errors.imageLarge && (
                                    <p className="text-sm text-red-400">
                                        {errors.imageLarge}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-5 flex justify-center">
                            <motion.button
                                whileHover={{
                                    scale: 1.1,
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    void submit(e);
                                }}
                                disabled={hasSubmitted || isSubmitting}
                                className={`rounded-xl border-2 border-pink-500 bg-black px-6 py-2 text-pink-500 hover:border-sky-400 hover:bg-sky-400 hover:text-black`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-1">
                                        Saving Data
                                        <div className="w-6">
                                            <LoadingSpinner size="16px" />
                                        </div>
                                    </div>
                                ) : (
                                    "Access Granted"
                                )}
                            </motion.button>
                        </div>
                    </form>
                </div> */}

                <div className="w-full flex justify-center mt-60">
                    <div className=" rounded-2xl w-full  largeLaptop:w-2/3   bg-keebyGray flex overflow-hidden shadow-2xl relative ">
                        <div className="w-1/2  h-full p-10 flex flex-col items-center justify-center">
                            <Image
                                src={login}
                                alt="login"
                                className="w-60 h-60 object-contain"
                            />
                        </div>
                        <div className="w-1/2 p-20 flex flex-col items-center relative">
                            <h1 className="text-2xl">Complete Your Profile!</h1>
                            <div className="relative mt-2 h-5 w-full flex justify-center ">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center w-full">
                                    <TitleScripts page="loginPlus" />
                                </div>
                            </div>
                            <form className="flex flex-col w-full mt-5">
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    className="w-full p-3 bg-black rounded-lg placeholder:text-darkGray "
                                    placeholder="Enter your username"
                                />
                                {enableErrorDisplay && errors.username && (
                                    <p className="text-xs text-red-400">
                                        {errors.username}
                                    </p>
                                )}
                                {enableErrorDisplay &&
                                    errors.usernameExcess && (
                                        <p className="text-xs text-red-400">
                                            {errors.usernameExcess}
                                        </p>
                                    )}
                                {/* {enableErrorDisplay && usernameCheck && (
                                    <p className="text-xs text-red-400">
                                        Username already in use
                                    </p>
                                )} */}
                                <div className="flex items-center w-full mt-5 gap-2 text-white/50 text-xs">
                                    <div className="h-[2px] bg-white/50 w-full"></div>
                                    <h3 className="flex-shrink-0">
                                        Create a Keyboard Profile
                                    </h3>
                                    <div className="h-[2px] bg-white/50 w-full"></div>
                                </div>

                                <input
                                    name="keyboard"
                                    id="keyboard"
                                    value={keyboard}
                                    onChange={(e) =>
                                        setKeyboard(e.target.value)
                                    }
                                    className="w-full p-3 bg-black rounded-lg placeholder:text-darkGray mt-3"
                                    placeholder="Keyboard name"
                                />
                                {enableErrorDisplay && errors.keyboard && (
                                    <p className="text-sm text-red-400">
                                        {errors.keyboard}
                                    </p>
                                )}
                                {enableErrorDisplay &&
                                    errors.keyboardExcess && (
                                        <p className="text-sm text-red-400">
                                            {errors.keyboardExcess}
                                        </p>
                                    )}
                                <input
                                    name="switches"
                                    id="switches"
                                    value={switches}
                                    onChange={(e) =>
                                        setSwitches(e.target.value)
                                    }
                                    className="w-full p-3 bg-black rounded-lg placeholder:text-darkGray mt-2 "
                                    placeholder="keyboard switches"
                                />
                                {enableErrorDisplay && errors.switches && (
                                    <p className="text-sm text-red-400">
                                        {errors.switches}
                                    </p>
                                )}

                                <input
                                    name="keycaps"
                                    id="keycaps"
                                    value={keycaps}
                                    onChange={(e) => setKeycaps(e.target.value)}
                                    className="w-full p-3 bg-black rounded-lg placeholder:text-darkGray mt-2 "
                                    placeholder="keyboard keycaps"
                                />
                                {enableErrorDisplay && errors.keycaps && (
                                    <p className="text-sm text-red-400">
                                        {errors.keycaps}
                                    </p>
                                )}

                                <div className="flex items-center w-full mt-5 gap-2 text-white/50 text-xs">
                                    <div className="h-[2px] bg-white/50 w-full"></div>
                                    <h3 className="flex-shrink-0">
                                        Custom Profile Photo (optional)
                                    </h3>
                                    <div className="h-[2px] bg-white/50 w-full"></div>
                                </div>

                                <div className="relative mt-3 flex flex-col gap-1 text-darkGray w-16 h-12 hover:opacity-70">
                                    <input
                                        name="profileImage"
                                        id="profileImageInput"
                                        className="absolute left-0 top-0 bottom-0 right-0 h-full w-full rounded-lg opacity-0 z-30"
                                        type="file"
                                        accept="image/png, image/jpg, image/jpeg"
                                        onChange={(e) => {
                                            if (
                                                e.target.files &&
                                                e.target.files.length > 0
                                            ) {
                                                const file = e.target.files[0];
                                                if (file instanceof File) {
                                                    setImageFiles([file]);
                                                }
                                            }
                                        }}
                                    />
                                    <button
                                        className="h-full w-full rounded-lg bg-black flex items-center justify-center z-20 relative"
                                        type="button"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-10 h-10 "
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M14.0295 15.7412C14.1628 16.2772 14.7052 16.6037 15.2412 16.4705C15.7772 16.3372 16.1037 15.7948 15.9705 15.2588L14.0295 15.7412ZM8.02953 15.2588C7.89631 15.7948 8.2228 16.3372 8.75878 16.4705C9.29476 16.6037 9.83725 16.2772 9.97047 15.7412L8.02953 15.2588ZM12 8.5C11.4477 8.5 11 8.94772 11 9.5C11 10.0523 11.4477 10.5 12 10.5V8.5ZM12.01 10.5C12.5623 10.5 13.01 10.0523 13.01 9.5C13.01 8.94772 12.5623 8.5 12.01 8.5V10.5ZM4.09202 19.782L4.54601 18.891L4.09202 19.782ZM3.21799 18.908L4.10899 18.454L3.21799 18.908ZM20.782 18.908L19.891 18.454L20.782 18.908ZM19.908 19.782L19.454 18.891L19.908 19.782ZM19.908 4.21799L19.454 5.10899L19.908 4.21799ZM20.782 5.09202L19.891 5.54601L20.782 5.09202ZM4.09202 4.21799L4.54601 5.10899L4.09202 4.21799ZM3.21799 5.09202L4.10899 5.54601L3.21799 5.09202ZM12 9.5V11.5C13.1046 11.5 14 10.6046 14 9.5H12ZM12 9.5H10C10 10.6046 10.8954 11.5 12 11.5V9.5ZM12 9.5V7.5C10.8954 7.5 10 8.39543 10 9.5H12ZM12 9.5H14C14 8.39543 13.1046 7.5 12 7.5V9.5ZM12 14.5C13.145 14.5 13.8839 15.1554 14.0295 15.7412L15.9705 15.2588C15.5488 13.5624 13.817 12.5 12 12.5V14.5ZM9.97047 15.7412C10.1161 15.1554 10.855 14.5 12 14.5V12.5C10.183 12.5 8.45119 13.5624 8.02953 15.2588L9.97047 15.7412ZM12 10.5H12.01V8.5H12V10.5ZM6.2 5H17.8V3H6.2V5ZM20 7.2V16.8H22V7.2H20ZM17.8 19H6.2V21H17.8V19ZM4 16.8V7.2H2V16.8H4ZM6.2 19C5.62345 19 5.25117 18.9992 4.96784 18.9761C4.69617 18.9539 4.59545 18.9162 4.54601 18.891L3.63803 20.673C4.01641 20.8658 4.40963 20.9371 4.80497 20.9694C5.18864 21.0008 5.65645 21 6.2 21V19ZM2 16.8C2 17.3436 1.99922 17.8114 2.03057 18.195C2.06287 18.5904 2.13419 18.9836 2.32698 19.362L4.10899 18.454C4.0838 18.4045 4.04612 18.3038 4.02393 18.0322C4.00078 17.7488 4 17.3766 4 16.8H2ZM4.54601 18.891C4.35785 18.7951 4.20487 18.6422 4.10899 18.454L2.32698 19.362C2.6146 19.9265 3.07354 20.3854 3.63803 20.673L4.54601 18.891ZM20 16.8C20 17.3766 19.9992 17.7488 19.9761 18.0322C19.9539 18.3038 19.9162 18.4045 19.891 18.454L21.673 19.362C21.8658 18.9836 21.9371 18.5904 21.9694 18.195C22.0008 17.8114 22 17.3436 22 16.8H20ZM17.8 21C18.3436 21 18.8114 21.0008 19.195 20.9694C19.5904 20.9371 19.9836 20.8658 20.362 20.673L19.454 18.891C19.4045 18.9162 19.3038 18.9539 19.0322 18.9761C18.7488 18.9992 18.3766 19 17.8 19V21ZM19.891 18.454C19.7951 18.6422 19.6422 18.7951 19.454 18.891L20.362 20.673C20.9265 20.3854 21.3854 19.9265 21.673 19.362L19.891 18.454ZM17.8 5C18.3766 5 18.7488 5.00078 19.0322 5.02393C19.3038 5.04612 19.4045 5.0838 19.454 5.10899L20.362 3.32698C19.9836 3.13419 19.5904 3.06287 19.195 3.03057C18.8114 2.99922 18.3436 3 17.8 3V5ZM22 7.2C22 6.65645 22.0008 6.18864 21.9694 5.80497C21.9371 5.40963 21.8658 5.01641 21.673 4.63803L19.891 5.54601C19.9162 5.59545 19.9539 5.69617 19.9761 5.96784C19.9992 6.25117 20 6.62345 20 7.2H22ZM19.454 5.10899C19.6422 5.20487 19.7951 5.35785 19.891 5.54601L21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698L19.454 5.10899ZM6.2 3C5.65645 3 5.18864 2.99922 4.80497 3.03057C4.40963 3.06287 4.01641 3.13419 3.63803 3.32698L4.54601 5.10899C4.59545 5.0838 4.69617 5.04612 4.96784 5.02393C5.25117 5.00078 5.62345 5 6.2 5V3ZM4 7.2C4 6.62345 4.00078 6.25117 4.02393 5.96784C4.04612 5.69617 4.0838 5.59545 4.10899 5.54601L2.32698 4.63803C2.13419 5.01641 2.06287 5.40963 2.03057 5.80497C1.99922 6.18864 2 6.65645 2 7.2H4ZM3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803L4.10899 5.54601C4.20487 5.35785 4.35785 5.20487 4.54601 5.10899L3.63803 3.32698Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {errors.imageExcess && (
                                    <p className="text-sm text-red-400">
                                        {errors.imageExcess}
                                    </p>
                                )}
                                {errors.imageLarge && (
                                    <p className="text-sm text-red-400">
                                        {errors.imageLarge}
                                    </p>
                                )}
                                <button
                                    className="w-full p-3 bg-green-500 shadow-2xl rounded-lg mt-5"
                                    style={{
                                        boxShadow: "0 0 20px #22C55E",
                                    }}
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        void submit(e);
                                    }}
                                    disabled={hasSubmitted || isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-1">
                                            Saving Data
                                            <div className="w-6">
                                                <LoadingSpinner size="16px" />
                                            </div>
                                        </div>
                                    ) : (
                                        "Sign In"
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* <div className="w-1/3 bg-lightGray h-full p-10 flex flex-col items-center justify-center rounded-l-3xl">
                       
                       </div>
                       <Image src={login} alt="login" className="w-80 h-80 absolute right-40 bottom-10"/> */}
                    </div>
                </div>

                <div className="w-full mt-96 ">
                    <Footer />
                </div>
            </>
        )
    );
}
