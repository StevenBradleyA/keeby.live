import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";
import { useEffect, useState } from "react";

interface ErrorsObj {
    image?: string;
    imageExcess?: string;
    imageShortage?: string;
    imageLarge?: string;
    description?: string;
    title?: string;
    titleExcess?: string;
    priceNone?: string;
    priceExcess?: string;
    priceNotWhole?: string;
    keycaps?: string;
    switches?: string;
    switchType?: string;
    soundTest?: string;
    soundType?: string;
    layoutType?: string;
    assemblyType?: string;
    pcbType?: string;
}

export default function CreatePostModal() {
    const { data: sessionData } = useSession();

    const [title, setTitle] = useState<string>("");
    const [soundTest, setSoundTest] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [preview, setPreview] = useState<number>(0);
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);

    useEffect(() => {
        const maxFileSize = 8 * 1024 * 1024;
        const errorsObj: ErrorsObj = {};
        // if (imageFiles.length > 15) {
        //     errorsObj.imageExcess = "Cannot provide more than 15 photos";
        // }
        // if (imageFiles.length < 5) {
        //     errorsObj.imageShortage = "Please provide at least 5 photos";
        // }

        if (!title.length) {
            errorsObj.title = "Please provide a title for your post";
        }
        if (title.length > 50) {
            errorsObj.titleExcess = "Title cannot exceed 50 characters";
        }

        const isValidYouTubeUrl = (url: string) => {
            const regex =
                /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
            return regex.test(url);
        };

        if (soundTest.length && !isValidYouTubeUrl(soundTest)) {
            errorsObj.soundTest = "Please provide a valid YouTube Link";
        }

        for (const file of imageFiles) {
            if (file.size > maxFileSize) {
                errorsObj.imageLarge =
                    "One or more images exceeds the max 8 MB file size";
                break;
            }
        }

        setErrors(errorsObj);
    }, [imageFiles, title, soundTest]);

    return (
        <>
            {sessionData === null ? (
                <div className="p-2">
                    <div className="flex items-end gap-2">
                        <h1 className="text-2xl text-green-500">
                            Sign in to post content
                        </h1>
                        <Image alt="keebo" src={keebo} className="h-12 w-12" />
                    </div>
                    <div className="mt-5 flex justify-center">
                        <motion.button
                            whileHover={{
                                scale: 1.1,
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="  rounded-xl border-2 border-black bg-black px-6 py-2 text-green-500 hover:border-green-500 hover:bg-keebyGray"
                            onClick={() => void signIn()}
                        >
                            {`Let's go`}
                        </motion.button>
                    </div>
                </div>
            ) : (
                <div className="p-2">
                    <div className="flex items-end gap-3">
                        <h1 className="text-2xl text-green-500">
                            Create a Post
                        </h1>
                        <Image alt="keebo" src={keebo} className="h-12 w-12" />
                    </div>
                    <form>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="titleInput"
                                className="text-darkGray"
                            >
                                Title
                            </label>
                            <input
                                id="titleInput"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="h-10 w-full rounded-md bg-white p-1 "
                                placeholder="Title"
                            />
                            {enableErrorDisplay && errors.title && (
                                <p className="text-sm text-red-400">
                                    {errors.title}
                                </p>
                            )}
                            {enableErrorDisplay && errors.titleExcess && (
                                <p className="text-sm text-red-400">
                                    {errors.titleExcess}
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
