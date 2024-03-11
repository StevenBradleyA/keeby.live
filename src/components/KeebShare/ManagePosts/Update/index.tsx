import { useEffect, useState } from "react";
import type { Images, Post } from "@prisma/client";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import LoadingSpinner from "~/components/Loading";
import Image from "next/image";
import defaultProfile from "@public/Profile/profile-default.png";
import keebo from "@public/Profile/keebo.png";
import { uploadFileToS3 } from "~/utils/aws";

interface UpdatePostProps {
    post: EachPost;
    closeModal: () => void;
}

interface EachPost extends Post {
    images: Images[];
    _count: { comments: number };
    previewIndex?: number;
}

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
    images?: Image[];
    preview?: { source: string; index: number };
    deleteImageIds?: string[];
}

export default function UpdatePost({ post, closeModal }: UpdatePostProps) {
    const { data: session } = useSession();
    const ctx = api.useContext();

    const [toggle, setToggle] = useState<string>("MENU");

    // update
    const [title, setTitle] = useState<string>(post.title);
    const [showLinkInput, setShowLinkInput] = useState<boolean>(
        post.link ? true : false
    );
    const [link, setLink] = useState<string>(post.link || "");
    const [text, setText] = useState<string>(post.text || "");
    const [tag, setTag] = useState<string>(post.tag);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [preview, setPreview] = useState<{ source: string; index: number }>({
        source: "prev",
        index: post.previewIndex || 0,
    });
    const [activeDeletedImageIds, setActiveDeletedImageIds] = useState<
        string[]
    >([]);
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

    const { mutate } = api.post.delete.useMutation({
        onSuccess: () => {
            toast.success("Post Deleted!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            void ctx.post.getAllByUserId.invalidate();
            closeModal();
        },
    });

    const { mutate: updatePost } = api.post.update.useMutation({
        onSuccess: () => {
            toast.success("Post Updated!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            void ctx.post.getAllByUserId.invalidate();
            closeModal();
        },
    });

    const handleDeletePost = () => {
        if (session?.user.id === post.userId) {
            const data = {
                id: post.id,
                userId: post.userId,
            };

            mutate(data);
        }
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        setEnableErrorDisplay(true);

        if (!Object.values(errors).length && !isSubmitting) {
            try {
                const sessionUserId = session?.user?.id;

                if (!sessionUserId) {
                    throw new Error("Session expired");
                }

                const data: PostData = {
                    userId: sessionUserId,
                    title,
                    tag,
                    images: [],
                    preview,
                    deleteImageIds: activeDeletedImageIds,
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

    useEffect(() => {
        const maxFileSize = 8 * 1024 * 1024;
        const errorsObj: ErrorsObj = {};

        const totalImageCount =
            (imageFiles.length ?? 0) +
            (post.images?.length ?? 0) -
            (activeDeletedImageIds.length ?? 0);
        if (totalImageCount > 10) {
            errorsObj.imageExcess = "Cannot provide more than 1 photos";
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
    }, [imageFiles, title, link, post.images, activeDeletedImageIds]);

    console.log("uhhh broken", imageFiles.length);
    console.log("uhhh broken", post.images.length);

    return (
        <div className=" font-poppins text-darkGray">
            {toggle === "MENU" && (
                <div className="flex  flex-col gap-2 p-5">
                    <button
                        className="hover:text-green-500 "
                        onClick={() => setToggle("UPDATE")}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => setToggle("DELETE")}
                        className="hover:text-green-500 "
                    >
                        Delete
                    </button>
                </div>
            )}{" "}
            {toggle === "DELETE" && (
                <div className="w-[35rem]">
                    <h1 className="text-center text-xl text-green-500">
                        Are you sure you want to delete
                        <span className="ml-1 text-darkGray">
                            {`${post.title}`}
                        </span>
                        ?
                    </h1>
                    <div className="mt-5 flex justify-center gap-10 ">
                        <button
                            onClick={handleDeletePost}
                            className={`rounded-md border-2 border-[#ff0000] bg-keebyGray bg-opacity-60 px-8 py-2 text-failure transition-all duration-300 ease-in-out  hover:bg-failure hover:bg-opacity-100 hover:text-black`}
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => setToggle("MENU")}
                            className={`rounded-md border-2 border-green-500 bg-keebyGray bg-opacity-60 px-8 py-2 text-green-500 transition-all duration-300 ease-in-out  hover:bg-green-500 hover:bg-opacity-100 hover:text-black`}
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
            {toggle === "UPDATE" && session && (
                <>
                    <div className="p-2 ">
                        <div className="flex items-center">
                            <Image
                                alt="keeb"
                                src={session.user.profile || defaultProfile}
                                width={300}
                                height={300}
                                className="h-20 w-20 border-2 border-[#616161] object-cover "
                            />
                            <div className="relative flex  w-full items-center border-b-2 border-t-2 border-[#616161] p-2 ">
                                <div className="ml-2 flex items-center gap-2">
                                    <h1 className="text-2xl text-green-500">
                                        Edit Your Post
                                    </h1>
                                    <Image
                                        alt="keebo"
                                        src={keebo}
                                        className="h-6 w-6"
                                    />
                                </div>
                                <h3 className="absolute -top-5 right-0 text-xs text-darkGray">
                                    {session.user.username}
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
                                                e.preventDefault();
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
                                    <option value="discussion">
                                        Discussion
                                    </option>
                                    <option value="guide">Guide</option>
                                    <option value="events">Events</option>
                                    <option value="meme">Meme</option>
                                    <option value="news">News</option>
                                    <option value="showcase">Showcase</option>
                                    <option value="software">Software</option>
                                    <option value="typing">Typing</option>
                                </select>
                            </div>

                            {(imageFiles.length > 0 ||
                                post.images.length > 0) && (
                                <div className="mt-2 flex w-[35rem] flex-wrap justify-center gap-5 rounded-md bg-black bg-opacity-20 p-5 ">
                                    {imageFiles.map((e, i) => (
                                        <div key={i} className="relative">
                                            <Image
                                                className={`h-16 w-24 cursor-pointer rounded-lg object-cover shadow-sm hover:scale-105 hover:shadow-md ${
                                                    i === preview.index &&
                                                    preview.source === "new"
                                                        ? "border-4 border-green-500"
                                                        : "border-4 border-black border-opacity-0"
                                                } `}
                                                alt={`post-${i}`}
                                                src={URL.createObjectURL(e)}
                                                width={100}
                                                height={100}
                                                onClick={() =>
                                                    setPreview({
                                                        source: "new",
                                                        index: i,
                                                    })
                                                }
                                            />
                                            <button
                                                className="absolute -right-2 -top-6 transform p-1 text-lg text-darkGray transition-transform duration-300 ease-in-out hover:rotate-45 hover:scale-110 hover:text-red-500"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const newImageFiles = [
                                                        ...imageFiles,
                                                    ];
                                                    newImageFiles.splice(i, 1);
                                                    setImageFiles(
                                                        newImageFiles
                                                    );
                                                    setPreview({
                                                        source: "new",
                                                        index: 0,
                                                    });
                                                }}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                    {post.images &&
                                        post.images.length > 0 &&
                                        post.images.map((image, i) =>
                                            !activeDeletedImageIds.includes(
                                                image.id
                                            ) ? (
                                                <div
                                                    key={i}
                                                    className="relative"
                                                >
                                                    <Image
                                                        className={`h-16 w-24 cursor-pointer rounded-lg object-cover shadow-sm hover:scale-105 hover:shadow-md ${
                                                            i ===
                                                                preview.index &&
                                                            preview.source ===
                                                                "prev"
                                                                ? "border-4 border-green-500"
                                                                : "border-4 border-black border-opacity-0"
                                                        } `}
                                                        alt={`post-${i}`}
                                                        src={image.link}
                                                        width={100}
                                                        height={100}
                                                        onClick={() =>
                                                            setPreview({
                                                                source: "prev",
                                                                index: i,
                                                            })
                                                        }
                                                    />
                                                    <button
                                                        className="absolute -right-2 -top-6 transform p-1 text-lg text-darkGray transition-transform duration-300 ease-in-out hover:rotate-45 hover:scale-110 hover:text-red-500"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            const newDeletedImageIds =
                                                                [
                                                                    ...activeDeletedImageIds,
                                                                    image.id,
                                                                ];
                                                            setActiveDeletedImageIds(
                                                                newDeletedImageIds
                                                            );
                                                            setPreview({
                                                                source: "prev",
                                                                index: 0,
                                                            });
                                                        }}
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            ) : null
                                        )}
                                </div>
                            )}
                            {showLinkInput && (
                                <div className="mt-2">
                                    <input
                                        id="youTubeLinkInput"
                                        value={link}
                                        onChange={(e) =>
                                            setLink(e.target.value)
                                        }
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
                                        hasSubmitted ? "text-green-500" : ""
                                    } ${
                                        isSubmitting ? "text-green-500" : ""
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
                </>
            )}
        </div>
    );
}
