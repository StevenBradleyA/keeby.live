import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { uploadFileToS3 } from "~/utils/aws";
import Image from "next/image";
import defaultProfile from "@public/Profile/profile-default.png";
import LoadingSpinner from "~/components/Loading";

export default function AdminCreateRank({
    closeModal,
}: {
    closeModal: () => void;
}) {
    const { data: session } = useSession();
    const ctx = api.useContext();

    const [rankName, setRankName] = useState<string>("");
    const [minWpm, setMinWpm] = useState<number>(0);
    const [standing, setStanding] = useState<number>(0);

    const [maxWpm, setMaxWpm] = useState<number>(0);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { mutate: createRank } = api.rank.create.useMutation({
        onSuccess: () => {
            toast.success("Rank Created!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#ff0000",
                },
            });
            closeModal();
            void ctx.rank.getAll.invalidate();
        },
    });

    const handleCreateRank = async (e: React.FormEvent) => {
        e.preventDefault();
        if (
            session?.user.isAdmin &&
            rankName.length > 0 &&
            imageFiles.length > 0 &&
            !isSubmitting
        ) {
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

            const data = {
                name: rankName,
                minWpm: minWpm,
                standing: standing,
                maxWpm: maxWpm,
                image: imageUrlArr.map((imageUrl) => ({
                    link: imageUrl || "",
                })),
            };
            setHasSubmitted(true);
            setIsSubmitting(false);
            createRank(data);
        } else {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="flex w-full flex-col items-center gap-10 ">
            <div className="flex w-full flex-col gap-1">
                <label htmlFor="NameInput" className="text-darkGray">
                    Name
                </label>
                <input
                    id="NameInput"
                    value={rankName}
                    onChange={(e) => setRankName(e.target.value)}
                    className="h-10 w-full rounded-md bg-darkGray p-1 "
                    placeholder="Name"
                />
            </div>

            <div className="flex w-full justify-between  gap-10">
                <div className="flex flex-col gap-1">
                    <label htmlFor="minWpmInput" className="text-darkGray">
                        MinWpm
                    </label>
                    <input
                        id="minWpmInput"
                        type="number"
                        min={0}
                        value={minWpm}
                        onChange={(e) => setMinWpm(Math.floor(+e.target.value))}
                        className="h-10 w-full rounded-md bg-darkGray p-1"
                        placeholder="minWpm"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="maxWpmInput" className="text-darkGray">
                        maxWpm
                    </label>
                    <input
                        id="maxWpmInput"
                        type="number"
                        min={0}
                        value={maxWpm}
                        onChange={(e) => setMaxWpm(Math.floor(+e.target.value))}
                        className="h-10 w-full rounded-md bg-darkGray p-1"
                        placeholder="maxWpm"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="standingInput" className="text-darkGray">
                        Standing (top -- %)
                    </label>
                    <input
                        id="standingInput"
                        type="number"
                        min={0}
                        value={standing}
                        onChange={(e) => setStanding(+e.target.value)}
                        className="h-10 w-full rounded-md bg-darkGray p-1"
                        placeholder="standing"
                    />
                </div>
            </div>

            <div className=" flex items-center justify-between gap-10">
                {imageFiles && imageFiles[0] ? (
                    <div className="relative h-32 w-32">
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
                    <div className=" h-32 w-32 ">
                        <Image
                            src={defaultProfile}
                            alt="profile"
                            className="h-full w-full rounded-md  object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="relative  flex flex-col gap-1">
                    <input
                        name="profileImage"
                        id="profileImageInput"
                        className="absolute left-0 top-0 h-32 w-full cursor-pointer rounded-md opacity-0"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                const file = e.target.files[0];
                                if (file instanceof File) {
                                    setImageFiles([file]);
                                }
                            }
                        }}
                    />
                    <button className="h-32 w-32 rounded-md bg-failure text-black ">
                        <span className=" text-center">Choose Image</span>
                    </button>
                </div>
            </div>

            <button
                className=" w-1/2 rounded-md border-2 border-[#ff0000] bg-keebyGray bg-opacity-60 px-6 py-2 text-failure hover:bg-failure hover:bg-opacity-100 hover:text-black"
                onClick={(e) => {
                    e.preventDefault();
                    void handleCreateRank(e);
                }}
            >
                {isSubmitting ? (
                    <div className="flex items-center gap-1">
                        Uploading
                        <div className="w-6">
                            <LoadingSpinner size="16px" />
                        </div>
                    </div>
                ) : (
                    "Submit Listing"
                )}
            </button>
        </form>
    );
}
