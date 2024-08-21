"use client";
import type { Images, Listing } from "@prisma/client";
import { api } from "~/trpc/react";
import heic2any from "heic2any";
import { useEffect, useState, type ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import defaultProfile from "@public/Images/defaultProfile.png";
import TitleScripts from "~/app/_components/TitleScripts";
import LoadingSpinner from "~/app/_components/Loading";
import { useSession } from "next-auth/react";
import { uploadFileToS3 } from "~/utils/aws";

interface UpdateListingFormProps {
    listing: ListingWithImagesAndCount;
    closeModal: () => void;
}

interface ListingWithImagesAndCount extends Listing {
    images: Images[];
    _count: {
        comments: number;
        favorites: number;
    };
    seller: {
        id: string;
        username: string | null;
        selectedTag: string | null;
        profile: string | null;
        avgRating?: number | null;
        totalRatings?: number | null;
    };
    isFavorited?: boolean;
    favoriteId?: string;
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
    preview: { source: string; index: number; id: string };
    images: { link: string }[];
    deleteImageIds: string[];
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
    keycapsExcess?: string;
    switches?: string;
    switchesExcess?: string;
    switchType?: string;
    soundTest?: string;
    soundType?: string;
    layoutType?: string;
    assemblyType?: string;
    pcbType?: string;
}

export default function UpdateListingForm({
    listing,
    closeModal,
}: UpdateListingFormProps) {
    const utils = api.useUtils();
    const { data: session, status } = useSession();

    // form state
    const [description, setDescription] = useState<string>(listing.text);
    const [keycaps, setKeycaps] = useState<string>(listing.keycaps);
    const [switchType, setSwitchType] = useState<string>(listing.switchType);
    const [switches, setSwitches] = useState<string>(listing.switches);
    const [title, setTitle] = useState<string>(listing.title);
    const [price, setPrice] = useState<number>(listing.price);
    const [preview, setPreview] = useState<{
        source: string;
        index: number;
        id: string;
    }>({
        source: "prev",
        index: 0,
        id: listing.images[0] ? listing.images[0].id : "",
    });
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [soundTest, setSoundTest] = useState<string>(
        listing.soundTest ? listing.soundTest : "",
    );
    const [soundType, setSoundType] = useState<string>(listing.soundType);
    const [assemblyType, setAssemblyType] = useState<string>(
        listing.assemblyType,
    );
    const [pcbType, setPcbType] = useState<string>(listing.pcbType);
    const [layoutType, setLayoutType] = useState<string>(listing.layoutType);
    const [activeDeletedImageIds, setActiveDeletedImageIds] = useState<
        string[]
    >([]);

    // server interactions
    const { mutate: updateListing } = api.listing.update.useMutation({
        onSuccess: () => {
            toast.success("Listing Updated!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            void utils.listing.getOneById.invalidate();
            void utils.listing.getAllPreviewListings.invalidate();
            void utils.listing.getAllFavoritesByUserId.invalidate();
            void utils.listing.getAllByUserId.invalidate();

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
                const roundedPrice = Math.round(price);

                const data: ListingData = {
                    id: listing.id,
                    sellerId: session.user.id,
                    title,
                    keycaps,
                    switches,
                    switchType,
                    layoutType,
                    pcbType,
                    assemblyType,
                    soundType,
                    text: description,
                    price: roundedPrice,
                    preview,
                    images: [],
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

    // monitoring
    useEffect(() => {
        const maxFileSize = 8 * 1024 * 1024;
        const errorsObj: ErrorsObj = {};

        const totalImageCount =
            (imageFiles.length ?? 0) +
            (listing.images?.length ?? 0) -
            (activeDeletedImageIds.length ?? 0);

        if (totalImageCount > 10) {
            errorsObj.imageExcess = "Cannot provide more than 10 photos";
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
        if (title.length > 30) {
            errorsObj.titleExcess = "Title cannot exceed 30 characters";
        }

        if (!keycaps.length) {
            errorsObj.keycaps = "Please provide the keycaps on your keeb";
        }
        if (keycaps.length > 30) {
            errorsObj.keycapsExcess = "Keycaps cannot exceed 30 characters";
        }
        if (!switches.length) {
            errorsObj.switches = "Please provide the switches on your keeb";
        }
        if (switches.length > 30) {
            errorsObj.switchesExcess = "Switches cannot exceed 30 characters";
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

    if (status === "loading") {
        return (
            <div className="mt-60 flex justify-center w-full">
                <LoadingSpinner size="20px" />
            </div>
        );
    }
    return (
        <div className="w-[90vw] h-[85vh] flex flex-col items-center overflow-y-auto">
            <div className="flex w-full desktop:w-2/3 items-center">
                <Image
                    src={
                        session && session.user.profile
                            ? session.user.profile
                            : defaultProfile
                    }
                    alt="profile"
                    width={400}
                    height={400}
                    className=" h-40 w-40 rounded-xl "
                />

                <div className="flex h-24 w-full flex-col justify-center rounded-r-xl bg-black/30 shadow-lg bg-opacity-90 px-5">
                    <div className="flex justify-between ">
                        <div className="text-3xl text-green-500">
                            <TitleScripts page={"editListing"} />
                            <h3 className="text-mediumGray text-base">
                                {session && session.user
                                    ? session.user.username
                                    : ""}
                            </h3>
                        </div>
                        <div className="text-green-500 text-sm flex flex-col items-end">
                            <h3>*Keeby does not handle transactions</h3>
                            <Link
                                aria-label="Learn how keeby works"
                                href="/how-keeby-works"
                                className="text-white hover:underline hover:opacity-80 ease-in"
                            >
                                How Keeby works
                            </Link>
                            <Link
                                aria-label="Prevent scams when listing"
                                href="/scam-prevention"
                                className="text-white hover:underline hover:opacity-80 ease-in"
                            >
                                How to Prevent Scams
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" mt-5 flex w-full desktop:w-2/3 flex-col items-center rounded-xl bg-black/30 shadow-lg bg-opacity-90 px-10 py-5  ">
                <form className="w-full text-white">
                    <div className="flex justify-between gap-10">
                        <div className="flex w-1/3 flex-col">
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="titleInput"
                                    className="text-mediumGray"
                                >
                                    Title
                                </label>
                                <input
                                    id="titleInput"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="h-10 w-full rounded-md bg-mediumGray p-1 hover:opacity-80 ease-in "
                                    placeholder="Title"
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

                            <label
                                htmlFor="soundTypeInput"
                                className="text-mediumGray mt-3"
                            >
                                Sound Type
                            </label>
                            <select
                                id="soundTypeInput"
                                className="mt-1 h-10 w-3/4 rounded-md bg-green-500 p-1 px-2 py-1 text-black hover:opacity-80 ease-in"
                                value={soundType}
                                onChange={(e) => setSoundType(e.target.value)}
                            >
                                <option value="thock">Thock</option>
                                <option value="clack">Clack</option>
                                <option value="click">Click</option>
                                <option value="silent">Silent</option>
                            </select>
                            {enableErrorDisplay && errors.soundType && (
                                <p className="text-xs text-red-400">
                                    {errors.soundType}
                                </p>
                            )}

                            <label
                                htmlFor="youtubeLinkSoundTestInput"
                                className="text-mediumGray mt-3"
                            >
                                Youtube Link to Sound Test (optional)
                            </label>
                            <input
                                id="youtubeLinkSoundTestInput"
                                value={soundTest}
                                onChange={(e) => setSoundTest(e.target.value)}
                                className="mt-1 h-10 w-3/4 rounded-md bg-mediumGray p-1 hover:opacity-80 ease-in"
                                placeholder="Sound Test Link"
                            />
                            {enableErrorDisplay && errors.soundTest && (
                                <p className="text-xs text-red-400">
                                    {errors.soundTest}
                                </p>
                            )}

                            <label
                                htmlFor="priceInput"
                                className="text-mediumGray mt-3"
                            >
                                Price (factor in shipping costs)
                            </label>
                            <div className="relative mt-1">
                                <input
                                    id="priceInput"
                                    type="number"
                                    min="0"
                                    step="10"
                                    value={price}
                                    onChange={(e) => setPrice(+e.target.value)}
                                    className=" h-10 w-3/4 rounded-md bg-mediumGray pl-10 pr-1 py-1 hover:opacity-80 ease-in"
                                    placeholder="$ Price"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute left-2 top-1/2 -translate-y-1/2  w-6 h-6 "
                                    fill="currentColor"
                                    viewBox="-2 0 19 19"
                                >
                                    <path d="m13.842 11.52-4.389 4.388a1.112 1.112 0 0 1-1.567 0l-6.28-6.28a3.027 3.027 0 0 1-.771-1.892l.043-3.681A1.141 1.141 0 0 1 2 2.935L5.67 2.9a3.04 3.04 0 0 1 1.892.773l6.28 6.28a1.112 1.112 0 0 1 0 1.567zM3.826 5.133a.792.792 0 1 0-.792.792.792.792 0 0 0 .792-.792zm6.594 7.348a.554.554 0 0 0 0-.784l-.401-.401a2.53 2.53 0 0 0 .35-.83 1.565 1.565 0 0 0-.397-1.503 1.59 1.59 0 0 0-1.017-.46 2.14 2.14 0 0 0-.75.085h-.002a2.444 2.444 0 0 0-.59.277H7.61a2.677 2.677 0 0 0-.438.357 2.043 2.043 0 0 1-.259.22 1.29 1.29 0 0 1-.329.17h-.002a.835.835 0 0 1-.338.038h-.002a.53.53 0 0 1-.314-.136.539.539 0 0 1-.106-.534 1.54 1.54 0 0 1 .41-.71 1.632 1.632 0 0 1 .23-.165l.03-.019a1.783 1.783 0 0 1 .322-.155.942.942 0 0 1 .325-.06.554.554 0 0 0 0-1.108h-.001a2.058 2.058 0 0 0-.717.132 2.846 2.846 0 0 0-.529.26l-.01.006-.398-.4a.554.554 0 1 0-.784.785l.388.387a2.513 2.513 0 0 0-.347.803 1.644 1.644 0 0 0 .404 1.561 1.622 1.622 0 0 0 .983.456 1.922 1.922 0 0 0 .805-.089 2.372 2.372 0 0 0 .624-.319 3.142 3.142 0 0 0 .398-.339 1.569 1.569 0 0 1 .256-.208 1.381 1.381 0 0 1 .32-.151 1.023 1.023 0 0 1 .348-.038.485.485 0 0 1 .308.139c.05.049.165.165.097.488a1.558 1.558 0 0 1-.413.729 2.476 2.476 0 0 1-.28.219 1.727 1.727 0 0 1-.306.157.687.687 0 0 1-.32.042.554.554 0 1 0-.08 1.106c.052.004.103.005.152.005a1.723 1.723 0 0 0 .685-.134 2.678 2.678 0 0 0 .507-.27l.01-.007.397.398a.555.555 0 0 0 .783 0z" />
                                </svg>
                            </div>

                            {enableErrorDisplay && errors.priceNone && (
                                <p className="text-xs text-red-400">
                                    {errors.priceNone}
                                </p>
                            )}
                            {enableErrorDisplay && errors.priceExcess && (
                                <p className="text-xs text-red-400">
                                    {errors.priceExcess}
                                </p>
                            )}
                            {enableErrorDisplay && errors.priceNotWhole && (
                                <p className="text-xs text-red-400">
                                    {errors.priceNotWhole}
                                </p>
                            )}

                            <label
                                htmlFor="imageUploadInput"
                                className="text-mediumGray mt-3"
                            >
                                Upload Images (5 min - 15 max)
                            </label>
                            <div className="relative flex w-3/4 flex-col hover:opacity-80 ease-in mt-1">
                                <input
                                    id="imageUploadInput"
                                    className="absolute top-7 h-28 w-72 cursor-pointer opacity-0"
                                    type="file"
                                    multiple
                                    accept="image/png, image/jpg, image/jpeg, image/heic, image/heif"
                                    onChange={(e) => void handleImageChange(e)}
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
                                        className="text-mediumGray"
                                    >
                                        Keycaps
                                    </label>
                                    <input
                                        id="keycapsInput"
                                        value={keycaps}
                                        onChange={(e) =>
                                            setKeycaps(e.target.value)
                                        }
                                        className="h-10 w-full rounded-md bg-mediumGray p-1 hover:opacity-80 ease-in"
                                        placeholder="Keycaps"
                                    />
                                    {enableErrorDisplay && errors.keycaps && (
                                        <p className="text-xs text-red-400">
                                            {errors.keycaps}
                                        </p>
                                    )}
                                    {enableErrorDisplay &&
                                        errors.keycapsExcess && (
                                            <p className="text-xs text-red-400">
                                                {errors.keycapsExcess}
                                            </p>
                                        )}
                                </div>
                                <div className="flex w-5/12 flex-col gap-1 ">
                                    <label
                                        htmlFor="switchesInput"
                                        className="text-mediumGray"
                                    >
                                        Switches
                                    </label>
                                    <input
                                        id="switchesInput"
                                        value={switches}
                                        onChange={(e) =>
                                            setSwitches(e.target.value)
                                        }
                                        className="h-10 w-full rounded-md bg-mediumGray p-1 hover:opacity-80 ease-in"
                                        placeholder="Switches"
                                    />
                                    {enableErrorDisplay && errors.switches && (
                                        <p className="text-xs text-red-400">
                                            {errors.switches}
                                        </p>
                                    )}
                                    {enableErrorDisplay &&
                                        errors.switchesExcess && (
                                            <p className="text-xs text-red-400">
                                                {errors.switchesExcess}
                                            </p>
                                        )}
                                </div>
                                <div className="flex w-2/12 flex-col gap-1 text-black ">
                                    <label
                                        htmlFor="switchTypeInput"
                                        className="text-mediumGray"
                                    >
                                        Switch Type
                                    </label>
                                    <select
                                        id="switchTypeInput"
                                        className=" h-10 w-full rounded-md bg-green-500 p-1 px-2 py-1 hover:opacity-80 ease-in"
                                        value={switchType}
                                        onChange={(e) =>
                                            setSwitchType(e.target.value)
                                        }
                                    >
                                        <option value="linear">Linear</option>
                                        <option value="tactile">Tactile</option>
                                        <option value="clicky">Clicky</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {enableErrorDisplay &&
                                        errors.switchType && (
                                            <p className="text-xs text-red-400">
                                                {errors.switchType}
                                            </p>
                                        )}
                                </div>
                            </div>
                            <div className="flex w-full items-center  gap-5 ">
                                <div className="flex w-1/3 flex-col gap-1">
                                    <label
                                        htmlFor="layoutTypeInput"
                                        className="text-mediumGray"
                                    >
                                        Layout Type
                                    </label>
                                    <select
                                        id="layoutTypeInput"
                                        className=" h-10 w-full rounded-md bg-green-500 p-1 px-2 py-1 text-black hover:opacity-80 ease-in"
                                        value={layoutType}
                                        onChange={(e) =>
                                            setLayoutType(e.target.value)
                                        }
                                    >
                                        <option value="100%">100%</option>
                                        <option value="75%">75%</option>
                                        <option value="65%">65%</option>
                                        <option value="60%">60%</option>
                                        <option value="40%">40%</option>
                                        <option value="alice">Alice</option>
                                        <option value="split">Split</option>
                                        <option value="ortho">Ortho</option>
                                    </select>
                                    {enableErrorDisplay &&
                                        errors.layoutType && (
                                            <p className="text-xs text-red-400">
                                                {errors.layoutType}
                                            </p>
                                        )}
                                </div>
                                <div className="flex w-1/3 flex-col gap-1 text-black">
                                    <label
                                        htmlFor="pcbTypeInput"
                                        className="text-mediumGray"
                                    >
                                        PCB Type
                                    </label>
                                    <select
                                        id="pcbTypeInput"
                                        className=" h-10 w-full rounded-md bg-green-500 p-1 px-2 py-1 hover:opacity-80 ease-in"
                                        value={pcbType}
                                        onChange={(e) =>
                                            setPcbType(e.target.value)
                                        }
                                    >
                                        <option value="hotswap">Hotswap</option>
                                        <option value="soldered">
                                            Soldered
                                        </option>
                                    </select>
                                    {enableErrorDisplay && errors.pcbType && (
                                        <p className="text-xs text-red-400">
                                            {errors.pcbType}
                                        </p>
                                    )}
                                </div>
                                <div className="flex w-1/3 flex-col gap-1 text-black">
                                    <label
                                        htmlFor="assemblyTypeInput"
                                        className="text-mediumGray"
                                    >
                                        Build Status
                                    </label>
                                    <select
                                        id="assemblyTypeInput"
                                        className=" h-10 w-full rounded-md bg-green-500 p-1 px-2 py-1 hover:opacity-80 ease-in"
                                        value={assemblyType}
                                        onChange={(e) =>
                                            setAssemblyType(e.target.value)
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
                                            <p className="text-xs text-red-400">
                                                {errors.assemblyType}
                                            </p>
                                        )}
                                </div>
                            </div>

                            <div className=" flex w-full flex-col gap-1 ">
                                <label className="text-mediumGray ">
                                    Description (250 character minimum)
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    className="h-64 w-full rounded-md bg-mediumGray p-3 hover:opacity-80 ease-in"
                                    placeholder="Description"
                                ></textarea>

                                {enableErrorDisplay && errors.description && (
                                    <p className="text-xs text-red-400">
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <>
                        <div className="mb-1 mt-5  flex justify-center text-mediumGray">
                            Select a preview image by clicking. ( 16:9 aspect
                            ratio recommended )
                        </div>
                        <div className="flex w-full flex-wrap justify-center gap-10 rounded-md bg-white bg-opacity-40 p-10 ">
                            {listing.images &&
                                listing.images.length > 0 &&
                                listing.images
                                    .filter(
                                        (image) =>
                                            !activeDeletedImageIds.includes(
                                                image.id,
                                            ),
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

                                                    const remainingImages =
                                                        listing.images.filter(
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
                                                const newImageFiles = [
                                                    ...imageFiles,
                                                ];
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
                    </>

                    {errors.imageExcess && (
                        <p className=" text-red-400">{errors.imageExcess}</p>
                    )}
                    {errors.imageLarge && (
                        <p className=" text-sm text-red-400">
                            {errors.imageLarge}
                        </p>
                    )}
                    {enableErrorDisplay && errors.imageShortage && (
                        <p className="text-xs text-red-400">
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
                            className={`rounded-md border-2 border-green-500 bg-darkGray bg-opacity-60 px-6 py-2 text-green-500 hover:bg-green-500 hover:bg-opacity-100 hover:text-black ${
                                hasSubmitted ? "text-green-500" : ""
                            } ${
                                isSubmitting ? "text-green-500" : ""
                            } transition-all duration-300 ease-in-out`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-1">
                                    <LoadingSpinner size="20px" />
                                </div>
                            ) : (
                                "Edit Listing"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
