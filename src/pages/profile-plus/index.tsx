import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

interface ErrorsObj {
    image?: string;
    imageExcess?: string;
    imageLarge?: string;
    username?: string;
    keyboard?: string;
    switches?: string;
    keycaps?: string;
}

export default function ProfilePlus() {
    // todo username ++ error handling to make sure unique
    // todo keeboard info  ++ error handling
    // todo profile pic (optional ) ++ error handling
    const { data: session, update } = useSession();
    const ctx = api.useContext();
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [keyboard, setKeyboard] = useState("");
    const [switches, setSwitches] = useState("");
    const [keycaps, setKeycaps] = useState("");

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        const maxFileSize = 6 * 1024 * 1024;
        const errorsObj: ErrorsObj = {};

        if (!username.length) {
            errorsObj.username = "Please provide a username";
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

        if (imageFiles.length > 5) {
            errorsObj.imageExcess = "Cannot provide more than 5 photos";
        }

        for (const file of imageFiles) {
            if (file.size > maxFileSize) {
                errorsObj.imageLarge =
                    "One or more images exceeds the max 6 MB file size";
                break;
            }
        }

        setErrors(errorsObj);
    }, [imageFiles, username, keyboard, switches, keycaps]);

    return (
        <>
            <form className="flex flex-col items-center  rounded-2xl bg-keebyGray p-20 text-3xl text-white shadow-xl">
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
                {/* {errors.username && (
                    <p className="text-xl text-red-400">{errors.username}</p>
                )} */}

                <div className="mt-5 flex justify-center text-4xl">
                    Upload a custom profile picture
                </div>
                <div className=" flex justify-center text-xl">
                    (this will be visible by other users)
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
                        // void submit(e);
                    }}
                    disabled={
                        (hasSubmitted && Object.values(errors).length > 0) ||
                        isSubmitting ||
                        (imageFiles.length > 0 &&
                            (hasSubmitted ||
                                Object.values(errors).length > 0)) ||
                        (!isSubmitting &&
                            (!username || !keyboard || !switches || !keycaps))
                    }
                    className={`bg-glass transform rounded-md px-4 py-2 shadow-md transition-transform hover:scale-105 active:scale-95 ${
                        (hasSubmitted && Object.values(errors).length > 0) ||
                        isSubmitting ||
                        (imageFiles.length > 0 &&
                            (hasSubmitted ||
                                Object.values(errors).length > 0)) ||
                        (!isSubmitting &&
                            (!username || !keyboard || !switches || !keycaps))
                            ? "text-slate-300"
                            : "text-purple-300"
                    }`}
                >
                    {isSubmitting ? "Uploading..." : "Submit"}
                </button>
            </form>
        </>
    );
}
