import { useRouter } from "next/router";
import PublicProfileUserInfo from "~/components/Profile/Public";
import Custom404 from "~/pages/404";

export default function PublicProfile() {
    const router = useRouter();
    const { username } = router.query;

    console.log(username)

    return (
        <>
            {username && typeof username === "string" ? (
                <PublicProfileUserInfo username={username} />
            ) : (
                <Custom404 />
            )}
        </>
    );
}
