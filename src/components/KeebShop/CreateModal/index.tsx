import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export default function CreateListingModal() {
    const { data: sessionData } = useSession();

    const isVerifiedSeller = sessionData?.user.isVerified === true;

    return (
        <>
            {sessionData === null && (
                <div className="flex flex-col ">
                    SIgn in to list your keeb
                    <button onClick={() => void signIn()}>sign in</button>
                </div>
            )}

            {sessionData && isVerifiedSeller && (
                <div>
                    <div> Would you like to list a keyboard? </div>
                    <button>Yuup</button>
                </div>
            )}
            {sessionData && !isVerifiedSeller && (
                <div>
                    <div>
                        to list a keeb you need to get verified as a seller
                    </div>
                    <button>{`Let's go`}</button>
                </div>
            )}

            <div></div>
        </>
    );
}
