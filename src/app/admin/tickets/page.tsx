"use client";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import EachAdminTicket from "~/app/_components/Admin/Tickets/Display/displayAdminTickets";
import Footer from "~/app/_components/Footer/footer";
import LoadingSpinner from "~/app/_components/Loading";
import NotFound from "~/app/not-found";
import AdminHeader from "~/app/_components/Admin/adminHeader";

export default function AdminTickets() {
    const { data: session, status } = useSession();

    const { data: tickets } = api.ticket.getAll.useQuery();

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

                    <div className="mt-10  flex justify-center">
                        <div className="flex w-2/3 flex-wrap gap-10">
                            {tickets &&
                                tickets.length > 0 &&
                                tickets.map((ticket) => (
                                    <div key={ticket.id}>
                                        <EachAdminTicket ticket={ticket} />
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="mt-96">
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
}
