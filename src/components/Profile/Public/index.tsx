import Custom404 from "~/pages/404";
import { api } from "~/utils/api";
import Image from "next/image";
import profileBackground from "@public/Profile/public-profile-background.png";
import synthGirl from "@public/Profile/synth-girl.png";

interface PublicProfileProps {
    username: string;
}

export default function PublicProfileUserInfo({
    username,
}: PublicProfileProps) {
    const { data: profile } = api.user.getUserPublic.useQuery(username);
    return (
        <div className="flex w-full justify-center ">
            {/* <Image
                src={profileBackground}
                alt="profile"
                // width={800}
                // height={800}
                className="public-profile-background fixed -top-60 left-0 "
            /> */}

            <div className="flex border-4 border-pink-500 rounded-2xl w-2/3 public-profile-container"> 
            <Image
                src={synthGirl}
                alt="synth girl "
                className="public-profile-container w-[40%] rounded-xl border-4 border-white"
            />
            {profile ? (
                <div className="flex flex-col w-full">
                    <div className="rounded-xl border-4 border-purple-600 bg-black bg-opacity-75 p-5">
                        {profile.profile && (
                            <Image
                                src={profile.profile}
                                alt="profile"
                                width={800}
                                height={800}
                                className="w-60"
                            />
                        )}

                        <div>{profile.tag}</div>
                        <div>{profile?.username}</div>
                    </div>
                    <div className=" rounded-2xl border-2 border-purple-600 bg-black bg-opacity-75 p-5">
                        <h1 className="text-2xl"> Seller Reviews</h1>
                        <div>if elligibal add leave review button</div>
                    </div>
                    <div className="rounded-2xl border-2 border-purple-600 bg-black bg-opacity-75 p-5">
                        <div>{profile.tag}</div>
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
            ) : (
                <Custom404 />
            )}



            </div>
        </div>
    );
}
