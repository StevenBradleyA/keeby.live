import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { uploadFileToS3 } from "~/pages/api/aws/utils";

interface ErrorsObj {
    image?: string;
    imageExcess?: string;
}

export default function CreateImage() {
    const { data: session } = useSession();
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const ctx = api.useContext();

    const handleInputErrors = () => {
        const errorsObj: ErrorsObj = {};
        // ! should implement max file size upload could cap at like 50mb
        if (imageFiles.length < 1) {
            errorsObj.image = "Provide at least 1 Photo";
        }
        if (imageFiles.length > 50) {
            errorsObj.imageExcess = "Cannot provide more than 50 photos";
        }
        setErrors(errorsObj);
    };

    useEffect(() => {
        handleInputErrors();
    }, [imageFiles]);

    const { mutate } = api.image.create.useMutation({
        onSuccess: () => {
            void ctx.image.getAllByUserId.invalidate();
        },
    });

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!Object.values(errors).length && !isSubmitting) {
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

            try {
                const base64DataArray = await Promise.all(imagePromises);
                const imageUrlArr: string[] = [];

                for (const base64Data of base64DataArray) {
                    const buffer = Buffer.from(base64Data, "base64");
                    const imageUrl = await uploadFileToS3(buffer);
                    imageUrlArr.push(imageUrl);
                }

                const payload = {
                    images: imageUrlArr.map((imageUrl) => ({
                        link: imageUrl || "",
                        resourceType: "USER",
                        resourceId: session?.user.id ?? "",
                        userId: session?.user.id ?? "",
                    })),
                };

                mutate(payload);
                setImageFiles([]);
                setHasSubmitted(true);
                setIsSubmitting(false);
            } catch (error) {
                console.error("Upload failed:", error);
                setIsSubmitting(false);
            }
        }
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            encType="multipart/form-data"
            className="create-listing-form-container"
        >
            <div className="create-listing-upload-title">
                Upload Images of your hair!
            </div>

            {hasSubmitted && errors.image && (
                <p className="create-listing-errors">{errors.image}</p>
            )}
            {hasSubmitted && errors.imageExcess && (
                <p className="create-listing-errors">{errors.imageExcess}</p>
            )}
            <div className="py-4">
                <label className="relative inline-block h-40 w-40">
                    <input
                        className="absolute h-full w-full cursor-pointer opacity-0"
                        type="file"
                        multiple
                        // accept="image/png, image/jpg, image/jpeg"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files)
                                setImageFiles([
                                    ...imageFiles,
                                    ...e.target.files,
                                ]);
                        }}
                    />
                    <div className="flex h-full w-full cursor-pointer items-center justify-center rounded bg-gray-400 font-bold text-white hover:bg-gray-700">
                        Choose Files
                    </div>
                </label>
            </div>
            <div className="mb-20 flex w-full flex-wrap justify-center gap-10">
                {imageFiles.map((e, i) => {
                    return (
                        <>
                            <img
                                className="h-28 w-auto rounded-lg object-cover shadow-sm hover:scale-105 hover:shadow-md"
                                alt={`listing-${i}`}
                                src={URL.createObjectURL(e)}
                                key={i}
                            />
                        </>
                    );
                })}
            </div>

            <button
                className="rounded-lg bg-purple-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-50"
                type="submit"
                disabled={
                    (hasSubmitted && Object.values(errors).length > 0) ||
                    isSubmitting
                }
            >
                {isSubmitting ? "Uploading..." : "Upload Photos"}
            </button>
        </form>
    );
}
