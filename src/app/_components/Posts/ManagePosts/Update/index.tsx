import { useEffect, useState } from "react";
import type { Images, Post } from "@prisma/client";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import LoadingSpinner from "~/app/_components/Loading";
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
    id: string;
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
    const utils = api.useUtils();

    const [toggle, setToggle] = useState<string>("MENU");

    // update
    const [title, setTitle] = useState<string>(post.title);
    const [showLinkInput, setShowLinkInput] = useState<boolean>(
        post.link ? true : false,
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
            void utils.post.getAllByUserId.invalidate();
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
            void utils.post.getAllByUserId.invalidate();
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
                    id: post.id,
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
            errorsObj.imageExcess = "Cannot provide more than 10 photos";
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

    return (
        <div className=" font-poppins text-darkGray">
            {toggle === "MENU" && (
                <div className="flex flex-col items-start gap-2 p-5">
                    <div className="flex gap-2">
                        <h1 className="mb-2 text-xl">Manage Post</h1>
                        <Image
                            alt="keebo"
                            src={keebo}
                            className="h-6 w-6 object-contain"
                        />
                    </div>
                    <button
                        className="text-md profile-manage-button flex items-center gap-2 rounded-md  border-2 py-2 pr-4 text-white "
                        onClick={() => setToggle("UPDATE")}
                    >
                        <svg
                            className="profile-manage-button-arrow w-4"
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
                        <span className="profile-manage-button-text">Edit</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="profile-manage-button-circle w-2"
                            viewBox="0 0 32 32"
                        >
                            <circle cx="16" cy="16" r="16" />
                        </svg>
                    </button>
                    <button
                        className="text-md profile-manage-button flex items-center gap-2 rounded-md  border-2 py-2 pr-4 text-white "
                        onClick={() => setToggle("DELETE")}
                    >
                        <svg
                            className="profile-manage-button-arrow w-4"
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
                        <span className="profile-manage-button-text">
                            Delete
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="profile-manage-button-circle w-2"
                            viewBox="0 0 32 32"
                        >
                            <circle cx="16" cy="16" r="16" />
                        </svg>
                    </button>
                </div>
            )}{" "}
            {toggle === "DELETE" && (
                <div className="">
                    <h1 className="text-center">
                        Are you sure you want to{" "}
                        <span className="text-red-500">delete</span>{" "}
                        {post.title}?
                    </h1>
                    <div className="flex justify-center gap-10 ">
                        <button
                            className=" text-md keeb-shop-offer-button mt-5 flex items-center gap-2 rounded-md bg-darkGray py-2 pr-4 text-black "
                            onClick={handleDeletePost}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="keeb-shop-offer-button-arrow w-3"
                                viewBox="0 0 25 25"
                                version="1.1"
                            >
                                <g
                                    stroke="none"
                                    strokeWidth="1"
                                    fill="none"
                                    fillRule="evenodd"
                                >
                                    <g
                                        transform="translate(-469.000000, -1041.000000)"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M487.148,1053.48 L492.813,1047.82 C494.376,1046.26 494.376,1043.72 492.813,1042.16 C491.248,1040.59 488.712,1040.59 487.148,1042.16 L481.484,1047.82 L475.82,1042.16 C474.257,1040.59 471.721,1040.59 470.156,1042.16 C468.593,1043.72 468.593,1046.26 470.156,1047.82 L475.82,1053.48 L470.156,1059.15 C468.593,1060.71 468.593,1063.25 470.156,1064.81 C471.721,1066.38 474.257,1066.38 475.82,1064.81 L481.484,1059.15 L487.148,1064.81 C488.712,1066.38 491.248,1066.38 492.813,1064.81 C494.376,1063.25 494.376,1060.71 492.813,1059.15 L487.148,1053.48"
                                            id="cross"
                                        ></path>
                                    </g>
                                </g>
                            </svg>
                            <span className="keeb-shop-offer-button-text">
                                {`Yes I'm Sure `}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="keeb-shop-offer-button-circle w-5"
                                fill="currentColor"
                                viewBox="0 0 32 32"
                            >
                                <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048zM9.76 20.256q0 0.832 0.576 1.408t1.44 0.608 1.408-0.608l2.816-2.816 2.816 2.816q0.576 0.608 1.408 0.608t1.44-0.608 0.576-1.408-0.576-1.408l-2.848-2.848 2.848-2.816q0.576-0.576 0.576-1.408t-0.576-1.408-1.44-0.608-1.408 0.608l-2.816 2.816-2.816-2.816q-0.576-0.608-1.408-0.608t-1.44 0.608-0.576 1.408 0.576 1.408l2.848 2.816-2.848 2.848q-0.576 0.576-0.576 1.408z" />
                            </svg>
                        </button>
                        <button
                            className=" text-md keeb-shop-offer-button mt-5 flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                            onClick={() => setToggle("MENU")}
                        >
                            <svg
                                className="keeb-shop-offer-button-arrow w-4"
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
                            <span className="keeb-shop-offer-button-text">
                                {`No `}
                            </span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="keeb-shop-offer-button-circle w-2"
                                viewBox="0 0 32 32"
                            >
                                <circle cx="16" cy="16" r="16" />
                            </svg>
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
                                                        newImageFiles,
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
                                                image.id,
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
                                                                newDeletedImageIds,
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
                                            ) : null,
                                        )}
                                </div>
                            )}
                            {enableErrorDisplay && errors.imageExcess && (
                                <p className="text-sm text-red-400">
                                    {errors.imageExcess}
                                </p>
                            )}
                            {enableErrorDisplay && errors.imageLarge && (
                                <p className="text-sm text-red-400">
                                    {errors.imageLarge}
                                </p>
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
                                        "Update"
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
