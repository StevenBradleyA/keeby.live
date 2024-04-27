import { useSession } from "next-auth/react";
import DisplayMessages from "~/components/Messages/Display/displayMessages";
export default function MessageCheck() {
    const { data: sessionData } = useSession();

    return (
        <>
            {sessionData && sessionData.user && (
                <DisplayMessages userId={sessionData.user.id} />
            )}
        </>
    );
}
