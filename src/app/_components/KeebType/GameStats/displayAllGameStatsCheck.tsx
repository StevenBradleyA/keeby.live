import { api } from "~/utils/api";
import LoadingSpinner from "~/app/_components/Loading";
import DisplayAllGameStats from "./gameStatsConfigurator";

export default function DisplayAllGameStatsCheck({
    userId,
}: {
    userId: string;
}) {
    const { data: keebData, isLoading } =
        api.keeb.getAllByUserId.useQuery(userId);

    if (isLoading)
        return (
            <div className="mt-44">
                <LoadingSpinner size="40px" />
            </div>
        );
    return (
        <>
            {keebData && keebData.length > 0 && (
                <DisplayAllGameStats userId={userId} keebData={keebData} />
            )}
        </>
    );
}
