import { api } from "~/trpc/react";
import { useState } from "react";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";
import LoadingSpinner from "~/app/_components/Loading";
import EachReviewForBuyer from "../DisplayReviews/eachReviewForBuyer";
import EachReviewForSeller from "../DisplayReviews/eachReviewForSeller";
import CreateReviewForm from "./createReviewForm";

export default function CreateReview({
    userId,
    closeModal,
}: {
    userId: string;
    closeModal: () => void;
}) {
    // form state
    const [transactionId, setTransactionId] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [recipientId, setRecipientId] = useState<string>("");
    const [recipientUsername, setRecipientUsername] = useState<string>("");
    const [recipientProfile, setRecipientProfile] = useState<string>("");

    // serverInteractions
    const { data: eligibleReviews, isLoading } =
        api.review.getAllEligibleByUserId.useQuery(userId);

    // we need to check the length of both our eligible reviews otherwise display a template
    if (isLoading) {
        return (
            <div className="p-10 text-green-500">
                <LoadingSpinner size="20px" />
            </div>
        );
    }

    return (
        <div className="h-[450px] w-[500px] overflow-y-auto px-5">
            {transactionId.length > 0 ? (
                <CreateReviewForm
                    type={type}
                    recipientId={recipientId}
                    recipientUsername={recipientUsername}
                    recipientProfile={recipientProfile}
                    transactionId={transactionId}
                    userId={userId}
                    closeModal={closeModal}
                />
            ) : (
                <div className="w-full flex flex-col items-center">
                    <div className="flex items-end gap-2">
                        <h1 className=" text-xl">Write a Review</h1>
                        <Image
                            alt="keeby mascot"
                            src={keebo}
                            className="h-8 w-8 object-contain"
                        />
                    </div>

                    <div className="flex gap-2 flex-col w-full mt-5">
                        {eligibleReviews &&
                            eligibleReviews.reviewsForBuyers.length > 0 &&
                            eligibleReviews.reviewsForBuyers.map(
                                (review, i) => (
                                    <div key={i}>
                                        <EachReviewForBuyer
                                            review={review}
                                            setType={setType}
                                            setRecipientId={setRecipientId}
                                            setRecipientUsername={
                                                setRecipientUsername
                                            }
                                            setRecipientProfile={
                                                setRecipientProfile
                                            }
                                            setTransactionId={setTransactionId}
                                        />
                                    </div>
                                ),
                            )}
                        {eligibleReviews &&
                            eligibleReviews.reviewsForSellers.length > 0 &&
                            eligibleReviews.reviewsForSellers.map(
                                (review, i) => (
                                    <div key={i}>
                                        <EachReviewForSeller
                                            review={review}
                                            setType={setType}
                                            setRecipientId={setRecipientId}
                                            setRecipientUsername={
                                                setRecipientUsername
                                            }
                                            setRecipientProfile={
                                                setRecipientProfile
                                            }
                                            setTransactionId={setTransactionId}
                                        />
                                    </div>
                                ),
                            )}
                        {eligibleReviews &&
                            eligibleReviews.reviewsForBuyers.length === 0 &&
                            eligibleReviews.reviewsForSellers.length === 0 && (
                                <div className=" w-full gap-2 rounded-md bg-white/5 p-2 text-xs text-mediumGray ease-in hover:bg-white/10 ">
                                    <div className="flex w-full justify-between">
                                        <h2>
                                            Review marketplace buyers and
                                            sellers{" "}
                                        </h2>
                                        <p className=" flex-shrink-0">:D</p>
                                    </div>

                                    <h3 className="mt-2 text-sm text-green-500 w-full text-center">
                                        no users to review
                                    </h3>
                                </div>
                            )}
                    </div>
                </div>
            )}
        </div>
    );
}
