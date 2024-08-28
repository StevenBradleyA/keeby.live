"use client";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { uploadFileToS3 } from "~/utils/aws";
import Image from "next/image";
import type { Rank } from "@prisma/client";

interface AdminUpdateRankProps {
    rank: Rank;
    closeModal: () => void;
}
interface ImageUpload {
    link: string;
}

interface UpdateData {
    id: string;
    name: string;
    minWpm: number;
    maxWpm: number;
    standing: number;
    images?: ImageUpload[];
    image: string;
}

export default function AdminUpdateRank({
    rank,
    closeModal,
}: AdminUpdateRankProps) {
    const { data: session } = useSession();
    const utils = api.useUtils();

    const [rankName, setRankName] = useState<string>(rank.name);
    const [minWpm, setMinWpm] = useState<number>(rank.minWpm);
    const [maxWpm, setMaxWpm] = useState<number>(rank.maxWpm);
    const [standing, setStanding] = useState<number>(rank.standing);
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const { mutate: updateRank } = api.rank.update.useMutation({
        onSuccess: () => {
            toast.success("Rank Updated!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#ff0000",
                },
            });
            closeModal();
            void utils.rank.getAll.invalidate();
            void utils.tag.getAll.invalidate();
        },
    });

    const handleUpdateRank = async (e: React.FormEvent) => {
        e.preventDefault();
        if (session && session.user.isAdmin) {
            const data: UpdateData = {
                id: rank.id,
                name: rankName,
                minWpm: minWpm,
                maxWpm: maxWpm,
                standing: standing,
                image: rank.image,
            };

            if (imageFiles.length > 0) {
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
            }

            updateRank(data);
        }
    };

    return (
        <form className="flex h-[500px] w-[600px] flex-col items-center text-white text-sm ">
            <h1 className="text-xl">Edit a rank</h1>
            <div className="flex w-full flex-col gap-1 mt-5">
                <label htmlFor="NameInput" className="text-mediumGray">
                    Name
                </label>
                <input
                    id="NameInput"
                    value={rankName}
                    onChange={(e) => setRankName(e.target.value)}
                    className="h-10 w-full rounded-md bg-mediumGray p-1 "
                    placeholder="Name"
                    required
                />
            </div>

            <div className="flex w-full justify-between  gap-10 mt-5">
                <div className="flex flex-col gap-1">
                    <label htmlFor="minWpmInput" className="text-mediumGray">
                        MinWpm
                    </label>
                    <input
                        id="minWpmInput"
                        type="number"
                        min={0}
                        value={minWpm}
                        onChange={(e) => setMinWpm(Math.floor(+e.target.value))}
                        className="h-10 w-full rounded-md bg-mediumGray p-1"
                        placeholder="minWpm"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="maxWpmInput" className="text-mediumGray">
                        maxWpm
                    </label>
                    <input
                        id="maxWpmInput"
                        type="number"
                        min={0}
                        value={maxWpm}
                        onChange={(e) => setMaxWpm(Math.floor(+e.target.value))}
                        className="h-10 w-full rounded-md bg-mediumGray p-1"
                        placeholder="maxWpm"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="standingInput" className="text-mediumGray">
                        Standing (top -- %)
                    </label>
                    <input
                        id="standingInput"
                        type="number"
                        min={0}
                        value={standing}
                        onChange={(e) => setStanding(+e.target.value)}
                        className="h-10 w-full rounded-md bg-mediumGray p-1"
                        placeholder="standing"
                        required
                    />
                </div>
            </div>

            <div className=" flex items-center justify-between gap-10 mt-10">
                {imageFiles && imageFiles[0] ? (
                    <div className="relative h-28 w-48">
                        <Image
                            className="h-full w-full rounded-md object-cover"
                            alt="profile"
                            src={URL.createObjectURL(imageFiles[0])}
                            width={200}
                            height={200}
                        />
                        <button
                            className="absolute right-[-10px] top-[-32px] transform p-1 text-2xl text-gray-600 transition-transform duration-300 ease-in-out hover:rotate-45 hover:scale-110 hover:text-red-500"
                            onClick={(e) => {
                                e.preventDefault();
                                setImageFiles([]);
                            }}
                        >
                            &times;
                        </button>
                    </div>
                ) : (
                    <div className=" h-28 w-48 ">
                        <Image
                            src={rank.image}
                            alt="profile"
                            className="h-full w-full rounded-md  object-cover"
                            priority
                            width={400}
                            height={400}
                        />
                    </div>
                )}

                <div className="relative  flex flex-col gap-1 hover:opacity-80">
                    <input
                        name="profileImage"
                        id="profileImageInput"
                        className="absolute left-0 top-0 h-32 w-full cursor-pointer rounded-md opacity-0"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/heic, image/heif"
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                const file = e.target.files[0];
                                if (file instanceof File) {
                                    setImageFiles([file]);
                                }
                            }
                        }}
                    />
                    <button className="h-28 w-48 rounded-md bg-failure text-black ">
                        <span className=" text-center">Choose Image</span>
                    </button>
                </div>
            </div>

            <button
                className=" mt-10 rounded-md border-2 border-[#ff0000] bg-darkGray bg-opacity-60 px-6 py-2 text-failure hover:bg-failure hover:bg-opacity-100 hover:text-black"
                onClick={(e) => {
                    e.preventDefault();
                    void handleUpdateRank(e);
                }}
            >
                Edit Rank
            </button>
        </form>
    );
}