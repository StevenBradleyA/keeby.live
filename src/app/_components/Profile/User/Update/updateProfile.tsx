import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { uploadFileToS3 } from "~/utils/aws";
import Image from "next/image";
import defaultProfile from "@public/Profile/profile-default.png";
import keebo from "@public/Profile/keebo.png";
import toast from "react-hot-toast";
import LoadingSpinner from "~/app/_components/Loading";
import { motion } from "framer-motion";

interface ErrorsObj {
    image?: string;
    imageExcess?: string;
    imageLarge?: string;
    username?: string;
    usernameExcess?: string;
    taken?: string;
}
interface Image {
    link: string;
}

interface UserData {
    userId: string;
    username?: string;
    images?: Image[];
    selectedTag?: string;
    isNewsletter: boolean;
}
export default function UpdateProfile({
    userId,
    closeModal,
    key,
    setKey,
}: {
    userId: string;
    closeModal: () => void;
    key: number;
    setKey: (newKey: number) => void;
}) {
    const { data: sessionData, update } = useSession();

    const utils = api.useUtils();

    const [username, setUsername] = useState(sessionData?.user.username || "");
    const [debouncedUsername, setDebouncedUsername] = useState(username);
    const [isNewsletter, setIsNewsletter] = useState<boolean>(
        sessionData?.user.isNewsletter || false,
    );
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
        },
    );

    const [selectedTag, setSelectedTag] = useState<string>(
        sessionData?.user.selectedTag || "",
    );

    const { data: userTags } = api.user.getUserTags.useQuery(userId);

    const { mutate } = api.user.update.useMutation({
        onSuccess: async () => {
            try {
                toast.success("Profile updated!", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
                await update();
                void utils.user.invalidate();
                const newKey = key + 1;
                setKey(newKey);
                closeModal();
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
    }, [imageFiles, username]);

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

        if (
            !Object.values(errors).length &&
            (!usernameCheck || sessionData?.user.username === username) &&
            !isSubmitting
        ) {
            try {
                const sessionUserId = sessionData?.user?.id;

                if (!sessionUserId) {
                    throw new Error("Session expired");
                }

                const data: UserData = {
                    userId: sessionUserId,
                    isNewsletter: isNewsletter,
                };
                if (sessionData.user.selectedTag !== selectedTag) {
                    data.selectedTag = selectedTag;
                }
                if (sessionData.user.username !== username) {
                    data.username = username;
                }

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
        sessionData && (
            <form className="  flex h-full w-[600px] flex-col font-poppins text-green-500  ">
                <div className="flex items-center">
                    <div className="w-32">
                        {imageFiles && imageFiles[0] ? (
                            <div className="relative h-32 w-32">
                                <Image
                                    className="h-full w-full rounded-md   border-2 border-[#616161] object-cover"
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
                            <div className=" h-32 w-32 ">
                                <Image
                                    src={
                                        sessionData?.user.profile
                                            ? sessionData.user.profile
                                            : defaultProfile
                                    }
                                    alt="profile"
                                    className="h-full w-full rounded-md   border-2 border-[#616161] object-cover"
                                    priority
                                    width={200}
                                    height={200}
                                />
                            </div>
                        )}
                    </div>
                    <div className="relative flex  w-full items-center border-b-2 border-t-2 border-[#616161] p-4 ">
                        <div className="ml-2 flex items-center gap-2">
                            <h1 className="text-2xl text-green-500">
                                Edit Profile
                            </h1>
                            <Image
                                alt="keebo"
                                src={keebo}
                                className="h-8 w-8"
                            />
                        </div>
                        <h3 className="absolute -top-5 right-0 text-xs text-darkGray">
                            {sessionData.user.username}
                        </h3>
                    </div>
                </div>

                <div className="mt-5 flex w-full flex-col ">
                    <label className=" text-md">
                        Username
                        <input
                            name="username"
                            id="usernameInput"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="h-10 w-full rounded-md bg-darkGray p-1 "
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
                    {enableErrorDisplay &&
                        usernameCheck &&
                        sessionData.user.username !== username && (
                            <p className="text-sm text-red-400">
                                Username already in use
                            </p>
                        )}
                </div>
                <div className="mt-5 flex w-full gap-5">
                    <label className="w-2/3">
                        Selected Tag
                        <select
                            className=" h-10 w-full rounded-md bg-darkGray p-1 "
                            value={selectedTag}
                            onChange={(e) => setSelectedTag(e.target.value)}
                        >
                            {userTags &&
                                userTags.tags.length > 0 &&
                                userTags.tags.map((e) => (
                                    <option key={e.id} value={e.name}>
                                        {e.name}
                                    </option>
                                ))}
                        </select>
                    </label>
                    <label className="w-1/3">
                        Newsletter
                        <button
                            className={`flex h-10 w-full items-center justify-between overflow-hidden rounded-md bg-darkGray`}
                            onClick={(e) => {
                                e.preventDefault();
                                setIsNewsletter(!isNewsletter);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-full w-1/3 rounded-l-md bg-dark p-2 text-green-500 ${
                                    isNewsletter
                                        ? "newsletter-toggle-true slide-in"
                                        : "newsletter-toggle-false slide-out-right"
                                }`}
                                viewBox="0 0 32 32"
                                fill="none"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6.5 17l6 6 13-13"
                                />
                            </svg>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-full w-1/3 rounded-r-md bg-dark p-1 text-red-500 ${
                                    isNewsletter
                                        ? "newsletter-toggle-false slide-out-left"
                                        : "newsletter-toggle-true slide-in"
                                }`}
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M16 8L8 16M12 12L16 16M8 8L10 10"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </label>
                </div>
                <div>
                    <div className="relative mt-5 flex flex-col gap-1">
                        <label>
                            {`${
                                sessionData.user.profile ? "Update" : "Add"
                            } Profile Picture (1:1 aspect ratio recommended)`}
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
                        <button className="h-32 w-full rounded-md bg-darkGray text-black">
                            <span className=" text-center">Choose Image</span>
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
                        className={`rounded-md border-2 border-[#616161] bg-black/40 px-6 py-2 text-[#616161] hover:border-green-500 hover:bg-green-500 hover:text-black`}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-1">
                                Updating
                                <div className="w-6">
                                    <LoadingSpinner size="16px" />
                                </div>
                            </div>
                        ) : (
                            "Update"
                        )}
                    </motion.button>
                </div>
            </form>
        )
    );
}
