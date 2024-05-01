import { api } from "~/utils/api";
import EachEligibleReviewCard from "../DisplayReviews/eachEligibleReviewCard";
import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import keebo from "@public/Profile/keebo.png";
import defaultProfile from "@public/Profile/profile-default.png";
import LoadingSpinner from "~/components/Loading";

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

export default function CreateReview({
    userId,
    closeModal,
}: {
    userId: string;
    closeModal: () => void;
}) {
    const ctx = api.useContext();
    const [sellerId, setSellerId] = useState<string>("");
    const [listingId, setListingId] = useState<string>("");
    const [sellerUsername, setSellerUsername] = useState<string>("");
    const [sellerProfile, setSellerProfile] = useState<string>("");

    const [starRating, setStarRating] = useState<number>(0);
    const [hover, setHover] = useState(0);

    const [text, setText] = useState<string>("");
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

    const { data: eligibleReviews } =
        api.review.getAllEligibleByUserId.useQuery(userId);

    const { mutate: createReview } = api.review.create.useMutation({
        onSuccess: () => {
            toast.success("Review Completed!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            void ctx.review.getAllEligibleByUserId.invalidate();
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
                    starRating: starRating,
                    text: text,
                    sellerId: sellerId,
                    listingId: listingId,
                    userId: userId,
                };

                createReview(data);
                setHasSubmitted(true);
                setIsSubmitting(false);
            } catch (error) {
                console.error("Submission failed:", error);
                setIsSubmitting(false);
            }
        }
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

    return sellerId.length === 0 && listingId.length === 0 ? (
        <div>
            {eligibleReviews && eligibleReviews.length > 0 ? (
                <div className="max-h-[400px] w-[300px] overflow-y-auto">
                    <h1 className="mb-5 flex items-end justify-center gap-2 text-xl">
                        Review a Seller
                        <Image
                            alt="keeby mascot"
                            src={keebo}
                            className="h-8 w-8 object-contain"
                        />
                    </h1>
                    {eligibleReviews.map((listing) => (
                        <div key={listing.id}>
                            <EachEligibleReviewCard
                                listing={listing}
                                setSellerId={setSellerId}
                                setListingId={setListingId}
                                setSellerUsername={setSellerUsername}
                                setSellerProfile={setSellerProfile}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="max-h-[400px] w-[300px]">
                    <h1 className="mb-5 flex items-end justify-center gap-2 text-xl">
                        Review a Seller
                        <Image
                            alt="keeby mascot"
                            src={keebo}
                            className="h-8 w-8 object-contain"
                        />
                    </h1>
                    <div className=" mb-2 w-full gap-2 rounded-md bg-white/5 p-2 text-xs text-darkGray transition-background duration-400 ease-custom-cubic hover:bg-white/10 ">
                        <h2 className="flex w-full justify-between">
                            Buy a keeb to review a seller
                        </h2>
                        <p className="mt-2 text-base text-green-500">
                            No Reviews Left
                        </p>
                    </div>
                </div>
            )}
        </div>
    ) : (
        <form className="w-[500px] text-white">
            <div className=" flex w-full items-center">
                <Image
                    alt="seller profile"
                    src={sellerProfile ? sellerProfile : defaultProfile}
                    className="h-20 w-20 rounded-md border-2 border-[#616161]"
                    width={400}
                    height={400}
                />
                <h1 className="w-full border-y-2 border-[#616161] p-2 text-xl text-green-500">
                    Review {sellerUsername}
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
                <p className="text-xs text-red-400">{errors.starRating}</p>
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
    );
}
