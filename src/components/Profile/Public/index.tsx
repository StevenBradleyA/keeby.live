import { api } from "~/utils/api";
import Image from "next/image";
import gridBackground from "@public/Profile/profile-plus.png";
import stockProfile from "@public/Profile/profile-default.png";

interface PublicProfileProps {
    username: string;
}

export default function PublicProfileUserInfo({
    username,
}: PublicProfileProps) {
    const { data: profile } = api.user.getUserPublic.useQuery(username);

    // todo features for this site

    // Show all Seller reviews
    // show seller information
    // show all seller keebs ????
    // show seller posts and listings???
    //  show seller average wpm and selected tag fo sho

    return (
        <div className="flex w-full justify-center ">
          {`  hey public profile i really don't know what to do here yet. but we
            about to rock it tomorrow`}
        </div>
    );
}

{
    /* <Image
    src={gridBackground}
    alt="background"
    className="matrix-full-screen fixed bottom-0 left-0 right-0 top-0 h-full w-full object-cover object-center opacity-40 "
    priority
/> */
}
