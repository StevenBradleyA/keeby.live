import { api } from "~/utils/api";
import type { Images, Listing } from "@prisma/client";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";
import { useEffect, useState } from "react";
import Link from "next/link";
import ModalDialog from "~/components/Modal";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { uploadFileToS3 } from "~/utils/aws";
import defaultProfile from "@public/Profile/profile-default.png";
import TitleScripts from "~/components/TitleScripts";
import BackArrow from "~/components/Svgs/menuArrow";
import LoadingSpinner from "~/components/Loading";

interface UpdateListingProps {
    listing: EachListing;
    closeModal: () => void;
}

interface EachListing extends Listing {
    images: Images[];
    _count: { comments: number };
    previewIndex: number;
}

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
interface Image {
    link: string;
}

interface ListingData {
    id: string;
    sellerId: string;
    title: string;
    keycaps: string;
    switches: string;
    switchType: string;
    soundType: string;
    layoutType: string;
    pcbType: string;
    assemblyType: string;
    soundTest?: string;
    price: number;
    text: string;
    preview: { source: string; index: number };
    deleteImageIds: string[];
    images: Image[];
}

export default function UpdateListing({
    listing,
    closeModal,
}: UpdateListingProps) {
    const [toggle, setToggle] = useState<string>("MENU");

    const [description, setDescription] = useState<string>(listing.text);
    const [keycaps, setKeycaps] = useState<string>(listing.keycaps);
    const [switchType, setSwitchType] = useState<string>(listing.switchType);
    const [switches, setSwitches] = useState<string>(listing.switches);
    const [title, setTitle] = useState<string>(listing.title);
    const [price, setPrice] = useState<number>(listing.price / 100);
    const [preview, setPreview] = useState<{ source: string; index: number }>({
        source: "prev",
        index: listing.previewIndex,
    });
    const [activeDeletedImageIds, setActiveDeletedImageIds] = useState<
        string[]
    >([]);

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [soundTest, setSoundTest] = useState<string>(listing.soundTest || "");
    const [soundType, setSoundType] = useState<string>(listing.soundType);
    const [assemblyType, setAssemblyType] = useState<string>(
        listing.assemblyType
    );
    const [pcbType, setPcbType] = useState<string>(listing.pcbType);
    const [layoutType, setLayoutType] = useState<string>(listing.layoutType);

    const { data: session } = useSession();
    const ctx = api.useContext();

    const { mutate } = api.listing.delete.useMutation({
        onSuccess: () => {
            toast.success("Listing Deleted!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            void ctx.listing.getAllByUserId.invalidate();
            closeModal();
        },
    });
    const { mutate: updateListing } = api.listing.update.useMutation({
        onSuccess: () => {
            toast.success("Listing Updated!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            void ctx.listing.getAllByUserId.invalidate();
            closeModal();
        },
    });

    useEffect(() => {
        const maxFileSize = 8 * 1024 * 1024;
        const errorsObj: ErrorsObj = {};

        const totalImageCount =
            (imageFiles.length ?? 0) +
            (listing.images?.length ?? 0) -
            (activeDeletedImageIds.length ?? 0);
        if (totalImageCount > 15) {
            errorsObj.imageExcess = "Cannot provide more than 15 photos";
        }

        if (totalImageCount < 5) {
            errorsObj.imageShortage = "Please provide at least 5 photos";
        }

        if (description.length < 250) {
            errorsObj.description =
                "Please provide a description of at least 250 characters";
        }
        if (!title.length) {
            errorsObj.title = "Please provide a title for your listing";
        }
        if (title.length > 50) {
            errorsObj.titleExcess = "Title cannot exceed 50 characters";
        }

        if (!keycaps.length) {
            errorsObj.keycaps = "Please provide the keycaps on your keeb";
        }
        if (!switches.length) {
            errorsObj.switches = "Please provide the switches on your keeb";
        }
        if (!switchType.length) {
            errorsObj.switchType = "Please select the switch type of your keeb";
        }
        if (!soundType.length) {
            errorsObj.soundType = "Please select the sound of your keeb";
        }
        if (!layoutType.length) {
            errorsObj.layoutType = "Please select the layout of your keeb";
        }
        if (!assemblyType.length) {
            errorsObj.assemblyType =
                "Please select the build status of your keeb";
        }
        if (!pcbType.length) {
            errorsObj.pcbType = "Please select the PCB type in your keeb";
        }

        if (!title.length) {
            errorsObj.title = "Please provide a title for your listing";
        }
        if (!title.length) {
            errorsObj.title = "Please provide a title for your listing";
        }

        if (price < 1) {
            errorsObj.priceNone = "Please provide a price";
        }
        if (price > 10000) {
            errorsObj.priceExcess = "Woah, that price is too high for keeby";
        }
        if (!Number.isInteger(price)) {
            errorsObj.priceNotWhole =
                "Please enter a whole number for the price";
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
    }, [
        imageFiles,
        price,
        description,
        title,
        keycaps,
        switches,
        switchType,
        soundTest,
        soundType,
        layoutType,
        assemblyType,
        pcbType,
        activeDeletedImageIds,
        listing.images,
    ]);

    const handleDeleteListing = () => {
        if (session?.user.id === listing.sellerId) {
            const data = {
                id: listing.id,
                sellerId: listing.sellerId,
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

                const data: ListingData = {
                    id: listing.id,
                    sellerId: sessionUserId,
                    title,
                    keycaps,
                    switches,
                    switchType,
                    layoutType,
                    pcbType,
                    assemblyType,
                    soundType,
                    text: description,
                    price: price * 100,
                    preview,
                    deleteImageIds: activeDeletedImageIds,
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

                if (soundTest) {
                    data.soundTest = soundTest;
                }

                updateListing(data);
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
        <div className=" font-poppins text-darkGray">
            {toggle === "MENU" && (
                <div className="flex flex-col items-start gap-2 p-5">
                    <div className="flex gap-2">
                        <h1 className="mb-2 text-xl">Manage Listing</h1>
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
                <div className=" text-darkGray">
                    <h1 className="text-center">
                        Are you sure you want to{" "}
                        <span className="text-red-500"> delete</span> {" "}
                        {listing.title}?
                    </h1>

                    <div className="flex justify-center gap-10 ">
                        <button
                            className=" text-md keeb-shop-offer-button mt-5 flex items-center gap-2 rounded-md bg-darkGray py-2 pr-4 text-black "
                            onClick={handleDeleteListing}
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
                                    stroke-width="1"
                                    fill="none"
                                    fill-rule="evenodd"
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
                <div className=" relative h-[80vh] w-[70rem] overflow-y-scroll ">
                    <div className="flex  w-full items-center ">
                        <Image
                            src={defaultProfile}
                            alt="profile"
                            width={400}
                            height={400}
                            className=" h-40 w-40 rounded-md border-4 border-[#2f2f2f] object-cover"
                            priority
                        />

                        <div className="matrix-contents flex h-24 w-full flex-col justify-center rounded-r-xl border-b-2 border-t-2 border-[#2f2f2f] bg-black bg-opacity-30 px-5">
                            <div>
                                <div className="flex justify-between text-3xl">
                                    <TitleScripts page={"createListing"} />
                                </div>
                                <h3 className="text-darkGray">
                                    {session.user.username}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className=" z-10 mb-32 mt-5 flex w-full flex-col items-center rounded-xl bg-black bg-opacity-30   py-5">
                        <form className="z-10 w-full rounded-xl px-10 pb-10 text-white">
                            <div className="flex justify-between gap-10">
                                <div className="flex w-1/3 flex-col gap-5">
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
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            className="h-10 w-full rounded-md bg-darkGray p-1 "
                                            placeholder="Title"
                                        />
                                        {enableErrorDisplay && errors.title && (
                                            <p className="text-sm text-red-400">
                                                {errors.title}
                                            </p>
                                        )}
                                        {enableErrorDisplay &&
                                            errors.titleExcess && (
                                                <p className="text-sm text-red-400">
                                                    {errors.titleExcess}
                                                </p>
                                            )}
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label
                                            htmlFor="soundTypeInput"
                                            className="text-darkGray"
                                        >
                                            Sound Type
                                        </label>
                                        <select
                                            id="soundTypeInput"
                                            className=" h-10 w-3/4 rounded-md bg-green-500 p-1 px-2 py-1 text-black"
                                            value={soundType}
                                            onChange={(e) =>
                                                setSoundType(e.target.value)
                                            }
                                        >
                                            <option value="thock">Thock</option>
                                            <option value="clack">Clack</option>
                                            <option value="click">Click</option>
                                            <option value="silent">
                                                Silent
                                            </option>
                                        </select>
                                        {enableErrorDisplay &&
                                            errors.soundType && (
                                                <p className="text-sm text-red-400">
                                                    {errors.soundType}
                                                </p>
                                            )}
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label
                                            htmlFor="youtubeLinkSoundTestInput"
                                            className="text-darkGray"
                                        >
                                            Youtube Link to Sound Test
                                            (optional)
                                        </label>
                                        <input
                                            id="youtubeLinkSoundTestInput"
                                            value={soundTest}
                                            onChange={(e) =>
                                                setSoundTest(e.target.value)
                                            }
                                            className="h-10 w-3/4 rounded-md bg-darkGray p-1"
                                            placeholder="Sound Test Link"
                                        />
                                        {enableErrorDisplay &&
                                            errors.soundTest && (
                                                <p className="text-sm text-red-400">
                                                    {errors.soundTest}
                                                </p>
                                            )}
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label
                                            htmlFor="priceInput"
                                            className="text-darkGray"
                                        >
                                            Price (whole number)
                                        </label>
                                        <input
                                            id="priceInput"
                                            type="number"
                                            min={0}
                                            value={price === 0 ? "" : price}
                                            onChange={(e) =>
                                                setPrice(
                                                    Math.floor(+e.target.value)
                                                )
                                            }
                                            className="h-10 w-3/4 rounded-md bg-darkGray p-1"
                                            placeholder="$ Price"
                                        />

                                        {enableErrorDisplay &&
                                            errors.priceNone && (
                                                <p className="text-sm text-red-400">
                                                    {errors.priceNone}
                                                </p>
                                            )}
                                        {enableErrorDisplay &&
                                            errors.priceExcess && (
                                                <p className="text-sm text-red-400">
                                                    {errors.priceExcess}
                                                </p>
                                            )}
                                        {enableErrorDisplay &&
                                            errors.priceNotWhole && (
                                                <p className="text-sm text-red-400">
                                                    {errors.priceNotWhole}
                                                </p>
                                            )}
                                    </div>

                                    <div className="relative flex w-3/4 flex-col gap-1">
                                        <label
                                            htmlFor="imageUploadInput"
                                            className="text-darkGray"
                                        >
                                            Upload Images (5 min - 15 max)
                                        </label>

                                        <input
                                            id="imageUploadInput"
                                            className="absolute top-7 h-28 w-72 cursor-pointer opacity-0"
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
                                        <button className="h-28 w-full rounded-md bg-green-500">
                                            <span className=" text-center text-black">
                                                Choose Files
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex w-2/3 flex-col gap-5">
                                    <div className="flex w-full gap-5 ">
                                        <div className="flex w-5/12 flex-col  gap-1">
                                            <label
                                                htmlFor="keycapsInput"
                                                className="text-darkGray"
                                            >
                                                Keycaps
                                            </label>
                                            <input
                                                id="keycapsInput"
                                                value={keycaps}
                                                onChange={(e) =>
                                                    setKeycaps(e.target.value)
                                                }
                                                className="h-10 w-full rounded-md bg-darkGray p-1"
                                                placeholder="Keycaps"
                                            />
                                            {enableErrorDisplay &&
                                                errors.keycaps && (
                                                    <p className="text-sm text-red-400">
                                                        {errors.keycaps}
                                                    </p>
                                                )}
                                        </div>
                                        <div className="flex w-5/12 flex-col gap-1 ">
                                            <label
                                                htmlFor="switchesInput"
                                                className="text-darkGray"
                                            >
                                                Switches
                                            </label>
                                            <input
                                                id="switchesInput"
                                                value={switches}
                                                onChange={(e) =>
                                                    setSwitches(e.target.value)
                                                }
                                                className="h-10 w-full rounded-md bg-darkGray p-1"
                                                placeholder="Switches"
                                            />
                                            {enableErrorDisplay &&
                                                errors.switches && (
                                                    <p className="text-sm text-red-400">
                                                        {errors.switches}
                                                    </p>
                                                )}
                                        </div>
                                        <div className="flex w-2/12 flex-col gap-1 text-black ">
                                            <label
                                                htmlFor="switchTypeInput"
                                                className="text-darkGray"
                                            >
                                                Switch Type
                                            </label>
                                            <select
                                                id="switchTypeInput"
                                                className=" h-10 w-full rounded-md bg-green-500 p-1 px-2 py-1"
                                                value={switchType}
                                                onChange={(e) =>
                                                    setSwitchType(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="linear">
                                                    Linear
                                                </option>
                                                <option value="tactile">
                                                    Tactile
                                                </option>
                                                <option value="clicky">
                                                    Clicky
                                                </option>
                                                <option value="other">
                                                    Other
                                                </option>
                                            </select>
                                            {enableErrorDisplay &&
                                                errors.switchType && (
                                                    <p className="text-sm text-red-400">
                                                        {errors.switchType}
                                                    </p>
                                                )}
                                        </div>
                                    </div>
                                    <div className="flex w-full items-center  gap-5 ">
                                        <div className="flex w-1/3 flex-col gap-1">
                                            <label
                                                htmlFor="layoutTypeInput"
                                                className="text-darkGray"
                                            >
                                                Layout Type
                                            </label>
                                            <select
                                                id="layoutTypeInput"
                                                className=" h-10 w-full rounded-md bg-green-500 p-1 px-2 py-1 text-black"
                                                value={layoutType}
                                                onChange={(e) =>
                                                    setLayoutType(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="100%">
                                                    100%
                                                </option>
                                                <option value="75%">75%</option>
                                                <option value="65%">65%</option>
                                                <option value="60%">60%</option>
                                                <option value="40%">40%</option>
                                            </select>
                                            {enableErrorDisplay &&
                                                errors.layoutType && (
                                                    <p className="text-sm text-red-400">
                                                        {errors.layoutType}
                                                    </p>
                                                )}
                                        </div>
                                        <div className="flex w-1/3 flex-col gap-1 text-black">
                                            <label
                                                htmlFor="pcbTypeInput"
                                                className="text-darkGray"
                                            >
                                                PCB Type
                                            </label>
                                            <select
                                                id="pcbTypeInput"
                                                className=" h-10 w-full rounded-md bg-green-500 p-1 px-2 py-1"
                                                value={pcbType}
                                                onChange={(e) =>
                                                    setPcbType(e.target.value)
                                                }
                                            >
                                                <option value="hotswap">
                                                    Hotswap
                                                </option>
                                                <option value="soldered">
                                                    Soldered
                                                </option>
                                            </select>
                                            {enableErrorDisplay &&
                                                errors.pcbType && (
                                                    <p className="text-sm text-red-400">
                                                        {errors.pcbType}
                                                    </p>
                                                )}
                                        </div>
                                        <div className="flex w-1/3 flex-col gap-1 text-black">
                                            <label
                                                htmlFor="assemblyTypeInput"
                                                className="text-darkGray"
                                            >
                                                Build Status
                                            </label>
                                            <select
                                                id="assemblyTypeInput"
                                                className=" h-10 w-full rounded-md bg-green-500 p-1 px-2 py-1"
                                                value={assemblyType}
                                                onChange={(e) =>
                                                    setAssemblyType(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="assembled">
                                                    Assembled
                                                </option>
                                                <option value="unassembled">
                                                    Unassembled
                                                </option>
                                            </select>
                                            {enableErrorDisplay &&
                                                errors.assemblyType && (
                                                    <p className="text-sm text-red-400">
                                                        {errors.assemblyType}
                                                    </p>
                                                )}
                                        </div>
                                    </div>

                                    <div className=" flex w-full flex-col gap-1 ">
                                        <label className="text-darkGray ">
                                            Description (250 character minimum)
                                        </label>
                                        <textarea
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            className="h-72 w-full rounded-md bg-darkGray p-1 "
                                            placeholder="Description"
                                        ></textarea>

                                        {enableErrorDisplay &&
                                            errors.description && (
                                                <p className="text-sm text-red-400">
                                                    {errors.description}
                                                </p>
                                            )}
                                    </div>
                                </div>
                            </div>

                            <>
                                <div className="mb-1 mt-5  flex justify-center text-darkGray">
                                    Select your preview image by clicking on it.
                                    (16:9 aspect ratio is recommended)
                                </div>
                                <div className="flex w-full flex-wrap justify-center gap-10 rounded-md bg-white bg-opacity-40 p-10 ">
                                    {imageFiles.length > 0 &&
                                        imageFiles.map((e, i) => (
                                            <div key={i} className="relative">
                                                <Image
                                                    className={`h-28 w-auto cursor-pointer rounded-lg object-cover shadow-sm hover:scale-105 hover:shadow-md ${
                                                        i === preview.index &&
                                                        preview.source === "new"
                                                            ? "border-4 border-green-500"
                                                            : "border-4 border-black border-opacity-0"
                                                    } `}
                                                    alt={`listing-${i}`}
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
                                                    className="absolute right-[-10px] top-[-32px] transform p-1 text-2xl text-black transition-transform duration-300 ease-in-out hover:rotate-45 hover:scale-110 hover:text-red-500"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        const newImageFiles = [
                                                            ...imageFiles,
                                                        ];
                                                        newImageFiles.splice(
                                                            i,
                                                            1
                                                        );
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

                                    {listing.images &&
                                        listing.images.length > 0 &&
                                        listing.images.map((image, i) =>
                                            !activeDeletedImageIds.includes(
                                                image.id
                                            ) ? (
                                                <div
                                                    key={i}
                                                    className="relative"
                                                >
                                                    <Image
                                                        className={`h-28 w-auto cursor-pointer rounded-lg object-cover shadow-sm hover:scale-105 hover:shadow-md ${
                                                            i ===
                                                                preview.index &&
                                                            preview.source ===
                                                                "prev"
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
                                                            })
                                                        }
                                                    />
                                                    <button
                                                        className="absolute right-[-10px] top-[-32px] transform p-1 text-2xl text-gray-600 transition-transform duration-300 ease-in-out hover:rotate-45 hover:scale-110 hover:text-red-500"
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
                            </>

                            {errors.imageExcess && (
                                <p className=" text-red-400">
                                    {errors.imageExcess}
                                </p>
                            )}
                            {errors.imageLarge && (
                                <p className=" text-sm text-red-400">
                                    {errors.imageLarge}
                                </p>
                            )}
                            {enableErrorDisplay && errors.imageShortage && (
                                <p className="text-sm text-red-400">
                                    {errors.imageShortage}
                                </p>
                            )}
                            <div className="mt-5 flex justify-center">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        void submit(e);
                                    }}
                                    disabled={hasSubmitted || isSubmitting}
                                    className={`rounded-md border-2 border-green-500 bg-keebyGray bg-opacity-60 px-6 py-2 text-green-500 hover:bg-green-500 hover:bg-opacity-100 hover:text-black ${
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
                                        "Update Listing"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
