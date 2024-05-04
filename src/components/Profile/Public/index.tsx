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
import MainFooter from "~/components/Footer/mainFooter";
import unranked from "@public/KeebType/unranked.png";

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
            <>
                <div className="z-10 w-full px-40 text-darkGray">
                    <div className="z-10 flex h-[60vh]  w-full justify-center gap-10 ">
                        <div className="flex h-full w-3/12 flex-col rounded-2xl bg-black/30 p-5 text-xs">
                            <div>{userData.userInfo.username}</div>
                            <div>{userData.userInfo.selectedTag}</div>
                            <div>points {userData.userInfo.internetPoints}</div>

                            <div>
                                {userData.userInfo.rank
                                    ? userData.userInfo.rank.name
                                    : "unranked"}
                            </div>
                            <Image
                                alt="profile"
                                src={userData.userInfo.rank?.image || unranked}
                                className="h-32 w-60 object-cover"
                                width={300}
                                height={300}
                            />

                            <div className="bg-black/30 p-2">
                                <div className="flex gap-2">
                                    <Image
                                        alt="profile"
                                        src={defaultProfile}
                                        className="h-8 w-8 rounded-md border-2 border-[#616161] object-cover"
                                        width={300}
                                        height={300}
                                    />
                                    <div className="flex flex-col ">
                                        <h2 className="text-green-500">
                                            Typist
                                        </h2>
                                        <p className="text">
                                            {userData.userInfo._count.games}{" "}
                                            games played
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Image
                                        alt="profile"
                                        src={defaultProfile}
                                        className="h-8 w-8 rounded-md border-2 border-[#616161] object-cover"
                                        width={300}
                                        height={300}
                                    />
                                    <div className="flex flex-col ">
                                        <h2 className="text-green-500">
                                            Commenter
                                        </h2>
                                        <p className="text">
                                            {userData.userInfo._count.comments}{" "}
                                            comments
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Image
                                        alt="profile"
                                        src={defaultProfile}
                                        className="h-8 w-8 rounded-md border-2 border-[#616161] object-cover"
                                        width={300}
                                        height={300}
                                    />
                                    <div className="flex flex-col ">
                                        <h2 className="text-green-500">
                                            Posts
                                        </h2>
                                        <p className="text">
                                            {userData.userInfo._count.posts}{" "}
                                            posts
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Image
                                        alt="profile"
                                        src={defaultProfile}
                                        className="h-8 w-8 rounded-md border-2 border-[#616161] object-cover"
                                        width={300}
                                        height={300}
                                    />
                                    <div className="flex flex-col ">
                                        <h2 className="text-green-500">
                                            Seller
                                        </h2>
                                        <p className="text">
                                            {
                                                userData.userInfo._count
                                                    .sellerListings
                                            }{" "}
                                            sellerListings
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                        rating={3.2}
                                    />
                                )}
                            </div>

                            <div className="mt-5">
                                {userData.userInfo.reviewsReceived.length >
                                0 ? (
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
                                                <h2>
                                                    This seller has no reviews{" "}
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="flex justify-center">
                                            <DisplayStarRating rating={0} />
                                        </div>
                                        <div className="mt-2 h-10 overflow-y-auto break-words text-green-500">
                                            ¯\_(ツ)_/¯
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="z-10 mt-64 w-full">
                    <MainFooter />
                </div>
            </>
        )
    );
}
{
    /* */
}
