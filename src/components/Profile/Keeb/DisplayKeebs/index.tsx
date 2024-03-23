import { api } from "~/utils/api";
import EachDisplayKeebCard from "./eachDisplayKeebCard";

export default function DisplayKeebs({ userId }: { userId: string }) {
    const { data: keebData } = api.keeb.getAllByUserId.useQuery(userId);

    return (
        <>
            <div className="mt-10 flex w-full flex-wrap gap-5">
                {keebData?.map((keeb, i) => (
                    <EachDisplayKeebCard key={i} keeb={keeb} />
                ))}
            </div>
        </>
    );
}
