import { api } from "~/utils/api";

export default function DisplayMessages({ userId }: { userId: string }) {
    return (
        <>
            <div className="flex h-[80vh] w-full px-16">
                <div className="h-full w-1/4 rounded-xl bg-keebyGray"></div>
                <div className="h-full w-3/4">
                    hey we are going to map through messages here and display{" "}
                </div>
            </div>
        </>
    );
}
