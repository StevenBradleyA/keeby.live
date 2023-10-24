import { useSession } from "next-auth/react";
import Image from "next/image";
import { keebo } from "../../../public/Nav/bmo-test.jpg";

export default function UserProfile() {
    // todo consider hashing or some simple change that doesn't display the correct userID
    // todo does it really matter if this source code is avail...
    // mdn digest() -- might be useful for us here

    const { data: sessionData } = useSession();

    return (
        <>
            <div>Hello specific user</div>
            {sessionData && sessionData.user.profile && (
                <Image
                    alt="profile"
                    src={sessionData?.user.profile}
                    width={200}
                    height={200}
                />
            )}

            <div>Will only want to display username ----</div>
            <button className="rounded-2xl bg-green-600 px-6 py-2">
                isVerifiedSeller
            </button>
            <button className="rounded-2xl bg-red-600 px-6 py-2">
                or show dis Register to Sell a KEEB
            </button>
            <div>
                Tag selection like rocketleague ---other users will only see tag
                selected ---
            </div>
            <div>Keeb Information and highest avg wpm</div>
            <div>user only -- show 10 highest wpm</div>
            <div>Rank information</div>
            <div>Seller Reputation aka reviews with average star rating</div>
        </>
    );
}
