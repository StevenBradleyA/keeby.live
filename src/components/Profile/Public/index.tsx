import Custom404 from "~/pages/404";
import { api } from "~/utils/api";
import Image from "next/image";

interface PublicProfileProps {
    username: string;
}

export default function PublicProfileUserInfo({
    username,
}: PublicProfileProps) {
    const { data: profile } = api.user.getUserPublic.useQuery(username);
    return (
        <>
            <div>hey</div>
            {profile ? (
                <div>
                    {profile.profile && (
                        <Image
                            src={profile.profile}
                            alt="profile"
                            width={800}
                            height={800}
                            className="w-60"
                        />
                    )}

                    <div>{profile.username}</div>
                    <div>{profile.tag}</div>

                    <h1 className="mt-20 text-2xl"> Seller Reviews</h1>
                    <div>if elligibal add leave review button</div>
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
