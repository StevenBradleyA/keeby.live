import Custom404 from "~/pages/404";
import { api } from "~/utils/api";
import Image from "next/image";
import profileBackground from "@public/Profile/public-profile-background.png";

interface PublicProfileProps {
    username: string;
}

export default function PublicProfileUserInfo({
    username,
}: PublicProfileProps) {
    const { data: profile } = api.user.getUserPublic.useQuery(username);
    return (
        <>
            <Image
                src={profileBackground}
                alt="profile"
                // width={800}
                // height={800}
                className="public-profile-background absolute w-full "
            />
            <div>{profile?.username}</div>
            {profile ? (
                <div className="public-profile-container flex">
                    <div className="w-1/3 rounded-2xl border-2 border-purple-600 bg-black bg-opacity-75 p-5">
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
                    </div>
                    <div className="w-1/3 rounded-2xl border-2 border-purple-600 bg-black bg-opacity-75 p-5">
                        <h1 className="text-2xl"> Seller Reviews</h1>
                        <div>if elligibal add leave review button</div>
                    </div>
                    <div className="w-1/3 rounded-2xl border-2 border-purple-600 bg-black bg-opacity-75 p-5">
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
        </>
    );
}
