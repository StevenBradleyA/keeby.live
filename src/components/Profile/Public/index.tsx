import { api } from "~/utils/api";
import Image from "next/image";
import gridBackground from "@public/Profile/profile-plus.png";
import stockProfile from "@public/Profile/profile-default.png";
import defaultProfile from "@public/Profile/profile-default.png";
import DisplayStarRating from "~/components/Reviews/Star/displayStarRating";
import EachReceivedReviewCard from "~/components/Reviews/Display/eachReceivedReviewCard";
import EachPublicProfileReview from "~/components/Reviews/Display/publicProfileReviews";
import { RadialBarChart, RadialBar, Legend, PolarAngleAxis } from "recharts";
import CustomProgressPie from "./customProgressPie";

interface PublicProfileProps {
    username: string;
}

export default function PublicProfileUserInfo({
    username,
}: PublicProfileProps) {
    const { data: userData } = api.user.getUserPublic.useQuery(username);

    // todo features for this site

    // Show all Seller reviews
    // show seller information
    // show all seller keebs ????
    // show seller posts and listings???
    //  show seller average wpm and selected tag fo sho
    console.log(userData);

    // Calculate the percentage
    // const percentage = ((rating / 5) * 100).toFixed(1);

    return (
        userData && (
            <div className="w-full px-40 text-darkGray">
                <div className="z-10 flex h-[60vh]  w-full justify-center gap-10 ">
                    <div className="h-full w-3/12 rounded-2xl bg-black/30 p-5"></div>
                    <div className="h-3/4 w-4/12 rounded-2xl bg-black/30">
                        <Image
                            alt="profile"
                            src={
                                userData.userInfo.profile
                                    ? userData.userInfo.profile
                                    : defaultProfile
                            }
                            width={800}
                            height={800}
                            className="z-10 h-full w-full rounded-2xl object-cover "
                        />
                    </div>
                    <div className="h-full w-3/12 overflow-y-auto rounded-2xl bg-black/30 p-2">
                        <div className="flex justify-center">
                            {userData.averageStarRating._avg.starRating ? (
                                <CustomProgressPie
                                    size={150}
                                    strokeWidth={5}
                                    rating={
                                        userData.averageStarRating._avg
                                            .starRating
                                    }
                                />
                            ) : (
                                <CustomProgressPie
                                    size={150}
                                    strokeWidth={5}
                                    rating={0}
                                />
                            )}
                        </div>

                        <div className="mt-5">
                            {userData.userInfo.reviewsReceived.length > 0 ? (
                                userData.userInfo.reviewsReceived.map(
                                    (review) => (
                                        <div key={review.id}>
                                            <EachPublicProfileReview
                                                review={review}
                                            />
                                        </div>
                                    )
                                )
                            ) : (
                                <div className="flex w-full flex-col rounded-xl bg-black/30 p-2  text-xs transition-background duration-300 ease-custom-cubic hover:bg-black/20 ">
                                    <div className="flex w-full items-center gap-2 ">
                                        <Image
                                            alt="profile"
                                            src={defaultProfile}
                                            className="h-12 w-12 rounded-md border-2 border-[#616161] object-cover"
                                            width={300}
                                            height={300}
                                        />
                                        <div className="flex flex-col">
                                            <h2>This seller has no reviews</h2>
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <DisplayStarRating rating={0} />
                                    </div>
                                    <div className="mt-2 h-10 overflow-y-auto break-words text-green-500">
                                        {`No reviews yet`}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
{
    /* <Image
src={gridBackground}
alt="background"
className="matrix-full-screen fixed bottom-0 left-0 right-0 top-0 h-full w-full object-cover object-center opacity-40 "
priority
/> */
}
