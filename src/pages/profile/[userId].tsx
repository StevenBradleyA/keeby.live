import { useSession } from "next-auth/react";

export default function UserProfile() {
    // todo consider hashing or some simple change that doesn't display the correct userID
    // todo does it really matter if this source code is avail...
    // mdn digest() -- might be useful for us here

    const { data: sessionData } = useSession();

    return (
        <>
            <div>Hello specific user</div>
            <div>{sessionData?.user.name}</div>
            <div>Will only want to display username</div>
            <div>Rank information</div>
            <div>
                Tag selection like rocketleague ---other users will only see tag
                selected ---
            </div>

            <div>Keeb Information and average wpm</div>
            <div>Keeb Information </div>
            
            <div>Seller Reputation aka reviews with average star rating</div>
        </>
    );
}
