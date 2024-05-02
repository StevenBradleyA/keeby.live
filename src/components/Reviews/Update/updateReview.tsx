import Image from "next/image";
import keebo from "@public/Profile/keebo.png";
import defaultProfile from "@public/Profile/profile-default.png";
import LoadingSpinner from "~/components/Loading";
import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import type { Review } from "@prisma/client";
import toast from "react-hot-toast";

interface ErrorsObj {
    text?: string;
    starRating?: string;
}
interface StarProps {
    rating: number;
    starRating: number;
    hover: number;
    starHover: (rating: number) => void;
    onClick: (rating: number) => void;
}

const Star = ({ rating, starRating, hover, starHover, onClick }: StarProps) => {
    const filled = "text-green-500 ";
    const empty = "text-darkGray";

    const starClasses = rating <= starRating ? filled : empty;
    const hoverClasses = hover ? (rating <= hover ? filled : empty) : false;

    return (
        <button
            type="button"
            className={`${
                hoverClasses || starClasses
            } transition-colors duration-75 ease-custom-cubic`}
            onMouseEnter={() => starHover(rating)}
            onMouseLeave={() => starHover(0)}
            onClick={() => onClick(rating)}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 576 512"
                fill="currentColor"
            >
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
            </svg>
        </button>
    );
};

interface ManageReviewProps {
    review: EachReview;
    closeModal: () => void;
}

interface EachReview extends Review {
    seller: { username: string | null; profile: string | null };
}

export default function UpdateReview({
    review,
    closeModal,
}: ManageReviewProps) {
    const ctx = api.useContext();

    const [toggle, setToggle] = useState<string>("MENU");

    const [starRating, setStarRating] = useState<number>(
        parseFloat(review.starRating.toFixed(0))
    );
    const [hover, setHover] = useState(0);

    const [text, setText] = useState<string>(review.text);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

    const { mutate: updateReview } = api.review.update.useMutation({
        onSuccess: () => {
            toast.success("Review Updated!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            void ctx.review.getAllEligibleByUserId.invalidate();
            void ctx.review.getAllReceivedAndSentByUserId.invalidate();
            // todo get all invalidate here
            closeModal();
        },
    });

    const { mutate: deleteReview } = api.review.delete.useMutation({
        onSuccess: () => {
            toast.success("Review Deleted!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            void ctx.review.getAllEligibleByUserId.invalidate();
            void ctx.review.getAllReceivedAndSentByUserId.invalidate();
            // todo get all invalidate here
            closeModal();
        },
    });

    const starHover = (rating: number) => {
        setHover(rating);
    };

    const starClick = (rating: number) => {
        setStarRating(rating);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setEnableErrorDisplay(true);
        if (!Object.values(errors).length && !isSubmitting) {
            try {
                setIsSubmitting(true);

                const data = {
                    id: review.id,
                    userId: review.userId,
                    starRating: starRating,
                    text: text,
                };

                updateReview(data);
                setHasSubmitted(true);
                setIsSubmitting(false);
            } catch (error) {
                console.error("Submission failed:", error);
                setIsSubmitting(false);
            }
        }
    };
    const handleDeleteReview = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            id: review.id,
            userId: review.userId,
        };

        deleteReview(data);
    };

    useEffect(() => {
        const errorsObj: ErrorsObj = {};

        if (starRating === 0) {
            errorsObj.starRating =
                "Please provide a star rating for your review";
        }
        if (!text.length) {
            errorsObj.text = "Please provide text for your review";
        }

        setErrors(errorsObj);
    }, [text, starRating]);

    return (
        <>
            {toggle === "MENU" && (
                <div className="flex flex-col items-start gap-2 p-5">
                    <div className="flex justify-center gap-2">
                        <h1 className="mb-2 text-xl">Manage Review</h1>
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
            )}
            {toggle === "UPDATE" && (
                <form className="w-[500px] text-white">
                    <div className=" flex w-full items-center">
                        <Image
                            alt="seller profile"
                            src={
                                review.seller.profile
                                    ? review.seller.profile
                                    : defaultProfile
                            }
                            className="h-20 w-20 rounded-md border-2 border-[#616161]"
                            width={400}
                            height={400}
                        />
                        <h1 className="w-full border-y-2 border-[#616161] p-2 text-xl text-green-500">
                            Review {review.seller.username}
                        </h1>
                    </div>
                    <div className="my-3 flex w-full items-center justify-center">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <Star
                                key={rating}
                                rating={rating}
                                starRating={starRating}
                                hover={hover}
                                starHover={starHover}
                                onClick={starClick}
                            />
                        ))}
                    </div>
                    {enableErrorDisplay && errors.starRating && (
                        <p className="text-xs text-red-400">
                            {errors.starRating}
                        </p>
                    )}
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className=" h-32 max-h-52 w-full overflow-y-auto rounded-md bg-darkGray p-1 "
                        placeholder="Describe your experience with the seller"
                    ></textarea>
                    {enableErrorDisplay && errors.text && (
                        <p className="text-xs text-red-400">{errors.text}</p>
                    )}
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
                                "Submit"
                            )}
                        </button>
                    </div>
                </form>
            )}
            {toggle === "DELETE" && (
                <div className=" text-darkGray">
                    <h1 className="text-center">
                        Are you sure you want to{" "}
                        <span className="text-red-500"> delete</span> your
                        review?
                    </h1>

                    <div className="flex justify-center gap-10 ">
                        <button
                            className=" text-md keeb-shop-offer-button mt-5 flex items-center gap-2 rounded-md bg-darkGray py-2 pr-4 text-black "
                            onClick={handleDeleteReview}
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
        </>
    );
}
