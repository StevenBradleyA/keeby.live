"use client";

import { api } from "~/trpc/react";
import Image from "next/image";
import defaultProfile from "@public/Images/defaultProfile.png";
import DisplayStarRating from "~/app/_components/Reviews/Star/displayStarRating";
import EachPublicProfileReview from "~/app/_components/Reviews/Display/publicProfileReviews";
import CustomProgressPie from "./customProgressPie";
import unranked from "@public/KeebType/unranked.png";
import TitleScripts from "~/app/_components/TitleScripts";
import { motion } from "framer-motion";
import Footer from "../../Footer/footer";

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

    // todo ideas maybe add a matching circle for internetpoints?
    const percentage = (5 / 5) * 100;
    const radius = (100 - 5) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - percentage / 100);

    const variants = {
        initial: {
            strokeDashoffset: circumference,
        },
        animate: {
            strokeDashoffset: strokeDashoffset,
            transition: {
                duration: 2,
                ease: "easeInOut",
            },
        },
    };

    function formatPoints(points: number) {
        if (points >= 1000) {
            return (points / 1000).toFixed(1) + "k";
        }
        return points.toString();
    }

    return (
        userData && (
            <>
                <div className="mb-5 text-3xl text-green-500 flex justify-center mt-40">
                    <TitleScripts page="publicProfile" />
                </div>
                <div className="z-10 w-full px-40 text-mediumGray">
                    <div className="z-10 flex h-[60vh]  w-full justify-center gap-10 ">
                        <div className="flex h-full w-3/12 flex-col overflow-y-auto rounded-2xl bg-black/30 p-2 text-xs">
                            <div className="flex w-full flex-col items-center">
                                <div className="-mb-3 mt-2 rounded-md bg-black/30 px-6 py-2 text-green-500">
                                    {userData.userInfo.rank
                                        ? userData.userInfo.rank.name
                                        : "Unranked"}
                                </div>
                                <Image
                                    alt="profile"
                                    src={
                                        userData.userInfo.rank?.image ||
                                        unranked
                                    }
                                    className=" h-32 w-60 object-cover"
                                    width={300}
                                    height={300}
                                />
                            </div>
                            <div className="mt-20 flex items-center gap-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12 rounded-full bg-black/30 p-2 text-green-500 "
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M4.12903 3.77419C4.12903 3.34662 4.47565 3 4.90323 3H11.0968C11.5243 3 11.871 3.34662 11.871 3.77419C11.871 4.20177 11.5243 4.54839 11.0968 4.54839H8.77419V12.0323C8.77419 12.4598 8.42758 12.8065 8 12.8065C7.57242 12.8065 7.22581 12.4598 7.22581 12.0323V4.54839H4.90323C4.47565 4.54839 4.12903 4.20177 4.12903 3.77419ZM3.38615 5.29127C3.68849 5.59361 3.68849 6.08381 3.38615 6.38615L1.86907 7.90323L3.38615 9.4203C3.68849 9.72265 3.68849 10.2128 3.38615 10.5152C3.08381 10.8175 2.59361 10.8175 2.29127 10.5152L0.226756 8.45066C-0.0755853 8.14832 -0.0755853 7.65813 0.226756 7.35579L2.29127 5.29127C2.59361 4.98893 3.08381 4.98893 3.38615 5.29127ZM12.6139 5.29127C12.9162 4.98893 13.4064 4.98893 13.7087 5.29127L15.7732 7.35579C16.0756 7.65813 16.0756 8.14832 15.7732 8.45066L13.7087 10.5152C13.4064 10.8175 12.9162 10.8175 12.6139 10.5152C12.3115 10.2128 12.3115 9.72265 12.6139 9.4203L14.1309 7.90323L12.6139 6.38615C12.3115 6.08381 12.3115 5.59361 12.6139 5.29127Z"
                                    />
                                </svg>
                                <div className="flex flex-col ">
                                    <h2 className="text-green-500">Typist</h2>
                                    <p className="text">
                                        {userData.userInfo._count.games} games
                                        played
                                    </p>
                                </div>
                            </div>
                            <div className="mt-3  flex items-center gap-3">
                                <svg
                                    className="h-12 w-12 rounded-full bg-black/30 p-2 text-green-500 "
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"></path>
                                </svg>
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
                            <div className="mt-3 flex items-center gap-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="h-12 w-12 rounded-full bg-black/30 p-2 text-green-500 "
                                    viewBox="0 0 32 32"
                                    version="1.1"
                                >
                                    <path d="M27.967 27.984h-23.935c-1.102 0-1.994-0.894-1.994-1.995v-10.969c0-1.103 0.893-1.995 1.994-1.995l1.055-0.056c0-1.629 0.496-2.625 1.488-3.734s2.222-1.665 3.692-1.665c0.697 0 1.47 0.118 2.317 0.354 0 0 1.842 0.612 3.121 0.612 1.951 0 3.283-0.855 3.99-2.566 0.332-0.823 0.67-1.235 1.014-1.235 0.492 0 0.74 0.23 0.74 0.689 0 0.813-0.439 1.712-1.318 2.696-1.18 1.337-2.631 2.006-4.356 2.006-1.339 0-3.634-0.628-3.634-0.628-0.932-0.226-1.597-0.338-1.993-0.338-0.953 0-1.771 0.407-2.451 1.223s-1.021 1.475-1.021 2.6l21.291 0.042c1.102 0 1.996 0.893 1.996 1.995v10.97c0 1.101-0.895 1.994-1.996 1.994zM28.965 15.020c0-0.552-0.447-0.998-0.998-0.998h-23.935c-0.551 0-0.997 0.446-0.997 0.998v10.97c0 0.551 0.446 0.998 0.997 0.998h23.935c0.551 0 0.998-0.447 0.998-0.998v-10.97zM24.971 20.037h-1.963v1.932h-1.994v-1.932h-1.996v1.932h-2.057v-1.932h-1.932v1.932h-1.995v-1.932h-1.994v1.932h-1.996v-1.932h-2.025v1.932h-1.994v-1.963h2.025v-1.995h-2.025v-1.963h1.994v1.932h2.025v-1.932h1.995v1.932h1.994v-1.932h1.995v1.932h1.932v-1.932h2.057v1.932h1.996v-1.932h1.994v1.932h1.963v-1.932h1.994v1.963h-1.963v1.995h1.963v1.963h-1.994v-1.932zM11.040 18.011h-2.026v1.995h2.025v-1.995zM14.998 18.011h-1.995v1.995h1.995v-1.995zM18.986 18.011h-1.994v1.995h1.994v-1.995zM22.977 18.011h-1.997v1.995h1.996v-1.995zM23.070 24.992h-14.087v-1.964h14.087v1.964z" />
                                </svg>
                                <div className="flex flex-col ">
                                    <h2 className="text-green-500">Posts</h2>
                                    <p className="text">
                                        {userData.userInfo._count.posts} posts
                                    </p>
                                </div>
                            </div>

                            <div className="mt-3 flex items-center gap-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12 rounded-full bg-black/30 p-2 text-green-500 "
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <g opacity="0.4">
                                        <path
                                            d="M9.5 13.7502C9.5 14.7202 10.25 15.5002 11.17 15.5002H13.05C13.85 15.5002 14.5 14.8202 14.5 13.9702C14.5 13.0602 14.1 12.7302 13.51 12.5202L10.5 11.4702C9.91 11.2602 9.51001 10.9402 9.51001 10.0202C9.51001 9.18023 10.16 8.49023 10.96 8.49023H12.84C13.76 8.49023 14.51 9.27023 14.51 10.2402"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M12 7.5V16.5"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </g>
                                    <path
                                        d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M17 3V7H21"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M22 2L17 7"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="flex flex-col ">
                                    <h2 className="text-green-500">Seller</h2>
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
                        <div className="flex h-full w-4/12  flex-col gap-5 rounded-2xl">
                            <Image
                                alt="profile"
                                src={
                                    userData.userInfo.profile
                                        ? userData.userInfo.profile
                                        : defaultProfile
                                }
                                width={800}
                                height={800}
                                className="z-10 h-3/4 w-full rounded-2xl bg-black/30 object-cover "
                            />

                            <div className="flex items-center justify-evenly ">
                                <div className="relative mt-3 flex justify-center">
                                    <svg
                                        width={100}
                                        height={100}
                                        viewBox={`0 0 ${100} ${100}`}
                                        fill="none"
                                    >
                                        <motion.circle
                                            cx={100 / 2}
                                            cy={100 / 2}
                                            r={radius}
                                            stroke="#616161"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <motion.circle
                                            cx={100 / 2}
                                            cy={100 / 2}
                                            r={radius}
                                            stroke="#22C55E"
                                            strokeWidth="5"
                                            fill="none"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={strokeDashoffset}
                                            variants={variants}
                                            initial="initial"
                                            animate="animate"
                                            transform={`rotate(-90 ${100 / 2} ${
                                                100 / 2
                                            })`}
                                        />
                                    </svg>

                                    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center text-3xl">
                                        {formatPoints(
                                            userData.userInfo.internetPoints,
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-2xl text-green-500">
                                        {userData.userInfo.username}
                                    </h1>
                                    <h2>{userData.userInfo.selectedTag}</h2>
                                </div>
                            </div>
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
                                        ),
                                    )
                                ) : (
                                    <div className="flex w-full flex-col rounded-xl bg-black/30 p-2  text-xs transition-background duration-300 ease-custom-cubic hover:bg-black/20 ">
                                        <div className=" flex w-full items-center gap-3 ">
                                            <Image
                                                alt="profile"
                                                src={defaultProfile}
                                                className="h-12 w-12 rounded-md  object-cover"
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
                    <Footer />
                </div>
            </>
        )
    );
}
{
    /* */
}
