"use client";
import { api } from "~/trpc/react";
import heic2any from "heic2any";
import { useEffect, useState } from "react";
import { uploadFileToS3 } from "~/utils/aws";
import Image from "next/image";
import defaultProfile from "@public/Images/defaultProfile.png";
import toast from "react-hot-toast";
import LoadingSpinner from "~/app/_components/Loading";
import type { ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import type { Pick } from "@prisma/client";

interface UpdatePickProps {
    pick: Pick;
    closeModal: () => void;
}

interface ErrorsObj {
    title?: string;
    link?: string;
    category?: string;
    price?: string;
}
interface ImageUpload {
    link: string;
}
interface UpdatePickData {
    id: string;
    title: string;
    link: string;
    image: string;
    images?: ImageUpload[];
    category: string;
    price: number;
    featured: boolean;
    description?: string;
    color?: string;
    caseMaterial?: string;
    layoutType?: string;
    pcbType?: string;
    assemblyType?: string;
    soundType?: string;
    keycapMaterial?: string;
    profileType?: string;
    switchType?: string;
    preLubed?: boolean;
}

export default function UpdatePick({ closeModal, pick }: UpdatePickProps) {
    const { data: session } = useSession();
    const utils = api.useUtils();

    // form state --
    const [title, setTitle] = useState<string>(pick.title);
    const [link, setLink] = useState<string>(pick.link);
    const [category, setCategory] = useState<string>(pick.category);
    const [price, setPrice] = useState<number>(pick.price);
    const [featured, setFeatured] = useState<boolean>(pick.featured);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    // optionals
    const [description, setDescription] = useState<string>(
        pick.description ? pick.description : "",
    );
    const [color, setColor] = useState<string>(pick.color ? pick.color : "");
    const [caseMaterial, setCaseMaterial] = useState<string>(
        pick.caseMaterial ? pick.caseMaterial : "",
    );
    const [layoutType, setLayoutType] = useState<string>(
        pick.layoutType ? pick.layoutType : "",
    );
    const [pcbType, setPcbType] = useState<string>(
        pick.pcbType ? pick.pcbType : "",
    );
    const [assemblyType, setAssembyType] = useState<string>(
        pick.assemblyType ? pick.assemblyType : "",
    );
    const [soundType, setSoundType] = useState<string>(
        pick.soundType ? pick.soundType : "",
    );
    const [keycapMaterial, setKeycapMaterial] = useState<string>(
        pick.keycapMaterial ? pick.keycapMaterial : "",
    );
    const [profileType, setProfileType] = useState<string>(
        pick.profileType ? pick.profileType : "",
    );
    const [switchType, setSwitchType] = useState<string>(
        pick.switchType ? pick.switchType : "",
    );
    const [preLubed, setPreLubed] = useState<boolean | null>(
        pick.preLubed ? pick.preLubed : null,
    );

    // server interactions --

    const { mutate } = api.pick.update.useMutation({
        onSuccess: () => {
            try {
                toast.success("Pick uploaded!", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
                void utils.pick.getAll.invalidate();
            } catch (error) {
                console.error("Error while navigating:", error);
            }
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

    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const value = event.target.value;
        setCategory(value);
        // resets
        setDescription("");
        setColor("");
        setCaseMaterial("");
        setLayoutType("");
        setPcbType("");
        setAssembyType("");
        setSoundType("");
        setKeycapMaterial("");
        setProfileType("");
        setSwitchType("");
        setPreLubed(null);
    };
    const handleFeaturedChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const value = event.target.value === "true";
        setFeatured(value);
    };
    const handlePrelubeChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const value = event.target.value === "true";
        setPreLubed(value);
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        setEnableErrorDisplay(true);

        if (!Object.values(errors).length && !isSubmitting) {
            try {
                const admin = session?.user?.isAdmin;

                if (!session && !admin) {
                    throw new Error(
                        "You don't have the right, O you don't have the right",
                    );
                }

                const data: UpdatePickData = {
                    id: pick.id,
                    image: pick.image,
                    title: title,
                    link: link,
                    category: category,
                    price: price,
                    featured: featured,
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

                if (description) {
                    data.description = description;
                }

                if (color) {
                    data.color = color;
                }

                if (caseMaterial) {
                    data.caseMaterial = caseMaterial;
                }

                if (layoutType) {
                    data.layoutType = layoutType;
                }

                if (pcbType) {
                    data.pcbType = pcbType;
                }

                if (assemblyType) {
                    data.assemblyType = assemblyType;
                }

                if (soundType) {
                    data.soundType = soundType;
                }

                if (keycapMaterial) {
                    data.keycapMaterial = keycapMaterial;
                }

                if (profileType) {
                    data.profileType = profileType;
                }

                if (switchType) {
                    data.switchType = switchType;
                }

                if (preLubed !== null) {
                    data.preLubed = preLubed;
                }

                mutate(data);
                setHasSubmitted(true);
                setIsSubmitting(false);
                closeModal();
            } catch (error) {
                console.error("Submission failed:", error);
                setIsSubmitting(false);
            }
        }
    };

    // monitors --

    useEffect(() => {
        const errorsObj: ErrorsObj = {};

        if (!title.length) {
            errorsObj.title = "Please provide a title";
        }
        if (!link.length) {
            errorsObj.link = "Please provide a link";
        }
        if (!category.length) {
            errorsObj.category = "Please provide a category";
        }
        if (price <= 0) {
            errorsObj.price = "Please provide a price";
        }

        setErrors(errorsObj);
    }, [title, link, category, price, imageFiles]);

    return (
        <>
            <form className="w-[700px] h-[75vh] flex flex-col ">
                <div className="flex gap-10">
                    <div className="flex flex-col w-1/2 gap-2">
                        <div className="flex flex-col">
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
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="linkInput"
                                className="text-mediumGray"
                            >
                                Link
                            </label>
                            <input
                                id="linkInput"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                className="h-10 w-full rounded-md bg-mediumGray p-1 hover:opacity-80 ease-in "
                                placeholder="Link"
                            />
                            {enableErrorDisplay && errors.link && (
                                <p className="text-xs text-red-400">
                                    {errors.link}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="priceInput"
                                className="text-mediumGray"
                            >
                                Price
                            </label>
                            <input
                                id="priceInput"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(+e.target.value)}
                                className="h-10 w-full rounded-md bg-mediumGray p-1 hover:opacity-80 ease-in "
                                placeholder="Price"
                            />
                            {enableErrorDisplay && errors.link && (
                                <p className="text-xs text-red-400">
                                    {errors.link}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="feature-select"
                                className="text-mediumGray"
                            >
                                Featured
                            </label>
                            <select
                                id="feature-select"
                                className="h-10 w-full rounded-md bg-green-500 p-1 hover:opacity-80 ease-in text-black"
                                value={
                                    featured !== null ? String(featured) : ""
                                }
                                onChange={handleFeaturedChange}
                            >
                                <option value="">
                                    -- Please choose if featured --
                                </option>
                                <option value="false">False</option>
                                <option value="true">True</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="description"
                                className="text-mediumGray"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="h-32 w-full rounded-md bg-mediumGray p-1 hover:opacity-80 ease-in resize-none "
                                placeholder="Description"
                            />
                        </div>

                        <div className="relative  flex justify-between text-black ">
                            <div className="w-full h-12 relative  hover:opacity-70">
                                <input
                                    name="profile image upload"
                                    id="profile image"
                                    className="absolute left-0 top-0 bottom-0 right-0 h-full w-full rounded-lg opacity-0 z-30 "
                                    type="file"
                                    accept="image/png, image/jpg, image/jpeg, image/heic, image/heif"
                                    onChange={(e) => void handleImageChange(e)}
                                />
                                <button
                                    className="h-full w-full rounded-lg bg-green-500 flex items-center justify-center z-20 relative"
                                    type="button"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-10 h-10 "
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M14.0295 15.7412C14.1628 16.2772 14.7052 16.6037 15.2412 16.4705C15.7772 16.3372 16.1037 15.7948 15.9705 15.2588L14.0295 15.7412ZM8.02953 15.2588C7.89631 15.7948 8.2228 16.3372 8.75878 16.4705C9.29476 16.6037 9.83725 16.2772 9.97047 15.7412L8.02953 15.2588ZM12 8.5C11.4477 8.5 11 8.94772 11 9.5C11 10.0523 11.4477 10.5 12 10.5V8.5ZM12.01 10.5C12.5623 10.5 13.01 10.0523 13.01 9.5C13.01 8.94772 12.5623 8.5 12.01 8.5V10.5ZM4.09202 19.782L4.54601 18.891L4.09202 19.782ZM3.21799 18.908L4.10899 18.454L3.21799 18.908ZM20.782 18.908L19.891 18.454L20.782 18.908ZM19.908 19.782L19.454 18.891L19.908 19.782ZM19.908 4.21799L19.454 5.10899L19.908 4.21799ZM20.782 5.09202L19.891 5.54601L20.782 5.09202ZM4.09202 4.21799L4.54601 5.10899L4.09202 4.21799ZM3.21799 5.09202L4.10899 5.54601L3.21799 5.09202ZM12 9.5V11.5C13.1046 11.5 14 10.6046 14 9.5H12ZM12 9.5H10C10 10.6046 10.8954 11.5 12 11.5V9.5ZM12 9.5V7.5C10.8954 7.5 10 8.39543 10 9.5H12ZM12 9.5H14C14 8.39543 13.1046 7.5 12 7.5V9.5ZM12 14.5C13.145 14.5 13.8839 15.1554 14.0295 15.7412L15.9705 15.2588C15.5488 13.5624 13.817 12.5 12 12.5V14.5ZM9.97047 15.7412C10.1161 15.1554 10.855 14.5 12 14.5V12.5C10.183 12.5 8.45119 13.5624 8.02953 15.2588L9.97047 15.7412ZM12 10.5H12.01V8.5H12V10.5ZM6.2 5H17.8V3H6.2V5ZM20 7.2V16.8H22V7.2H20ZM17.8 19H6.2V21H17.8V19ZM4 16.8V7.2H2V16.8H4ZM6.2 19C5.62345 19 5.25117 18.9992 4.96784 18.9761C4.69617 18.9539 4.59545 18.9162 4.54601 18.891L3.63803 20.673C4.01641 20.8658 4.40963 20.9371 4.80497 20.9694C5.18864 21.0008 5.65645 21 6.2 21V19ZM2 16.8C2 17.3436 1.99922 17.8114 2.03057 18.195C2.06287 18.5904 2.13419 18.9836 2.32698 19.362L4.10899 18.454C4.0838 18.4045 4.04612 18.3038 4.02393 18.0322C4.00078 17.7488 4 17.3766 4 16.8H2ZM4.54601 18.891C4.35785 18.7951 4.20487 18.6422 4.10899 18.454L2.32698 19.362C2.6146 19.9265 3.07354 20.3854 3.63803 20.673L4.54601 18.891ZM20 16.8C20 17.3766 19.9992 17.7488 19.9761 18.0322C19.9539 18.3038 19.9162 18.4045 19.891 18.454L21.673 19.362C21.8658 18.9836 21.9371 18.5904 21.9694 18.195C22.0008 17.8114 22 17.3436 22 16.8H20ZM17.8 21C18.3436 21 18.8114 21.0008 19.195 20.9694C19.5904 20.9371 19.9836 20.8658 20.362 20.673L19.454 18.891C19.4045 18.9162 19.3038 18.9539 19.0322 18.9761C18.7488 18.9992 18.3766 19 17.8 19V21ZM19.891 18.454C19.7951 18.6422 19.6422 18.7951 19.454 18.891L20.362 20.673C20.9265 20.3854 21.3854 19.9265 21.673 19.362L19.891 18.454ZM17.8 5C18.3766 5 18.7488 5.00078 19.0322 5.02393C19.3038 5.04612 19.4045 5.0838 19.454 5.10899L20.362 3.32698C19.9836 3.13419 19.5904 3.06287 19.195 3.03057C18.8114 2.99922 18.3436 3 17.8 3V5ZM22 7.2C22 6.65645 22.0008 6.18864 21.9694 5.80497C21.9371 5.40963 21.8658 5.01641 21.673 4.63803L19.891 5.54601C19.9162 5.59545 19.9539 5.69617 19.9761 5.96784C19.9992 6.25117 20 6.62345 20 7.2H22ZM19.454 5.10899C19.6422 5.20487 19.7951 5.35785 19.891 5.54601L21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698L19.454 5.10899ZM6.2 3C5.65645 3 5.18864 2.99922 4.80497 3.03057C4.40963 3.06287 4.01641 3.13419 3.63803 3.32698L4.54601 5.10899C4.59545 5.0838 4.69617 5.04612 4.96784 5.02393C5.25117 5.00078 5.62345 5 6.2 5V3ZM4 7.2C4 6.62345 4.00078 6.25117 4.02393 5.96784C4.04612 5.69617 4.0838 5.59545 4.10899 5.54601L2.32698 4.63803C2.13419 5.01641 2.06287 5.40963 2.03057 5.80497C1.99922 6.18864 2 6.65645 2 7.2H4ZM3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803L4.10899 5.54601C4.20487 5.35785 4.35785 5.20487 4.54601 5.10899L3.63803 3.32698Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {enableErrorDisplay && errors.image && (
                            <p className="text-xs text-red-400">
                                {errors.image}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col w-1/2 text-black gap-2">
                        <div className="flex flex-col ">
                            <label
                                htmlFor="category-select"
                                className="text-mediumGray"
                            >
                                Category
                            </label>
                            <select
                                id="category-select"
                                className="h-10 w-full rounded-md bg-green-500 p-1 hover:opacity-80 ease-in "
                                value={category}
                                onChange={handleCategoryChange}
                            >
                                <option value="">
                                    -- Please choose a Category --
                                </option>
                                <option value="keyboards">Keyboards</option>
                                <option value="keycaps">Keycaps</option>
                                <option value="switches">Switches</option>
                                <option value="deskmats">Deskmats</option>
                                <option value="lube">Lube</option>
                                <option value="accessories">Accessories</option>
                            </select>
                            {enableErrorDisplay && errors.category && (
                                <p className="text-xs text-red-400">
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        {category === "keyboards" && (
                            <>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="color-select"
                                        className="text-mediumGray"
                                    >
                                        Color
                                    </label>
                                    <select
                                        id="color-select"
                                        className="h-10 w-full rounded-md bg-green-500 p-1 hover:opacity-80 ease-in "
                                        value={color}
                                        onChange={(e) =>
                                            setColor(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            -- Please choose a Color --
                                        </option>
                                        <option value="black">Black</option>
                                        <option value="white">White</option>
                                        <option value="blue">Blue</option>
                                        <option value="gray">Gray</option>
                                        <option value="green">Green</option>
                                        <option value="orange">Orange</option>
                                        <option value="pink">Pink</option>
                                        <option value="purple">Purple</option>
                                        <option value="red">Red</option>
                                        <option value="yellow">Yellow</option>
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label
                                        htmlFor="case-select"
                                        className="text-mediumGray"
                                    >
                                        Case Material
                                    </label>
                                    <select
                                        id="case-select"
                                        className="h-10 w-full rounded-md bg-green-500 p-1 hover:opacity-80 ease-in "
                                        value={caseMaterial}
                                        onChange={(e) =>
                                            setCaseMaterial(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            -- Case Material --
                                        </option>
                                        <option value="aluminum">
                                            Aluminum
                                        </option>
                                        <option value="plastic">Plastic</option>
                                        <option value="steel">Steel</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="layout-select"
                                        className="text-mediumGray"
                                    >
                                        Layout
                                    </label>
                                    <select
                                        id="layout-select"
                                        className="h-10 w-full rounded-md bg-green-500 p-1 hover:opacity-80 ease-in "
                                        value={layoutType}
                                        onChange={(e) =>
                                            setLayoutType(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            -- Layout Type --
                                        </option>
                                        <option value="alice">Alice</option>
                                        <option value="ortho">Ortho</option>
                                        <option value="split">Split</option>
                                        <option value="100">100%</option>
                                        <option value="75">75%</option>
                                        <option value="65">65%</option>
                                        <option value="60">60%</option>
                                        <option value="40">40%</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="pcb-select"
                                        className="text-mediumGray"
                                    >
                                        PCB
                                    </label>
                                    <select
                                        id="pcb-select"
                                        className="h-10 w-full rounded-md bg-green-500 p-1 hover:opacity-80 ease-in "
                                        value={pcbType}
                                        onChange={(e) =>
                                            setPcbType(e.target.value)
                                        }
                                    >
                                        <option value="">-- PCB Type --</option>
                                        <option value="hotswap">Hotswap</option>
                                        <option value="solder">Solder</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="assembly-select"
                                        className="text-mediumGray"
                                    >
                                        Assembly
                                    </label>
                                    <select
                                        id="assembly-select"
                                        className="h-10 w-full rounded-md bg-green-500 p-1 hover:opacity-80 ease-in "
                                        value={assemblyType}
                                        onChange={(e) =>
                                            setAssembyType(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            -- Assembly Type --
                                        </option>
                                        <option value="assembled">
                                            Assembled
                                        </option>
                                        <option value="barebones">
                                            Barebones
                                        </option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="sound-select"
                                        className="text-mediumGray"
                                    >
                                        Sound Type
                                    </label>
                                    <select
                                        id="sound-select"
                                        className="h-10 w-full rounded-md bg-green-500 p-1 hover:opacity-80 ease-in "
                                        value={soundType}
                                        onChange={(e) =>
                                            setSoundType(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            -- Sound Type --
                                        </option>
                                        <option value="thock">Thock</option>
                                        <option value="clack">Clack</option>
                                        <option value="click">Click</option>
                                        <option value="silent">Silent</option>
                                    </select>
                                </div>
                            </>
                        )}

                        {category === "keycaps" && (
                            <>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="color-select"
                                        className="text-mediumGray"
                                    >
                                        Color
                                    </label>
                                    <select
                                        id="color-select"
                                        className="h-10 w-full rounded-md bg-green-500 p-1 hover:opacity-80 ease-in "
                                        value={color}
                                        onChange={(e) =>
                                            setColor(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            -- Please choose a Color --
                                        </option>
                                        <option value="black">Black</option>
                                        <option value="white">White</option>
                                        <option value="blue">Blue</option>
                                        <option value="gray">Gray</option>
                                        <option value="green">Green</option>
                                        <option value="orange">Orange</option>
                                        <option value="pink">Pink</option>
                                        <option value="purple">Purple</option>
                                        <option value="red">Red</option>
                                        <option value="yellow">Yellow</option>
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label
                                        htmlFor="keycap-material-select"
                                        className="text-mediumGray"
                                    >
                                        Keycap Material
                                    </label>
                                    <select
                                        id="keycap-material-select"
                                        className="h-10 w-full rounded-md bg-green-500 p-1 hover:opacity-80 ease-in "
                                        value={keycapMaterial}
                                        onChange={(e) =>
                                            setKeycapMaterial(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            -- Keycap Material --
                                        </option>
                                        <option value="abs">ABS</option>
                                        <option value="pbt">PBT</option>
                                        <option value="pom">POM</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="profile-select"
                                        className="text-mediumGray"
                                    >
                                        Profile
                                    </label>
                                    <select
                                        id="profile-select"
                                        className="h-10 w-full rounded-md bg-green-500 p-1 hover:opacity-80 ease-in "
                                        value={profileType}
                                        onChange={(e) =>
                                            setProfileType(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            -- Keycap Profile --
                                        </option>
                                        <option value="cherry">Cherry</option>
                                        <option value="sa">SA</option>
                                        <option value="oem">OEM</option>
                                        <option value="dsa">DSA</option>
                                    </select>
                                </div>
                            </>
                        )}
                        {category === "switches" && (
                            <>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="color-select"
                                        className="text-mediumGray"
                                    >
                                        Color
                                    </label>
                                    <select
                                        id="color-select"
                                        className="h-10 w-full rounded-md bg-green-500 p-1 hover:opacity-80 ease-in "
                                        value={color}
                                        onChange={(e) =>
                                            setColor(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            -- Please choose a Color --
                                        </option>
                                        <option value="black">Black</option>
                                        <option value="white">White</option>
                                        <option value="blue">Blue</option>
                                        <option value="gray">Gray</option>
                                        <option value="green">Green</option>
                                        <option value="orange">Orange</option>
                                        <option value="pink">Pink</option>
                                        <option value="purple">Purple</option>
                                        <option value="red">Red</option>
                                        <option value="yellow">Yellow</option>
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label
                                        htmlFor="switch-select"
                                        className="text-mediumGray"
                                    >
                                        Switch Type
                                    </label>
                                    <select
                                        id="switch-select"
                                        className="h-10 w-full rounded-md bg-green-500 p-1 hover:opacity-80 ease-in "
                                        value={switchType}
                                        onChange={(e) =>
                                            setSwitchType(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            -- Switch Type --
                                        </option>
                                        <option value="linear">Linear</option>
                                        <option value="tactile">Tactile</option>
                                        <option value="silent">Silent</option>
                                        <option value="clicky">Clicky</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="prelube-select"
                                        className="text-mediumGray"
                                    >
                                        Prelubed
                                    </label>
                                    <select
                                        id="prelube-select"
                                        className="h-10 w-full rounded-md bg-green-500 p-1 hover:opacity-80 ease-in "
                                        value={
                                            preLubed !== null
                                                ? String(preLubed)
                                                : ""
                                        }
                                        onChange={handlePrelubeChange}
                                    >
                                        <option value="">-- Prelubed --</option>
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </select>
                                </div>
                            </>
                        )}
                        {category === "deskmats" && (
                            <>
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="color-select"
                                        className="text-mediumGray"
                                    >
                                        Color
                                    </label>
                                    <select
                                        id="color-select"
                                        className="h-10 w-full rounded-md bg-green-500 p-1 hover:opacity-80 ease-in "
                                        value={color}
                                        onChange={(e) =>
                                            setColor(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            -- Please choose a Color --
                                        </option>
                                        <option value="black">Black</option>
                                        <option value="white">White</option>
                                        <option value="blue">Blue</option>
                                        <option value="gray">Gray</option>
                                        <option value="green">Green</option>
                                        <option value="orange">Orange</option>
                                        <option value="pink">Pink</option>
                                        <option value="purple">Purple</option>
                                        <option value="red">Red</option>
                                        <option value="yellow">Yellow</option>
                                    </select>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex justify-center mt-5">
                    {imageFiles && imageFiles[0] ? (
                        <div className=" relative">
                            <div className="w-32 h-24 bg-black rounded-lg overflow-hidden">
                                <Image
                                    className="h-full w-full object-cover "
                                    alt="profile"
                                    src={URL.createObjectURL(imageFiles[0])}
                                    width={300}
                                    height={300}
                                />
                            </div>
                            <button
                                className="absolute -right-4 -top-7 transform p-1 text-2xl text-white/50 transition-transform duration-300 ease-in-out hover:rotate-45 hover:scale-110 hover:text-red-500"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setImageFiles([]);
                                }}
                            >
                                &times;
                            </button>
                        </div>
                    ) : (
                        <div className="w-32 h-24 bg-black rounded-lg overflow-hidden ">
                            <Image
                                src={pick.image}
                                alt="profile"
                                className="h-full w-full object-cover "
                                priority
                                width={400}
                                height={400}
                            />
                        </div>
                    )}
                </div>

                <div className="w-full flex justify-center mt-10">
                    <div className="flex self-start">
                        <button
                            className="w-full px-4 py-2 bg-green-500 text-black shadow-2xl rounded-lg  flex justify-center hover:opacity-80 self-start "
                            style={{
                                boxShadow: "0 0 20px #22C55E",
                            }}
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                void submit(e);
                            }}
                            disabled={hasSubmitted || isSubmitting}
                        >
                            {isSubmitting ? (
                                <LoadingSpinner size="20px" />
                            ) : (
                                "Upload Pick"
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
