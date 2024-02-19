import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";
import defaultProfile from "@public/Profile/profile-default.png";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import LoadingSpinner from "~/components/Loading";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { uploadFileToS3 } from "~/utils/aws";

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

    const [title, setTitle] = useState<string>("");
    const [showLinkInput, setShowLinkInput] = useState<boolean>(false);
    const [link, setLink] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [tag, setTag] = useState<string>("discussion");

    const [errors, setErrors] = useState<ErrorsObj>({});
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [preview, setPreview] = useState<number>(0);
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const router = useRouter();

    // console.log("bees make honey", imageFiles);

    const { mutate } = api.post.create.useMutation({
        onSuccess: async (data) => {
            toast.success("Post Complete!", {
                icon: "👏",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            // void ctx.post.getAll.invalidate();
            await router.push(`/keebshare/${data.newPost.id}`);
            closeModal();
        },
    });

    useEffect(() => {
        const maxFileSize = 8 * 1024 * 1024;
        const errorsObj: ErrorsObj = {};
        if (imageFiles.length > 5) {
            errorsObj.imageExcess = "Cannot provide more than 5 photos";
        }

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
                    images: [],
                };

                setIsSubmitting(true);

                const imagePromises = imageFiles.map((file) => {
                    return new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onloadend = () => {
                            if (typeof reader.result === "string") {
                                const base64Data = reader.result.split(",")[1];
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
                <div className="p-2 ">
                    <div className="flex items-center">
                        <Image
                            alt="keeb"
                            src={
                                sessionData.user.profile
                                    ? sessionData.user.profile
                                    : defaultProfile
                            }
                            className="h-20 w-20 border-2 border-[#616161] object-cover "
                        />
                        <div className="relative flex  w-full items-center border-b-2 border-t-2 border-[#616161] p-2 ">
                            <div className="ml-2 flex items-center gap-2">
                                <h1 className="text-2xl text-green-500">
                                    Create a Post
                                </h1>
                                <Image
                                    alt="keebo"
                                    src={keebo}
                                    className="h-6 w-6"
                                />
                            </div>
                            <h3 className="absolute -top-5 right-0 text-xs text-darkGray">
                                {sessionData.user.username}
                            </h3>
                        </div>
                    </div>

                    <form className="mt-5 text-white">
                        <div className="flex flex-col gap-1">
                            <input
                                id="titleInput"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="h-10 w-full rounded-md bg-darkGray p-1 "
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
                        <div className="mt-2 flex w-full items-center justify-between">
                            <div className="flex gap-5 ">
                                <button
                                    className="w-8"
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
                                    >
                                        <g>
                                            <path
                                                fill="#F61C0D"
                                                d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728   c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137   C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607   c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"
                                            />
                                        </g>
                                    </svg>
                                </button>

                                <button className="relative w-8 ">
                                    <input
                                        id="imageUploadInput"
                                        className="absolute left-0 top-0 w-8 cursor-pointer opacity-0 "
                                        type="file"
                                        multiple
                                        accept="image/png, image/jpg, image/jpeg"
                                        onChange={(e) => {
                                            if (e.target.files)
                                                setImageFiles([
                                                    ...imageFiles,
                                                    ...e.target.files,
                                                ]);
                                        }}
                                    />

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4Z"
                                            fill="#0F0F0F"
                                        />
                                        <path
                                            d="M4.80665 17.5211L9.1221 9.60947C9.50112 8.91461 10.4989 8.91461 10.8779 9.60947L14.0465 15.4186L15.1318 13.5194C15.5157 12.8476 16.4843 12.8476 16.8682 13.5194L19.1451 17.5039C19.526 18.1705 19.0446 19 18.2768 19H5.68454C4.92548 19 4.44317 18.1875 4.80665 17.5211Z"
                                            fill="#0F0F0F"
                                        />
                                        <path
                                            d="M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8Z"
                                            fill="#0F0F0F"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <select
                                id="tagInput"
                                className=" h-8 w-32 rounded-md bg-green-500 p-1 px-2 py-1 text-black"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                            >
                                <option value="discussion">Discussion</option>
                                <option value="guide">Guide</option>
                                <option value="events">Events</option>
                                <option value="meme">Meme</option>
                                <option value="news">News</option>
                                <option value="showcase">Showcase</option>
                                <option value="software">Software</option>
                                <option value="typing">Typing</option>
                            </select>
                        </div>

                        {imageFiles.length > 0 && (
                            <div className="mt-2 flex w-[35rem] flex-wrap justify-center gap-5 rounded-md bg-black bg-opacity-20 p-5 ">
                                {imageFiles.map((e, i) => (
                                    <div key={i} className="relative">
                                        <Image
                                            className={`h-16 w-24 cursor-pointer rounded-lg object-cover shadow-sm hover:scale-105 hover:shadow-md ${
                                                i === preview
                                                    ? "border-4 border-green-500"
                                                    : "border-4 border-black border-opacity-0"
                                            } `}
                                            alt={`listing-${i}`}
                                            src={URL.createObjectURL(e)}
                                            width={100}
                                            height={100}
                                            onClick={() => setPreview(i)}
                                        />
                                        <button
                                            className="absolute -right-2 -top-6 transform p-1 text-lg text-darkGray transition-transform duration-300 ease-in-out hover:rotate-45 hover:scale-110 hover:text-red-500"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const newImageFiles = [
                                                    ...imageFiles,
                                                ];
                                                newImageFiles.splice(i, 1);
                                                setImageFiles(newImageFiles);
                                                setPreview(0);
                                            }}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {showLinkInput && (
                            <div className="mt-2">
                                <input
                                    id="youTubeLinkInput"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    className="h-10 w-[35rem] rounded-md bg-darkGray p-1 "
                                    placeholder="YouTube Link"
                                />
                            </div>
                        )}

                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="mt-2 h-72 w-[35rem] rounded-md bg-darkGray p-1 "
                            placeholder="Text (optional)"
                        ></textarea>
                        <div className="mt-2 flex w-full justify-center ">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    void submit(e);
                                }}
                                disabled={hasSubmitted || isSubmitting}
                                className={`rounded-md border-2 border-green-500 bg-keebyGray px-6 py-1 text-green-500 hover:bg-green-500 hover:text-black ${
                                    hasSubmitted ? "text-red-500" : ""
                                } ${
                                    isSubmitting ? "text-red-500" : ""
                                } transition-all duration-300 ease-in-out`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-1">
                                        Uploading
                                        <div className="w-6">
                                            <LoadingSpinner size="16px" />
                                        </div>
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
