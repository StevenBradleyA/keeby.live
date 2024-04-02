import { api } from "~/utils/api";
import Image from "next/image";
import synthGirl from "@public/Profile/synth-girl.png";
import stockProfile from "@public/Profile/profile-default.png";

interface PublicProfileProps {
    username: string;
}

export default function PublicProfileUserInfo({
    username,
}: PublicProfileProps) {
    const { data: profile } = api.user.getUserPublic.useQuery(username);

    {
        /* <div className="matrix-full-screen fixed bottom-0 left-0 right-0 top-0 h-full w-full opacity-50  ">
                <video
                    className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-full object-cover  object-center" */
    }

    return (
        <div className="flex w-full justify-center ">
            <div className="matrix-full-screen fixed bottom-0 left-0 right-0 top-0 h-full w-full object-cover object-center opacity-40  ">
                {/* <video
                    className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-full object-cover object-center"
                    autoPlay
                    loop
                    muted
                >
                    <source src="/Videos/space-purple.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video> */}
            </div>

            <div className="public-profile-container mt-10 flex w-2/3 rounded-2xl border-4 border-pink-500">
                <Image
                    src={synthGirl}
                    alt="synth girl "
                    className="public-profile-container w-[40%] rounded-xl border-4 border-white"
                />
                {profile && (
                    <div className="flex w-full flex-col gap-2 rounded-2xl bg-black bg-opacity-75">
                        <div className="rounded-xl border-4 border-purple-600  p-5">
                            <div className="flex justify-between ">
                                <div className="flex w-2/3 flex-col ">
                                    <div className=" text-purple-600 flex h-5/6 items-center justify-center font-titillium text-4xl">
                                        {profile?.username}
                                    </div>

                                    <div className="flex h-1/6 items-end justify-center text-pink-500">
                                        novice
                                        {/* <div>{profile.tag}</div> */}
                                    </div>
                                </div>
                                {profile.profile && (
                                    <Image
                                        src={
                                            profile.profile
                                                ? profile.profile
                                                : stockProfile
                                        }
                                        alt="profile"
                                        width={800}
                                        height={800}
                                        className="h-44 w-44 object-cover"
                                    />
                                )}
                            </div>
                        </div>
                        <div className=" rounded-xl border-4 border-purple-600  p-5">
                            <h1 className="text-2xl"> Seller Reviews</h1>
                            <div>if elligibal add leave review button</div>
                        </div>
                        <div className="rounded-xl border-4 border-purple-600  p-5">
                            Keyboards - rank -- each keeb with desc and top wpm
                        </div>

                        {profile.reviewsReceived.length > 0 &&
                            profile.reviewsReceived.map((e, i) => (
                                <div key={i}>
                                    <div className="flex">
                                        <div>{e.user.username}</div>
                                        <div>{e.starRating}</div>
                                    </div>
                                    <div>{e.text}</div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}
