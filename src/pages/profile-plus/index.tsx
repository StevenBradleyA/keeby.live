import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { uploadFileToS3 } from "~/utils/aws";
import Image from "next/image";
import defaultProfile from "@public/Profile/profile-default.png";
import gridBackground from "@public/Profile/profile-plus.png";
import toast from "react-hot-toast";
import LoadingSpinner from "~/components/Loading";
import { motion } from "framer-motion";

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
    const { data: session, update } = useSession();
    const hasProfile = session?.user.hasProfile;
    const ctx = api.useContext();
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

    const { data: usernameCheck } = api.user.usernameCheck.useQuery(
        debouncedUsername,
        {
            enabled: !!debouncedUsername,
        }
    );

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
                void ctx.user.invalidate();
                await update();
                await router.push("/play/profile");
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
                mutate(data);

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
                <Image
                    src={gridBackground}
                    alt="background"
                    className="matrix-full-screen fixed bottom-0 left-0 right-0 top-0 h-full w-full object-cover object-center opacity-40 "
                    priority
                />
                <form className=" z-10 flex w-1/2 flex-col text-black ">
                    <div className="flex gap-10">
                        <div className="w-40">
                            {imageFiles && imageFiles[0] ? (
                                <div className="relative h-40 w-40">
                                    <Image
                                        className="h-full w-full rounded-md border-2 border-sky-300 object-cover"
                                        alt="profile"
                                        src={URL.createObjectURL(imageFiles[0])}
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
                            <label className=" text-md text-darkGray">
                                Define Your Identity: Enter Username
                                <input
                                    name="username"
                                    id="usernameInput"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    className=" h-10 w-full rounded-md bg-black  p-1 text-sky-300 "
                                    placeholder="Username"
                                ></input>
                            </label>
                            {enableErrorDisplay && errors.username && (
                                <p className="text-sm text-red-400">
                                    {errors.username}
                                </p>
                            )}
                            {enableErrorDisplay && errors.usernameExcess && (
                                <p className="text-sm text-red-400">
                                    {errors.usernameExcess}
                                </p>
                            )}
                            {enableErrorDisplay && usernameCheck && (
                                <p className="text-sm text-red-400">
                                    Username already in use
                                </p>
                            )}
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
                            {enableErrorDisplay && errors.keyboardExcess && (
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
                                    onChange={(e) => setKeycaps(e.target.value)}
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
                                                const file = e.target.files[0];
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
            </>
        )
    );
}
