import PublicProfileUserInfo from "~/app/_components/Profile/Public";
import NotFound from "~/app/not-found";

export default function PublicProfile({
    params,
}: {
    params: { username: string };
}) {
    const { username } = params;

    return (
        <>
            {username && typeof username === "string" ? (
                <PublicProfileUserInfo username={username} />
            ) : (
                <NotFound />
            )}
        </>
    );
}
