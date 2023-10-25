import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { uploadFileToS3 } from "~/utils/aws";
import Image from "next/image";

interface ErrorsObj {
    image?: string;
    imageExcess?: string;
    imageLarge?: string;
    username?: string;
    taken?: string;
    keyboard?: string;
    switches?: string;
    keycaps?: string;
}
interface Image {
    link: string;
}
interface KeebData {
    userId: string;
    name: string;
    switches: string;
    keycaps: string;
}

interface UserData {
    userId: string;
    username: string;
    images?: Image[];
}

export default function ProfilePlus() {
    // todo username ++ error handling to make sure unique
    // todo keeboard info  ++ error handling
    // todo profile pic (optional ) ++ error handling
    // todo create new keeby.live aws bucket
    // todo create user update route after bucket is setup to test
    // todo only allow png or jpg
    // todo update new disable logic to prevent submittion isSubmitting etc

    // ! keeb mutate --- running a create
    // ! user --- running an update

    const { data: session, update } = useSession();
    const ctx = api.useContext();
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [keyboard, setKeyboard] = useState("");
    const [switches, setSwitches] = useState("");
    const [keycaps, setKeycaps] = useState("");

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isAvailable, setIsAvailable] = useState<boolean>(false);

    const { data: usernameCheck } = api.user.usernameCheck.useQuery(username);

    // const { mutate } = api.user.updateNewUser.useMutation({
    //     onSuccess: async () => {
    //         try {
    //             // toast.success("First time client form complete!", {
    //             //     icon: "👏",
    //             //     style: {
    //             //         borderRadius: "10px",
    //             //         background: "#333",
    //             //         color: "#fff",
    //             //     },
    //             // });
    //             void ctx.user.getAllUsers.invalidate();
    //             void ctx.user.invalidate();
    //             await update();
    //             await router.push("/");
    //         } catch (error) {
    //             console.error("Error while navigating:", error);
    //         }
    //     },
    // });

    // const { mutate: usernameCheck } = api.user.usernameCheck.useMutation({
    //     onSuccess: async () => {
    //         console.log("poggers");
    //     },
    // });

    useEffect(() => {
        const maxFileSize = 6 * 1024 * 1024;
        const errorsObj: ErrorsObj = {};

        if (!username.length) {
            errorsObj.username = "Please provide a username";
        }
        if (!isAvailable) {
            errorsObj.taken = "Username already exists";
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

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsAvailable(!usernameCheck);
        setEnableErrorDisplay(true);

        if (!Object.values(errors).length && isAvailable && !isSubmitting) {
            try {
                const sessionUserId = session?.user?.id;

                if (!sessionUserId) {
                    throw new Error("Session expired");
                }

                const data: UserData = {
                    userId: sessionUserId,
                    username,
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
        <>
            <form className="mb-20 flex flex-col  items-center rounded-2xl bg-keebyGray p-20 text-3xl text-white shadow-xl">
                <div className="mb-5 flex justify-center text-xl">
                    Please choose a username
                </div>
                <div className=" mb-10 flex gap-5">
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className=" rounded-md p-2 text-xl text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                        placeholder="Username"
                    ></input>
                </div>
                {enableErrorDisplay && errors.username && (
                    <p className="text-xl text-red-400">{errors.username}</p>
                )}
                {enableErrorDisplay && errors.taken && (
                    <p className="text-xl text-red-400">{errors.taken}</p>
                )}

                <div className="mb-5 flex justify-center text-xl">
                    Create a Keyboard profile
                </div>
                <div className="mb-5 flex justify-center text-xl">
                    (can add more later)
                </div>
                <div className=" mb-10 flex gap-5">
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
                </div>
                {enableErrorDisplay && errors.keyboard && (
                    <p className="text-xl text-red-400">{errors.keyboard}</p>
                )}
                {enableErrorDisplay && errors.switches && (
                    <p className="text-xl text-red-400">{errors.switches}</p>
                )}
                {enableErrorDisplay && errors.keycaps && (
                    <p className="text-xl text-red-400">{errors.keycaps}</p>
                )}

                <div className="mt-5 flex justify-center text-4xl">
                    Upload a custom profile picture
                </div>
                <div className=" flex justify-center text-xl">
                    (optional ++ will be visible by other users)
                </div>
                <div className="py-4">
                    <label className="relative inline-block h-40 w-40">
                        <input
                            className="absolute h-full w-full cursor-pointer opacity-0"
                            type="file"
                            multiple
                            // accept="image/png, image/jpg, image/jpeg"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files)
                                    setImageFiles([
                                        ...imageFiles,
                                        ...e.target.files,
                                    ]);
                            }}
                        />
                        <div className="bg-glass flex h-full w-full cursor-pointer items-center justify-center rounded text-white shadow-lg transition-all duration-300 hover:shadow-xl">
                            <span className="bg-red-300 text-center">
                                Choose Files
                            </span>
                        </div>
                    </label>
                </div>
                <div className="mb-5 flex w-3/4 flex-wrap justify-center gap-10">
                    {imageFiles.map((e, i) => (
                        <div key={i} className="relative">
                            <Image
                                className="h-28 w-auto rounded-lg object-cover shadow-sm hover:scale-105 hover:shadow-md"
                                alt={`listing-${i}`}
                                src={URL.createObjectURL(e)}
                                width={100}
                                height={100}
                            />
                            <button
                                className="absolute right-[-10px] top-[-32px] transform p-1 text-2xl text-gray-600 transition-transform duration-300 ease-in-out hover:rotate-45 hover:scale-110 hover:text-red-500"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const newImageFiles = [...imageFiles];
                                    newImageFiles.splice(i, 1);
                                    setImageFiles(newImageFiles);
                                }}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
                {errors.imageExcess && (
                    <p className="create-listing-errors text-red-500">
                        {errors.imageExcess}
                    </p>
                )}
                {errors.imageLarge && (
                    <p className="create-listing-errors text-red-500">
                        {errors.imageLarge}
                    </p>
                )}

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        void submit(e);
                    }}
                    disabled={hasSubmitted || isSubmitting}
                    className={`rounded-2xl bg-black px-6 py-2 ${
                        hasSubmitted ? "text-red-500" : ""
                    } ${isSubmitting ? "text-red-500" : ""}`}
                >
                    {isSubmitting ? "Uploading..." : "Submit"}
                </button>
            </form>
        </>
    );
}
