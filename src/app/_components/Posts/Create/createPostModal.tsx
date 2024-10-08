"use client";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";
import defaultProfile from "@public/Images/defaultProfile.png";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import LoadingSpinner from "~/app/_components/Loading";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { uploadFileToS3 } from "~/utils/aws";
import type { ChangeEvent } from "react";
import heic2any from "heic2any";

interface ErrorsObj {
    image?: string;
    imageExcess?: string;
    imageLarge?: string;
    text?: string;
    title?: string;
    titleExcess?: string;
    link?: string;
}

interface Image {
    link: string;
}

interface PostData {
    userId: string;
    title: string;
    tag: string;
    link?: string;
    text?: string;
    preview?: number;
    images?: Image[];
}

interface CreatePostModalProps {
    closeModal: () => void;
}

export default function CreatePostModal({ closeModal }: CreatePostModalProps) {
    const { data: sessionData } = useSession();
    const router = useRouter();
    const utils = api.useUtils();

    // form state
    const [title, setTitle] = useState<string>("");
    const [showLinkInput, setShowLinkInput] = useState<boolean>(false);
    const [link, setLink] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [tag, setTag] = useState<string>("discussion");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [preview, setPreview] = useState<number>(0);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);

    // server interactions --
    const { mutate } = api.post.create.useMutation({
        onSuccess: (data) => {
            toast.success("Post Complete!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            void utils.post.getAllNewPreviewPosts.invalidate();
            void router.push(`/share/${data.newPost.id}`);
            closeModal();
        },
    });

    // helpers --
    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const processedFiles: File[] = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file) {
                    if (
                        file.type === "image/heic" ||
                        file.type === "image/heif"
                    ) {
                        try {
                            const convertedBlob = (await heic2any({
                                blob: file,
                                toType: "image/jpeg",
                            })) as Blob;
                            const convertedFile = new File(
                                [convertedBlob],
                                file.name.replace(/\.[^/.]+$/, ".jpg"),
                                { type: "image/jpeg" },
                            );
                            processedFiles.push(convertedFile);
                        } catch (error) {
                            console.error("Error converting HEIC file:", error);
                        }
                    } else {
                        processedFiles.push(file);
                    }
                }
            }

            setImageFiles(processedFiles);
        }
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        setEnableErrorDisplay(true);

        if (!Object.values(errors).length && !isSubmitting) {
            try {
                const sessionUserId = sessionData?.user?.id;

                if (!sessionUserId) {
                    throw new Error("Session expired");
                }

                const data: PostData = {
                    userId: sessionUserId,
                    title,
                    tag,
                    preview,
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

                if (link) {
                    data.link = link;
                }
                if (text) {
                    data.text = text;
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

    // monitors --

    useEffect(() => {
        const maxFileSize = 8 * 1024 * 1024;
        const errorsObj: ErrorsObj = {};
        if (imageFiles.length > 5) {
            errorsObj.imageExcess = "Cannot provide more than 5 photos";
        }

        if (!title.length) {
            errorsObj.title = "Please provide a title for your post";
        }
        if (title.length > 40) {
            errorsObj.titleExcess = "Title cannot exceed 40 characters";
        }

        const isValidYouTubeUrl = (url: string) => {
            const regex =
                /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
            return regex.test(url);
        };

        if (link.length && !isValidYouTubeUrl(link)) {
            errorsObj.link = "Please provide a valid YouTube Link";
        }

        for (const file of imageFiles) {
            if (file.size > maxFileSize) {
                errorsObj.imageLarge =
                    "One or more images exceeds the max 8 MB file size";
                break;
            }
        }

        setErrors(errorsObj);
    }, [imageFiles, title, link]);

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
                    <div className="flex justify-center">
                        <button
                            className="text-md keeb-share-preview-button mt-5 flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                            style={{
                                boxShadow: "0 0 20px #22C55E",
                            }}
                            onClick={() => void signIn()}
                        >
                            <svg
                                className="keeb-share-preview-button-arrow w-4"
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
                            <span className="keeb-share-preview-button-text">
                                {`Let's Go `}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="keeb-share-preview-button-circle w-2"
                                viewBox="0 0 32 32"
                            >
                                <circle cx="16" cy="16" r="16" />
                            </svg>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="h-[500px] w-[600px] overflow-auto  px-3 ">
                    <div className="flex items-center">
                        <Image
                            alt="keeb"
                            src={
                                sessionData.user.profile
                                    ? sessionData.user.profile
                                    : defaultProfile
                            }
                            width={300}
                            height={300}
                            className="h-20 w-20 border-2 border-mediumGray object-cover rounded-md "
                        />
                        <div className="relative flex  w-full items-center border-b-2 border-t-2 border-mediumGray p-2 ">
                            <div className="ml-2 flex items-center gap-2">
                                <h1 className="text-2xl text-green-500">
                                    Create a Post
                                </h1>
                                <Image
                                    alt="keebo"
                                    src={keebo}
                                    className="h-6 w-6 object-contain"
                                />
                            </div>
                            <h3 className="absolute -top-5 right-0 text-xs text-mediumGray">
                                {sessionData.user.username}
                            </h3>
                        </div>
                    </div>

                    <form className="mt-5 text-white">
                        <div className="flex flex-col gap-1">
                            <input
                                name="title"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className=" w-full rounded-md bg-mediumGray p-2 placeholder:text-lightGray hover:opacity-80"
                                placeholder="Enter a title..."
                            />
                            {enableErrorDisplay && errors.title && (
                                <p className="text-xs text-red-400">
                                    {errors.title}
                                </p>
                            )}
                            {enableErrorDisplay && errors.titleExcess && (
                                <p className="text-xs text-red-400">
                                    {errors.titleExcess}
                                </p>
                            )}
                        </div>
                        <div className="mt-2 flex w-full items-center justify-between">
                            <div className="flex gap-5 ">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowLinkInput(!showLinkInput);
                                        showLinkInput ? setLink("") : null;
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        version="1.1"
                                        id="Layer_1"
                                        viewBox="0 0 461.001 461.001"
                                        className="hover:text-mediumGray ease-in text-red-500 w-8 h-8"
                                        fill="currentColor"
                                    >
                                        <g>
                                            <path d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728   c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137   C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607   c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z" />
                                        </g>
                                    </svg>
                                </button>

                                <button
                                    className="relative keeb-share-image-button text-black hover:text-mediumGray "
                                    type="button"
                                >
                                    <input
                                        id="imageUploadInput"
                                        className="absolute left-0 top-0 w-8 opacity-0  "
                                        type="file"
                                        multiple
                                        accept="image/png, image/jpg, image/jpeg, image/heic, image/heif"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            void handleImageChange(e);
                                        }}
                                    />

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className=" ease-in  w-8 h-8"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4Z"
                                        />
                                        <path d="M4.80665 17.5211L9.1221 9.60947C9.50112 8.91461 10.4989 8.91461 10.8779 9.60947L14.0465 15.4186L15.1318 13.5194C15.5157 12.8476 16.4843 12.8476 16.8682 13.5194L19.1451 17.5039C19.526 18.1705 19.0446 19 18.2768 19H5.68454C4.92548 19 4.44317 18.1875 4.80665 17.5211Z" />
                                        <path d="M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8Z" />
                                    </svg>
                                </button>
                            </div>
                            <select
                                id="tagInput"
                                className=" w-32 rounded-md bg-green-500 px-2 py-1 text-black hover:opacity-80"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                            >
                                <option value="discussion">Discussion</option>
                                <option value="guide">Guide</option>
                                <option value="meme">Meme</option>
                                <option value="showcase">Showcase</option>
                            </select>
                        </div>

                        {imageFiles.length > 0 && (
                            <>
                                <div className="mt-2 flex w-full flex-wrap justify-center gap-5 rounded-md bg-black bg-opacity-20 p-5 ">
                                    {imageFiles.map((e, i) => (
                                        <div
                                            key={i}
                                            className={` relative rounded-lg   ${
                                                i === preview
                                                    ? "border-4 border-green-500"
                                                    : "border-4 border-black border-opacity-0"
                                            } `}
                                        >
                                            <div className="h-[70px] w-[93px] cursor-pointer object-contain  bg-black/20 overflow-hidden rounded-lg hover:shadow-md hover:brightness-110 shadow-sm ">
                                                <Image
                                                    className="w-full h-full object-contain scale-110"
                                                    alt={`listing-${i}`}
                                                    src={URL.createObjectURL(e)}
                                                    width={100}
                                                    height={100}
                                                    onClick={() =>
                                                        setPreview(i)
                                                    }
                                                />
                                            </div>
                                            <button
                                                className="absolute -right-2 -top-7 transform p-1 text-lg text-mediumGray transition-transform duration-300 ease-in-out hover:rotate-45 hover:scale-110 hover:text-red-500"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const newImageFiles = [
                                                        ...imageFiles,
                                                    ];
                                                    newImageFiles.splice(i, 1);
                                                    setImageFiles(
                                                        newImageFiles,
                                                    );
                                                    setPreview(0);
                                                }}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs mt-1 text-mediumGray">
                                    16:9 ratio recommended
                                </p>
                            </>
                        )}
                        {enableErrorDisplay && errors.imageExcess && (
                            <p className="text-xs text-red-400">
                                {errors.imageExcess}
                            </p>
                        )}
                        {enableErrorDisplay && errors.imageLarge && (
                            <p className="text-xs text-red-400">
                                {errors.imageLarge}
                            </p>
                        )}
                        {showLinkInput && (
                            <div className="mt-2">
                                <input
                                    id="youTubeLinkInput"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    className="w-full rounded-md bg-mediumGray p-2 placeholder:text-lightGray hover:opacity-80"
                                    placeholder="Add a YouTube Link..."
                                />
                            </div>
                        )}
                        <textarea
                            name="description"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="mt-2 h-60 w-full resize-none rounded-md bg-mediumGray p-2 placeholder:text-lightGray hover:opacity-80"
                            placeholder="Describe the content of your post"
                        ></textarea>
                        <div className="mt-2 flex w-full justify-center ">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    void submit(e);
                                }}
                                disabled={hasSubmitted || isSubmitting}
                                className={`rounded-md border-2 border-green-500 bg-darkGray px-6 py-1 text-green-500 hover:bg-green-500 hover:text-black ${
                                    hasSubmitted ? "text-green-500" : ""
                                } ${
                                    isSubmitting ? "text-green-500" : ""
                                } transition-all duration-300 ease-in-out`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-1">
                                        <LoadingSpinner size="16px" />
                                    </div>
                                ) : (
                                    "Post"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
