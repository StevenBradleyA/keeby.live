import { api } from "~/utils/api";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { uploadFileToS3 } from "~/utils/aws";
import { useSession } from "next-auth/react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Custom404 from "~/pages/404";
import defaultProfile from "@public/Profile/profile-default.png";
import TitleScripts from "~/components/TitleScripts";

interface ErrorsObj {
    image?: string;
    imageExcess?: string;
    imageShortage?: string;
    imageLarge?: string;
    text?: string;
    title?: string;
    titleExcess?: string;
    priceNone?: string;
    priceExcess?: string;
    priceNotWhole?: string;
    keycaps?: string;
    switches?: string;
    switchType?: string;
}

interface Image {
    link: string;
}

interface ListingData {
    sellerId: string;
    title: string;
    keycaps: string;
    switches: string;
    switchType: string;
    price: number;
    text: string;
    preview: number;
    images: Image[];
}

export default function CreateListing() {
    //instead of directing to page it might be nice to have pricing/scams in modals so they don't have to navigate back to page
    //todo what about filters and tags when creating a listing... Maybe an array with tags?
    //todo change redirect to my listings page??? or shoppp??
    //todo admin ability to delete other listings
    //todo maybe listings needs an isActive boolean so when when sold the photos can be auto deleted or kept for a lil bit idk
    // price to cents so it stores in db as cents will have to convert on listing page
    // todo styling this page uuuuugggglllyyyyyy

    // TODO youtube api --
    // add a back button to go back and read terms

    const { data: session } = useSession();
    const ctx = api.useContext();
    const router = useRouter();

    const accessDenied = !session || !session.user.isVerified;

    const [text, setText] = useState<string>("");
    const [keycaps, setKeycaps] = useState<string>("");
    const [switchType, setSwitchType] = useState<string>("linear");
    const [switches, setSwitches] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [preview, setPreview] = useState<number>(0);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { mutate } = api.listing.create.useMutation({
        onSuccess: async () => {
            toast.success("Listing Complete!", {
                icon: "👏",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            void ctx.listing.getAll.invalidate();
            await router.push("/");
        },
    });

    useEffect(() => {
        const maxFileSize = 8 * 1024 * 1024;
        const errorsObj: ErrorsObj = {};
        if (imageFiles.length > 25) {
            errorsObj.imageExcess = "Cannot provide more than 25 photos";
        }
        if (imageFiles.length < 5) {
            errorsObj.imageShortage = "Please provide at least 5 photos";
        }

        if (text.length < 1) {
            errorsObj.text =
                "Please provide a description of at least 200 words";
        }
        if (!title.length) {
            errorsObj.title = "Please provide a title for your listing";
        }
        if (title.length > 50) {
            errorsObj.titleExcess = "Title cannot exceed 50 characters";
        }

        // we are going to want to cap the title length to like 10 words or character limit

        if (!keycaps.length) {
            errorsObj.keycaps = "Please provide the keycaps on your keeb";
        }
        if (!switches.length) {
            errorsObj.switches = "Please provide the switches on your keeb";
        }
        if (!switchType.length) {
            errorsObj.switchType = "Please select the switchType of your keeb";
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
        if (price > 7000) {
            errorsObj.priceExcess = "Woah, that price is too high for keeby";
        }
        if (!Number.isInteger(price)) {
            errorsObj.priceNotWhole =
                "Please enter a whole number for the price";
        }

        for (const file of imageFiles) {
            if (file.size > maxFileSize) {
                errorsObj.imageLarge =
                    "One or more images exceeds the max 8 MB file size";
                break;
            }
        }

        setErrors(errorsObj);
    }, [imageFiles, price, text, title, keycaps, switches, switchType]);

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
                    sellerId: sessionUserId,
                    title,
                    keycaps,
                    switches,
                    switchType,
                    text,
                    price: price * 100,
                    preview,
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

                mutate(data);
                setImageFiles([]);
                setHasSubmitted(true);
                setIsSubmitting(false);
            } catch (error) {
                console.error("Submission failed:", error);
                setIsSubmitting(false);
            }
        }
    };

    if (accessDenied) {
        return <Custom404 />;
    }

    return (
        <>
            <div className="flex w-2/3 items-center  ">
                <Image
                    src={defaultProfile}
                    alt="profile"
                    width={400}
                    height={400}
                    className=" h-40 w-40 border-4 border-[#2f2f2f] object-cover"
                />

                <div className="flex h-24 w-full flex-col justify-center border-b-2 border-t-2 border-[#2f2f2f] bg-black bg-opacity-60 px-5">
                    <div className="">
                        <div className="flex justify-between text-3xl">
                            <TitleScripts page={"createListing"} />
                            <button>back</button>
                        </div>
                        <h3 className="text-darkGray">
                            {session.user.username}
                        </h3>
                    </div>
                </div>
            </div>
            <div className="mb-32 mt-10 flex w-2/3 flex-col items-center rounded-2xl bg-keebyGray ">
                <form className="flex w-full flex-col items-center">
                    <h1> What is the name of your keyboard? </h1>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-black"
                        placeholder="title"
                    />
                    {enableErrorDisplay && errors.title && (
                        <p className="text-xl text-failure">{errors.title}</p>
                    )}
                    {enableErrorDisplay && errors.titleExcess && (
                        <p className="text-xl text-failure">
                            {errors.titleExcess}
                        </p>
                    )}

                    <h1> {`What's on the keeb?`} </h1>
                    <div className="flex">
                        <input
                            value={keycaps}
                            onChange={(e) => setKeycaps(e.target.value)}
                            className="bg-black"
                            placeholder="keycaps"
                        />
                        <input
                            value={switches}
                            onChange={(e) => setSwitches(e.target.value)}
                            className="bg-black"
                            placeholder="switches"
                        />
                        <select
                            className=" bg-black px-2 py-1 text-green-500"
                            value={switchType}
                            onChange={(e) => setSwitchType(e.target.value)}
                        >
                            <option value="linear">Linear</option>
                            <option value="tactile">Tactile</option>
                            <option value="clicky">Clicky</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    {enableErrorDisplay && errors.keycaps && (
                        <p className="text-xl text-red-400">{errors.keycaps}</p>
                    )}
                    {enableErrorDisplay && errors.switches && (
                        <p className="text-xl text-red-400">
                            {errors.switches}
                        </p>
                    )}
                    {enableErrorDisplay && errors.switchType && (
                        <p className="text-xl text-red-400">
                            {errors.switchType}
                        </p>
                    )}

                    <div> Write a lengthy description of your keyboard </div>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className=" bg-black "
                        placeholder="Description"
                    ></textarea>

                    {enableErrorDisplay && errors.text && (
                        <p className="text-xl text-red-400">{errors.text}</p>
                    )}
                    <input
                        type="number"
                        min={0}
                        value={price === 0 ? "" : price}
                        // onChange={(e) => setPrice(+e.target.value)}
                        onChange={(e) => setPrice(Math.floor(+e.target.value))}
                        className="bg-black"
                        placeholder="$ price"
                    />

                    {enableErrorDisplay && errors.priceNone && (
                        <p className="text-xl text-red-400">
                            {errors.priceNone}
                        </p>
                    )}
                    {enableErrorDisplay && errors.priceExcess && (
                        <p className="text-xl text-red-400">
                            {errors.priceExcess}
                        </p>
                    )}
                    {enableErrorDisplay && errors.priceNotWhole && (
                        <p className="text-xl text-red-400">
                            {errors.priceNotWhole}
                        </p>
                    )}

                    <div className="mt-5 flex justify-center text-4xl">
                        Upload Images for your listing
                    </div>
                    <div className=" flex justify-center text-xl">
                        Clicking on an image will select the preview image ---
                        green border
                    </div>
                    <div className="py-4">
                        <label className="relative flex justify-center">
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
                            <button className="h-32 w-44 rounded-2xl bg-black">
                                <span className="bg-black text-center">
                                    Choose Files
                                </span>
                            </button>
                        </label>
                    </div>
                    <div className="mb-5 flex w-3/4 flex-wrap justify-center gap-10  ">
                        {imageFiles.map((e, i) => (
                            <div key={i} className="relative">
                                <Image
                                    className={`h-28 w-auto cursor-pointer rounded-lg object-cover shadow-sm hover:scale-105 hover:shadow-md ${
                                        i === preview
                                            ? "border-4 border-green-500"
                                            : ""
                                    } `}
                                    alt={`listing-${i}`}
                                    src={URL.createObjectURL(e)}
                                    width={100}
                                    height={100}
                                    onClick={() => setPreview(i)}
                                />
                                <button
                                    className="absolute right-[-10px] top-[-32px] transform p-1 text-2xl text-gray-600 transition-transform duration-300 ease-in-out hover:rotate-45 hover:scale-110 hover:text-red-500"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const newImageFiles = [...imageFiles];
                                        newImageFiles.splice(i, 1);
                                        setImageFiles(newImageFiles);
                                        setPreview(0);
                                    }}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                    {errors.imageExcess && (
                        <p className="create-listing-errors text-red-500">
                            {errors.imageExcess}
                        </p>
                    )}
                    {errors.imageLarge && (
                        <p className="create-listing-errors text-red-500">
                            {errors.imageLarge}
                        </p>
                    )}
                    {enableErrorDisplay && errors.imageShortage && (
                        <p className="text-xl text-red-400">
                            {errors.imageShortage}
                        </p>
                    )}

                    <motion.button
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.preventDefault();
                            void submit(e);
                        }}
                        disabled={hasSubmitted || isSubmitting}
                        className={`rounded-2xl bg-black px-6 py-2 ${
                            hasSubmitted ? "text-red-500" : ""
                        } ${isSubmitting ? "text-red-500" : ""}`}
                    >
                        {isSubmitting ? "Uploading..." : "Submit"}
                    </motion.button>
                </form>
            </div>
        </>
    );
}
