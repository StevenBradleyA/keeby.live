"use client";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import EachAdminTicket from "~/app/_components/Admin/Tickets/Display/displayAdminTickets";
import Footer from "~/app/_components/Footer/footer";
import LoadingSpinner from "~/app/_components/Loading";
import NotFound from "~/app/not-found";
import AdminHeader from "~/app/_components/Admin/adminHeader";
import { useState } from "react";

export default function AdminTickets() {
    const { data: session, status } = useSession();

    const [typeQuery, setTypeQuery] = useState<string>("");

    const { data: tickets } = api.ticket.getAll.useQuery({
        typeQuery,
    });

    if (status === "loading") {
        return (
            <div className="mt-40 flex w-full justify-center text-red-500">
                <LoadingSpinner size="20px" />
            </div>
        );
    }

    if (!session || !session.user.isAdmin) {
        return <NotFound />;
    }

    return (
        <>
            {session && session.user.isAdmin && (
                <div className="w-full mt-28">
                    <AdminHeader />
                    <div className="mt-5 flex w-full justify-center">
                        <select
                            id="typeQuery"
                            value={typeQuery}
                            onChange={(e) => setTypeQuery(e.target.value)}
                            className="p-2  rounded-md bg-black/30 text-failure"
                        >
                            <option value="">-- Select Type --</option>
                            <option value="help">Help</option>
                            <option value="bug">Bug</option>
                            <option value="feature">Feature</option>
                            <option value="praise">Praise</option>
                        </select>
                    </div>
                    <div className="mt-10  flex flex-wrap w-full laptop:px-16 px-3 gap-5">
                        {tickets &&
                            tickets.length > 0 &&
                            tickets.map((ticket) => (
                                <div key={ticket.id}>
                                    <EachAdminTicket ticket={ticket} />
                                </div>
                            ))}
                    </div>

                    <div className="mt-96">
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
}
