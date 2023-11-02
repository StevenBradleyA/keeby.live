import TitleScripts from "~/components/TitleScripts";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { uploadFileToS3 } from "~/utils/aws";
import { useSession } from "next-auth/react";

interface ErrorsObj {
    image?: string;
    imageExcess?: string;
    imageLarge?: string;
}
interface Image {
    link: string;
}

interface ListingData {
    userId: string;
    title: string;
    price: number;
    text: string;
    images?: Image[];
}

export default function CreateListing() {
    // instead of directing to page it might be nice to have pricing/scams in modals so they don't have to navigate back to page

    //todo what about filters and tags when creating a listing... Maybe an array with tags?
    // todo preview image selection

    const { data: session, update } = useSession();
    
    const [text, setText] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<number>(0);

    const [hover, setHover] = useState(0);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        const maxFileSize = 6 * 1024 * 1024;
        const errorsObj: ErrorsObj = {};
        if (imageFiles.length > 3) {
            errorsObj.imageExcess = "Cannot provide more than 3 photos";
        }

        for (const file of imageFiles) {
            if (file.size > maxFileSize) {
                errorsObj.imageLarge =
                    "One or more images exceeds the max 6 MB file size";
                break;
            }
        }

        setErrors(errorsObj);
    }, [imageFiles]);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsAvailable(!usernameCheck);
        setEnableErrorDisplay(true);

        if (!Object.values(errors).length && isAvailable && !isSubmitting) {
            try {
                const sessionUserId = session?.user?.id;

                if (!sessionUserId) {
                    throw new Error("Session expired");
                }

                const data: ListingData = {
                    userId: sessionUserId,
                    title,
                    text,
                    price,
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
                // mutate(data);

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
            <TitleScripts page={"createListing"} />
            <div className="flex w-2/3 flex-col items-center rounded-2xl bg-keebyGray ">
                <div> Before Listing please check out </div>
                <div className="flex">
                    <motion.button
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-2xl bg-black px-6 py-2"
                    >
                        pricing
                    </motion.button>

                    <motion.button
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-2xl bg-black px-6 py-2"
                    >
                        How to Prevent Scams
                    </motion.button>
                    <form></form>
                </div>
            </div>
        </>
    );
}
