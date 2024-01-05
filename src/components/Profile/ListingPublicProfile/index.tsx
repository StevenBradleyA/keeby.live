import { api } from "~/utils/api";
import Image from "next/image";

interface SellerPublicProfileProps {
    userId: string;
}

export default function SellerPublicProfile({
    userId,
}: SellerPublicProfileProps) {
    const { data: seller, isLoading } = api.user.getSeller.useQuery(userId);
    // todo include reviews in this query
    // going to have to map through all the stars and find an average

    // if profile pic then we display that otherwise we grab keebo
    // display seller rating if they have that otherwise we display blank stars

    return (
        <div className="flex justify-between">
            <div>seller profile if profile otherwise bmo</div>
            <div>seller avg stars here</div>
        </div>
    );
}
