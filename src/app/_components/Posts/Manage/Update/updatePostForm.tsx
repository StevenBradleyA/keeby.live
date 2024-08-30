"use client";
import type { Images } from "@prisma/client";
import { api } from "~/trpc/react";
import heic2any from "heic2any";
import { useEffect, useState, type ChangeEvent } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import defaultProfile from "@public/Images/defaultProfile.png";
import LoadingSpinner from "~/app/_components/Loading";
import { useSession } from "next-auth/react";
import { uploadFileToS3 } from "~/utils/aws";
import keebo from "@public/Profile/keebo.png";

interface UpdateListingFormProps {
    post: PostData;
    closeModal: () => void;
}

interface PostData {
    id: string;
    userId: string;
    title: string;
    tag: string;
    link?: string | null;
    text?: string | null;
    preview?: { source: string; index: number; id: string };
    images?: Images[];
}

interface PostUpdateData {
    id: string;
    userId: string;
    tag: string;
    title: string;
    text?: string;
    preview?: { source: string; index: number; id: string };
    images?: { link: string }[];
    deleteImageIds?: string[];
}

interface ErrorsObj {
    image?: string;
    imageExcess?: string;
    imageLarge?: string;
    text?: string;
    title?: string;
    tag?: string;
    titleExcess?: string;
    link?: string;
}

export default function UpdatePostForm({
    post,
    closeModal,
}: UpdateListingFormProps) {
    // todo test and fix pls

    const utils = api.useUtils();
    const { data: session, status } = useSession();

    // form state
    const [title, setTitle] = useState<string>(post.title);
    const [tag, setTag] = useState<string>(post.tag);
    const [text, setText] = useState<string>(post.text ? post.text : "");
    const [link, setLink] = useState<string>(post.link ? post.link : "");
    const [preview, setPreview] = useState<{
        source: string;
        index: number;
        id: string;
    }>({
        source: "prev",
        index: 0,
        id: post.images && post.images[0] ? post.images[0].id : "",
    });
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [activeDeletedImageIds, setActiveDeletedImageIds] = useState<
        string[]
    >([]);
    const [showLinkInput, setShowLinkInput] = useState<boolean>(false);

    // server interactions
    const { mutate: updatePost } = api.post.update.useMutation({
        onSuccess: () => {
            toast.success("Post Updated!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            void utils.post.getOneById.invalidate();
            void utils.post.getAllByUserId.invalidate();

            closeModal();
        },
    });

    // helpers
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

        if (!Object.values(errors).length && !isSubmitting && session) {
            try {
                if (!session.user.id) {
                    throw new Error("User must be signed in");
                }

                const data: PostUpdateData = {
                    id: post.id,
                    userId: session.user.id,
                    title,
                    tag,
                    text,
                    preview,
                    images: [],
                    deleteImageIds: activeDeletedImageIds,
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
                updatePost(data);
                setImageFiles([]);
                setHasSubmitted(true);
                setIsSubmitting(false);
            } catch (error) {
                console.error("Submission failed:", error);
                setIsSubmitting(false);
            }
        }
    };

    // monitoring
    useEffect(() => {
        const maxFileSize = 8 * 1024 * 1024;
        const errorsObj: ErrorsObj = {};

        const totalImageCount =
            (imageFiles.length ?? 0) +
            (post.images?.length ?? 0) -
            (activeDeletedImageIds.length ?? 0);

        if (totalImageCount > 10) {
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
    }, [imageFiles, title, activeDeletedImageIds, post.images, link]);

    if (status === "loading" || session === null) {
        return (
            <div className="mt-60 flex justify-center w-full">
                <LoadingSpinner size="20px" />
            </div>
        );
    }
    return (
        <div className="h-[600px] w-[600px] flex flex-col items-center overflow-y-auto px-5">
            <div className="flex items-center w-full">
                <Image
                    alt="keeb"
                    src={
                        session.user.profile
                            ? session.user.profile
                            : defaultProfile
                    }
                    width={300}
                    height={300}
                    className="h-20 w-20 border-2 border-mediumGray object-cover rounded-md "
                />
                <div className="relative flex  w-full items-center border-b-2 border-t-2 border-mediumGray p-2 ">
                    <div className="ml-2 flex items-center gap-2">
                        <h1 className="text-2xl text-green-500">
                            Edit your post
                        </h1>
                        <Image
                            alt="keebo"
                            src={keebo}
                            className="h-6 w-6 object-contain"
                        />
                    </div>
                    <h3 className="absolute -top-5 right-0 text-xs text-mediumGray">
                        {session.user.username}
                    </h3>
                </div>
            </div>

            <form className="mt-5 text-white w-full">
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
                        <p className="text-xs text-red-400">{errors.title}</p>
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
                            type="button"
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
                            type="button"
                            className="relative keeb-share-image-button text-black hover:text-mediumGray "
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

                <div className="mt-2 flex w-full flex-wrap justify-center gap-5 rounded-md bg-black bg-opacity-20 p-5 ">
                    {post.images &&
                        post.images.length > 0 &&
                        post.images
                            .filter(
                                (image) =>
                                    !activeDeletedImageIds.includes(image.id),
                            )
                            .map((image, i) => (
                                <div key={i} className="relative">
                                    <Image
                                        className={` w-48 h-28 cursor-pointer rounded-lg object-cover shadow-sm ease-in hover:brightness-105 hover:shadow-md ${
                                            i === preview.index &&
                                            preview.source === "prev"
                                                ? "border-4 border-green-500"
                                                : "border-4 border-black border-opacity-0"
                                        } `}
                                        alt={`listing-${i}`}
                                        src={image.link}
                                        width={100}
                                        height={100}
                                        onClick={() =>
                                            setPreview({
                                                source: "prev",
                                                index: i,
                                                id: image.id,
                                            })
                                        }
                                    />
                                    <button
                                        className="absolute right-[-10px] top-[-32px] transform p-1 text-2xl text-gray-600 transition-transform duration-300 ease-in-out hover:rotate-45 hover:scale-110 hover:text-red-500"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const newDeletedImageIds = [
                                                ...activeDeletedImageIds,
                                                image.id,
                                            ];
                                            setActiveDeletedImageIds(
                                                newDeletedImageIds,
                                            );
                                            if (post.images) {
                                                const remainingImages =
                                                    post.images.filter(
                                                        (img) =>
                                                            !newDeletedImageIds.includes(
                                                                img.id,
                                                            ),
                                                    );

                                                if (
                                                    remainingImages.length >
                                                        0 &&
                                                    remainingImages[0]
                                                ) {
                                                    setPreview({
                                                        source: "prev",
                                                        index: 0,
                                                        id: remainingImages[0]
                                                            .id,
                                                    });
                                                } else {
                                                    setPreview({
                                                        source:
                                                            imageFiles.length >
                                                            0
                                                                ? "new"
                                                                : "",
                                                        index: 0,
                                                        id: "",
                                                    });
                                                }
                                            }
                                        }}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}

                    {imageFiles.length > 0 &&
                        imageFiles.map((e, i) => (
                            <div key={i} className="relative">
                                <Image
                                    className={` w-48 h-28 cursor-pointer rounded-lg object-cover shadow-sm ease-in hover:brightness-105 hover:shadow-md ${
                                        i === preview.index &&
                                        "new" === preview.source
                                            ? "border-4 border-green-500"
                                            : "border-4 border-black border-opacity-0"
                                    } `}
                                    alt={`listing-${i}`}
                                    src={URL.createObjectURL(e)}
                                    width={300}
                                    height={300}
                                    onClick={() =>
                                        setPreview({
                                            source: "new",
                                            index: i,
                                            id: "",
                                        })
                                    }
                                />
                                <button
                                    className="absolute right-[-10px] top-[-32px] transform p-1 text-2xl text-black transition-transform duration-300 ease-in-out hover:rotate-45 hover:scale-110 hover:text-red-500"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const newImageFiles = [...imageFiles];
                                        newImageFiles.splice(i, 1);
                                        setImageFiles(newImageFiles);
                                        setPreview({
                                            source: "new",
                                            index: 0,
                                            id: "",
                                        });
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

                {enableErrorDisplay && errors.imageExcess && (
                    <p className="text-xs text-red-400">{errors.imageExcess}</p>
                )}
                {enableErrorDisplay && errors.imageLarge && (
                    <p className="text-xs text-red-400">{errors.imageLarge}</p>
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
                            "Edit"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
